import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errMsg='';
  mee='';
  bule='';

  constructor(private router: Router) {}

  ngOnInit() {
  }

  onSubmit(username:String,password:String){
  	if(!password && !username){
  		this.errMsg = "Username and password cannot be empty"
  	}else if(!username){
  		this.errMsg = "Username cannot be empty"
  	}else if(!password){
  		this.errMsg = "Password cannot be empty"
  	} else{
  		this.errMsg = ""
  		this.mee = "username: "+username;
  		this.bule = "password: "+password;
  		this.router.navigate(['/home']);
  	}
  }

}
