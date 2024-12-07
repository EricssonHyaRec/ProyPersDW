import { Component } from '@angular/core';
import { ApiService } from '../../service/apiService';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  usuario = {
    username: '',
    email: '',
    password: '',
  };

  constructor(private apiService: ApiService) {}

  registrarUsuario() {
    this.apiService.registrarUsuario(this.usuario).subscribe({
      next: (response) => {
        alert('Usuario registrado con éxito');
        this.usuario = { username: '', email: '', password: '' };
      },
      error: (error) => {
        console.error('Error en el registro:', error);
        alert('Hubo un problema al registrar el usuario.');
      },
    });
  }
}
