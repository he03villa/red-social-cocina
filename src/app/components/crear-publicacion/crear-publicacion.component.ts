import { Component, inject, OnInit } from '@angular/core';
import { IonImg, IonTextarea, IonLabel, IonButton } from "@ionic/angular/standalone";
import { ModalController } from '@ionic/angular';
import { CrearPublicacionModalComponent } from 'src/app/modals/crear-publicacion-modal/crear-publicacion-modal.component';

@Component({
  selector: 'app-crear-publicacion',
  templateUrl: './crear-publicacion.component.html',
  styleUrls: ['./crear-publicacion.component.scss'],
  standalone: true,
  imports: [IonButton, IonLabel, IonTextarea, IonImg],
  providers: [ModalController],
})
export class CrearPublicacionComponent  implements OnInit {

  private modalCtrl: ModalController = inject(ModalController);

  constructor() { }

  ngOnInit() {}

  /**
   * Opens a modal with the specified component and data.
   * @param component The component to load into the modal.
   * @param data The data to pass to the modal component as input properties.
   * @returns A promise that resolves when the modal is presented.
   */
  async abrirModal(data: any) {
    const modal = await this.modalCtrl.create({
      component: CrearPublicacionModalComponent,
      componentProps: data
    });
    modal.present();
  }

}
