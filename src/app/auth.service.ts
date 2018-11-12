import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';

(window as any).global = window;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userProfile : any;

  private auth0 = new auth0.WebAuth({
    
    // Localhost.
    // clientID: 'NX1WZ7bMdoXPo9P78wFmq5mdiDwVCcle',
    // domain: 'kungfoowiz.auth0.com',
    // responseType: 'token id_token',
    // redirectUri: 'http://localhost:4200/',
    // scope: 'openid profile'

    // DeansOnToast.com
    // clientID: 'VoliaWyGB1oqMtbjROVew6xGa3GuYJeX',
    // domain: 'kungfoowiz.auth0.com',
    // responseType: 'token id_token',
    // redirectUri: 'http://deansontoast.com:80/',
    // scope: 'openid profile'

    // https://wonky-helix-duckling.glitch.me/
    clientID: 'sDsw3pdmE4R41joWDpzB9HFM2zhjAkkq',
    domain: 'kungfoowiz.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'https://wonky-helix-duckling.glitch.me/',
    scope: 'openid profile'
    
  });

  constructor(public router : Router) { 

  }

  public login() : void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    this.auth0.clearSession();

    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }


  public getProfile(cb): void {
    
    const accessToken = localStorage.getItem('access_token');
    
    if (!accessToken) {
      throw new Error('Access Token must exist to fetch profile');
    }
  
    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      
      cb(err, profile);
    });

  }

}
