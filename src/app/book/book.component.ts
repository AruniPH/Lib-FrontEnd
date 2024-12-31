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

export class BookComponent{
  searchTerm: any;
  bookObj: BookRepresentation = {};
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

  EditBook(Book: any): void {
   //console.log('Selected Book:', Book); 
    this.bookObj = { ...Book }; // all book data to form
    this.isEditBook = true; 
    //console.log('bookObj after assignment:', this.bookObj);
    
  }

  
  SaveBook(): void {
   // console.log('SaveBook called. isEditBook:', this.isEditBook);
    if (this.isEditBook) {
      this.UpdateBook();
    } else {
      swal({
        title: "Are you sure?",
        text: "Do you want to add this student?",
        icon: "warning",
        dangerMode: true,
      }).then((willAdd) => {
        if (willAdd) {
          this.bookService.createBook(this.bookObj).subscribe(() => {
            this.GetAllBooks();
              swal("Success!", "Book has been added!", "success");
              //this.Books.push(this.bookObj)
              this.ClearForm();
          });
        }
      });
    }
  }


  GetBookByIsbn(isbn: any) {
    this.bookService.GetBookByIsbn(isbn).subscribe(all => {
      console.log('API response:', all);
      this.bookObj = all.data.dataList[0];
      //console.log(this.bookObj)
      this.isEditBook = true;
    } );
  }

  UpdateBook(): void {
    console.log('UpdateBook called. ');
    swal({
      title: "Update",
      text: "Do you want to update this Book's details?",
      icon: "warning",
      dangerMode: true,
    }).then((willUpdate: any) => {
      
      if (willUpdate) {
        console.log('inside willUpdate. ');
        this.bookService.updateBook(this.bookObj).subscribe(() => {
          this.GetAllBooks(); 
          this.isEditBook = false;
          swal("Updated!", "Book details have been updated!", "success");
          this.ClearForm();
        }, (error) => {
          console.error('Error updating book:', error);
          swal("Error!", "Failed to update book details. Please try again.", "error");
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
    }) .then((willDelete: any) => {
        if (willDelete) {
          this.bookService.DeleteBookByIsbn(isbn).subscribe(() => {
            this.GetAllBooks(); // Refresh the Book list
            swal("Deleted!", "Book has been deleted!", "success");
          },(error) => {
            console.error('Error deleting book:', error);
            swal("Error!", "Failed to delete book. Please try again.", "error");
          });
        }
      });
  }

    
  GetAllBooks() {
    this.bookService.GetAllBooks().subscribe(all => {
      console.log(all);
     this.Books = all;
    })
  }


  ClearForm(): void {
    this.bookObj = {};
    this.isEditBook = false;
  }
}
