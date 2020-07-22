import { Component, OnInit } from '@angular/core';
import {GitSearchService} from '../git-search.service'
import {GitSearch} from '../git-search'
import {TemplateRef} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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

  constructor(private GitSearchService: GitSearchService,private modalService: BsModalService) { }
  openModal(template: TemplateRef<any>,user) {
    this.modalRef = this.modalService.show(template);
    this.GitSearchService.getSecondApi(user).subscribe(data =>
      {
        
        this.secondData=data;
        console.log(this.secondData);
      }

    )
  }

  ngOnInit(): void {

  }

  gitSearch=()=>{
    this.GitSearchService.gitSearch(this.searchQuery).then((response)=>{
      this.searchResults=response;
    }, (error)=>{
      alert("Error: " +error.statusText)
    })
  }
}


