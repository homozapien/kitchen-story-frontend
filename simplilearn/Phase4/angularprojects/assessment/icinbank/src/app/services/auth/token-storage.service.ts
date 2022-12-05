import { Injectable } from '@angular/core';
import { UserProfile } from 'src/app/models/auth/user-profile.model';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private loginStatusChange = new Subject<any>(); 
  public subscriberLoginStatusChange =  this.loginStatusChange.asObservable();
  
  constructor() { }

  notifyLoginStatusChange()
  {
    const userProfile = this.getUser();
    this.loginStatusChange.next(userProfile);
  }
  
  signOut(): void 
  {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: UserProfile): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): UserProfile | null {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
}
