import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/models/auth/user-profile.model';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { BranchOperationService } from 'src/app/services/admin/branch-operation.service';
import { Operation } from 'src/app/models/common/operation.model';
import { Branch } from 'src/app/models/common/branch.model';
import { lastValueFrom, Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isLoggedIn = false;
  isBranchOperSetupComplete = false;
  role = "";
  userProfile!: UserProfile;
  errorMessage = '';
  branches: Branch[] = [];
  operations: Array<Operation> = [];

  constructor(private authService: AuthenticationService,
    private tokenStorage: TokenStorageService,
    private bos: BranchOperationService,
    private router: Router) {
      console.log('current value of isLoggedIn1 ' + this.isLoggedIn);
      this.isLoggedIn = !this.isLoggedIn;
      console.log('current value of isLoggedIn 2' + this.isLoggedIn);
  }
  ngOnDestroy(): void
   {
    // this.tokenStorage.signOut();
    console.log('......Start destriyign the HeaderComponent ....... ');
     this.signOut();
     console.log('......finish destriyign the HeaderComponent ....... ');
   }

  async ngOnInit() {
    this.performBranchOperationLoading();
    this.checkAuthenticationState();

    window.onbeforeunload = () => this.ngOnDestroy();
  }

  async performBranchOperationLoading() {
    await this.loadAllBranches();
    await this.loadAllOperations();
    this.bos.emitBranchOpertionSetupCompletion();
    this.setBranchOperationCompletionStatus();

  }

  async loadAllBranches() {
    const braches$ = this.bos.loadBranches();
    this.branches = await lastValueFrom(braches$);
    this.bos.emitLoadBranchDataSuccess(this.branches);
  }

  async loadAllOperations() {

     const operations$ = this.bos.loadOperations();
     this.operations = await lastValueFrom(operations$);
     this.bos.emitLoadOperationDataSuccess(this.operations);
  }

  /* ---DO NOT DELETE THIS CODE: took me 3 days to understand the usage of toPromise
  loadAllBranches() {
    this.bos.loadBranches().subscribe({
      next: data => {
        this.branches = data;
      },
      error: err => {
        console.log("Error message while loading existing Branches : " + err.error.message);
      },
      complete: () => console.log('........Observer for branch loading completed......')
    });

    this.bos.loadBranches().toPromise().then(() => {
      this.bos.emitLoadBranchDataSuccess(this.branches);
    }).then(() => {
      this.bos.emitBranchOpertionSetupCompletion();
    }).then(() => {
      this.setBranchOperationCompletionStatus();
    });

  }
  
  
  loadAllOperations() {
    this.bos.loadOperations().subscribe({
      next: data => {
        this.operations = data;
      },
      error: err => {
      },
      complete: () => console.log('........Observer for operation loading completed......')
    }
    );
    this.bos.loadOperations().toPromise().then(() => {
      this.bos.emitLoadOperationDataSuccess(this.operations);
    }).then(() => {
      this.bos.emitBranchOpertionSetupCompletion();
    }).then(() => {
      this.setBranchOperationCompletionStatus();
    });

  } */

  setBranchOperationCompletionStatus() {
    this.bos.branchOpsSetupCompSub$.subscribe({
      next: data => {
        this.isBranchOperSetupComplete = data;
      },
      error: (err: Error) => console.error('Observer got an error: ' + err),
      complete: () => console.log('........Observer got a complete setBranchOperationCompletionStatus notification......')
    });
  }

  checkAuthenticationState() 
  {
    this.tokenStorage.subscriberLoginStatusChange.subscribe({
      next: data => {
        this.userProfile = data;
      if (this.userProfile && (this.userProfile?.jwtToken === this.tokenStorage.getToken())) {
          this.isLoggedIn = true;
          this.role = this.userProfile.role;
        }
        else {
          this.isLoggedIn = false;
          this.role = "";
        }
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoggedIn = false;
        this.role = "";
      },
      complete: () => console.log('........Observer got a complete checkAuthenticationState notification......')  

    });

    /*this.tokenStorage.subscriberLoginStatusChange
                     .toPromise()
                     .then(() => {
                      if (this.userProfile && (this.userProfile?.jwtToken === this.tokenStorage.getToken())) {
                        this.isLoggedIn = true;
                        this.role = this.userProfile.role;
                      }
                      else {
                        this.isLoggedIn = false;
                        this.role = "";
                      }
                     })
                     ; */
  }

  signOut() {

    this.isLoggedIn = false;
    //this.userProfile = undefined;
    this.role = "";
    this.authService.logout();
    this.tokenStorage.signOut();
    this.router.navigateByUrl("/logout");
  }

}
