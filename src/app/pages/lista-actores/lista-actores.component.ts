import { Component, OnInit } from '@angular/core';
import { Actor } from '../../models/actores';
import { PeliculasAcotresService } from '../../services/peliculas-acotres.service';

@Component({
  selector: 'app-lista-actores',
  templateUrl: './lista-actores.component.html',
  styleUrl: './lista-actores.component.css'
})
export class ListaActoresComponent implements OnInit{
//propiedades
actores:Actor[]=[];
actor= new Actor();

//constructor
constructor(private peliculasActoresService:PeliculasAcotresService){}


ngOnInit(): void {
  this.peliculasActoresService.getActores().subscribe(data=>{
    this.actores=data.map(doc=>{
      return{
        ...doc.payload.doc.data() as Actor,
        id:doc.payload.doc.id
      };
    })
  });
}

//método para seleccionar un videojuego para modificarlo o eliminarlo

selectActor(actorSeleccionado: Actor) {
  this.peliculasActoresService.setActorSeleccionado(actorSeleccionado);
}
// En el componente TypeScript
mostrarDetalle: boolean = false;

// Método para mostrar el detalle cuando se hace clic en el botón "Seleccionar"
mostrarDetallePelicula() {
  this.mostrarDetalle = true;
}
}
