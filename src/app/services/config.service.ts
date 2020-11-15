import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIResponse } from '../models/APIResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private http: HttpClient) { }

  getConfig(): Observable<APIResponse> {
    return this.http.get<APIResponse>('https://rickandmortyapi.com/api/character/');
  }
}
