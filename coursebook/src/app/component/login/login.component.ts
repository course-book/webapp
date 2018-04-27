import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../_services/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errMsg='';  
  model: any={};

  constructor(
    private router: Router,
    private userService: UserService) {}

  ngOnInit() {
  }

  login() {
    this.userService.login(this.model).subscribe(
        data => {
          this.userService.setToken(data);
          this.router.navigate(['/home']);
        },
        error => {
          console.log(error.message);
          this.errMsg = error;
        });
  }

  onSubmit(username:string,password:string){
  	if(!password && !username){
  		this.errMsg = "Username and password cannot be empty"
  	}else if(!username){
  		this.errMsg = "Username cannot be empty"
  	}else if(!password){
  		this.errMsg = "Password cannot be empty"
  	} else{
  		this.errMsg = ""
  		this.model.username = username
      this.model.password = password
  		this.login();
  	}
  }



}
