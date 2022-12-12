import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Character,
  Gender,
  Species,
} from 'src/app/interfaces/character.interface';
import { PersonajesService } from 'src/app/services/personajes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-character',
  templateUrl: './add-character.component.html',
  styleUrls: ['./add-character.component.css'],
})
export class AddCharacterComponent {
  formulario: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    species: [''],
    gender: [''],
    origin: [''],
    location: [''],
    image: [''],
  });

  personaje: Character | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private personajesService: PersonajesService,
    private router: Router
  ) {}

  //Me fijo que el campo haya sido tocado y que el campo sea válido
  campoEsValido(campo: string): boolean {
    if (
      this.formulario.get(campo)?.invalid &&
      this.formulario.get(campo)?.touched
    ) {
      return true;
    } else return false;
  }

  guardar() {
    //Marco todos los campos como tocados por si hay alguno inválido, así saltan los mensajes de error
    this.formulario.markAllAsTouched();

    if (this.formulario.valid) {
      let nuevoPersonaje: Character = {
        id: this.personajesService.asignarId(),
        name: this.formulario.get('name')?.value,
        image: this.formulario.get('image')?.value,
        location: { name: this.formulario.get('location')?.value },
        origin: { name: this.formulario.get('origin')?.value },
      };

      //Asigno la especie del nuevo personaje según elección
      if (this.formulario.get('species')?.value !== '') {
        switch (this.formulario.get('species')?.value) {
          case 'alien':
            nuevoPersonaje.species = Species.Alien;
            break;
          case 'human':
            nuevoPersonaje.species = Species.Human;
            break;
        }
      }

      //Hago lo mismo para el género
      if (this.formulario.get('gender')?.value !== '') {
        switch (this.formulario.get('gender')?.value) {
          case 'm':
            nuevoPersonaje.gender = Gender.Male;
            break;
          case 'f':
            nuevoPersonaje.gender = Gender.Female;
            break;
          case '?':
            nuevoPersonaje.gender = Gender.Unknown;
            break;
        }
      }

      if (this.personajesService.guardarPersonaje(nuevoPersonaje).subscribe()) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'El personaje ha sido agregado correctamente',
          showConfirmButton: false,
          timer: 1500,
        });
        this.formulario.reset();
        this.router.navigateByUrl('/characters');
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ha ocurrido un error al intentar agregar el personaje',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  }
}
