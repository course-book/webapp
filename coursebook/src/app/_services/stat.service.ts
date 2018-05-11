import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { User } from '../_models/user';

@Injectable()
export class StatService {
  constructor(private http: HttpClient,public localStorage: LocalStorage) { }
  token: string;
  user: User;

  getCourseCreation(username: string,token:string){
    return this.http.get('http://localhost:8080/stats/course/create/'+username,{headers: {'Authorization': token}})
  }

  getCourseDelete(username: string,token:string){
    return this.http.get('http://localhost:8080/stats/course/delete/'+username,{headers: {'Authorization': token}})
  }

  getWishCreation(username: string,token:string){
    return this.http.get('http://localhost:8080/stats/wish/create/'+username,{headers: {'Authorization': token}})
  }

  getWishDelete(username: string,token:string){
    return this.http.get('http://localhost:8080/stats/wish/delete/'+username,{headers: {'Authorization': token}})
  }
  
}