import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../models/peliculas';
import { TipoPelicula } from '../../models/tipo-peliculas';
import { PeliculasAcotresService } from '../../services/peliculas-acotres.service';

@Component({
  selector: 'app-lista-peliculas',
  templateUrl: './lista-peliculas.component.html',
  styleUrl: './lista-peliculas.component.css'
})
export class ListaPeliculasComponent implements OnInit{
//propiedades
peliculas:Pelicula[]=[];
pelicula= new Pelicula();

//constructor
constructor(private peliculasActoresService:PeliculasAcotresService){}


ngOnInit(): void {
  this.peliculasActoresService.getPeliculas().subscribe(data=>{
    this.peliculas=data.map(doc=>{
      return{
        ...doc.payload.doc.data() as Pelicula,
        id:doc.payload.doc.id
      };
    })
  });
}

//método para seleccionar un videojuego para modificarlo o eliminarlo

selectPelicula(peliculaSeleccionado: Pelicula) {
  this.peliculasActoresService.setPeliculaSeleccionado(peliculaSeleccionado);
}
// En el componente TypeScript
mostrarDetalle: boolean = false;

// Método para mostrar el detalle cuando se hace clic en el botón "Seleccionar"
mostrarDetallePelicula() {
  this.mostrarDetalle = true;
}
}
