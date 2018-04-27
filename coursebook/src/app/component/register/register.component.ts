import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../_services/user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  errMsg='';
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
          console.log(error.message);
          this.errMsg = error;
        });
  }

  onSubmit(username:string, password:string, confirmpass:string){
  	if(!password && !username && !confirmpass){
  		this.errMsg = "Username and password cannot be empty"
  	}else if(!username){
  		this.errMsg = "Username cannot be empty"
  	}else if(!password){
  		this.errMsg = "Password cannot be empty"
  	} else if(password != confirmpass){
  		this.errMsg = "Confirmed password does not match"
  	}else{
  		this.errMsg = ""
      this.model.username = username
      this.model.password = password
      this.register()
  	}
  }

}
