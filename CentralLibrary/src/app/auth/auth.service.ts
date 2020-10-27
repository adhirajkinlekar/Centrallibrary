import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {tap} from 'rxjs/operators'
import {Router} from '@angular/router'

interface userToken {
  id:number,
  userName:string,
  token:string
}

interface IsUserNameAvailable{
available:boolean
}

interface signUpCredentials{
  username:string,
  password:string,
}

interface signInCredentials{
  username:string,
  password:string
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  rootUrl = "https://localhost:44300/api/account";
  signedIn = new BehaviorSubject(false);
  user:{ id:number,
    userName:string,
    token:string
}

  constructor(private http:HttpClient,private router:Router) { }

  validateUserName(username:string){

    return this.http.post<IsUserNameAvailable>(`${this.rootUrl}/CheckUserName`,{
            username:username })
  }

  signUp(credentials:signUpCredentials){
    return this.http.post<userToken>(`${this.rootUrl}/Register`,{
      username:credentials.username,
      password:credentials.password,
    })
    .pipe(
      tap((response:userToken)=>{
        this.user = response;
     if(this.user){
       localStorage.setItem('user',JSON.stringify(this.user))
       this.signedIn.next(true)
     }
      })
    )
}

signIn(credentials:signInCredentials){
  return this.http.post<userToken>(`${this.rootUrl}/Login`,credentials)
  .pipe(
   tap((response:userToken)=>{
     this.user = response;
     if(this.user){
       localStorage.setItem('user',JSON.stringify(this.user))
       this.signedIn.next(true)
     }
   })
 )
}

signOut(){
  if(this.user){
  localStorage.removeItem('user');
  setTimeout(()=>{
    this.signedIn.next(false)
  })
  }
}


checkAuth(){
  const user = localStorage.getItem('user')
  if(user){
    this.signedIn.next(true)
  }
}
}

