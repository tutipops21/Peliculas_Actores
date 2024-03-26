import { Component, OnInit } from '@angular/core';
import { Actor } from '../../models/actores';
import { PeliculasAcotresService } from '../../services/peliculas-acotres.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { Pelicula } from '../../models/peliculas';

@Component({
  selector: 'app-alta-actores',
  templateUrl: './alta-actores.component.html',
  styleUrl: './alta-actores.component.css'
})
export class AltaActoresComponent implements OnInit{

    //propiedades
    letras = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/;
    letrasNumeros= /^[a-zA-ZáéíóúÁÉÍÓÚ0-9#.]+$/;
    numeros= /^[0-9]+$/;
    NombreIncorrecto=false;
    ApellidoIncorrecto=false;
    EdadIncorrecto=false;
    NacionalidadIncorrecta=false;
    GeneroIncorrecto=false;
    DireccionIncorrecta=false;
    UPIncorrecta=false;
    NombreIncorrecto2=false;
    ApellidoIncorrecto2=false;
    EdadIncorrecto2=false;
    NacionalidadIncorrecta2=false;
    GeneroIncorrecto2=false;
    DireccionIncorrecta2=false;
    UPIncorrecta2=false;
    peliculas:Pelicula[]=[];
    pelicula= new Pelicula();
    actor= new Actor();
    actorSeleccionado: Actor | null=null;
    actorForm!: FormGroup;
  
    //constructor
    constructor(private peliculasAcotresService:PeliculasAcotresService ){}

    ngOnInit(): void {
  
      this.peliculasAcotresService.actorSeleccionado$.subscribe(actor => {
        this.actorSeleccionado = actor;
        if (actor) {
          // Copiar los datos del cliente seleccionado para su edición si es necesario
          this.actor = { ...actor };
        } else {
          // Si no hay cliente seleccionado, limpiar los datos
          this.actor = new Actor();
        }
      });
      this.peliculasAcotresService.getPeliculas().subscribe(data=>{
        this.peliculas=data.map(doc=>{
          return{
            ...doc.payload.doc.data() as Pelicula,
            id:doc.payload.doc.id
          };
        })
      });
    }
  
    insertarActor() {
      this.validarNombre();
      this.validarApellido();
      this.validarEdad();
      this.validarDireccion();
      this.validarGenero();
      this.validarNacionalidad();
      this.validarUP();
      this.validarNombre2();
      this.validarApellido2();
      this.validarEdad2();
      this.validarGenero2();
      this.validarNacionalidad2();
      this.validarUP2();
      if(this.validarCaracteresEspeciales()){
        this.peliculasAcotresService.agregarActor(this.actor);
        this.actor = new Actor();
      }    
    }
  
    updateActor() {
      this.validarNombre();
      this.validarApellido();
      this.validarEdad();
      this.validarDireccion();
      this.validarGenero();
      this.validarNacionalidad();
      this.validarUP();
      this.validarNombre2();
      this.validarApellido2();
      this.validarEdad2();
      this.validarGenero2();
      this.validarNacionalidad2();
      this.validarUP2();
      if(this.validarFormulario() && this.validarCaracteresEspeciales() &&this.actorSeleccionado){
          this.peliculasAcotresService.updateActor(this.actor);
          this.actor = new Actor();
      }
      
    }
  
    deleteActor() {
        if (this.actorSeleccionado) {
          this.peliculasAcotresService.deleteActor(this.actorSeleccionado.id);
          this.actor = new Actor();
        }
    }
    validarFormulario(): boolean{
      if (!this.actor.nombre){
        return false;
      }
      if (!this.actor.apellido){
        return false;
      }
      if (!this.actor.edad){
        return false;
      }
      if (!this.actor.direccion){
        return false;
      }
      if (!this.actor.nacionalidad){
        return false;
      }
      if (!this.actor.genero){
        return false;
      }
      if (!this.actor.ultimaPelicula){
        return false;
      }
      return true;
    }
    validarCaracteresEspeciales(): boolean {
      const letras = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/;
      const letrasNumeros= /^[a-zA-ZáéíóúÁÉÍÓÚ0-9#.]+$/;
      const numeros= /^[0-9]+$/;

      if (!letras.test(this.actor.nombre)){
        return false;
      }
      if (!letras.test(this.actor.apellido)){
        return false;
      }
      if (!letras.test(this.actor.genero)){
        return false;
      }
      if (!letras.test(this.actor.nacionalidad)){
        return false;
      }
      if (!letras.test(this.actor.ultimaPelicula)){
        return false;
      }
      if (!numeros.test(this.actor.edad.toString())){
        return false;
      }
      return true;
    }
    validarNombre2():boolean{
      if (!this.letras.test(this.actor.nombre)){
        this.NombreIncorrecto2=true;
        return false;
      }else{
        this.NombreIncorrecto2=false;
      }
      return true
    }
    validarApellido2():boolean{
      if (!this.letras.test(this.actor.apellido)){
        this.ApellidoIncorrecto2=true;
        return false;
      }else{
        this.ApellidoIncorrecto2=false;
      }
      return true
    }
    validarEdad2():boolean{
      if (!this.numeros.test(this.actor.edad.toString())){
        this.EdadIncorrecto2=true;
        return false;
      }else{
        this.EdadIncorrecto2=false;
      }
      return true
    }
    validarDireccion2():boolean{
      if (!this.letrasNumeros.test(this.actor.direccion)){
        this.DireccionIncorrecta2=true;
        return false;
      }else{
        this.DireccionIncorrecta2=false;
      }
      return true
    }
    validarNacionalidad2():boolean{
      if (!this.letras.test(this.actor.nacionalidad)){
        this.NacionalidadIncorrecta2=true;
        return false;
      }else{
        this.NacionalidadIncorrecta2=false;
      }
      return true
    }
    validarGenero2():boolean{
      if (!this.letras.test(this.actor.genero)){
        this.GeneroIncorrecto2=true;
        return false;
      }else{
        this.GeneroIncorrecto2=false;
      }
      return true
    }
    validarUP2():boolean{
      if (!this.letras.test(this.actor.ultimaPelicula)){
        this.UPIncorrecta2=true;
        return false;
      }else{
        this.UPIncorrecta2=false;
      }
      return true
    }
    
    validarNombre():boolean{
      if (!this.actor.nombre){
        this.NombreIncorrecto=true;
        return false;
      }else{
        this.NombreIncorrecto=false;
      }
      return true
    }
    validarApellido():boolean{
      if (!this.actor.apellido){
        this.ApellidoIncorrecto=true;
        return false;
      }else{
        this.ApellidoIncorrecto=false;
      }
      return true
    }
    validarEdad():boolean{
      if (!this.actor.edad){
        this.EdadIncorrecto=true;
        return false;
      }else{
        this.EdadIncorrecto=false;
      }
      return true
    }
    validarDireccion():boolean{
      if (!this.actor.direccion){
        this.DireccionIncorrecta=true;
        return false;
      }else{
        this.DireccionIncorrecta=false;
      }
      return true
    }
    validarNacionalidad():boolean{
      if (!this.actor.nacionalidad){
        this.NacionalidadIncorrecta=true;
        return false;
      }else{
        this.NacionalidadIncorrecta=false;
      }
      return true
    }
    validarGenero():boolean{
      if (!this.actor.genero){
        this.GeneroIncorrecto=true;
        return false;
      }else{
        this.GeneroIncorrecto=false;
      }
      return true
    }
    validarUP():boolean{
      if (!this.actor.ultimaPelicula){
        this.UPIncorrecta=true;
        return false;
      }else{
        this.UPIncorrecta=false;
      }
      return true
    }
}
