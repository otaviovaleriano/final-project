import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  standalone: false,
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  book = { title: '', author: '', genre: '', publishedYear: '', description: '', coverImageUrl: ''  }; 
  isEditMode = false;  
  bookId: string = '';

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if it's editing an existing book
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.isEditMode = true;
      this.bookId = bookId;
      this.loadBook();
    }
  }

  loadBook(): void {
    this.bookService.getBookById(this.bookId).subscribe(book => {
      console.log('Fetched book:', book); 
      this.book = book;
    });
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.bookService.updateBook(this.bookId, this.book).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.bookService.addBook(this.book).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
