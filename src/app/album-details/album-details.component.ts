import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from '../album.service';
import { Photo } from '../Photo';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent {

  albumId:string='';
  albumPhotos!:Photo[];

  albumImageUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8aT8IYVEl5Y1J6wNOL0Kvh7wjy5wOXsMrmA&usqp=CAU';
  
  name='Dhruv';


  constructor( private route:ActivatedRoute, 
    private albumService:AlbumService,
    private router:Router
    
    ){
  }

  ngOnInit():void{

    this.route.paramMap.subscribe(params=>{
      this.albumId = params.get('albumId')||'';
      console.log('this is albumId = ',this.albumId);

      this.albumService.getPhotos(this.albumId).subscribe(
        photos=>{
          this.albumPhotos=<Photo[]>photos;
          console.log('ALL PHOTOS FOR THIS ALBUM = ',this.albumPhotos);
        }

      );

    });

  }

  deleteAlbum(){
    this.albumService.deleteAlbum(this.albumId);
    this.router.navigate(['/myAlbums']);
  }

}
