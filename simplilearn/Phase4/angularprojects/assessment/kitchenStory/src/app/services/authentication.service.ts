import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  logonStatus = new BehaviorSubject(0); 
  public subscriber$ =  this.logonStatus.asObservable();

  notifyLogonCompletion(data:number)
  {
    this.logonStatus.next(data);
  }

  login(login: any): Observable<any> {

    if ((login.username    === "admin@kitchenstory.com" && login.password === "123") 
        || (login.username === "customer1@kitchenstory.com" && login.password === "123") 
        || (login.username === "customer2@kitchenstory.com" && login.password === "123"))
    {
      localStorage.setItem("token", "my-super-secret-token-from-server");
      sessionStorage.setItem("user", login.username); 
      return of(new HttpResponse({ status: 200 }));
    } 
    else 
    {
      return of(new HttpResponse({ status: 401 }));
    }
  }

  logout(): void 
  {
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
    //call remote backend to perform signout
  }

  isUserLoggedIn(): boolean {
    if (localStorage.getItem("token") != null && sessionStorage.getItem("user") != null) 
    {
      return true;
    }
    return false;
  }

}
