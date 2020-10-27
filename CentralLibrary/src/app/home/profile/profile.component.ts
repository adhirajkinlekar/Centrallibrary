import { Component, OnInit,OnChanges, SimpleChanges } from '@angular/core';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  signedIn:boolean;
  User:any;
  UserProfile=[];
  isDataFetched:boolean;
  IsReturned:boolean;
  constructor(private homeService:HomeService) {

  }

 
  ngOnInit(): void {
    this.runOnLoad()
  }


runOnLoad(){
  let User = localStorage.getItem('user');
  this.User = JSON.parse(User);
    if(this.User){
      this.signedIn = true;
      this.homeService.fetchUserProfile(this.User).subscribe((response)=>{
        this.UserProfile = response;
        this.isDataFetched = true;
        })
    } 
}

returnBook(id:number,i:number){
  return this.homeService.postReturnRequest(id,this.User.id).subscribe((response)=>{
  this.UserProfile.splice(i,1);
this.IsReturned = true;
setTimeout(()=>{
  this.IsReturned = false;
},1000)
  })
   }

}
