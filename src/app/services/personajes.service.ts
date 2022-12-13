import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Character } from '../interfaces/character.interface';

@Injectable({
  providedIn: 'root',
})
export class PersonajesService {
  //_personajes contiene todos los personajes siempre
  private _personajes: Character[] = [];
  //_personajesBuscados solo contiene los personajes que se buscan por la barra de navegación y varía
  private _personajesBuscados: Character[] = [];
  private _personaje: Character | undefined;
  private url = 'http://localhost:3000/results';
  public idIndex: number = 20;
  private headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Expires: '0',
  };

  constructor(private http: HttpClient) {}

  get personajesBuscados() {
    return this._personajesBuscados;
  }

  get personaje() {
    return this._personaje;
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

  eliminarPersonaje(id: number) {
    return this.http.delete(`${this.url}/${id}`).pipe(
      map((resp) => true),
      catchError((err) => of(err))
    );
  }

  cargarPersonaje(id: number) {
    return this.http.get<Character>(`${this.url}/${id}`, {
      headers: this.headers,
    });
  }

  cargarPersonajes() {
    return this.http.get<Character[]>(this.url, { headers: this.headers }).pipe(
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

  actualizarPersonaje(personaje: Character) {
    return this.http.put(`${this.url}/${personaje.id}`, personaje).pipe(
      map((resp) => true),
      catchError((err) => of(err))
    );
  }
}
