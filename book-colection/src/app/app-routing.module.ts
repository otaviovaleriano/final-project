import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-form/book-form.component';


const appRoutes: Routes = [
    { path: '', component: BookListComponent },          //list of books
    { path: 'add', component: BookFormComponent },       // adding a new book
    { path: 'edit/:id', component: BookFormComponent },  //  editing an existing book
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }