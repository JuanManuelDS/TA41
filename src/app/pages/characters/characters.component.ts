import { Component, OnInit } from '@angular/core';
import { PersonajesService } from 'src/app/services/personajes.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
})
export class CharactersComponent implements OnInit {
  get personajes() {
    return this.personajesService.personajesBuscados;
  }

  constructor(private personajesService: PersonajesService) {}

  ngOnInit() {
    //Cuando se termina de cargar el componente llamo a la función cargarPersonajes del service para
    //que cargue los personajes
    setTimeout(() => {
      this.personajesService.cargarPersonajes().subscribe();
      //this.cargando = false;
    }, 650);
  }
}
