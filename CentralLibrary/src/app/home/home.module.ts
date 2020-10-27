import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http'
import { HomeRoutingModule } from './home-routing.module';
import { LibraryComponent } from './library/library.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [LibraryComponent, ProfileComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule
  ]
})
export class HomeModule { }
