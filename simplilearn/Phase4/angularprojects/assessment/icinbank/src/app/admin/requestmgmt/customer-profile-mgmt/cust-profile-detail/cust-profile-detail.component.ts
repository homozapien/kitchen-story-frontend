import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Operation } from 'src/app/models/common/operation.model';
import { BasicMasterProfileDto } from 'src/app/models/customer/basic-master-profile-dto.model';
import { ProfileService } from 'src/app/services/customer/profile.service';
import { BranchOperationService } from 'src/app/services/admin/branch-operation.service';

@Component({
  selector: 'app-cust-profile-detail',
  templateUrl: './cust-profile-detail.component.html',
  styleUrls: ['./cust-profile-detail.component.css']
})
export class CustProfileDetailComponent implements OnInit, OnChanges {

  @Input('pendingProfile') profile!: BasicMasterProfileDto;
  @Output() updatedProfileEvt = new EventEmitter<BasicMasterProfileDto>();

  operations: Array<Operation> = [];
  selectedOperations: Operation[] = [];
  errorMsg = '';
  apiResponse = '';
  

  constructor(private bos: BranchOperationService,
    private ps: ProfileService) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['profile']) {
      this.operations = this.bos.getAllBankOperations();
      this.errorMsg = '';
      this.apiResponse = '';
    }
  }

  ngOnInit(): void {

  }

  getSelectedOperation(selected: any) {
    const index = this.selectedOperations.findIndex(x => x.opCode === selected.target.value);
    this.errorMsg = '';
    if (selected.target.checked && index === -1) {
      let checkedOperation = this.operations.find(x => x.opCode === selected.target.value);
      if (checkedOperation) {
        this.selectedOperations.push(checkedOperation);
      }
    }
    else if (!selected.target.checked && index > -1) {
      this.selectedOperations.splice(index, 1);
    }

  }

  updateProfile() {

    if (!this.profile.requestStatus) {
      this.errorMsg = "Error detected, processing can't continue! Please make a decision to either approve or reject!!"
    }

    if (this.selectedOperations.length < 1 && this.profile.requestStatus === 'APPROVE') {
      this.errorMsg = "Error detected, processing can't continue! Please select at least one approved operations to continue!"
    }

    this.profile.bankOperations = this.selectedOperations;

    this.ps.updateCustProfile(this.profile).subscribe({
      next: data => {
        this.apiResponse = data;
        this.errorMsg = '';
        this.processAPIResponse(this.apiResponse);
      },
      error: err => {
        this.errorMsg = JSON.parse(err.error).message;
        this.apiResponse = '';
      }
    }
    );
  }

  processAPIResponse(value: string) {
    if (value.includes('SUCCESSFUL')) {
      this.apiResponse = 'Update of profile request id' + this.profile.requestId + ' was successfully completed; the queue will be updated';
      this.errorMsg = '';
      this.updatedProfileEvt.emit(this.profile); //notify the List via the immediate parent
    } else {
      this.errorMsg = 'Update of profile request id' + this.profile.requestId + ' failed; contact the backend admin if problem persists!';
      this.apiResponse = '';
    }
  }


}
