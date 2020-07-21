import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GitSearchComponent } from './git-search/git-search.component';

const routes: Routes = [
  {
    path:"gits",
    component: GitSearchComponent
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
