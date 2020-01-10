import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user:User;
  public token;
  public identity;

  constructor(private UserService: UserService, private route:Router) {
    this.token= this.UserService.getToken();
    this.identity=this.UserService.getIdentity();
    this.user=new User('','','','','',false);
  }

  ngOnInit() {
  }

  singup(){
    console.log(this.user);
    this.UserService.singup(this.user).subscribe((res:any)=>{
      if(!res) return console.log('Error. Usuario no se registro');

      if(res.user){
        alert(res.message);
      }else{
        alert(res.message);
      }
    },error=>{
      console.log(error);
    });
  }

}
