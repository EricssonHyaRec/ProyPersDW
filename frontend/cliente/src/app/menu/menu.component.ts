import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../service/auth';
import { ApiService } from '../../service/apiService';
import { ColorPicker } from 'primeng/colorpicker';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [AuthService, ApiService ]
})
export class MenuComponent implements OnInit {
  constructor(private auth:AuthService, private api:ApiService) {}

  items: MenuItem[]; // Menú dinámico
  mostrarMenu: boolean = false; // Controla si se muestra el menú
  isSuperUser: boolean = false; // Identifica si el usuario es superusuario
  userName: string = '';  // Variable para almacenar el nombre del usuario

  verificarLogin() {
    this.auth.loadToken();
    this.mostrarMenu = this.auth.isLoggedIn();
  }

  ngOnInit() {
    this.verificarLogin();
    this.api.getUserInfo().subscribe({
      next: (data: any) => {
        this.userName = data.username;  // Aquí obtienes el 'username' del usuario autenticado
      },
      error: (err) => console.error('Error al obtener los detalles del usuario', err),
    });

    // Consulta si el usuario es superusuario
    this.api.getUserInfo().subscribe({
      next: (userInfo: any) => {
        this.isSuperUser = userInfo.is_superuser; // Verifica si es superusuario

        // Define los ítems del menú
        this.items = [
          {
            label: 'Principal',
            icon: 'pi pi-home',
            routerLink: '/inicio',
          },
          {
            label: 'Medicos',
            icon: 'pi pi-id-card',
            routerLink: '/medicos',
          },
          {
            label: 'Citas',
            icon: 'pi pi-calendar-clock',
            routerLink: '/citas',
          },  
          ...(this.isSuperUser
            ? [
                {
                  label: 'Usuarios Registrados',
                  icon: 'pi pi-users',
                  routerLink: '/lista-usuarios',
                },
              ]
            : []),
          {
            label: 'Cerrar Sesión',
            icon: 'pi pi-ban',
            command: () => {
              this.auth.logout();
            },
          },
        ];
      },
      error: (err) => {
        console.error('Error al verificar si es superusuario', err);
      },
    });
  }
}
