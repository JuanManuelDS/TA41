import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from 'src/app/interfaces/character.interface';
import { PersonajesService } from 'src/app/services/personajes.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  personaje: Character | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private personajesService: PersonajesService
  ) {}

  ngOnInit() {
    let idPersonaje = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    setTimeout(() => {
      this.personaje = this.personajesService.cargarPersonaje(idPersonaje);
    }, 500);
  }
}
