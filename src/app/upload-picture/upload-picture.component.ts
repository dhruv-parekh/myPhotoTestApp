import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileServiceService } from '../file-service.service';
import { PhotoServiceService } from '../photo-service.service';
import { UserService } from '../user.service';
import { User } from '../User';

@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.css']
})
export class UploadPictureComponent {

  albumId:string='';
  counter =0;
  countUploaded(){
    this.counter++;
  }

  //upload picture
  fileId="";
  currentUser!:User;
  email:string;
  file:any;

  constructor(
    private activatedRouter:ActivatedRoute,
    private fileService:FileServiceService,
    private photoService:PhotoServiceService,
    private userService:UserService,
    private router:Router
    ){

  }

  ngOnInit():void{
    this.activatedRouter.paramMap.subscribe(param=>{
      this.albumId=param.get('albumId')||'';
      console.log('album id in upload picture: ',this.albumId);
    });

    this.userService.getCurrentUserInformation().subscribe(
      userBean =>{
        
        this.currentUser= <User>userBean;

    });
  }

  uploadPhotoToAWS(event:any){

    this.file = event.target.files[0];

    this.fileService.uploadFile(this.file).subscribe(
      (response:any)=>{
        var response = response;
        this.fileId=response["fileId"];
        console.log("file data upload to Aws: ",this.fileId);
      }
    );

  }

  uploadPhotoToAlbum(){
    
    this.email = localStorage.getItem('email');
     console.log('users name',this.email);
    this.photoService.uploadPhotoToAlbum(this.fileId,this.email,this.albumId).subscribe(
      (response:any)=>{
        console.log("photo Uploaded: "+response);
      }
    );
    this.router.navigate(['/albums/',this.albumId]);
    

  }

}
