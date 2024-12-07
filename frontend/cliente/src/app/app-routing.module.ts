import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../service/authGuard';
import { LoginComponent } from './login/login.component';
import { PersonasComponent } from './personas/personas.component';
import { MenuComponent } from './menu/menu.component';
import { UserlistComponent } from './userlist/userlist.component';
import { InicioComponent } from './inicio/inicio.component';
import { CitasComponent } from './citas/citas.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'medicos', component: PersonasComponent, canActivate :[AuthGuard]},
  //{ path: 'register', component: RegisterComponent },
  { path: 'registro', component: RegistroComponent },

  { path: 'menu', component: MenuComponent, canActivate :[AuthGuard]},
  { path: 'lista-usuarios', component: UserlistComponent ,canActivate :[AuthGuard]},
  { path: 'inicio', component: InicioComponent ,canActivate :[AuthGuard]},
  { path: 'citas', component: CitasComponent ,canActivate :[AuthGuard]},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
