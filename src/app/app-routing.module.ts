import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { AltaActoresComponent } from './pages/alta-actores/alta-actores.component';
import { AltaPeliculasComponent } from './pages/alta-peliculas/alta-peliculas.component';
import { ListaActoresComponent } from './pages/lista-actores/lista-actores.component';
import { ListaPeliculasComponent } from './pages/lista-peliculas/lista-peliculas.component';

const routes: Routes = [
  {path:'',redirectTo:'/inicio',pathMatch:'full'},
  {path:'inicio',component:InicioComponent},
  {path:'alta-actores',component:AltaActoresComponent},
  {path:'alta-peliculas',component:AltaPeliculasComponent},
  {path:'lista-actores',component:ListaActoresComponent},
  {path:'lista-peliculas',component:ListaPeliculasComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
