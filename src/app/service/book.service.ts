
// purpose of the file is act as a bridge between backend server and the angular. 
//It contains methods to send HTTP requests (like GET, POST, PUT, DELETE) to the backend.
//The service abstracts the backend logic so that the components don't need to deal directly with API endpoints.

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl : string= 'http://localhost:8001/book'; // backend sprintboot- is running on port 8001. 
  //private baseUrl: string = 'http://backend-service:8001/book'; // backend service name in Docker
  
  constructor(
    private http:HttpClient
  ) { }

  createBook(book:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/add`, book);
  }

  GetAllBooks():Observable<any>{
    return this.http.get(`${this.baseUrl}/all`);
  }

  GetBookByIsbn(isbn:any):Observable<any>{
    return this.http.get(`${this.baseUrl}/isbn/${isbn}`);
  }

  DeleteBookByIsbn(isbn:string):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/delete/isbn/${isbn}`);
  }

  updateBook(book: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/isbn/${book.isbn}`, book); // 
  }
}