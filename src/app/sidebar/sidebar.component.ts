import { Component, OnInit } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  currentUrl : string;

  authService : AuthService;

  constructor(private router : Router, public authSvc : AuthService) { 

    this.authService = authSvc;

    router.events.subscribe((navigationEnd : NavigationEnd) => this.currentUrl = router.url)

  }

  ngOnInit() {
  }

}
