import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Album } from './Album';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  album:Album;
 
  constructor(private http:HttpClient, private router:Router) { }

  
  getAlbumByAlbumId(albumId: string) {

    console.log('isnide get album by albumid in album service :'+albumId);
    return this.http.get(environment.API_BASE_URL+"api/album/"+albumId);

  }
 
  
  deleteAlbum(albumId:string){
    console.log("in deleteAlbum() function in albumservice: "+albumId);

    var params =  new HttpParams().set("albumId",albumId);
    console.log("in deleteAlbum() function in albumservice from params : "+params.get("albumId"));

    return this.http.delete(environment.API_BASE_URL+"api/album",{params}).subscribe(
      response =>{
        console.log("response for deleting album from backend: "+response);
      }
    );

    

  }


  updateAlbumCoverPicture(album:Album, photoUrl: string) {
   
    console.log(" photo url: "+photoUrl);
    this.getAlbumByAlbumId(album.albumId).subscribe(
      albumBean =>{
        this.album = <Album>albumBean;
      }
    );
    var album:Album={
      albumId: album.albumId,
      coverPicUrl: photoUrl,
      createdBy: album.createdBy,
      dateCreated: album.dateCreated,
      description: album.description,
      name: album.name
    }
    return this.http.put(environment.API_BASE_URL+"api/album",album);
  }



  saveAlbum(albumTitle:string, albumDescription:string, fileId:string, email:string){

    console.log('inside save album in albumservice:',email)
    var headers = this.getHeaders();
    var album:Album={
      albumId: '',
      coverPicUrl: environment.API_BASE_URL+'fileApi/file/view/'+fileId,
      createdBy: email,
      dateCreated: "13 July 2023",
      description: albumDescription,
      name: albumTitle
    };

    this.http.post(environment.API_BASE_URL+'api/album',album,{headers}).subscribe(
      albumeResponse=>{
        console.log('**in save album method:  ',albumeResponse);
      }
    );
    this.router.navigate(['/recent/1'])
  }

  getPhotos(albumId:string){
    var headers = this.getHeaders();
    console.log('inside getPhotos() in album service', headers);
    return this.http.get(environment.API_BASE_URL+"api/album/"+albumId+"/photos",{headers});
  }

  getAllAlbumsByUserEmail(userEmail:string) {
    
    console.log('inside albumservice =',userEmail);
    return this.http.get( environment.API_BASE_URL+"api/AllAlbumsByUserEmail/"+userEmail);
  }

  getAllAlbums(){
    var headers = this.getHeaders();
    console.log('inside albumservice =',headers);
    return this.http.get( environment.API_BASE_URL+"api/allAlbums",{headers});
  }

  getHeaders(){
    var headers={
      'idToken':localStorage.getItem('userIdToken')
      };
    return headers;
  }
}
