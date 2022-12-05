import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Branch } from 'src/app/models/common/branch.model';
import { BranchOperationService } from 'src/app/services/admin/branch-operation.service';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.css']
})
export class BranchListComponent implements OnInit {

  constructor(private bos:BranchOperationService) { }
  
  branches: Array<Branch> = [];
  @Output() selectedBranchForUpdateEvt = new EventEmitter<Branch>();

  ngOnInit(): void 
  {
    this.branches = this.bos.getAllBankBranches(); 
  }

  onSelectForUpdate(branch: Branch)
  {
     console.log('.......... Branch Details.....' + JSON.stringify(branch));
     this.selectedBranchForUpdateEvt.emit(branch);
  }

}
