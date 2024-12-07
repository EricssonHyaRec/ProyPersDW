import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth';
import { Persona } from '../../model/persona.model';
import { ApiService } from '../../service/apiService';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
  providers: [AuthService, ApiService ]

})
export class UserlistComponent implements OnInit {
  users: any[] = []; // Lista de usuarios
  isSuperUser: boolean = false; // Indicador si es superusuario
  userName: string = '';  // Variable para almacenar el nombre del usuario
  constructor(private auth:AuthService, private api:ApiService) {}

  ngOnInit(): void {
    this.api.getSuperUserUsers().subscribe({
      next: (data: any) => {
        this.users = data.usuarios;
        this.isSuperUser = this.users.length > 0; // Asume que si hay datos es superusuario
      },
      error: (err) => console.error('Error al obtener la lista de usuarios', err),
    });
    this.api.getUserInfo().subscribe({
      next: (data: any) => {
        this.userName = data.username;  // Aquí obtienes el 'username' del usuario autenticado
      },
      error: (err) => console.error('Error al obtener los detalles del usuario', err),
    });
  }
}
