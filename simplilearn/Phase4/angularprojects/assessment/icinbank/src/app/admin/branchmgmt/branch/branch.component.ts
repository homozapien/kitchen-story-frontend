import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Branch } from 'src/app/models/common/branch.model';
import { BranchOperationService } from 'src/app/services/admin/branch-operation.service';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit, OnChanges {

  branchFormGrp      = new FormGroup({
    branchid:         new FormControl('', Validators.required),
    name:             new FormControl('', Validators.required),
    address:          new FormControl('', Validators.required),
    setupAccount:     new FormControl()
  });

  @Input('branchForUpdate') branch!:Branch;
         myNewBranch!:Branch;
    
  
  bttnLabel:string = 'Create Branch';
  jumbotronTitle   = 'New Branch Setup View';
  isShowSetupAcctCntrl = false;
  branchCreatedMsg = '';
  isForUpdate = false;
  errorMessage = '';

  constructor(private bos:BranchOperationService) {
    
    console.log('......constructor isForUpdate ....' + this.isForUpdate );

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['branch']) {
      
      if(this.branch)
      {
        console.log(this.isShowSetupAcctCntrl );
         this.branchFormGrp.get("branchid")?.setValue(this.branch.branch_id);
         this.branchFormGrp.get("name")?.setValue(this.branch.name);
         this.branchFormGrp.get("address")?.setValue(this.branch.address);
         this.bttnLabel = 'Update Branch';
         this.isShowSetupAcctCntrl = true;
         this.isForUpdate = true;
         this.jumbotronTitle   = 'Branch Details Update View';
         console.log('......ngOnChanges isForUpdate ....' + this.isForUpdate );
     }
    }
  }


  ngOnInit(): void 
  {
    console.log('......ngOnInit isForUpdate ....' + this.isForUpdate );
  }

  createorUpdateBranch():void
  {
    let branchFormVal = this.branchFormGrp.value;
    let branchId =this.branchFormGrp.get('branchid')?.value;
    let branchname =this.branchFormGrp.get('name')?.value;
    let branchaddress =this.branchFormGrp.get('address')?.value;

    const newBranch = { branch_id:branchId, name:branchname, address:branchaddress} ;

    console.log('......Button Label is ....' + this.bttnLabel );
    if (this.bttnLabel === "Create Branch")
    {
      this.bos.createBranch(newBranch as Branch).subscribe({
        next: data => {
          this.myNewBranch = data; 
          if(this.myNewBranch)
          {
            this.branchCreatedMsg  = 'The new branch ' + this.myNewBranch.branch_id + ' was successfully created in the backend';
            this.errorMessage = '';
            console.log(' new branc was created withut issue ' + JSON.stringify(this.myNewBranch));
            this.branchFormGrp.reset();
            
          }
          else
          {
            this.branchCreatedMsg = '';
          }   
        },
        error: err => {
          this.errorMessage = err.error.message;
          console.log(' this.errorMessage  ' + this.errorMessage )
        },
        complete: (() => { console.log('API call was completed')})
      }
      );
       
    }
    else 
    {

    }

  }

}
