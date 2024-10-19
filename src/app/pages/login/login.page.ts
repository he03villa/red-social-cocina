import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonImg, IonText, IonLabel, IonIcon, IonInput, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoIonic, eyeOutline, eyeOffOutline } from 'ionicons/icons';
import { ServicesService } from 'src/app/services/services.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonIcon, IonLabel, IonText, IonImg, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  private fb:FormBuilder = new FormBuilder();
  private _user:UsuarioService = inject(UsuarioService);
  form: FormGroup = new FormGroup({});
  typePassword:boolean = false;
  _services:ServicesService = inject(ServicesService);

  constructor() { 
    addIcons({ eyeOutline });
    addIcons({ eyeOffOutline });
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
  }

  async login(event:any) {
    this._services.addLoading(event.target);
    const data = this.form.getRawValue();
    const res:any = await this._user.login(data);
    if (!res.error) {
      console.log(res);
      this.form.reset();
      localStorage.setItem('dataUser', JSON.stringify(res));
      this._services.url('/dashboard');
    }
    this._services.removeLoading(event.target);
  }

}
