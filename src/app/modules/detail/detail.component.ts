import { Component, OnInit } from '@angular/core';
import {APIResponse} from '../../models/APIResponse';
import {ConfigService} from '../../services/config.service';
import {Router, ActivatedRoute} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Character} from '../../models/Character';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  characteres: APIResponse;
  character: Character;
  id: number;
  constructor(private configService: ConfigService, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    await this.showConfig();
    console.log(this.characteres);
    this.route.params.subscribe(
      param => {
        this.getCharacter(param.id);
      }
    );

  }
  async showConfig(): Promise<void> {
    this.characteres = await this.configService.getConfig().toPromise();
  }
  getCharacter(id): void {
    const uid = parseInt(id, 0);
    for (const i of this.characteres.results){
      console.log(i.id);
      if (uid === i.id){
        this.character = i;
        break;
      }
    }
  }
}
