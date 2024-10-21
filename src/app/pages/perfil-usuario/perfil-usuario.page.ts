import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonImg, IonText, IonLabel, IonButton, IonInput } from '@ionic/angular/standalone';
import { AlertOptions } from '@ionic/angular';
import { NavComponent } from 'src/app/components/nav/nav.component';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
  standalone: true,
  imports: [IonInput, IonButton, IonLabel, IonText, IonImg, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, ReactiveFormsModule, NavComponent]
})
export class PerfilUsuarioPage implements OnInit {

  private fb:FormBuilder = new FormBuilder();
  private _user:UsuarioService = inject(UsuarioService);
  _services:ServicesService = inject(ServicesService);
  form: FormGroup = new FormGroup({});
  dataUser:any = {};

  constructor() { 
    const data = localStorage.getItem('dataUser');
    if (data) {
      this.dataUser = JSON.parse(data);
    }
    this.form = this.fb.group({
      nombre: [this.dataUser?.nombre || '', Validators.compose([Validators.required])],
      telefono: [this.dataUser?.telefono || '', Validators.compose([Validators.required])],
    });
    console.log(this.dataUser);
    console.log(this.form);
  }

  ngOnInit() {
  }

  /**
   * Actualiza el usuario actual en la base de datos.
   * @param event Evento que activ  el llamado a este m todo
   */
  async updateUser(event:any) {
    this._services.addLoading(event.target);
    const data = this.form.getRawValue();
    const res:any = await this._user.updateUser(data, this.dataUser.id);
    if (!res.error) {
      const dataAler:AlertOptions = {};
      dataAler.header = 'Información';
      dataAler.buttons = ['Aceptar'];
      dataAler.message = 'Información actualizada correctamente';
      this._services.Alert(dataAler);
      this.dataUser.nombre = data.nombre;
      this.dataUser.telefono = data.telefono;
      localStorage.setItem('dataUser', JSON.stringify(this.dataUser));
    }
    this._services.removeLoading(event.target);
  }

}
