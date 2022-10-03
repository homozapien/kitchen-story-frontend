import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 hidFoodItemNav:boolean = false; 
 httpRsponseStatus:number = 0;
  
  constructor(private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void 
  {
    this.authService.subscriber$.subscribe(data => {
      this.httpRsponseStatus = data;   
      this.adjustHiddenProperties(); 
    },
      error => console.log(error),
      () => {
        console.log("subscription completed according")
      }); 
  }

signOut():void
{
    this.hidFoodItemNav = false;  
    this.authService.logout();
    this.router.navigateByUrl("/login");
}

adjustHiddenProperties()
{
     if(this.httpRsponseStatus === 200)
     {
          let userRole = sessionStorage.getItem("userRole"); 

           if(userRole === "Customer")
           {
            this.hidFoodItemNav = true;        
           }
     }
}

}
