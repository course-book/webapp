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
  unnotified: Object[] = [];
  users: Object[] = [];
  username: string = "";
  errmsg: string = "";
  notification: string = "";
  token;

  constructor(
    private router: Router,
    private wishService: WishService,
    private userService: UserService,
    private courseService: CourseService) {

      this.userService.getUser().subscribe((data)=> {
        this.username = data.username
        console.log("username: "+this.username)
        this.wishService.getUnnotify(this.username)
        .subscribe(
          data => {
            this.unnotified = data;
            console.log(data);
          },
          error => {
            console.log(error);
                    if(error.status === 500 || error.status === 0){
              this.errmsg = "Webserver is down!"
            }else{
              this.errmsg = error.error
            }
          }
        )
      });
      this.userService.getToken().subscribe((data)=>{
        this.token = data
      });

  }

  ngOnInit(){
    console.log("this executes first");
    this.wishService.get()
    .subscribe(
      data => {
        this.wishes = data;
      },
      error => {
        console.log(error);
        if(error.status === 500 || error.status === 0){
          this.errmsg = "Webserver is down!"
        }else{
          this.errmsg = error.error
        }
      });

    this.courseService.get()
    .subscribe(
      data => {
        this.courses = data;
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

  deleteWish(wishid:string,wish:Wish){
    console.log(wishid)
    this.wishService.delete(wishid,this.token)
      .subscribe(
        data => {
          let index = this.wishes.indexOf(wish);
          if(index > -1){
            this.wishes.splice(index,1);
          }
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

  deleteCourse(courseid:string,course:Course){
    console.log(courseid)
    this.courseService.delete(courseid,this.token)
      .subscribe(
        data => {
          let index = this.courses.indexOf(course);
          if(index > -1){
            this.courses.splice(index,1);
          }
          setTimeout(()=>{ this.ngOnInit()}, 1000);
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

  viewCourse(courseid:string,course:Course){
    this.courseService.setCourse(course);
    this.router.navigate(['/course-view']);
  }

  markNotified(wishid:string, wish:Wish){
    console.log(wishid);
    this.wishService.markNotified(wishid,wish,this.token)
    .subscribe(
      data => {
        console.log(data);
        let index = this.unnotified.indexOf(wish);
        if(index > -1){
          this.unnotified.splice(index,1);
        }
        setTimeout(()=>{ this.ngOnInit()}, 1000);
      },
      error => {
        console.log(error);
        if(error.status === 500 || error.status === 0){
          this.errmsg = "Webserver is down!"
        }else{
          this.errmsg = error.error
        }
      }
    );
  }

  courseSearch(search:string){
    console.log("Search String is: "+search);
    if(search){
      this.courseService.search(search)
      .subscribe(
        data => {
          this.courses = data;
          console.log(data);
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
  }

  wishSearch(search:string){
    console.log("Search String is: "+search);
    if(search){
      this.wishService.search(search)
      .subscribe(
        data => {
          this.wishes = data;
          console.log(data);
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
  }

  userSearch(search:string){
    console.log("Search String is: "+search);
    if(search){
      this.userService.search(search)
      .subscribe(
        data => {
          this.users = data;
          console.log(data);
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
  }


}
