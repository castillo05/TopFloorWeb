import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';

import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';




const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'register', component:RegisterComponent},
  {path:'**', component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes

  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
