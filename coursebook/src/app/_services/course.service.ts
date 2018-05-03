import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../_models/user';
import { Course } from '../_models/course';

@Injectable()
export class CourseService {
  current: Course;

  constructor(private http: HttpClient) { }

  create(course:Course,token:string){
  	return this.http.put('http://localhost:8080/course',course,{headers: {'Authorization': token},responseType: 'text'})
  }

  edit(courseid:string,course:Course,token:string){
    return this.http.post('http://localhost:8080/course/'+courseid,{name:course.name,sources:course.sources,description:course.description,shortDescription:course.shortDescription},{headers: {'Authorization': token},responseType: 'text'})
  }

  search(searchStr: string){
  console.log(encodeURI(searchStr));
  	return <Observable<Course[]>>this.http.get('http://localhost:8080/course?search='+encodeURI(searchStr))
  }

  get(){
  	return <Observable<Course[]>>this.http.get('http://localhost:8080/course')
  }

  delete(courseid:string,token:string){
  	return this.http.delete('http://localhost:8080/course/'+courseid,{headers: {'Authorization': token},responseType: 'text'})
  }

  setCourse(course: Course){
    this.current = course;
  }

  getCourse(){
    return this.current;
  }
  
}