import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatService } from '../../_services/stat.service';
import { UserService } from '../../_services/user.service';
import { Stat } from '../../_models/stat';
import { User } from '../../_models/user';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})

export class StatComponent implements OnInit {
  user: User=new User;
  stat: Stat=new Stat;
  errmsg: string="";
  token;

  constructor(
    private router: Router,
    private statService: StatService,
    private userService: UserService) 
    {
    	this.userService.getUser().subscribe((data)=>{
    		this.user = data
    		this.userService.getToken().subscribe((data)=>{
	    		this.token = data
				this.getStat()
	    	})
    	})

    }

  getStat(){
  	this.statService.getCourseCreation(this.user["username"],this.token)
	.subscribe(
	data => {
		this.stat.courseCreation = <Number>data['count']
		console.log(this.stat)
	},
	error => {
		console.log(error);
		if(error.status === 500 || error.status === 0){
			this.errmsg = "Webserver is down!"
		}else{
			this.errmsg = error.error
		}
	}); 

  	this.statService.getCourseDelete(this.user["username"],this.token)
	.subscribe(
	data => {
		this.stat.courseDelete = <Number>data['count']
		console.log(this.stat)
	},
	error => {
		console.log(error);
		if(error.status === 500 || error.status === 0){
			this.errmsg = "Webserver is down!"
		}else{
			this.errmsg = error.error
		}
	}); 

	this.statService.getWishCreation(this.user["username"],this.token)
	.subscribe(
	data => {
		this.stat.wishCreation = <Number>data['count']
		console.log(this.stat)
	},
	error => {
		console.log(error);
		if(error.status === 500 || error.status === 0){
			this.errmsg = "Webserver is down!"
		}else{
			this.errmsg = error.error
		}
	}); 

	this.statService.getWishDelete(this.user["username"],this.token)
		.subscribe(
		data => {
			this.stat.wishDelete = <Number>data['count']
			console.log(this.stat)
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
