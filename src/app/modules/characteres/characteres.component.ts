import { Component, OnInit } from '@angular/core';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { APIResponse } from 'src/app/models/APIResponse';
import { ConfigService } from '../../services/config.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FavCharacters } from 'src/app/models/FavCharacter';
import { switchMap } from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import firestore from 'firebase';

@Component({
  selector: 'app-characteres',
  templateUrl: './characteres.component.html',
  styleUrls: ['./characteres.component.css']
})
export class CharacteresComponent implements OnInit {
  user;
  favorites;
  noFav: Array<number>;
  cont = 1;
  characteres: APIResponse;
  constructor(private configService: ConfigService, private router: Router, private authService: AuthService, private db: AngularFirestore,) {

  }

  async ngOnInit(): Promise<void> {
    await this.showConfig();
    await this.authService.authStateUser().subscribe( a => {
      console.log('hola', a);
       this.user = a;
      console.log('holaaaaaa', this.user);
      this.authService.getFavorites(this.user.uid).subscribe( b => {
        if (b) {
          console.log(b);
          this.favorites = b;
          console.log(this.favorites);
        } else {
          this.db.collection('Favorites').doc(this.user.uid).set({
            id: this.user.uid
          });
          this.authService.getFavorites(this.user.uid).subscribe((b: any) => {
            this.favorites = b;
          });
        }

      });
    });

  }

  // tslint:disable-next-line: typedef
  async showConfig() {
    this.characteres = await this.configService.getConfig().toPromise();
  }

  detail(id: number): void {
    this.router.navigate([`detail/${id}`]);
  }

  addFavorites(id: number): void {
    this.authService.addFavorites(id);

  }

  deleteFavorites(id: number): void {
    this.authService.deleteFavorites(id);
  }




}
