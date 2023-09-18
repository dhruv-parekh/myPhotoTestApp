import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { MyAlbumsComponent } from './my-albums/my-albums.component';
import { CreateAlbumComponent } from './create-album/create-album.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { UploadPictureComponent } from './upload-picture/upload-picture.component';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';
import { RecentAlbumsComponent } from './recent-albums/recent-albums.component';

//following dependencies need to be added seperately 
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { UpdatePhotoComponent } from './update-photo/update-photo.component';


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    MyAlbumsComponent,
    CreateAlbumComponent,
    AlbumDetailsComponent,
    UploadPictureComponent,
    PhotoDetailsComponent,
    RecentAlbumsComponent,
    UpdatePhotoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

    //following modules are for fire base

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,

    //following is for reactive form
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
