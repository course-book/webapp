import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }
  token: string;
  user: User;

  create(user:User){
  	this.user = user
    return this.http.put('http://localhost:8080/register',user,{ responseType: 'text' })
  }

  login(user:User){
  	this.user = user
    return this.http.post('http://localhost:8080/login',user,{ responseType: 'text' })
  }

  setToken(token:string){
    this.token = token
    console.log(this.token)
    return "OK"
  }

  getToken(){
    return this.token;
  }

  getUser(){
  	return this.user;
  }
  
}