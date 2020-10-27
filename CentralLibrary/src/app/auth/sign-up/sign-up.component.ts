import {Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms'
import { MatchPassword } from '../validators/match-password';
import { UniqueUserName } from '../validators/unique-user-name';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {

  authForm = new FormGroup({
    username : new FormControl('', 
    [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern( /^[a-z0-9]+$/)],
    [this.uniqueUsername.validate]),
    password : new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    passwordConfirmation: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)])},
    { validators:[this.matchPassword.validate]
  });

  loading:boolean;

  constructor(private matchPassword:MatchPassword,private uniqueUsername:UniqueUserName,private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.authForm.invalid){
      return
    }
    this.loading = true;
      this.authService.signUp(this.authForm.value)
      .subscribe({
       next : response =>{
        this.loading = false;
         this.router.navigateByUrl('/library/home')
       },
       error : err =>{
         if(!err.status){
          this.loading = false;
           this.authForm.setErrors({noConnection:true});
         }
         else{
          this.loading = false;
           this.authForm.setErrors({unknownError:true})
         }
       }
      })
  }
}