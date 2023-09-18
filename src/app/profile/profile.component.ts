import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../User';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  imageUrl = 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg';
  title = 'This is to demonstrate interpolation/ data binding.';
  viewCount = 0;
  list = ["1","2","3"];
  name ='Dhruv';

  incrementCount(){
    this.viewCount++; 
  }


  user!:User;


  constructor(private userService:UserService, private route:ActivatedRoute){}

  ngOnInit():void{
   
    this.userService.getCurrentUserInformation().subscribe(
      user=>{
        this.user=<User>user;
      }
    );

  }

 

}
