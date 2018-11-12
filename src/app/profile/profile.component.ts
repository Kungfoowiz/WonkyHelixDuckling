import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';


import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile : any;

  constructor(public authService : AuthService, private router : Router) { }

  ngOnInit() {

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }

    if (this.authService.userProfile) {
      this.profile = this.authService.userProfile;
    } else {
      this.authService.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
  }

}
