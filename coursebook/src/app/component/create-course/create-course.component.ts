import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { Course } from '../../_models/course';
import { UserService } from '../../_services/user.service';

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
    private userService: UserService) {
    console.log("author is: "+this.userService.getUser().username) }

  ngOnInit() {
  }

  updateName(name:string){
  	this.course.name = name;
  	console.log("name: "+this.course.name);
  }

  updateDesc(desc:string){
  	this.course.desc = desc;
  	console.log("desc: "+ this.course.desc);
  }

  updateShortdesc(shortdesc:string){
  	this.course.shortdesc = shortdesc;
  	console.log("shortdesc: "+ this.course.shortdesc);
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
  	this.errmsg = "";
  	if(!this.course.name || this.course.name == ""){
  		this.errmsg += "Course name is required. "
  	}
  	if(!this.course.desc || this.course.desc == ""){
  		this.errmsg += "Course Description is required. "
  	}
  	if(!this.course.shortdesc || this.course.shortdesc == ""){
  		this.errmsg += "Short Description is required. "
  	}
  	if(this.sources.length==0){
  		this.errmsg += "At least one source is required. "
  	}
  	if(this.errmsg == ""){
  		this.course.sources = this.sources;
  		this.course.author = this.userService.getUser();
  		console.log(this.course.author);
  	}
  }

}
