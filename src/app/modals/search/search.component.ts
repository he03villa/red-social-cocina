import { Component, inject, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonToolbar, IonSearchbar, IonButtons, IonButton, IonIcon, IonTitle, IonList, IonLabel, IonItem, IonAvatar } from "@ionic/angular/standalone";
import { ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports: [IonAvatar, IonItem, IonLabel, IonList, IonTitle, IonIcon, IonButton, IonButtons, IonSearchbar, IonToolbar, IonHeader, IonContent, ],
})
export class SearchComponent  implements OnInit {

  private modalCtrl: ModalController = inject(ModalController);
  private _user:UsuarioService = inject(UsuarioService);
  _services:ServicesService = inject(ServicesService);
  arrayUser: Array<any> = [];

  constructor() {
    addIcons({
      arrowBackOutline,
    });
   }

  ngOnInit() {
    this.buscarUser(undefined);
  }

  /**
   * Closes the modal by dismissing it from the view.
   */
  salir() {
    this.modalCtrl.dismiss();
  }

  /**
   * Busca usuarios seg n el texto de b squeda proporcionado.
   * Si no se proporciona texto, se devuelve la lista de todos los usuarios.
   * @param event El evento que se dispara al escribir en el campo de b squeda.
   * @returns Promesa que se resuelve con la respuesta del servidor.
   */
  async buscarUser(event: any) {
    let data = '';
    if (event) {
      data = event.detail.value;
    }
    const resP:any = await this._user.buscarUsuarios(data);
    if (!resP.error) {
      this.arrayUser = resP;
    }
    console.log(resP);
  }

}
