import { Component, OnInit } from '@angular/core';
import { WishService } from '../../_services/wish.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchVal="";

  constructor(
    private wishService: WishService,
    private userService: UserService) {
        this.wishService.get(this.userService.getToken())
      .subscribe(
        data => {
          this.searchVal = data;
        },
        error => {
          console.log(error.message);
          this.searchVal = error.error;
        });
    }

  ngOnInit() {

  }

  submitSearch(search:string){
  	this.searchVal = search;
  }

  getWish(){

  }

}
