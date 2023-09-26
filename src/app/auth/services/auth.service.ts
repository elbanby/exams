import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '@angular/router';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new Subject()
  constructor(private http: HttpClient) { }
  creatUser(model: any) {
    return this.http.post(environment.baseApi + 'students', model)
  }
  getUsers(type: string) {
    return this.http.get<Data[]>(environment.baseApi + type)
  }
  getStudent(id: any) {
    return this.http.get<Data[]>(environment.baseApi + 'students/' + id)
  }
  upadteStudent(model: any, id: any) {
    return this.http.put(environment.baseApi + 'students/' + id, model)
  }
  login(model: any) {
    return this.http.put(environment.baseApi + 'login/1', model)
  }
  getRole() {
    return this.http.get<Data[]>(environment.baseApi + 'login/1')
  }
  createcollage(model: any) {
    return this.http.post(environment.baseApi + 'collage', model)
  }
}
