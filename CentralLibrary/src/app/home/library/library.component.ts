import { Component,  OnInit } from '@angular/core';
import {HomeService} from '../home.service';
@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  signedIn:boolean;
  Books=[];
  user:any;
  noOfBooksTaken:number;
  input="";
  isDataFetched:boolean;
  DoubleBorrow:boolean;
  SuccessfulBorrow:boolean;
  constructor(private homeService:HomeService) { }
  

  ngOnInit() {
    let getUser = localStorage.getItem('user');
    this.user = JSON.parse(getUser);
      this.fetchData();
  }

  CatchInput(event){
    this.input = event;
    this.fetchData()
  }

  fetchData(){
    if(this.user){
      this.signedIn = true;
      this.homeService.fetchBooks(this.user.id).subscribe(Response=>{
        this.isDataFetched = true;
        this.noOfBooksTaken = Response.noOfBooksTaken;
        var data = this.FilterBooks(Response.books)
        this.Books = data;
       })
    }
    else{
      this.homeService.fetchBooksGuest().subscribe(Books=>{
        this.isDataFetched = true;
        var data = this.FilterBooks(Books)
         this.Books = data;
       })
    }
      }

      FilterBooks(Books){
        var search = Books.filter(book=>{
          return book.name.toLowerCase().includes(this.input.toLowerCase())||book.author.toLowerCase().includes(this.input.toLowerCase())
        })
        return search;
      }

  BorrowBook(bookid,i){
       this.homeService.postIssueRequest(bookid,this.user.id).subscribe({
         next:()=>{
         this.Books[i].noOfCopies= this.Books[i].noOfCopies-1;
         this.noOfBooksTaken=this.noOfBooksTaken+1;
           this.SuccessfulBorrow = true;
           setTimeout(() => {
            this.SuccessfulBorrow = false;
          }, 1000);
         },
        error: ({ error }) => {
          if(error.status===400){
            this.DoubleBorrow = true;
            setTimeout(() => {
              this.DoubleBorrow = false;
            }, 1000);
          }
        }
      })
    }
}
  
