import { Component, OnInit } from '@angular/core';
import {GitSearchService} from '../git-search.service'
import {GitSearch} from '../git-search'
import {TemplateRef} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-git-search',
  templateUrl: './git-search.component.html',
  styleUrls: ['./git-search.component.css']
})
export class GitSearchComponent implements OnInit {

  searchResults: GitSearch;
  searchQuery: string;
  secondData: any;
  modalRef: BsModalRef;
  currentPage=1;
  page=0;
  perPage=9;
  count=1;
  notEmptyPost=true;
  notscrolly=true;
  constructor(private GitSearchService: GitSearchService,private modalService: BsModalService, private spinner : NgxSpinnerService) { }
  openModal(template: TemplateRef<any>,user) {
    this.modalRef = this.modalService.show(template);
    this.GitSearchService.getSecondApi(user).subscribe(data =>
      {
        
        this.secondData=data;
        console.log(this.secondData);
      }

    )
  }

  
  gitSearch=()=>{
    this.GitSearchService.gitSearch(this.searchQuery).then((response)=>{
      this.searchResults=response;
    }, (error)=>{
      alert("Error: " +error.statusText)
    })
  }

  onScroll(){
    if(this.notscrolly && this.notEmptyPost){ 
          this.spinner.show();
          this.notscrolly=false;
          console.log("scrolled");
          this.loadNextPost();
    }
  }
 loadNextPost(){

     this.count=this.count+1; 
     this.GitSearchService.getnextpage(this.searchQuery,this.count).subscribe((result:any )=>{
       const newPost = result;
       console.log(newPost);
       if(newPost.length == 0 ){
         this.notEmptyPost=false;
       }
       Array.prototype.push.apply(this.searchResults,newPost.items);
       console.log(this.searchResults,newPost.items);
      this.page++;
      this.spinner.hide();
       this.notscrolly=true;
     });

 }

 ngOnInit(): void {

}

  
}


