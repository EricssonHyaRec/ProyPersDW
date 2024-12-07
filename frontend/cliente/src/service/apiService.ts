import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Persona } from "../model/persona.model";
import { Cita } from "../model/cita.model";

//sirve para decirle al angular que esto es un servicio
@Injectable({
  providedIn: "root"
})

export class ApiService {
    private ApiUrl = "http://127.0.0.1:8000/api/"; // URL to web api
    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    };
    constructor(private http: HttpClient) {
    }
    
    
    //GET Personas
    public getPersonas(): Observable<Persona[]> {
      return this.http.get<Persona[]>(this.ApiUrl + 'personas/')
    }
  
      //POST Personas
    public postPersona(persona:Persona):Observable<Persona>{
      let cuerpo = JSON.stringify(persona);
    return this.http.post<Persona>(this.ApiUrl + 'personas/', cuerpo, this.httpOptions);
    }
  
      // DELETE Persona
    public deletePersona(persona:Persona): Observable<void> {
      return this.http.delete<void>(this.ApiUrl + 'personas/' + persona.id + '/');
    }
  
     //PUT PERSONA
    public putPersona(persona:Persona):Observable<Persona>{
      let cuerpo = JSON.stringify(persona);
    return this.http.put<Persona>(this.ApiUrl + 'personas/' + persona.id + '/', cuerpo, this.httpOptions);
    }

    // CRUD para Cita
    // Obtener todas las citas ---> seran filtradas por el backend de ahora
    // Obtener citas (ya filtradas por usuario en el backend)
    public getCitas(): Observable<Cita[]> {
      return this.http.get<Cita[]>(this.ApiUrl + 'citas/');
    }

    // Crear cita
    public postCita(cita: Cita): Observable<Cita> {
      let cuerpo = JSON.stringify(cita);
      return this.http.post<Cita>(this.ApiUrl + 'citas/', cuerpo, this.httpOptions);
    }

    // Eliminar cita
    public deleteCita(cita: Cita): Observable<void> {
      return this.http.delete<void>(this.ApiUrl + 'citas/' + cita.id + '/');
    }

    // Actualizar cita
    public putCita(cita: Cita): Observable<Cita> {
      let cuerpo = JSON.stringify(cita);
      return this.http.put<Cita>(this.ApiUrl + 'citas/' + cita.id + '/', cuerpo, this.httpOptions);
    }
  
//ME SIRVE PARA OBTENER LA INFO DE LOS USARIO Y SI SON SUPER O NORMALES
    getSuperUserUsers() {
      return this.http.get(this.ApiUrl + 'superuser/users/');
    }
    getUserInfo() {
      return this.http.get(this.ApiUrl + 'auth/userinfo/'); // Supón que el backend tiene este endpoint
    }
    registrarUsuario(usuario: any): Observable<any> {
      return this.http.post(`${this.ApiUrl}registro/`, usuario, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
} 