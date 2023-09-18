import { Component } from '@angular/core';
import { UpdatePhotoServiceService } from '../update-photo-service.service';
import { Photo } from '../Photo';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-photo',
  templateUrl: './update-photo.component.html',
  styleUrls: ['./update-photo.component.css']
})
export class UpdatePhotoComponent {

  photoId!:string;
  photo!:Photo;


  constructor(private updatePhotoService:UpdatePhotoServiceService, private route:ActivatedRoute){  }

  ngOnInit():void{
    this.route.paramMap.subscribe(
      params=>{
        this.photoId=params.get('photoId')||'';
      }
    );

    this.loadPhoto(this.photoId)
  }

  loadPhoto(photoId:string){
    this.updatePhotoService.getPhoto(this.photoId).subscribe(
      photo=>{
        this.photo=<Photo>photo;
        console.log('inside load photo: ',photo)
      }
    );
  }

  upadatePhotoDetails(){
    console.log('inside update photo details',this.photo)
    this.updatePhotoService.updatePhoto(this.photo).subscribe(
      result=>{
        this.ngOnInit();
      }
    );
  }

}
