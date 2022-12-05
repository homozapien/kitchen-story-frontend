import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { BasicMasterProfileDto } from 'src/app/models/customer/basic-master-profile-dto.model';
import { AdminRequestDataService } from 'src/app/services/admin/request-mgmt.service';

@Component({
  selector: 'app-cust-profile-list',
  templateUrl: './cust-profile-list.component.html',
  styleUrls: ['./cust-profile-list.component.css']
})
export class CustProfileListComponent implements OnChanges, OnInit, OnDestroy {

  profiles: BasicMasterProfileDto[] = [];
  isFoundPendingProfiles = false;
  apiError = '';

  @Input() updatedProfile!: BasicMasterProfileDto;
  @Output() selectedPendingProfileEvt = new EventEmitter<BasicMasterProfileDto>();

  constructor(private reqservice: AdminRequestDataService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['updatedProfile']) {
      if (this.updatedProfile) {
        const index = this.profiles.findIndex(x => x.requestId === this.updatedProfile.requestId);
        if (index > -1) {
          this.profiles.splice(index, 1);
          if (this.profiles.length < 1) {
            this.apiError = ' No pending customer profile requests in the queue';
            this.isFoundPendingProfiles = false;
          }
        }
      }
    }
  }


  ngOnInit(): void {
    this.reqservice.getPendingCustomerProfile().subscribe({
      next: data => {
        this.profiles = data;
        if (this.profiles) 
        {
          this.isFoundPendingProfiles = true;
        }
        else {
          this.apiError = ' No pending customer profile requests in the queue';
          this.isFoundPendingProfiles = false;
        }
      },
      error: err => {
        this.isFoundPendingProfiles = false;
        console.log(err);
        this.apiError = "No Data Found!";
        /*if(err)
          {
            this.apiError = JSON.parse(err.error).message;
          }
          else{
            this.apiError = "No Data Found!";
          } */
      },

      complete: () => { console.log(' API for getting pending profile was completed')}
    }
    );
  }

  onSelectForUpdate(profile: BasicMasterProfileDto) {
    this.selectedPendingProfileEvt.emit(profile);
  }

  ngOnDestroy(): void {

  }

}
