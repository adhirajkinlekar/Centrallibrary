import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth/auth.service'
import { BehaviorSubject} from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  signedIn : BehaviorSubject<boolean>;

  constructor(private authService:AuthService,private http:HttpClient){
    this.signedIn = this.authService.signedIn
  }

  ngOnInit(){
    this.authService.checkAuth();
}

}
