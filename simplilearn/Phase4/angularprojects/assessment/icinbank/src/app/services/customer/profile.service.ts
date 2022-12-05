import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicMasterProfileDto } from 'src/app/models/customer/basic-master-profile-dto.model';
import { environment } from 'src/environments/environment';

const CREATE_PROFILE_API   = environment.apiUrlContext + '/open/createprofile';
const UPDATE_PROFILE_API   = environment.apiUrlContext + '/admin/updatecustprofilereq';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) 
  {

  }

  createProfile(profile: BasicMasterProfileDto):Observable<string>
  {
     return this.http.post(CREATE_PROFILE_API,profile,{responseType:'text'});

  }

  updateCustProfile(profile: BasicMasterProfileDto):Observable<string>
  {
     return this.http.put(UPDATE_PROFILE_API,profile, {responseType:'text'});

  }




}
