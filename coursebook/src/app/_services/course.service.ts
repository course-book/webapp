import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';
import { Course } from '../_models/course';

@Injectable()
export class CourseService {
  constructor(private http: HttpClient) { }

  create(course:Course,token:string){
  	return this.http.put('http://localhost:8080/course',course,{headers: {'Authorization': token},responseType: 'text'})
  }

  get(){
  	return this.http.get('http://localhost:8080/course')
  }
  
}