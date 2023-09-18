import { Component } from '@angular/core';
import { AlbumService } from '../album.service';
import { Album } from '../Album';
import { User } from '../User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-my-albums',
  templateUrl: './my-albums.component.html',
  styleUrls: ['./my-albums.component.css']
})
export class MyAlbumsComponent {

  albumImageUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtriwa654-o07FNSpM_-fJgDyS6omECsZBiw';
  albums!:Album[];

  //user
  email:string;

  constructor(private albumService : AlbumService, private userService:UserService){

  }

  ngOnInit():void{
    console.log('inside recent album component.')

    this.email=localStorage.getItem('email');   
    this.albumService.getAllAlbumsByUserEmail(this.email).subscribe(
      response=>{
        this.albums=<Album[]>response;
        console.log("got all album Response", this.albums);
      }
    );

  }

  

}
