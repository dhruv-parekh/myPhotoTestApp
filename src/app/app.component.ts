import { Component } from '@angular/core';
import { UserService } from './user.service';
import { MessageService } from './message.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myPhotoTestApp';

  constructor(
     public userService: UserService,
     public messageService:MessageService
   
  ) { }


   logOutVisible(){
   
    return this.userService.isSignedIn();
   }
 

  logOut() {
    console.log("user tried to log out!");
    this.userService.logOutUser();
  }

  clearMessages(){
    this.messageService.clearMessages();
  }
  

  


}
