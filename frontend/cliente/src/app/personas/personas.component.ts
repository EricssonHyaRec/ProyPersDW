import { Component } from '@angular/core';
import { AuthService } from '../../service/auth';
import { Persona } from '../../model/persona.model';
import { ApiService } from '../../service/apiService';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrl: './personas.component.css',
  providers: [AuthService, ApiService, ConfirmationService, MessageService ]
})
export class PersonasComponent {
  constructor(private auth:AuthService, private api:ApiService, private conf: ConfirmationService, private msg:MessageService ){}

  personas: Persona[];
  nuevaPersona:Persona = new Persona();
  visible:boolean = false;
  edicion:boolean = false;
  tituloDialogo:string = "";

  users: any[] = []; // Lista de usuarios
  isSuperUser: boolean = false; // Indicador si es superusuario
  userName: string = '';  // Variable para almacenar el nombre del usuario


  cargarPersonas(){
    this.api.getPersonas().subscribe(res => {
      this.personas = res;
    });
  }
  ngOnInit(){
    this.cargarPersonas();
    //OBTENER SI ES SUPERUSUARIO
    this.api.getSuperUserUsers().subscribe({
      next: (data: any) => {
        this.users = data.usuarios;
        this.isSuperUser = this.users.length > 0; // Asume que si hay datos es superusuario
      },
      error: (err) => console.error('Error al obtener la lista de usuarios', err),
    });
  }

  salir(){
    this.auth.logout();
  }

  verDialogo(){
    this.visible = true;
    this.nuevaPersona = new Persona();
    this.edicion = false;
    this.tituloDialogo="Crear Persona";
  }

  guardarPersona(){
    this.conf.confirm({
      message: 'Deseas continuar?',
      header: 'Confirmar Operación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        if (this.edicion) {
          this.api.putPersona(this.nuevaPersona).subscribe(res => {
            console.log(res);
            this.cargarPersonas();
            this.visible = false;
          });
        } else {
          this.api.postPersona(this.nuevaPersona).subscribe(res => {
            console.log(res);
            this.cargarPersonas();
            this.visible = false;
          });
        }
      }
    });
  }

  eliminarPersona(persona:Persona){
    this.conf.confirm({
      message: 'Deseas continuar con la eliminación de ' + persona.nombre + '?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        this.api.deletePersona(persona).subscribe(() => {
          this.cargarPersonas();
          this.msg.add({ severity: 'info', summary: 'Eliminado!', detail: 'El registro ha sido eliminado' });
        });
      }
    });
  }

  editarPersona(persona:Persona){
    this.nuevaPersona = persona;
    this.visible = true;
    this.edicion = true;
    this.tituloDialogo="Editar Persona";
  }
}