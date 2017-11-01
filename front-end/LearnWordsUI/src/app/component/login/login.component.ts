import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = null;
  password: string = null;

  constructor(public authService: AuthService, public router: Router) {
  }

  ngOnInit() {
  }

  login() {
    // console.log('username: ' + this.username + ' password: ' + this.password);
    this.authService.login(this.username, this.password).subscribe(res => {
        if (this.authService.isLoggedIn) {
          // Get the redirect URL from our auth service
          // If no redirect has been set, use the default
          let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/home';

          // Redirect the user
          this.router.navigate([redirect]);
        }

    },
    err => {
      console.log(err);
    });
  }

  logout() {
    this.authService.logout();
  }

}
