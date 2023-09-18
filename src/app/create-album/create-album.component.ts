import { Component } from '@angular/core';
import { FileServiceService } from '../file-service.service';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.css']
})
export class CreateAlbumComponent {

  name='Arpit';
  answer = 'yes';

  albumTitle!:string;
  albumDescription!:string;
  fileId ="";

  email:string;


  constructor(private fileService:FileServiceService, private albumService:AlbumService){

  }



  saveAlbumCoverPicFile(event:any){
    var file=event.target.files[0];

    this.fileService.uploadFile(file).subscribe(
      ( response: any)=>{
        var response = response;
        this.fileId= response["fileId"];
        
        console.log("file data from service",this.fileId);
      }
    );
     // console.log('Here is Event: ', file);
  }

  saveAlbum(){
    this.email = localStorage.getItem('email');
    console.log('in save album file id: ', this.fileId);
    this.albumService.saveAlbum(this.albumTitle, this.albumDescription,this.fileId,this.email);
    
  }

}


