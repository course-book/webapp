import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WishService } from '../../_services/wish.service';
import { UserService } from '../../_services/user.service';
import { Wish } from '../../_models/wish';

@Component({
  selector: 'app-edit-wish',
  templateUrl: './edit-wish.component.html',
  styleUrls: ['./edit-wish.component.css']
})
export class EditWishComponent implements OnInit {
  errmsg: string;
  wish: Wish;

  constructor(
    private router: Router,
    private wishService: WishService,
    private userService: UserService) { 
    	this.wish = this.wishService.getWish();
      this.wishService.setWish(null);
    	console.log(this.wish);
    }

  ngOnInit() {
  }

  updateName(name: string){
  	this.wish.name = name;
  }

  updateDetails(details: string){
  	this.wish.details = details;
  }

  onSubmit() {
  	console.log(this.wish); 
    var token;
    this.userService.getToken().subscribe((data)=>{
      token = data;
      this.wishService.edit(this.wish["_id"],this.wish,token)
      .subscribe(
        data => {
          console.log(data);
          setTimeout(()=>{ this.router.navigate(['/home'])}, 1000);
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
    })


  }


}
