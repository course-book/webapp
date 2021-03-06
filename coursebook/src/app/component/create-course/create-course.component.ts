import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../_models/user';
import { Wish } from '../../_models/wish';
import { Course } from '../../_models/course';
import { UserService } from '../../_services/user.service';
import { CourseService } from '../../_services/course.service';
import { WishService } from '../../_services/wish.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})

export class CreateCourseComponent implements OnInit {
  course: any={};
  token;
  sources: string[]=[];
  errmsg: string="";

  constructor(
    private router: Router,
    private userService: UserService,
    private courseService: CourseService,
    private wishService: WishService) {
    this.userService.getToken().subscribe((data)=>{
      this.token = data
    }) }

  ngOnInit() {
  }

  updateName(name:string){
  	this.course.name = name;
  	console.log("name: "+this.course.name);
  }

  updateDesc(desc:string){
  	this.course.description = desc;
  	console.log("desc: "+ this.course.description);
  }

  updateShortdesc(shortdesc:string){
  	this.course.shortDescription = shortdesc;
  	console.log("shortdesc: "+ this.course.shortDescription);
  }

  addSource(source:string){
  	if(source.trim()){
	  	this.sources.push(source);
	  	console.log(this.sources);
  	}else{
      if(source !== ""){
        this.errmsg = "Invalid source input.";
      }
    }
  }

  deleteSource(source:string){
    var index = this.sources.indexOf(source);
    if(index > -1){
    	this.sources.splice(index,1);
    }
    console.log(this.sources);
  }

  createCourse(){
    this.courseService.create(this.course,this.token)
      .subscribe(
        data => {
          console.log("data: "+data)
          this.errmsg = data;
          this.router.navigate(['/home']);
        },
        error => {
          console.log("error: "+error);
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
  	if(this.course.name == ""){
  		this.errmsg += "Course name is required. "
  	}
  	if(this.course.desc == ""){
  		this.errmsg += "Course Description is required. "
  	}
  	if(this.course.shortdesc == ""){
  		this.errmsg += "Short Description is required. "
  	}
  	if(this.sources.length==0){
  		this.errmsg += "At least one source is required. "
  	}
  	if(this.errmsg == ""){
      this.course.sources = this.sources;
      this.userService.getUser().subscribe((data)=>{
        this.course.username = data.username
        if(this.wishService.getWish() != null){
          this.course.wish = this.wishService.getWish()._id;
          this.wishService.setWish(null);
        }
        this.createCourse()
      });
  	}
  }

}
