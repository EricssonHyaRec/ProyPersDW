import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = new BehaviorSubject<string | null>(null); //TOKEN ES COMO UN COOKIE
  token$ = this.token.asObservable(); // Observable para suscribirse al estado del token
  private Apiurl = "http://127.0.0.1:8000/api/"; // URL del backend

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  login(username: string, password: string) {
    const headers = { 'X-API-KEY': 'ok8G9wPyU2FouLHR4n5vKu8rehSplu7vG0f3' };
    this.http.post<{ token: string }>(this.Apiurl + 'login/', { username, password }, { headers }).subscribe(resp => {
      this.token.next(resp.token);                  //obtner una respuesta
      console.log(resp.token);                      //esto no esta en el codigo del ing "redirecciona el url "
      localStorage.setItem('token', resp.token);    //lo esta guardando en una cookie, el toekn
      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      this.router.navigateByUrl(returnUrl);
    }, error => {
      console.error('Error login', error);
    });
  }

  logout() {
    localStorage.removeItem('token'); //
   // this.token.next(null); // Asegúra de notificar que el token ya no existe
    this.router.navigate(['/login']);
    window.location.reload();
  } //asegurar que el token haya desaparecido

  getToken() {
    return this.token.value;
  }

  isLoggedIn() {
    return this.token.value !== null;
  }

  loadToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.token.next(token);
    }
    return this.token.value;
  }
  register(username: string, email: string, password: string) {
    this.http.post(this.Apiurl + 'register/', { username, email, password }).subscribe({
      next: (resp) => {
        console.log('Usuario registrado exitosamente', resp);
        this.router.navigate(['/login']); // Redirige al login tras registro exitoso
      },
      error: (error) => {
        console.error('Error al registrar usuario', error);
      },
    });
  }
}
