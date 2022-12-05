import { Component, OnInit } from '@angular/core';
import { BasicMasterProfileDto } from 'src/app/models/customer/basic-master-profile-dto.model';
import { AdminRequestDataService } from 'src/app/services/admin/request-mgmt.service';

@Component({
  selector: 'app-customer-profile-mgmt',
  templateUrl: './customer-profile-mgmt.component.html',
  styleUrls: ['./customer-profile-mgmt.component.css']
})
export class CustomerProfileMgmtComponent implements OnInit {

  constructor() { }
  pendingProfile!: BasicMasterProfileDto;
  updatedProfile!: BasicMasterProfileDto;
  ngOnInit(): void {
 
  }

  onSelectForUpdate(selectedProfile:BasicMasterProfileDto)
  {
     this.pendingProfile = selectedProfile;
  }

  onAfterProfileUpdate(updatedProfile:BasicMasterProfileDto)
  {
     this.updatedProfile = updatedProfile;
  }

}
