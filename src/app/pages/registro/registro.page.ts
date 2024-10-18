import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonImg, IonText, IonLabel, IonIcon, IonButton, IonInput } from '@ionic/angular/standalone';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ServicesService } from 'src/app/services/services.service';
import { addIcons } from 'ionicons';
import { eyeOffOutline, eyeOutline } from 'ionicons/icons';
import { AlertOptions } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonIcon, IonLabel, IonText, IonImg, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, ReactiveFormsModule]
})
export class RegistroPage implements OnInit {

  private fb:FormBuilder = new FormBuilder();
  private _user:UsuarioService = inject(UsuarioService);
  form: FormGroup = new FormGroup({});
  typePassword:boolean = false;
  typePasswordConfirmar:boolean = false;
  _services:ServicesService = inject(ServicesService);

  constructor() { 
    addIcons({ eyeOutline });
    addIcons({ eyeOffOutline });
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
      confirmarPassword: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
  }

  async saveUser(event:any) {
    console.log(event);
    this._services.addLoading(event.target);
    let data = this.form.getRawValue();
    data = {
      email: data.email,
      password: data.password,
      username: data.email.split('@')[0]
    }
    const dataAler:AlertOptions = {};
    dataAler.header = 'Registro';
    dataAler.buttons = ['Aceptar'];
    const res:any = await this._user.saveUser(data);
    if (!res.error) {
      dataAler.message = 'Usuario registrado correctamente';
      this._services.Alert(dataAler);
      this.form.reset();
      this._services.url('login');
    }
    this._services.removeLoading(event.target);
  }

}
