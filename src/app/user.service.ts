import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
// import * as firebase from '@angular/fire/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './User';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';
// import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: Observable<any>;
  defaultProfilePictureUrl:string= 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtriwa654-o07FNSpM_-fJgDyS6omECsZBiw';
  // userIdToken!: string;


  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private HttpClient:HttpClient,
    private messageService:MessageService
       ) {
    this.user = angularFireAuth.authState;
    // this.userIdToken = localStorage.getItem('userIdToken') || "";
    console.log("UserIdToken at the construction of the user service", localStorage.getItem('userIdToken'));
    
    this.user.subscribe(userInfo=>{
      console.log("user info is available",userInfo);
      this.storeIdToken(userInfo.getIdToken())

    }
    )
  }

  canActivate():boolean{
    // if(localStorage.getItem('userIdToken')){
      if(localStorage.getItem("canActivate")!=null){
     return true;
    }else{
      this.router.navigate(['/login']);
      return false;

    }
    
  }

  storeIdToken(idToken:Promise<string>){

    idToken.then(
      idTokenValue=>{
        // this.userIdToken = idTokenValue;

        localStorage.setItem('userIdToken',idTokenValue);

        console.log('Id token  Value', localStorage.getItem('userIdToken'));
      }
    );

  }

  logOutVisible = false;  

  logInUser(email: string, password: string) {
    this.angularFireAuth.signInWithEmailAndPassword(email, password).then(
      (value) => {
        localStorage.setItem('canActivate','1');
        localStorage.setItem('email',email);
        
        // var currentUser = this.getCurrentUserInformation();
        // localStorage.setItem('currentUser',currentUser);

        console.log('log in succes sfull', value);
        
        // a way to store idtoken in local storage in case the constructor in userService is not called on tike of login
        value.user?.getIdToken().then(
            idTokenValue=>{ 
            localStorage.setItem('idTokenValue',idTokenValue);
             } );
          
          // this.storeIdToken(value.user?.getIdToken());
        this.router.navigate(['/recent/1']);
      }
      ,
      error => {
        console.log('error logging in: ', error);
        this.messageService.newMessage("Error: "+error.message);
      }
    );
  }

  signUpUser(email: string, password: string, name:string, phoneNumber:string, website:string) {
    this.angularFireAuth.createUserWithEmailAndPassword(email, password).then(
      (value) => {
        console.log('user sign up successfull', value);
        // this.logOutVisible = false;
        this.registeruser(email,name, phoneNumber, website);
        
      },
      error => {
        console.log('user sign up error');
        this.messageService.newMessage("Error: "+error);
      }
    )
  }

  //REGISTER USER HERE
  registeruser(email:string, name:string, phoneNumber:string, website:string){

    var user:User={
      address :  "sample address",
      age : 25,
      email :  email,
      name :  name  ,
      profilePicUrl :  this.defaultProfilePictureUrl,
      phoneNumber:phoneNumber,
      website:website

    };
    var headers = this.getHeaders()
    this.HttpClient.post(environment.API_BASE_URL+"userApi/users", user)
    .subscribe(response=>{
      console.log("registration successful!! ")
      this.router.navigate(['/login']);
    });
    

  }
  
  logOutUser() {
    this.angularFireAuth.signOut().then(
      ()=> {
        console.log('user sign out');
        this.logOutVisible = false;
        localStorage.removeItem('userIdToken');
        localStorage.removeItem('canActivate');
        localStorage.removeItem('email');
        // or
        // localStorage.clear(); 
        //test
        this.router.navigate(['/login']);
      },
      error => {
        console.log('Error logging out');
      }
    )
  }

  isSignedIn(){
    return this.logOutVisible;
  }


// get current user by using email
getCurrentUserInformation(){
  var headers = this.getHeaders();
  var email = localStorage.getItem('email');
    return this.HttpClient.get(environment.API_BASE_URL+"userApi/users/FindUserByEmail/"+email,{headers});
}

UpdateCurrentUserProfilePicUrl(profilePicUrl:string){
  var headers = this.getHeaders();
  var email = localStorage.getItem('email');
  var params = new HttpParams().set("email",email).set("profilePicUrl",profilePicUrl);
  // params.get('');
console.log('in update current user profile pic email:'+email+' profilePicUrl:'+params.get("profilePicUrl"));
console.log(environment.API_BASE_URL+"userApi/users/updateProfilePic"+params.get('profilePicUrl'));
  return this.HttpClient.put(environment.API_BASE_URL+"userApi/users/updateProfilePic",params);
  
}

//profile component related code
getCurrentUserProfile(){
  var headers = this.getHeaders();
  console.log('inside albumservice =',headers);
  return this.HttpClient.get( environment.API_BASE_URL+"api/allAlbums",{headers});
}

getHeaders(){
  var headers={
    'idToken':localStorage.getItem('userIdToken')||''
    };
  return headers;
}

}
