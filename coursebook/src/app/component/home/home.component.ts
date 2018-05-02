import { Component, OnInit } from '@angular/core';
import { WishService } from '../../_services/wish.service';
import { UserService } from '../../_services/user.service';
import { CourseService } from '../../_services/course.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  wishes: Object= [];
  courses: Object=[];
  username: string="";
  errmsg="";

  constructor(
    private wishService: WishService,
    private userService: UserService,
    private courseService: CourseService) {

      this.username = this.userService.getUser().username;

      this.wishService.get()
      .subscribe(
        data => {
          this.wishes = data;
        },
        error => {
          console.log(error.message);
          this.errmsg = error.error;
        });

      this.courseService.get()
      .subscribe(
        data => {
          this.courses = data;
        },
        error => {
          console.log(error.message);
          this.errmsg = error.error;
        });
  }

  ngOnInit() {

  }
  getWishes(){
    this.wishService.get()
      .subscribe(
        data => {
          this.wishes = data;
        },
        error => {
          console.log(error.message);
          this.errmsg = error.error;
        });
  }

  getCourses(){
    this.courseService.get()
      .subscribe(
        data => {
          this.courses = data;
        },
        error => {
          console.log(error.message);
          this.errmsg = error.error;
        });
  }

  submitSearch(search:string){
  	this.errmsg = search;
  }

  deleteWish(wishid:string){
    console.log(wishid)
    this.wishService.delete(wishid,this.userService.getToken())
      .subscribe(
        data => {
          this.errmsg = data;
          this.getWishes();
        },
        error => {
          console.log(error.message);
          this.errmsg = error.error;
        });
  }


}
