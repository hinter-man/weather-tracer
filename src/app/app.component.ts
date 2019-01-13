import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'wetr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wetr-web';

  constructor(public auth: AuthService) {
    auth.handleAuthentication();
  }

  ngOnInit() {
  }


}
