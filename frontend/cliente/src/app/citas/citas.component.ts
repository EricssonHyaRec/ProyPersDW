import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../service/auth';
import { Persona } from '../../model/persona.model';
import { ApiService } from '../../service/apiService';
import { ConfirmationService } from 'primeng/api';
import { Cita } from '../../model/cita.model';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css'],
  providers: [AuthService, ApiService, ConfirmationService],
})
export class CitasComponent {
  constructor(private auth: AuthService, private api: ApiService, private conf: ConfirmationService) {}

  citas: Cita[] = [];
  nuevaCita: Cita = new Cita();
  visible: boolean = false;
  edicion: boolean = false;
  tituloDialogo: string = '';

  personas: Persona[] = [];
  personaSeleccionada: Persona;

  userName: string = '';  // Variable para almacenar el nombre del usuario
  users: any[] = []; // Lista de usuarios
  isSuperUser: boolean = false; // Indicador si es superusuario
  
  ngOnInit() {
    this.cargarCitas();
    this.cargarPersonas();
    this.api.getUserInfo().subscribe({
      next: (data: any) => {
        this.userName = data.username;  // Aquí obtienes el 'username' del usuario autenticado
      },
      error: (err) => console.error('Error al obtener los detalles del usuario', err),
    });
    this.api.getSuperUserUsers().subscribe({
      next: (data: any) => {
        this.users = data.usuarios;
        this.isSuperUser = this.users.length > 0; // Asume que si hay datos es superusuario
      },
      error: (err) => console.error('Error al obtener la lista de usuarios', err),
    });
  }

  cargarCitas() {
    this.api.getCitas().subscribe((res) => {
      this.citas = res;
    });
  }

  cargarPersonas() {
    this.api.getPersonas().subscribe((res) => {
      this.personas = res;
    });
  }

  verDialogo() {
    this.visible = true;
    this.nuevaCita = new Cita();
    this.personaSeleccionada = new Persona();
    this.edicion = false;
    this.tituloDialogo = 'Crear Nueva Cita';
  }

  guardarCita() {
    this.conf.confirm({
      message: '¿Deseas continuar?',
      header: 'Confirmar Operación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        this.nuevaCita.fecha = new Date(this.nuevaCita.fecha).toISOString().split('T')[0]; //convierte la fecha en yy/mm/dd
        this.nuevaCita.medico = this.personaSeleccionada.id; // Asignar ID del médico seleccionado
        if (this.edicion) {
          this.api.putCita(this.nuevaCita).subscribe({
            next: () => {
              this.cargarCitas();
              this.visible = false;
            },
            error: (err) => console.error('Error al editar la cita:', err),
          });
        } else {
          this.api.postCita(this.nuevaCita).subscribe({
            next: () => {
              this.cargarCitas();
              this.visible = false;
            },
            error: (err) => console.error('Error al crear la cita:', err),
          });
        }
      },
    });
  }

  eliminarCita(cita: Cita) {
    this.conf.confirm({
      message: `¿Deseas continuar con la eliminación de la cita ${cita.asunto}?`,
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        this.api.deleteCita(cita).subscribe(() => {
          this.cargarCitas();
        });
      },
    });
  }

  editarCita(cita: Cita) {
    this.nuevaCita = { ...cita }; // Clonar la cita para evitar modificarla directamente
    this.personaSeleccionada =
      this.personas.find((p) => p.id === cita.medico) || new Persona();
    this.visible = true;
    this.edicion = true;
    this.tituloDialogo = '¿Deseas Editar tu Cita?';
  }
}
