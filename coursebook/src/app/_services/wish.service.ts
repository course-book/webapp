import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { User } from '../_models/user';
import { Course } from '../_models/course';
import { Wish } from '../_models/wish';

@Injectable()
export class WishService {
  current: Wish = null;

  constructor(private http: HttpClient,public localStorage: LocalStorage) { }

  create(wish:Wish,token:string){
  	return this.http.put('http://localhost:8080/wish',wish,{headers: {'Authorization': token},responseType: 'text'})
  }

  edit(wishid:string,wish:Wish,token:string){
    return this.http.post('http://localhost:8080/wish/'+wishid,{name:wish.name,details:wish.details},{headers: {'Authorization': token},responseType: 'text'})
  }

  get(){
  	return <Observable<Wish[]>>this.http.get('http://localhost:8080/wish')
  }

  delete(wishid:string,token:string){
  	return this.http.delete('http://localhost:8080/wish/'+wishid,{headers: {'Authorization': token},responseType: 'text'})
  }

  getUnnotify(username: string){
    return <Observable<Wish[]>>this.http.get('http://localhost:8080/wish/user/'+username)
  }

  markNotified(wishid: string, wish:Wish, token:string){
    return this.http.post('http://localhost:8080/wish/notify/'+wishid,{name:wish.name,details:wish.details},{headers: {'Authorization': token},responseType: 'text'})
  }

  search(searchStr: string){
    console.log(encodeURI(searchStr));
    return <Observable<Wish[]>>this.http.get('http://localhost:8080/wish?search='+encodeURI(searchStr))
  }

  setWish(wish: Wish){
    this.current = wish;
  }

  getWish(){
    return this.current;
  }

}
