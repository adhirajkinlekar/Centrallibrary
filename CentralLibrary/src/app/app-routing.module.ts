import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path:'',
  loadChildren: ()=> import('./auth/auth.module').then(a=>a.AuthModule),
},
{
  path:'library',
  loadChildren:()=> import('./home/home.module').then(h=>h.HomeModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
