import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms'
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  authForm = new FormGroup({
    username: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern( /^[a-z0-9]+$/)]),
    password:new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(20)])
  })


  loading:boolean;
  constructor(private authService:AuthService,private router:Router) {
   }

 onSubmit(){
  if(this.authForm.invalid){
    return 
   }
   this.loading = true;
   this.authService.signIn(this.authForm.value).subscribe({
    next: (response) => {
      this.loading = false;
     this.router.navigateByUrl('/library/home')
    },
    error: ({ error }) => {
      this.loading = false;
        this.authForm.setErrors({ credentials: true });
    }
  });
  }

}
