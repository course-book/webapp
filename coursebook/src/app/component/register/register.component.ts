import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../_services/user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  errmsg='';
  model: any={};

  constructor(private router: Router,
    private userService: UserService) { }

  ngOnInit() {
  }

  register() {
    this.userService.create(this.model)
      .subscribe(
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

  onSubmit(username:string, password:string, confirmpass:string){
  	if(!password && !username && !confirmpass){
  		this.errmsg = "Username and password cannot be empty"
  	}else if(!username){
  		this.errmsg = "Username cannot be empty"
  	}else if(!password){
  		this.errmsg = "Password cannot be empty"
  	} else if(password != confirmpass){
  		this.errmsg = "Confirmed password does not match"
  	}else{
  		this.errmsg = ""
      this.model.username = username
      this.model.password = password
      this.register()
  	}
  }

}
