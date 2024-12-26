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
  
  }

  SaveBook(): void {
    if (this.isEditBook) {
    
    } else {
      swal({
        title: "Are you sure?",
        text: "Do you want to add this Book?",
        icon: "warning",
        dangerMode: true,
      }).then((willAdd: any) => {
        if (willAdd) {
          this.bookService.createBook(this.BookObj).subscribe(() => {
           
            swal("Success!", "Book has been added!", "success");
            this.ClearForm();
          });
        }
      });
    }
  }



  ClearForm(): void {
    this.BookObj = {};
    this.isEditBook = false;
  }
}
