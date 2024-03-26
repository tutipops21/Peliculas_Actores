import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import {AngularFireModule} from '@angular/fire/compat';
import{AngularFireDatabaseModule} from '@angular/fire/compat/database';
import { environment } from '../environments/environment.development';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AltaPeliculasComponent } from './pages/alta-peliculas/alta-peliculas.component';
import { AltaActoresComponent } from './pages/alta-actores/alta-actores.component';
import { ListaActoresComponent } from './pages/lista-actores/lista-actores.component';
import { ListaPeliculasComponent } from './pages/lista-peliculas/lista-peliculas.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AltaPeliculasComponent,
    AltaActoresComponent,
    ListaActoresComponent,
    ListaPeliculasComponent,
    NavbarComponent,
    InicioComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [
    provideClientHydration(),
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
