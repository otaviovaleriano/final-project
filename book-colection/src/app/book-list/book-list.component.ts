import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  standalone: false,
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: any[] = [];
  selectedBook: any = null;
  modalVisible: boolean = false;

  filterBy: string = 'title';
  searchTerm: string = '';

  private searchTermSubject: Subject<string> = new Subject<string>();

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getBooks();

    this.searchTermSubject.pipe(
      debounceTime(500),
      distinctUntilChanged() 
    ).subscribe(searchTerm => {
      this.getBooks(searchTerm);
    });
  }

  getBooks(searchTerm: string = ''): void {
    this.bookService.getBooks(this.filterBy, searchTerm).subscribe((books) => {
      this.books = books;
    });
  }

  onSearchTermChange(searchTerm: string): void {
    this.searchTermSubject.next(searchTerm);
  }

  deleteBook(id: string): void {
    this.bookService.deleteBook(id).subscribe(() => {
      this.getBooks();
    });
  }

    openModal(book: any): void {
    this.selectedBook = book;
    this.modalVisible = true;
  }

  closeModal(): void {
    this.modalVisible = false;
    this.selectedBook = null;
  }
}
