import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient : HttpClient) { }

  getUsers(){
    return this.httpClient.get('https://jsonplaceholder.typicode.com/users');
  }

  getUser(userId){
    return this.httpClient.get('https://jsonplaceholder.typicode.com/users/' + userId);
  }

  getPosts(){
    return this.httpClient.get('https://jsonplaceholder.typicode.com/posts/');
  }
}
