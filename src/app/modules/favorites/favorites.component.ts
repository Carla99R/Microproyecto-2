import { Component, OnInit } from '@angular/core';
import { APIResponse } from 'src/app/models/APIResponse';
import { Character } from 'src/app/models/Character';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  characteres: APIResponse;
  character: Array<Character> = [];
  user;
  favorites;
  constructor(private configService: ConfigService, private authService: AuthService) { }

  async ngOnInit(): Promise<void> {
    await this.showConfig();
    this.authService.authStateUser().subscribe(a => {
      console.log('hola', a);
      this.user = a;
      this.authService.getFavorites(a.uid).subscribe(b => {
        console.log(b);
        this.favorites = b;
        console.log(this.favorites);
        for (const i of this.favorites?.favorites) {
          for (const l of this.characteres?.results) {
            if (i === l.id) {
              this.character.push(l);
            }
          }
        }
      });
    });

  }
  async showConfig(): Promise<void> {
    this.characteres = await this.configService.getConfig().toPromise();
  }


  deleteFavorites(id: number): void {
    this.authService.deleteFavorites(id);
    this.character = [];
  }

}
