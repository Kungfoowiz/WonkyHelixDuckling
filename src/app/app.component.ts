import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'WonkyHelixDuckling';

  public x : boolean = false;

  public y : boolean = true;

  constructor(public authService: AuthService) {
    authService.handleAuthentication();
  }

  ngOnInit() {

  }
}