import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:5000/books';

  constructor(private http: HttpClient) {}

  // Get all books
  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Add a new book
  addBook(book: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, book);
  }

  // Update an existing book
  updateBook(id: string, book: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, book);
  }

  // Delete a book
  deleteBook(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getBookById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  
}
