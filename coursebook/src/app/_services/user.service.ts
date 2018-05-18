import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { User } from '../_models/user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  constructor(private http: HttpClient,public localStorage: LocalStorage) { }
  token: string;
  user: User;

  create(user:User){
  	this.localStorage.setItem('user',user).subscribe(()=>{});      
    return this.http.put('http://localhost:8080/register',user,{ responseType: 'text' })
  }

  login(user:User){
    this.localStorage.setItem('user',user).subscribe(()=>{})      
    return this.http.post('http://localhost:8080/login',user,{ responseType: 'text' })
  }

  search(searchStr: string){
    console.log(encodeURI(searchStr));
    return <Observable<User[]>>this.http.get('http://localhost:8080/users?search='+encodeURI(searchStr))
  }

  setToken(token:string){
    this.localStorage.setItem('token',token).subscribe(()=>{});
    return "OK"
  }

  getToken(){
    return this.localStorage.getItem<string>('token')
  }

  getUser(){
  	return this.localStorage.getItem<User>('user')
  }
  
}