import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  errMsg='';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit(username:String, password:String, confirmpass:String){
  	if(!password && !username && !confirmpass){
  		this.errMsg = "Username and password cannot be empty"
  	}else if(!username){
  		this.errMsg = "Username cannot be empty"
  	}else if(!password){
  		this.errMsg = "Password cannot be empty"
  	} else if(password != confirmpass){
  		this.errMsg = "Confirmed password is not match"
  	}else{
  		this.errMsg = ""
  		this.mee = "username: "+username;
  		this.bule = "password: "+password;
  		this.router.navigate(['/home']);
  	}
  }
}
