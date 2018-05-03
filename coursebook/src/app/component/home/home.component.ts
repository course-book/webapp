import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WishService } from '../../_services/wish.service';
import { UserService } from '../../_services/user.service';
import { CourseService } from '../../_services/course.service';
import { Course } from '../../_models/course';
import { Wish } from '../../_models/wish';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  wishes: Object[] = [];
  courses: Object[] = [];
  username: string = "";
  errmsg: string = "";

  constructor(
    private router: Router,
    private wishService: WishService,
    private userService: UserService,
    private courseService: CourseService) {

      this.username = this.userService.getUser().username;

  }

  ngOnInit(){
    console.log("this executes first");
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
        console.log(data);
      },
      error => {
        console.log(error.message);
        this.errmsg = error.error;
      });
  }

  deleteWish(wishid:string,wish:Wish){
    console.log(wishid)
    this.wishService.delete(wishid,this.userService.getToken())
      .subscribe(
        data => {
          let index = this.wishes.indexOf(wish);
          if(index > -1){
            this.wishes.splice(index,1);
          }
        },
        error => {
          console.log(error.message);
          this.errmsg = error.error;
        });
  }

  deleteCourse(courseid:string,course:Course){
    console.log(courseid)
    this.courseService.delete(courseid,this.userService.getToken())
      .subscribe(
        data => {
          let index = this.courses.indexOf(course);
          if(index > -1){
            this.courses.splice(index,1);
          }
          setTimeout(()=>{ this.ngOnInit()}, 1000);
        },
        error => {
          console.log(error.message);
          this.errmsg = error.error;
        });
  }

  editWish(wish:Wish){
    this.wishService.setWish(wish);
    this.router.navigate(['/edit-wish']);
  }

  editCourse(course:Course){
    this.courseService.setCourse(course);
    this.router.navigate(['/edit-course']);
  }

  completeWish(wishid:string,wish:Wish){
    this.wishService.setWish(wish);
    this.router.navigate(['/create-course']);
  }

  viewCourse(courseid:string,course:Object){

  }

  submitSearch(search:string){
    console.log("Search String is: "+search);
    if(search){
      this.courseService.search(search)
      .subscribe(
        data => {
          this.courses = data;
          console.log(data);
        },
        error => {
          console.log(error.message);
          this.errmsg = error.error;
        });
    }
  }


}
