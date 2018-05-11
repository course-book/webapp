import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../../_services/course.service';
import { UserService } from '../../_services/user.service';
import { Course } from '../../_models/course';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.css']
})
export class CourseViewComponent implements OnInit {
  course: Course=new Course;
  errmsg: string="";
  id: string="";

  constructor(
    private router: Router,
    private courseService: CourseService,
    private userService: UserService) 
    {
    	this.id = this.courseService.getCourse()["_id"]
    	this.courseService.getCourseByID(this.id) 
    	.subscribe(
			data => {
				this.course = data
				this.courseService.setCourse(null)
				console.log(this.course)
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

  ngOnInit() {
  }

}
