import { Component } from '@angular/core';
import { AlbumService } from '../album.service';
import { Album } from '../Album';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recent-albums',
  templateUrl: './recent-albums.component.html',
  styleUrls: ['./recent-albums.component.css']
})
export class RecentAlbumsComponent {

  albumImageUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtriwa654-o07FNSpM_-fJgDyS6omECsZBiw';
  albums!:Album[];
  constructor(private albumService : AlbumService){

  }

  ngOnInit():void{
    console.log('inside recent album component.')
    this.albumService.getAllAlbums().subscribe(
      response=>{
        this.albums=<Album[]>response;
        console.log("got all album Response", this.albums);
      }
    );

  }

}
