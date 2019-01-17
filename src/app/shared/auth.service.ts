import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js'
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _idToken: string;
  private _accessToken: string;
  private _expiresAt: number;

  auth0 = new auth0.WebAuth({
    clientID: 'RbjCq7NhS8GgJZLLnirXAv6AV7tj4KPJ',
    domain: 'hima.eu.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200/oauthcallback',
    scope: 'openid'
  });

  constructor(public router: Router, public route: ActivatedRoute) {
    this._idToken = '';
    this._accessToken = '';
    this._expiresAt = 0;
  }

  get accessToken(): string {
    return this._accessToken;
  }

  get idToken(): string {
    return this._idToken;
  }

  public login(): void {
    localStorage.setItem('loginRedirectUri', window.location.pathname);
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.localLogin(authResult);
      } else if (err) {
        console.log(err);
      }
    });
  }

  public redirectToPrevUrl(): void {
    // redirect to url before login
    this.router.navigate([localStorage.getItem('loginRedirectUri')]);
  }

  private localLogin(authResult): void {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    // Set the time that the access token will expire at
    const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this._accessToken = authResult.accessToken;
    this._idToken = authResult.idToken;
    this._expiresAt = expiresAt;
  }

  public renewTokens(): void {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
      } else if (err) {
        alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
        this.logout();
      }
    });
  }

  public logout(): void {
    // Remove tokens and expiry time
    this._accessToken = '';
    this._idToken = '';
    this._expiresAt = 0;
    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');
    this.redirectToPrevUrl();
    localStorage.removeItem('loginRedirectUri');
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    
    return new Date().getTime() < this._expiresAt;
  }

}
