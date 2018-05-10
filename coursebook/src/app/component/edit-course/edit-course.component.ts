import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../../_services/course.service';
import { UserService } from '../../_services/user.service';
import { Course } from '../../_models/course';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  errmsg: string;
  course: Course;
  sources: string[]=[];

  constructor(
    private router: Router,
    private courseService: CourseService,
    private userService: UserService) {
    this.course = this.courseService.getCourse();
    this.sources = this.course.sources;
    console.log(this.course);
  }

  ngOnInit() {
  }

  updateName(name: string){
    this.course.name = name;
  }

  updateDesc(desc:string){
  	this.course.description = desc;
  }

  updateShortdesc(shortdesc:string){
  	this.course.shortDescription = shortdesc;
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

  onSubmit(){
    console.log(this.course); 
  	this.courseService.edit(this.course["_id"],this.course,this.userService.getToken())
      .subscribe(
        data => {
          console.log(data);
          setTimeout(()=>{ this.router.navigate(['/home'])}, 1000);
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
