import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Wish } from '../../_models/wish';
import { UserService } from '../../_services/user.service';
import { WishService } from '../../_services/wish.service';

@Component({
  selector: 'app-create-wish',
  templateUrl: './create-wish.component.html',
  styleUrls: ['./create-wish.component.css']
})
export class CreateWishComponent implements OnInit {
  wish: any={};
  token;
  errmsg: string="";

  constructor(
    private router: Router,
    private userService: UserService,
    private wishService: WishService) { 
    this.userService.getToken().subscribe((data)=>{
      this.token = data
    })}

  ngOnInit() {
  }


  updateName(name:string){
  	this.wish.name = name;
  	console.log("name: "+this.wish.name);
  }

  updateDetails(details:string){
  	this.wish.details = details;
  	console.log("details: "+ this.wish.details);
  }

  createWish(){
    this.wishService.create(this.wish,this.token)
      .subscribe(
        data => {
          this.errmsg = "";
          this.router.navigate(['/home']);
        },
        error => {
          console.log(error);
          if(error.status === 503){
            this.router.navigate(['/home']);
          }else if(error.status === 500 || error.status === 0){
            this.errmsg = "Webserver is down!"
          }else{
            this.errmsg = error.error
          }
        });
  }

  onSubmit(){
  	this.errmsg = "";
  	if(this.wish.name == ""){
  		this.errmsg += "Wish name is required. "
  	}
  	if(this.wish.details == ""){
  		this.errmsg += "Wish Details is required. "
  	}
  	if(this.errmsg == ""){
      this.userService.getUser().subscribe((data)=>{
        this.wish.wisher = data
        console.log(this.wish.name)
        this.createWish()
      });
  	}
  }

}
