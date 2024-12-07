import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  
import { ReactiveFormsModule } from '@angular/forms';


import { RouterModule } from '@angular/router';  // Importa RouterModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from '../service/interceptor';
import { PersonasComponent } from './personas/personas.component';
import { CitasComponent } from './citas/citas.component';

//controles PrimeNG
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { MenubarModule } from 'primeng/menubar';
import { FileUploadModule } from 'primeng/fileupload';
import { PasswordModule } from 'primeng/password';
import { SidebarModule } from 'primeng/sidebar';
import { CardModule } from 'primeng/card'; // Importa CardModule de PrimeNG
import { DataViewModule } from 'primeng/dataview';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { CalendarModule } from 'primeng/calendar';


import { OrderListModule } from 'primeng/orderlist';
import { MenuComponent } from './menu/menu.component';
import { UserlistComponent } from './userlist/userlist.component';
import { InicioComponent } from './inicio/inicio.component';
import { RegistroComponent } from './registro/registro.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PersonasComponent,
    CitasComponent,
    MenuComponent,
    UserlistComponent,
    InicioComponent,
    RegistroComponent,
  ],
  imports: [
    BrowserModule,
    DataViewModule,
    RouterModule,
    CalendarModule,
    SidebarModule,
    FormsModule,
    HttpClientModule,
    PanelModule,
    BrowserAnimationsModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    AppRoutingModule,  // Este módulo también debe estar presente
    DropdownModule,
    MenubarModule,
    FileUploadModule,
    InputTextModule,   // Módulo para campos de texto
    IconFieldModule,
    InputIconModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,      // Módulo para botones
    PasswordModule,
    CardModule,  // Asegúrate de agregar CardModule aquí
    SelectButtonModule,
    ReactiveFormsModule,
    ToastModule,
    MessageModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
