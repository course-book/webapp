import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/User';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  user: User;

  create(user:User){
  	this.user = user
  	return this.http.put('http://localhost:8080/register',user)
  }

  login(user:User){
  	this.user = user
  	//return this.http.put('http://localhost:8080/login',user)
  }

  getUser(){
  	return this.user;
  }
  
}