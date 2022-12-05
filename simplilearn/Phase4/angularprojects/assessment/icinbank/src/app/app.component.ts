import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Branch } from './models/common/branch.model';
import { Operation } from './models/common/operation.model';
import { AuthenticationService } from './services/auth/authentication.service';
import { TokenStorageService } from './services/auth/token-storage.service';
import { BranchOperationService } from './services/admin/branch-operation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit
{
  title = 'icinbank';
  /*branches: Branch[]= [];      
  operations:Array<Operation>=[];
  branchLoadErrorMsg = "";
  operationLoadErrorMsg = "";

  constructor(private bos:BranchOperationService,
             private authService: AuthenticationService,
             private tokenStorage: TokenStorageService,
             private router: Router){
             } */

             constructor(){
              }          

  ngOnInit(): void 
  {
  // console.log(" Start AppComponent ngOnInit ");
   // this.loadAllBranches();
   // this.loadAllOperations();
   // this.notifyBranchOperationLoaded();
  //  console.log(" End AppComponent ngOnInit ");
  }

 /* loadAllBranches()
  {
    this.bos.loadBranches().subscribe({
        next: data => {
          this.branches = data;    
          this.branchLoadErrorMsg = "";
          this.bos.emitLoadBranchDataSuccess(this.branches);
        },
        error: err => {
          this.branchLoadErrorMsg = err.error.message;
        }
      });
  }

  loadAllOperations()
  {
     this.bos.loadOperations().subscribe({
      next: data => {
        this.operations = data;      
        this.operationLoadErrorMsg = "";
        this.bos.emitLoadOperationDataSuccess(this.operations);
      },
      error: err => {
        this.operationLoadErrorMsg = err.error.message;
      }
    }
     );
  }

  notifyBranchOperationLoaded()
  {
    this.bos.emitBranchOpertionSetupCompletion();
  }

  */

}
