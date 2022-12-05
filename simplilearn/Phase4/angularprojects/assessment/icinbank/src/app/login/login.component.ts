import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginProfile } from '../models/auth/login-profile.model';
import { UserProfile } from '../models/auth/user-profile.model';
import { AuthenticationService } from '../services/auth/authentication.service';
import { TokenStorageService } from '../services/auth/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    userId: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  loggedInUserProfile!: UserProfile;
  isLoggedIn = false;
  errorMessage = '';

  constructor(private authService: AuthenticationService, 
                      private tokenStorage: TokenStorageService,
                      private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  get userId() { return this.loginForm.get('userId') as FormControl; }
  get password() { return this.loginForm.get('password') as FormControl; }


  onSubmit(): void {

    let userid = this.loginForm.get('userId')?.value;
    let password = this.loginForm.get('password')?.value;

    let loginProfile = { userId: userid, password: password };

    this.authService.login(loginProfile as LoginProfile).subscribe({
      next: data => {
        this.loggedInUserProfile = data;
        if (this.loggedInUserProfile) {
          this.tokenStorage.saveToken(data.jwtToken);
          this.tokenStorage.saveUser(data);
          this.isLoggedIn = true;
          //this.reloadPage();
          this.errorMessage = "";
          this.tokenStorage.notifyLoginStatusChange();
          
          //TO-DO: Route to authenticated welcome page, user can change password, display profile etc
         // this.router.navigateByUrl("/logout"); 

        }
        else {
          this.isLoggedIn = false;
          this.tokenStorage.notifyLoginStatusChange();
        }

      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoggedIn = false;
      }

    });
  }

  reloadPage(): void {
    window.location.reload();
  }

}
