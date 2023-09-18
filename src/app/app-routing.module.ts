import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { CreateAlbumComponent } from './create-album/create-album.component';
import { LoginComponent } from './login/login.component';
import { MyAlbumsComponent } from './my-albums/my-albums.component';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';
import { ProfileComponent } from './profile/profile.component';
import { UploadPictureComponent } from './upload-picture/upload-picture.component';
import { RecentAlbumsComponent } from './recent-albums/recent-albums.component';
import { UserService } from './user.service';
import { UpdatePhotoComponent } from './update-photo/update-photo.component';



const routes: Routes = [
  
  {path: 'recent/:album', component: RecentAlbumsComponent,canActivate:[()=>inject(UserService).canActivate()]},
  {path: 'albums/:albumId', component: AlbumDetailsComponent, canActivate:[()=>inject(UserService).canActivate()]},
  {path:'create', component:CreateAlbumComponent,canActivate:[()=>inject(UserService).canActivate()]},
  {path:'login', component:LoginComponent },
  {path:'myAlbums', component:MyAlbumsComponent,canActivate:[()=>inject(UserService).canActivate()]},
  {path:'photo/:photoId', component:PhotoDetailsComponent,canActivate:[()=>inject(UserService).canActivate()]},
  {path:'profile/:profileId',component:ProfileComponent,canActivate:[()=>inject(UserService).canActivate()]},
  {path:'upload/:albumId', component:UploadPictureComponent,canActivate:[()=>inject(UserService).canActivate()]},
  {path:'updatePhoto/:photoId', component:UpdatePhotoComponent,canActivate:[()=>inject(UserService).canActivate()]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
