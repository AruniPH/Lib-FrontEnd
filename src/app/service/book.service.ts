import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl : string= 'http://localhost:8001/book'; 

  constructor(
    private http:HttpClient
  ) { }

  createBook(book:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/add`, book);
  }

  GetAllBooks():Observable<any>{
    return this.http.get(`${this.baseUrl}/all`);
  }

  GetBookByISBN(isbn:string):Observable<any>{
    return this.http.get(`${this.baseUrl}/getBookDetailsByIsbn/${isbn}`);
  }

  DeleteBookByIsbn(isbn:string):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/delete/${isbn}`);
  }


  updateBook(book: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, book); // 
  }
}
