import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/auth/token-storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor( private tokenStorage: TokenStorageService) { }

  ngOnInit(): void 
  {
    //window.location.reload();
    this.tokenStorage.notifyLoginStatusChange();
  }

}
