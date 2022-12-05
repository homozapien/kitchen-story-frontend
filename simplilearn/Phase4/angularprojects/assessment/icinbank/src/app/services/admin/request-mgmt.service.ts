import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BasicMasterProfileDto } from 'src/app/models/customer/basic-master-profile-dto.model';
import { environment } from 'src/environments/environment';

const PENDING_PROFILE_API = environment.apiUrlContext + '/admin/pendingprofilereqs';

@Injectable({
  providedIn: 'root'
})
export class AdminRequestDataService {

  constructor(private http: HttpClient) {

  }

  /* To-Do: Fix the error with empty content coming from Backend;
    Refer: https://angular.io/guide/http#reading-the-full-response for solution  */
  getPendingCustomerProfile(): Observable<BasicMasterProfileDto[]> {
    return this.http.get<any[]>(PENDING_PROFILE_API)
      .pipe(
        map((pendingProfiles: any[]) => {
          const data = pendingProfiles.map(pendingProfile => (
            {
              requestId: pendingProfile.requestId,
              userId: pendingProfile.userId,
              branchId: pendingProfile.branchId,
              remarks: '',
              requestStatus: pendingProfile.requestStatus,
              requestDate: pendingProfile.requestDate,
              firstName: pendingProfile.firstName,
              lastName: pendingProfile.lastName,
              email: pendingProfile.email,
              phone: pendingProfile.phone,
              password: '',
              authToken: '',
              bankOperations: []
            }));
          return data;
        })
      )
  }
}
