import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Pelicula } from '../models/peliculas';
import { TipoPelicula } from '../models/tipo-peliculas';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Actor } from '../models/actores';

@Injectable({
  providedIn: 'root'
})
export class PeliculasAcotresService {

  private actor:Actor[]=[];
  private pelicula:Pelicula[]=[];
  private tipos:TipoPelicula[]=[];

  private actorSeleccionadoSubject: BehaviorSubject<Actor | null> = new BehaviorSubject<Actor | null>(null);
  actorSeleccionado$: Observable<Actor | null> = this.actorSeleccionadoSubject.asObservable();

  private peliculaSeleccionadoSubject: BehaviorSubject<Pelicula | null> = new BehaviorSubject<Pelicula | null>(null);
  peliculaSeleccionado$: Observable<Pelicula | null> = this.peliculaSeleccionadoSubject.asObservable();

  constructor( private firestore:AngularFirestore,private router: Router) {
    this.actor=[];
    this.pelicula=[];
    this.tipos=[
      {
        id:0,
        descripcion:'A (Apto para todo publico)'
      },
      {
        id:1,
        descripcion:'B (Apto para adolecentes mayores de 12 años)'
      },
      {
        id:2,
        descripcion:'B-15 (Apto para adolecentes mayores de 15 años)'
      },
      {
        id:3,
        descripcion:'R (Apto para adolecentes mayores de 17 años)'
      }
    ];
   }
   
  redirectToPage(route: string): void {
    this.router.navigate([route]);
  }
   //método que permita retornar el arreglo de cliente
  getPeliculas(){
    return this.firestore.collection('peliculas').snapshotChanges();
  }
  getActores(){
    return this.firestore.collection('actores').snapshotChanges();
  }
  //método que agrege un videojuego al arreglo
  agregarPelicula(pelicula:Pelicula){
    return this.firestore.collection('peliculas').add(Object.assign({},pelicula));
  }

  //método que inicializa un nuevo videojuego
  nuevaPelicula(pelicula:Pelicula){
    return this.firestore.collection('peliculas').add(Object.assign({},pelicula));
  }
  //método que retorne los tipos de videojuegos
  getTipos(){
    return this.tipos;
  }
  //método que elimina un videojuego
  deletePelicula(peliculaId:string){
    this.firestore.doc('peliculas/'+peliculaId).delete();
  }
  //método que actualiza un videojuego
  updatePelicula(pelicula:Pelicula){
    this.firestore.doc('peliculas/'+pelicula.id).update(pelicula);
  }

  // Método para establecer el videojuego seleccionado
  setPeliculaSeleccionado(pelicula:Pelicula) {
    this.peliculaSeleccionadoSubject.next(pelicula);
  }

  setActorSeleccionado(actor:Actor) {
    this.actorSeleccionadoSubject.next(actor);
  }

  //método que agrege un actor al arreglo
  agregarActor(actor:Actor){
    return this.firestore.collection('actores').add(Object.assign({},actor));
  }
  deleteActor(actorId:string){
    this.firestore.doc('actores/'+actorId).delete();
  }
  //método que actualiza un actor
  updateActor(actor:Actor){
    this.firestore.doc('actores/'+actor.id).update(actor);
  }
}
