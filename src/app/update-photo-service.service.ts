import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo } from './Photo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdatePhotoServiceService {

  constructor(private httpClient:HttpClient) { }


  getPhoto(photoId:string){

    var headers = this.getHeaders();
    console.log('inside getPhoto in update photo service:' ,photoId );
    return this.httpClient.get(environment.API_BASE_URL+"photoApi/photos/findId/"+photoId,{headers});

  
  }

  updatePhoto(photo:Photo){
    var headers = this.getHeaders();
    console.log('inside upload photo  in update photo service ', photo)
    return this.httpClient.put(environment.API_BASE_URL+"photoApi/photos"+photo,{headers});
  }

  getHeaders(){
    var  header = {
      'idToken':localStorage.getItem('idToken')||''
    };
    return header;
  }

}
