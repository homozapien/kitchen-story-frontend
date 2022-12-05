import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branch } from 'src/app/models/common/branch.model';
import { BasicMasterProfileDto } from 'src/app/models/customer/basic-master-profile-dto.model';
import { ProfileService } from 'src/app/services/customer/profile.service';
import { BranchOperationService } from 'src/app/services/admin/branch-operation.service';

@Component({
  selector: 'app-profile-setup',
  templateUrl: './profile-setup.component.html',
  styleUrls: ['./profile-setup.component.css']
})
export class ProfileSetupComponent implements OnInit 
{
  isBranchSetupComplete = false;
  branches: Array<Branch> = [];
  errorMessage:string = '';
  successMessage:string = '';
  userId:string = '';
  emailAddr:string = '';
  

  profileFormGrp = new FormGroup({
    firstname:     new FormControl('', Validators.required),
    lastname:      new FormControl('', Validators.required),
    phonenum:      new FormControl('', Validators.required),
    emailId:       new FormControl('', Validators.required),
    username:      new FormControl('', Validators.required),
    password:      new FormControl(['', Validators.required, Validators.minLength(5)]),
    homebranch:    new FormControl(Validators.required)
});

  constructor( private bos: BranchOperationService,
               private ps : ProfileService,
               private router: Router) { 
              
               }

  ngOnInit(): void 
  {
        this.branches = this.bos.getAllBankBranches();
        if (this.branches && (this.branches.length > 1)) 
        {
          this.isBranchSetupComplete = true;
          this.errorMessage = '';
        }
        else 
        {
          this.isBranchSetupComplete = false;
          this.successMessage = '';
        }
  }

  get firstname() { return this.profileFormGrp.get('firstname') as FormControl; }
  get lastname() { return this.profileFormGrp.get('lastname') as FormControl; }
  get phonenum() { return this.profileFormGrp.get('phonenum') as FormControl; }
  get emailId() { return this.profileFormGrp.get('emailId') as FormControl; }
  get username() { return this.profileFormGrp.get('username') as FormControl; }
  get password() { return this.profileFormGrp.get('password') as FormControl; }
  get homebranch() { return this.profileFormGrp.get('password') as FormControl; }

  onSubmit():void
  {
     if(this.profileFormGrp.invalid)
     {
        this.errorMessage = "Error encountered; sign-up not properly filled yet. Enter valid values on the sign-up form to continue"
        return ;
     }

    let firstname   =  this.profileFormGrp.get('firstname')?.value;  
    let lastname    =  this.profileFormGrp.get('lastname')?.value; 
    let emailId     =  this.profileFormGrp.get('emailId')?.value; 
    let phoneNum    =  this.profileFormGrp.get('phonenum')?.value;
  
    let profile:BasicMasterProfileDto = new BasicMasterProfileDto(firstname,lastname, emailId, phoneNum);
    
    profile.branchId = this.profileFormGrp.get('homebranch')?.value;
    profile.password = this.profileFormGrp.get('password')?.value;
    profile.userId   = this.profileFormGrp.get('username')?.value;

    this.ps.createProfile(profile).subscribe({
      next: data => {
        this.successMessage = data;    
        this.errorMessage   = '';  
        this.userId         = profile.userId;
        this.emailAddr      = profile.email;
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    }
    );
     this.profileFormGrp.reset();
  }


}
