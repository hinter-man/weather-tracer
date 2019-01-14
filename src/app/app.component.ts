import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'wetr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Weather-Tracer';
  contentHeader = "";

  constructor(public auth: AuthService,
              private router: Router) {
    auth.handleAuthentication();
  }

  ngOnInit() {
    this.contentHeader = window.location.pathname.substr(1, window.location.pathname.length);
  }

  public setHeader(header: string) : void {
    this.contentHeader = header;
  }


}
