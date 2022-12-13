import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from 'src/app/interfaces/character.interface';
import { PersonajesService } from 'src/app/services/personajes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  personaje: Character | any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private personajesService: PersonajesService,
    private router: Router
  ) {}

  async ngOnInit() {
    let idPersonaje = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.personajesService.cargarPersonaje(idPersonaje).subscribe(
      (resp) => {
        this.personaje = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  modificarPersonaje(id: number) {
    this.router.navigateByUrl(`characters/update/${id}`);
  }

  eliminarPersonaje(id: number) {
    Swal.fire({
      title: 'Estás seguro que querés eliminar el personaje?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.personajesService.eliminarPersonaje(id).subscribe();
          Swal.fire('Personaje eliminado', '', 'success');
        } else if (result.isDenied) {
          Swal.fire('No se pudo eliminar el personaje', '', 'info');
        }
      })
      .then(() => {
        this.router.navigateByUrl('/characters');
      });
  }
}
