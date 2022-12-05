import { Component, OnInit } from '@angular/core';
import { Branch } from 'src/app/models/common/branch.model';

@Component({
  selector: 'app-branchmgmt',
  templateUrl: './branchmgmt.component.html',
  styleUrls: ['./branchmgmt.component.css']
})
export class BranchmgmtComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  branchForUpdate!:Branch;

  selectForUpdate(selectedBranch:Branch)
  {
      this.branchForUpdate = selectedBranch;
  }

}
