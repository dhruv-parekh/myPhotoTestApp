import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {

  constructor(private httpClient:HttpClient) { }

  uploadFile(file:File){
    // var headers = this.getHeaders();
    var formData = new FormData();
    formData.append("file", file);
    return this.httpClient.post(environment.API_BASE_URL+"fileApi/file/upload",formData);
  }

  // getHeaders(){
  //   var header={
  //     'idToken':localStorage.getItem('idToken')
  //   };
  //   return header;
  // }

}
