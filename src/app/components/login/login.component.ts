import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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

  singin(){

    this.UserService.singin(this.user).subscribe((res:any)=>{
      const identity = res.user;
      console.log(res);
      this.identity=identity;
      if(!res.user){
        console.log(res.message);
      }else if(!this.identity._id){
        alert('Error al iniciar sesion');
      }else{
        localStorage.setItem('identity',JSON.stringify(identity));
        this.UserService.singin(this.user,'true').subscribe((result:any)=>{
          console.log(result);
          const token=result.token;
          this.token=token;
          if(this.token.length<=0){
            console.log('Error al generar token');
          }else{
            localStorage.setItem('token',JSON.stringify(token));
            this.user=new User('','','','','',false);
            this.route.navigate(['/dashboard']);
          }
        });
      }
    },error=>{
      alert(error.error.message);
    });
  }

}
