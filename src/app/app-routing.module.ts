import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CharacteresComponent} from './modules/characteres/characteres.component';
import {DetailComponent} from './modules/detail/detail.component';
import {FavoritesComponent} from './modules/favorites/favorites.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', redirectTo: '/home', pathMatch: 'full'},
      {path: 'home', component: CharacteresComponent},
    ],
    component: CharacteresComponent
  },
  {
    path: 'detail/:id',
    component: DetailComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'favs/:id',
    component: FavoritesComponent,
    canActivate: [AuthGuard]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
