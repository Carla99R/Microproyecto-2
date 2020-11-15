import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { CharacteresComponent } from './modules/characteres/characteres.component';
import { NavigationBarComponent } from './navigation/navigation-bar/navigation-bar.component';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AuthGuard } from './guards/auth.guard';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http'
import 'firebase/firestore';
import 'firebase/storage';
import {firebase, firebaseui, FirebaseUIModule} from 'firebaseui-angular';
import { DetailComponent } from './modules/detail/detail.component';
import { FavoritesComponent } from './modules/favorites/favorites.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacteresComponent,
    NavigationBarComponent,
    DetailComponent,
    FavoritesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HttpClientModule,
    FirebaseUIModule,
    AngularFireAuthModule
  ],
  providers: [
    AngularFireAuth,
    AuthGuard,
    HttpClientModule,
    FirebaseUIModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
