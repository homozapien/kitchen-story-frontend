import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  httpRsponseStatus: any;
  msg!: string;

  constructor(private authenticationService: AuthenticationService,
    private router: Router) { }

  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  ngOnInit(): void {
  }

  checkUser(): void {
    let loginInfoObj = this.loginForm.value;
    this.authenticationService.login(loginInfoObj).subscribe(result => this.httpRsponseStatus = result.status,
      err => console.error('Observer got an error: ' + err),
      () => {

        if (this.httpRsponseStatus == 200) {

          if (loginInfoObj.username === "admin@kitchenstory.com" && loginInfoObj.password === "123") 
          {
            sessionStorage.setItem("userRole", "Admin"); 
            this.router.navigate(["food"], { skipLocationChange: true });
          }
          else if ((loginInfoObj.username === "customer1@kitchenstory.com" && loginInfoObj.password === "123")
            || (loginInfoObj.username === "customer2@kitchenstory.com" && loginInfoObj.password === "123")) {
            sessionStorage.setItem("userRole", "Customer"); 
            this.router.navigate(["shopping"], { skipLocationChange: true });
          }
        }
        else {

          this.msg = 'Invalide Login; Service Response code is: ' + this.httpRsponseStatus;
          this.router.navigateByUrl("/");
        }
      });

      this.authenticationService.notifyLogonCompletion(this.httpRsponseStatus);
  }
}
