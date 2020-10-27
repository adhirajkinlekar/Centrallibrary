import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';



interface BookResponse{
  books: [{
    author: string,
  id: number,
  imageUrl: string,
  issues: any,
  name: string,
  noOfCopies: number,
  }],
   noOfBooksTaken:number
}
  
interface BookResponseGuest{
  
 author: string,
  id: number,
  imageUrl: string,
  issues: any,
  name: string,
  noOfCopies: number,
   
}

@Injectable({
  providedIn: 'root'
})

export class HomeService {

  
  constructor(private http:HttpClient,private router:Router) { }

  fetchBooks(id:number){
    return this.http.get<BookResponse>(`https://localhost:44300/api/home/${id}`)
  }

  fetchBooksGuest(){
    return this.http.get<BookResponseGuest[]>(`https://localhost:44300/api/home/`)
  }

  postIssueRequest(bookId:number,userId:number){
    return this.http.post<any>('https://localhost:44300/api/issues/',{
      bookId:bookId,
      userId:userId
    })
  }

  fetchUserProfile(user:any){
    return this.http.get<any>(`https://localhost:44300/api/Profile/${user.id}`)
    
  }

  postReturnRequest(bookId:number,userId:any){
    return this.http.put<any>(`https://localhost:44300/api/Profile/${bookId}/${userId}`,{

    })
  }

}
