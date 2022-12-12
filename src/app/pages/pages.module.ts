import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CharactersComponent } from './characters/characters.component';
import { DetailsComponent } from './characters/details/details.component';
import { MaterialModule } from '../material/material.module';
import { AddCharacterComponent } from './characters/add-character/add-character.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    CharactersComponent,
    DetailsComponent,
    AddCharacterComponent,
  ],
  imports: [CommonModule, HttpClientModule, PagesRoutingModule, MaterialModule, ReactiveFormsModule],
})
export class PagesModule {}
