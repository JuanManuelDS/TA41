import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
import { Character } from '../interfaces/character.interface';

@Injectable({
  providedIn: 'root',
})
export class PersonajesService {
  //_personajes contiene todos los personajes siempre
  private _personajes: Character[] = [];
  //_personajesBuscados solo contiene los personajes que se buscan por la barra de navegación y varía
  private _personajesBuscados: Character[] = [];
  private url = 'http://localhost:3000/results';
  public idIndex: number = 20;

  constructor(private http: HttpClient) {}

  get personajesBuscados() {
    return this._personajesBuscados;
  }

  cargarPersonajesBuscados(busqueda: string) {
    this._personajesBuscados = this._personajes.filter((personaje) =>
      personaje.name.toLowerCase().includes(busqueda.toLocaleLowerCase())
    );
  }

  asignarId() {
    this.idIndex++;
    return this.idIndex;
  }

  guardarPersonaje(personaje: Character) {
    //Paso la respuesta por un pipe para indicar true en caso que se haya agregado exitosamente
    //el personaje y false en caso contrario
    return this.http.post<Character>(this.url, personaje).pipe(
      map((resp) => true),
      catchError((err) => of(err))
    );
  }

  cargarPersonaje(id: number) {
    let personaje: Character | undefined;
    this._personajes.find((element) => {
      if (element.id === id) {
        personaje = element;
      }
    });
    return personaje;
  }

  cargarPersonajes() {
    return this.http.get<Character[]>(this.url).pipe(
      tap((data) => {
        this._personajes = data;
        this._personajesBuscados = data;
      }),
      map((resp) => true), //Le digo que si la petición fue exitosa envíe un true
      catchError((err) => {
        //Y en caso contrario envío un false
        console.log('Ha ocurrido un error al hacer la petición ' + err);
        return of(err);
      })
    );
  }
}
