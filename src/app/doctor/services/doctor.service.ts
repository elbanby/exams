import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http:HttpClient) { }
  createSubject(model:any){
    return this.http.post(environment.baseApi + 'subject',model)
  }
  updateQustions(model:any ,id:any){
    return this.http.put(environment.baseApi + 'subject/'+id ,model)
  }
  getAllSubjects(){
    return this.http.get<Data[]>(environment.baseApi + 'subject')
  }
  getSubject(id:any){
    return this.http.get<Data[]>(environment.baseApi + 'subject/' + id)
  }
  deleteSubject(id:any){
    return this.http.delete(environment.baseApi + 'subject/' +id)
  }

}
