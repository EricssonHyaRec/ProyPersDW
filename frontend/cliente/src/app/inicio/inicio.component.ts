import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ApiService } from '../../service/apiService'; // Asegúrate de que ApiService esté bien importado
import { AuthService } from '../../service/auth';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  isAuthenticated = false;

  constructor( private router: Router, private api: ApiService, private activatedRoute: ActivatedRoute,
    public authService: AuthService) {}
    
  users: any[] = []; // Lista de usuarios
  userName: string = '';  // Variable para almacenar el nombre del usuario

  ngOnInit(): void {
    // Suscríbete al estado del token para detectar cambios en la autenticación
    this.authService.token$.subscribe(token => {
      this.isAuthenticated = !!token; // true si el token existe
    });

    // Carga el token inicial desde el localStorage
    this.authService.loadToken();
    this.api.getUserInfo().subscribe({
      next: (data: any) => {
        this.userName = data.username;  // Aquí obtienes el 'username' del usuario autenticado
      },
      error: (err) => console.error('Error al obtener los detalles del usuario', err),
    });
  }

  logout() {
    this.authService.logout();
  }

  /*Función para obtener la ruta activa actual
  private getChild(activatedRoute: ActivatedRoute): ActivatedRoute {
    let route = activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }
*/
  sidebarVisible: boolean = false;  // Controla la visibilidad del sidebar

  // Método para alternar la visibilidad del sidebar
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  // Evento para cuando el sidebar se cierra
  onSidebarHide() {
    console.log('Sidebar cerrado');
  }
}
