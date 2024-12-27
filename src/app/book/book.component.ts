import { Component, OnInit } from '@angular/core';
import { BookRepresentation } from '../module/book.representation';

import { FormBuilder } from '@angular/forms';
import swal from 'sweetalert';
import { BookService } from '../service/book.service';


@Component({
  selector: 'app-Book',
  standalone: false,
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit {
  searchTerm: any;
  BookObj: BookRepresentation = {};
  Books: Array<any> = [];
  allStatus: any;

  statusValue: any;
  isEditBook: boolean = false;
  dtDynamicVerticalScrollExample: any;

  constructor(
    private bookService: BookService,
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.isEditBook == false;
    this.GetAllBooks();
  }

  GetAllBooks() {
    this.bookService.GetAllBooks().subscribe(all => {
      console.log(all);
     this.Books = all;
      

    })
  }
  EditBook(Book: any): void {
    this.BookObj = { ...Book }; // all book data to form
    this.isEditBook = true; //  edit mode in the form
  }

  GetBookByIsbn(isbn: any) {
    this.bookService.GetBookByISBN(isbn).subscribe(all => {
      this.BookObj = all.data.dataList[0];
      this.isEditBook = true;
    })
  }

  UpdateBook(): void {
    swal({
      title: "Update",
      text: "Do you want to update this Book's details?",
      icon: "warning",
      dangerMode: true,
    }).then((willUpdate: any) => {
      if (willUpdate) {
        this.bookService.updateBook(this.BookObj).subscribe(() => {
          this.GetAllBooks(); 
          this.isEditBook = false;
          swal("Updated!", "Book details have been updated!", "success");
          this.ClearForm();
        });
      }
    });
  }
  DeleteBookByIsbn(isbn: string): void {
    swal({
      title: "Are you sure",
      text: "Do you want to delete this Book?",
      icon: "warning",
      dangerMode: true,
    })
      .then((willDelete: any) => {
        if (willDelete) {
          swal("Deleted!", "Book has been deleted!", "success");
          this.bookService.DeleteBookByIsbn(isbn).subscribe(() => {
            this.GetAllBooks(); // Refresh the Book list
            swal("Deleted!", "Book has been deleted!", "success");
          });
        }
      });
  }

    SaveBook(): void {
      this.bookService.createBook(this.BookObj).subscribe(() => {
        swal("Success!", "Book has been added!", "success");
        this.ClearForm();
      });
    }


  ClearForm(): void {
    this.BookObj = {};
    this.isEditBook = false;
  }
}
