import { Component, OnInit } from '@angular/core';
import { PhotoServiceService } from '../photo-service.service';
import { Photo } from '../Photo';
import { Comment } from '../Comment';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../User';
import { AlbumService } from '../album.service';
import { Album } from '../Album';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})

export class PhotoDetailsComponent implements OnInit{

  details="here are photo details";
  
  photoId!:string;
  photo:Photo;
  allComments!:Comment[];
  email!:string;

  //for posting comments
  newComment!:string;
  currentUser!:User;

  //for updating album cover
  album:Album;
  albumId: string;
  coverPicUrl: string;
  createdBy: string;
  dateCreated: string;
  description: string;
  name: string;

  constructor(
    private userService:UserService,
    private photoService:PhotoServiceService, 
    private activatedRoute:ActivatedRoute, 
    private router:Router,
    private albumService:AlbumService
    ){}

  ngOnInit(){
      this.activatedRoute.paramMap.subscribe(
      params=>{
        this.photoId=params.get('photoId')||'';
        console.log('photoId:',this.photoId);
      }
   );
    this.email = localStorage.getItem('email')||'';
    this.loadPhoto(this.photoId);
    this.loadComments(this.photoId);
    // this.loadAlbum(this.photo.albumId);
    
    this.userService.getCurrentUserInformation().subscribe(
      userBean =>{
        this.currentUser= <User>userBean;

    });
  }

  // delete's photo from phopto table, file from file table and file from aws s3
  deletePhoto(){
    this.photoService.deletePhoto(this.photoId);
    this.router.navigate(['/myAlbums']);
  }
  
  updateAlbumCoverPicture(){
  
    
    this.email = localStorage.getItem('email');
    console.log('album id is here from Photo: ',this.photo.albumId);
    // this.loadAlbum(this.photo.albumId);
    this.albumService.getAlbumByAlbumId(this.photo.albumId)
   .subscribe(
      albumBean=>{
        this.album = <Album>albumBean;

        console.log('******here in get album by id in another method ',this.album);

        this.albumService.updateAlbumCoverPicture(this.album, this.photo.photoUrl).subscribe(
          response=>{
            console.log('update cover picture:',response);
            
          }
          
        );  
        this.router.navigate(['/myAlbums']);
      }
      );
      // this.router.navigate(['/myAlbums']);
  }

  

  updateUserProfilePic(){
    this.email = localStorage.getItem('email');
    console.log("email in update user profile pic:"+this.email+ " and profile pic url: "+this.photo.photoUrl);
    this.userService.UpdateCurrentUserProfilePicUrl(this.photo.photoUrl).subscribe(
      response=>{
        console.log('profile photo updated', response);
        
      }
    );
    this.router.navigate(['/profile/1']);
  }

  postComment(){
    this.photoService.postComment(this.photoId, this.newComment, this.email).subscribe(
      (    response: any)=>{
      console.log("here is response", response);
      this.loadComments(this.photoId);
      this.newComment='';
    }
      );
   
  }

   loadPhoto(photoId:string){
    this.photoService.getPhoto(this.photoId).subscribe(
      photo=>{
        this.photo=<Photo>photo;
        console.log('photo details: ',this.photo);
      }
    );

  }

  loadAlbum(albumId:string){
   return this.albumService.getAlbumByAlbumId(albumId)
   .subscribe(
      albumBean=>{
        this.album = <Album>albumBean;
        console.log('******here in get album by id in another method ',this.album);
      }
    );

  }

  loadComments(photoId:string){
   
    this.photoService.getComments(this.photoId).subscribe(
      commentList=>{
        this.allComments=(<Comment[]>commentList).reverse();
        console.log('all comments for the photo: ',this.allComments);
      }
    );

  }

  reverseComments(){
    this.allComments = this.allComments.reverse();
  }

}
