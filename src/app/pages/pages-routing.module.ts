import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AddCharacterComponent } from './characters/add-character/add-character.component';
import { CharactersComponent } from './characters/characters.component';
import { DetailsComponent } from './characters/details/details.component';
import { UpdateCharacterComponent } from './characters/update-character/update-character.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'characters',
    component: CharactersComponent,
  },
  {
    path: 'characters/add',
    component: AddCharacterComponent,
  },
  {
    path: 'characters/update/:id',
    component: UpdateCharacterComponent,
  },
  {
    path: 'characters/details/:id',
    component: DetailsComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: '**',
    redirectTo: 'characters',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
