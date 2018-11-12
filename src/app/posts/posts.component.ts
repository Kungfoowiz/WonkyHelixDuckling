import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts$ : Object;

  constructor(private dataService : DataService, private authService : AuthService) { }

  ngOnInit() {

    //this.authService.login();

    this.dataService.getPosts()
      .subscribe(data => this.posts$ = data);
  }

}
