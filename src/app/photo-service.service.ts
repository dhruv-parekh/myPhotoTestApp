import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Photo } from './Photo';
import { UserService } from './user.service';
import { Comment } from './Comment';
import { User } from './User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PhotoServiceService {

  currentUser!:User;

  constructor(private HttpClient:HttpClient, private userservice:UserService, private router:Router) { }



  deletePhoto(photoId:string){

    console.log('phototId in deletePhoto():'+photoId)
    // var params = new HttpParams().set("id",photoId)||'';
    var params = new HttpParams().set("id",photoId);
    console.log('phototId in deletePhoto() params:'+params.get("id"));
    return this.HttpClient.delete(environment.API_BASE_URL+"photoApi/photos",{params}).subscribe(
      response =>{
        console.log("response for deleting the file ", response)
      }
    );

  }

  editPhoto(photo:Photo){
    var headers = this.getHeaders();
    this .HttpClient.put(environment.API_BASE_URL+"",{headers});
  }

  getPhoto(photoId:string){
    var headers = this.getHeaders();
    return this.HttpClient.get(environment.API_BASE_URL+"photoApi/photos/findId/"+photoId,{headers})
  }

  getComments(photoId:string){
    var headers = this.getHeaders();
   return this.HttpClient.get(environment.API_BASE_URL+"commentApi/comments/findCommentsByPhotoId/"+photoId, {headers});
  }

  getAllPhotos(){
    var headers = this.getHeaders();
    return this.HttpClient.get(environment.API_BASE_URL+"photoApi/photos",{headers});
  }

  postComment(photoId:string, newComment:string,email:string){
    
    var comment:Comment={
    createdBy: email,
     dateCreated : "15 July 2023",
     id :'',
     message : newComment,
     photoId :  photoId
    }
    console.log("in comment service comment = ",comment);
    return this.HttpClient.post(environment.API_BASE_URL+"commentApi/comments",comment);
     
    //  this.router.navigate(["/photo/"+photoId]);
  }

  uploadPhotoToAlbum(fileId:string,email:string, albumId:string){
    var photo:Photo={    
    albumId:albumId,
    createdBy: email,
    dateCreated: '15 July',
    id: '',
    photoUrl:environment.API_BASE_URL+'fileApi/file/view/'+fileId
  }
  console.log("in uploadPhotoToAlbumMethod: ",photo);

  return this.HttpClient.post(environment.API_BASE_URL+"photoApi/photos",photo);
  }


  getHeaders(){
    var headers={
      'idToken':localStorage.getItem('userIdToken')||''   
    };
    return headers;
  }

}
