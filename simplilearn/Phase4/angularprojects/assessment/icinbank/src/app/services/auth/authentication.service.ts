import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpResponse,HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginProfile } from 'src/app/models/auth/login-profile.model';
import { environment } from 'src/environments/environment';

const LOGIN_API_CONTEXT = environment.apiUrlContext + '/auth/signin';

const httpOptions = 
{
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) 
  {  
  }
  
  login(login: LoginProfile): Observable<any> 
  {
    return this.http.post(LOGIN_API_CONTEXT, login, httpOptions);
  }

  logout() //: Observable<any> 
  {
    console.log('=========Remeber to logout API ======');
  }

}
