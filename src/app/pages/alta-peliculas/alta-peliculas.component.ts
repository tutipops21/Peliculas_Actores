import { Component,OnInit } from '@angular/core';
import { Pelicula } from '../../models/peliculas';
import { TipoPelicula } from '../../models/tipo-peliculas';
import { PeliculasAcotresService } from '../../services/peliculas-acotres.service';
import { Actor } from '../../models/actores';

@Component({
  selector: 'app-alta-peliculas',
  templateUrl: './alta-peliculas.component.html',
  styleUrl: './alta-peliculas.component.css'
})
export class AltaPeliculasComponent implements OnInit {

  //propiedades
  letras = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/;
  letrasNumeros= /^[a-zA-ZáéíóúÁÉÍÓÚ0-9#.]+$/;
  numeros= /^[0-9]+$/;
  TituloIncorrecto=false;
  GeneroIncorrecto=false;
  DescripcionIncorrecto=false;
  YearIncorrecto=false;
  RecaudacionIncorrecto=false;
  ClasificacionIncorrecto=false;
  ProtaIncorrecto=false;
  TituloIncorrecto2=false;
  GeneroIncorrecto2=false;
  DescripcionIncorrecto2=false;
  YearIncorrecto2=false;
  RecaudacionIncorrecto2=false;
  ClasificacionIncorrecto2=false;
  ProtaIncorrecto2=false;
  actores:Actor[]=[];
  actor= new Actor();
  pelicula= new Pelicula();
  tipos:TipoPelicula[]=[];
  peliculaSeleccionado: Pelicula | null=null;

  //constructor
  constructor(private peliculasAcotresService:PeliculasAcotresService){}

  ngOnInit(): void {
    
    this.tipos = this.peliculasAcotresService.getTipos();

    this.peliculasAcotresService.peliculaSeleccionado$.subscribe(pelicula => {
      this.peliculaSeleccionado = pelicula;
      if (pelicula) {
        // Copiar los datos del cliente seleccionado para su edición si es necesario
        this.pelicula = { ...pelicula };
      } else {
        // Si no hay cliente seleccionado, limpiar los datos
        this.pelicula = new Pelicula();
      }
    });
    this.peliculasAcotresService.getActores().subscribe(data=>{
      this.actores=data.map(doc=>{
        return{
          ...doc.payload.doc.data() as Actor,
          id:doc.payload.doc.id
        };
      })
    });
  }

  
  insertarPelicula() {
    this.validarClasificacion();
    this.validarFecha();
    this.validarProta();
    this.validarGenero();
    this.validarDescripcion();
    this.validarTitulo();
    this.validarrecaudacion();
    this.validarClasificacion2();
    this.validarFecha2();
    this.validarProta2();
    this.validarGenero2();
    this.validarrecaudacion2();
    if(this.validarFormulario() && this.validarCaracteresEspeciales()){
      this.peliculasAcotresService.agregarPelicula(this.pelicula);
      this.pelicula = new Pelicula();
    }  
    
  }

  updatePelicula() {
    this.validarClasificacion();
    this.validarFecha();
    this.validarProta();
    this.validarGenero();
    this.validarDescripcion();
    this.validarTitulo();
    this.validarrecaudacion();
    this.validarClasificacion2();
    this.validarFecha2();
    this.validarProta2();
    this.validarGenero2();
    this.validarrecaudacion2();
    if (this.validarFormulario() &&this.validarCaracteresEspeciales() &&this.peliculaSeleccionado) {
      this.peliculasAcotresService.updatePelicula(this.pelicula);
      this.pelicula = new Pelicula();
    }
  }

  deletePelicula() {
    if (this.peliculaSeleccionado) {
      this.peliculasAcotresService.deletePelicula(this.peliculaSeleccionado.id);
      this.pelicula = new Pelicula();
    }
  }
  validarFormulario(): boolean{
    if (!this.pelicula.titulo){
      return false;
    }
    if (!this.pelicula.genero){
      return false;
    }
    if (!this.pelicula.descripcion){
      return false;
    }
    if (!this.pelicula.recaudacion){
      return false;
    }
    if (!this.pelicula.fecha){
      return false;
    }
    if (!this.pelicula.protagonista){
      return false;
    }
    if (!this.pelicula.clasificacion){
      return false;
    }
    return true;
  }
  validarCaracteresEspeciales(): boolean {
    const letras = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/;
    const letrasNumeros= /^[a-zA-ZáéíóúÁÉÍÓÚ0-9#.]+$/;
    const numeros= /^[0-9]+$/;

    if (!letras.test(this.pelicula.protagonista)){
      return false;
    }
    if (!numeros.test(this.pelicula.clasificacion.toString())){
      return false;
    }
    if (!letras.test(this.pelicula.genero)){
      return false;
    }
    if (!numeros.test(this.pelicula.recaudacion.toString())){
      return false;
    }
    if (!numeros.test(this.pelicula.fecha.toString())){
      return false;
    }
    return true;
  }
  
  validarGenero2():boolean{
    if (!this.letras.test(this.pelicula.genero)){
      this.GeneroIncorrecto2=true;
      return false;
    }else{
      this.GeneroIncorrecto2=false;
    }
    return true;
  }
  validarFecha2():boolean{
    if (!this.numeros.test(this.pelicula.fecha.toString())){
      this.YearIncorrecto2=true;
      return false;
    }else{
      this.YearIncorrecto2=false;
    }
    return true;
  }
  validarrecaudacion2():boolean{
    if (!this.numeros.test(this.pelicula.recaudacion.toString())){
      this.RecaudacionIncorrecto2=true;
      return false;
    }else{
      this.RecaudacionIncorrecto2=false;
    }
    return true;
  }
  validarProta2():boolean{
    if (!this.letras.test(this.pelicula.protagonista)){
      this.ProtaIncorrecto2=true;
      return false;
    }else{
      this.ProtaIncorrecto2=false;
    }
    return true;
  }
  validarClasificacion2():boolean{
    if (!this.numeros.test(this.pelicula.clasificacion)){
      this.ClasificacionIncorrecto2=true;
      return false;
    }else{
      this.ClasificacionIncorrecto2=false;
    }
    return true;
  }
  validarTitulo():boolean{
    if (!this.pelicula.titulo){
      this.TituloIncorrecto=true;
      return false;
    }else{
      this.TituloIncorrecto=false;
    }
    return true;
  }
  validarDescripcion():boolean{
    if (!this.pelicula.descripcion){
      this.DescripcionIncorrecto=true;
      return false;
    }else{
      this.DescripcionIncorrecto=false;
    }
    return true;
  }
  validarGenero():boolean{
    if (!this.pelicula.genero){
      this.GeneroIncorrecto=true;
      return false;
    }else{
      this.GeneroIncorrecto=false;
    }
    return true;
  }
  validarFecha():boolean{
    if (!this.pelicula.fecha){
      this.YearIncorrecto=true;
      return false;
    }else{
      this.YearIncorrecto=false;
    }
    return true;
  }
  validarrecaudacion():boolean{
    if (!this.pelicula.recaudacion){
      this.RecaudacionIncorrecto=true;
      return false;
    }else{
      this.RecaudacionIncorrecto=false;
    }
    return true;
  }
  validarProta():boolean{
    if (!this.pelicula.protagonista){
      this.ProtaIncorrecto=true;
      return false;
    }else{
      this.ProtaIncorrecto=false;
    }
    return true;
  }
  validarClasificacion():boolean{
    if (!this.pelicula.clasificacion){
      this.ClasificacionIncorrecto=true;
      return false;
    }else{
      this.ClasificacionIncorrecto=false;
    }
    return true;
  }
}
