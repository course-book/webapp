import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../_services/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errmsg='';  
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
          console.log(error);
          if(error.status === 500 || error.status === 0){
            this.errmsg = "Webserver is down!"
          }else{
            this.errmsg = error.error
          }
        });
  }

  onSubmit(username:string,password:string){
  	if(!password && !username){
  		this.errmsg = "Username and password cannot be empty"
  	}else if(!username){
  		this.errmsg = "Username cannot be empty"
  	}else if(!password){
  		this.errmsg = "Password cannot be empty"
  	} else{
  		this.errmsg = ""
  		this.model.username = username
      this.model.password = password
  		this.login();
  	}
  }



}
