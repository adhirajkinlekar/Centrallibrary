import {Injectable} from '@angular/core';
import { AsyncValidator, FormControl } from '@angular/forms';
import {catchError, map} from 'rxjs/operators'
import { of } from 'rxjs';
import {AuthService} from '../auth.service'

@Injectable({providedIn:'root'})

export class UniqueUserName implements AsyncValidator{

    constructor(private authService:AuthService){ }

    validate = (control:FormControl) => {


        const {value} = control;
    
        return this.authService.validateUserName(value)
        .pipe( 
            map(value=>{
                return null }
            ),
            catchError(err=>{
                if(err.error == "Username unavailable"){
                    return of({nonUniqueUserName:true})
                                      }
                else{
                    
                    return of({noConnection:true})
                    }
                    
                 }  )
        )
  }
 }
