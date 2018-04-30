import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';
import { Course } from '../_models/course';
import { Wish } from '../_models/wish';

@Injectable()
export class WishService {
  constructor(private http: HttpClient) { }

  create(wish:Wish,token:string){
  	return this.http.put('http://localhost:8080/wish',wish,{headers: {'Authorization': token},responseType: 'text'})
  }

}
