import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../_models/user';
import { Course } from '../../_models/course';
import { UserService } from '../../_services/user.service';
import { CourseService } from '../../_services/course.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})

export class CreateCourseComponent implements OnInit {
  course: any={};
  sources: string[]=[];
  errmsg: string="";

  constructor(
    private router: Router,
    private userService: UserService,
    private courseService: CourseService) {
    console.log("author is: "+this.userService.getToken()) }

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
  	if(source){
	  	this.sources.push(source);
	  	console.log(this.sources);
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
    this.courseService.create(this.course,this.userService.getToken())
      .subscribe(
        data => {
          this.errmsg = data;
          this.router.navigate(['/home']);
        },
        error => {
          console.log(error.message);
          this.errmsg = error.error;
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
      this.course.username = this.userService.getUser().username;
      console.log(this.course.coursename)
  		this.createCourse()
  	}
  }

}
