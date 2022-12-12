import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PersonajesService } from 'src/app/services/personajes.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  formulario: FormGroup = this.formBuilder.group({
    busqueda: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private personajesService: PersonajesService
  ) {}

  buscarPersonaje() {
    this.personajesService.cargarPersonajesBuscados(
      this.formulario.controls['busqueda'].value
    );
  }
}
