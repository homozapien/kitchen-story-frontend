import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Branch } from 'src/app/models/common/branch.model';
import { Operation } from 'src/app/models/common/operation.model';

const BRANCH_API_CONTEXT           = environment.apiUrlContext + '/open/fetchbranches';
const OPERATION_API_CONTEXT        = environment.apiUrlContext + '/open/fetchoperations';
const CREATE_BRANCH_API_CONTEXT    = environment.apiUrlContext + '/admin/createbranch';

@Injectable({
  providedIn: 'root'
})
export class BranchOperationService {

  private allBranchesSub = new Subject<Branch[]>();
          allBranchesSub$ = this.allBranchesSub.asObservable();

  private allOperationsSub = new Subject<Operation[]>();
          allOperationsSub$ = this.allOperationsSub.asObservable();

  private branchOpsSetupCompSub = new BehaviorSubject<boolean>(false);
          branchOpsSetupCompSub$ = this.branchOpsSetupCompSub.asObservable(); 

  

  branches: Branch[] = [];
  operations: Array<Operation> = [];
  anyBranchExists   = false;
  anyOperationExits = false;

  constructor(private http: HttpClient) { }

  emitLoadBranchDataSuccess(branches: Branch[]) {

   /* console.log('------ Start Print of Bank Branhes  --------');
     console.log(JSON.stringify(branches))
    console.log('------ End Print of Bank Branhes  --------'); */
    if (branches) {
      this.branches = branches;
      this.anyBranchExists = true;
      this.allBranchesSub.next(branches);
    }
  }

  emitLoadOperationDataSuccess(operations: Operation[]) 
  {
   /* console.log('------ Start Print of Bank Operations  --------');
    console.log(JSON.stringify(operations))
    console.log('------ End Print of Bank Operations  --------'); */

    if (operations) 
    {
      this.operations = operations;
      this.anyOperationExits = true;
      this.allOperationsSub.next(operations);
    }
  }

  emitBranchOpertionSetupCompletion()
  {
    if(this.anyBranchExists && this.anyOperationExits)
       {
        this.branchOpsSetupCompSub.next(true);
       }
       else
       {
        this.branchOpsSetupCompSub.next(false);
       }
  } 

  createBranch(branch:Branch):Observable<Branch>
  {
    return this.http.post<Branch>(CREATE_BRANCH_API_CONTEXT,branch)
    .pipe(
      catchError(this.handleError)
    );
  }

  loadBranches(): Observable<Branch[]> {
    return this.http.get<any[]>(BRANCH_API_CONTEXT)
      .pipe(
        map((branches) => {
          const data = branches.map(branch => ({ branch_id: branch.branch_id, name: branch.name, address: branch.address }));
          return data;
        })
      );
  }

  loadOperations(): Observable<Operation[]> {
    return this.http.get<any[]>(OPERATION_API_CONTEXT)
      .pipe(
        map((operations) => {
          const data = operations.map(operation => ({ opCode: operation.opCode, opDescr: operation.opDescr, opStatus: operation.opStatus}));
          return data;
        })
      )
  }

  getAllBankBranches():Branch[]
  {
    return this.branches;
  }

  getAllBankOperations(): Operation[]{
    return this.operations;
  }

 

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error( `Backend returned code ${error.status}, body was: `, error.error
       );
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Error during call of API in the backend; please try again later.'));
  }


}
