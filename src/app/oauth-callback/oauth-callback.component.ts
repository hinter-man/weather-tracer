import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'wetr-oauth-callback',
  templateUrl: './oauth-callback.component.html',
  styleUrls: ['./oauth-callback.component.css']
})
export class OAuthCallbackComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
    // artificial delay
    setTimeout(() => this.auth.redirectToPrevUrl(), 1000);
  }

}
