import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Character,
  Gender,
  Species,
} from 'src/app/interfaces/character.interface';
import { PersonajesService } from 'src/app/services/personajes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-character',
  templateUrl: './update-character.component.html',
  styleUrls: ['./update-character.component.css'],
})
export class UpdateCharacterComponent implements OnInit {
  personaje: Character = {
    id: 0,
    name: '',
  };

  formulario: FormGroup = this.formBuilder.group({
    name: [''],
    species: [''],
    gender: [''],
    origin: [''],
    location: [''],
    image: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private personajesService: PersonajesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    let idPersonaje = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.personajesService.cargarPersonaje(idPersonaje).subscribe((resp) => {
      this.personaje = resp;
      //Inserto los datos del personaje elegido en los valores del formulario
      this.formulario.get('name')?.setValue(resp.name);
      this.formulario.get('species')?.setValue(resp.species);
      this.formulario.get('gender')?.setValue(resp.gender);
      this.formulario.get('origin')?.setValue(resp.origin?.name);
      this.formulario.get('location')?.setValue(resp.location?.name);
      this.formulario.get('image')?.setValue(resp.image);
    });
  }

  actualizar() {
    let personajeActualizado: Character = {
      id: this.personaje.id,
      name: this.formulario.get('name')?.value,
      image: this.formulario.get('image')?.value,
      location: { name: this.formulario.get('location')?.value },
      origin: { name: this.formulario.get('origin')?.value },
    };

    //Asigno la especie del nuevo personaje según elección
    if (this.formulario.get('species')?.value !== '') {
      switch (this.formulario.get('species')?.value) {
        case 'alien':
          personajeActualizado.species = Species.Alien;
          break;
        case 'human':
          personajeActualizado.species = Species.Human;
          break;
      }
    }

    //Hago lo mismo para el género
    if (this.formulario.get('gender')?.value !== '') {
      switch (this.formulario.get('gender')?.value) {
        case 'm':
          personajeActualizado.gender = Gender.Male;
          break;
        case 'f':
          personajeActualizado.gender = Gender.Female;
          break;
        case '?':
          personajeActualizado.gender = Gender.Unknown;
          break;
      }
    }

    if (
      this.personajesService
        .actualizarPersonaje(personajeActualizado)
        .subscribe()
    ) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'El personaje ha sido actualizado correctamente',
        showConfirmButton: false,
        timer: 1500,
      });
      this.router.navigateByUrl('/characters');
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ha ocurrido un error al intentar actualizar el personaje',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}
