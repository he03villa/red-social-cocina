import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { addIcons } from "ionicons";
import { arrowBackOutline, pencilOutline, text, trashOutline } from "ionicons/icons";
import { ModalController, AlertOptions } from '@ionic/angular';
import { IonContent, IonTitle, IonHeader, IonToolbar, IonBackButton, IonButtons, IonButton, IonIcon, IonLabel, IonItem, IonSelectOption, IonSelect, IonTextarea } from "@ionic/angular/standalone";
import { ServicesService } from 'src/app/services/services.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PublicacionService } from 'src/app/services/publicacion.service';

@Component({
  selector: 'app-crear-publicacion-modal',
  templateUrl: './crear-publicacion-modal.component.html',
  styleUrls: ['./crear-publicacion-modal.component.scss'],
  standalone: true,
  imports: [IonTextarea, IonItem, IonLabel, IonIcon, IonButton, IonButtons, IonBackButton, IonToolbar, IonHeader, IonTitle, IonContent, IonSelectOption, IonSelect, ReactiveFormsModule],
  providers: [ModalController],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CrearPublicacionModalComponent  implements OnInit {

  private modalCtrl: ModalController = inject(ModalController);
  private _services:ServicesService = inject(ServicesService);
  private _publicaicon:PublicacionService = inject(PublicacionService);
  private fb:FormBuilder = new FormBuilder();
  form: FormGroup = new FormGroup({});
  dataUser:any = {};

  dataFile: Array<any> = [];

  /**
   * Constructor
   *
   * Registers the `caretBack` icon with `ionicons` so that it can be used
   * in the component's template.
   */
  constructor() {
    addIcons({
      arrowBackOutline,
      pencilOutline,
      trashOutline
    });
    this.form = this.fb.group({
      descripcion: ['', Validators.compose([Validators.required])],
    })
  }

  ngOnInit() {
    const data = localStorage.getItem('dataUser');
    if (data) {
      this.dataUser = JSON.parse(data);
    }
  }

  /**
   * Closes the modal by dismissing it from the view.
   */
  salir() {
    this.modalCtrl.dismiss();
  }

  /**
   * Cambia la foto o video para la publicacion
   * @param event Evento que se dispara al cambiar el archivo
   * @param indice1 Indice que indica si se va a subir una imagen o un video
   * @param indice2 Indice que indica si se va a actualizar una imagen o un video, si es -1 se va a subir una imagen o un video
   * @returns Promesa que se resuelve cuando se carga el archivo
   */
  async cambiarFoto(event: any, indice1: number, indice2: number = -1) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      console.log(file, indice1);
      const dataAler:AlertOptions = {};
      if (indice1 == 1) {
        dataAler.header = 'Cargar imagen';
        dataAler.buttons = ['Aceptar'];
        if (file.type != "image/jpeg" && file.type != "image/png") {
          dataAler.message = 'El archivo debe ser una imagen en formato JPEG o PNG';
          this._services.Alert(dataAler);
          return;
        }
        if (file.size > 5000000) {
          dataAler.message = 'El archivo no debe pasar de 5MB';
          this._services.Alert(dataAler);
          return;
        }
      }
      if (indice1 == 2) {
        dataAler.header = 'Cargar video';
        dataAler.buttons = ['Aceptar'];
        if (file.type != "video/mp4") {
          dataAler.message = 'El archivo debe ser un video en formato mp4';
          this._services.Alert(dataAler);
          return;
        }
      }
      const res:any = await this._services.cargar_img(file);
      if (indice2 != -1) {
        this.dataFile[indice2].url = res;
        this.dataFile[indice2].type = indice1;
      } else {
        this.dataFile.push({ url: res, type: indice1 });
      }
      event.target.value = '';
    }
  }

  /**
   * Elimina un archivo de la lista de archivos
   * @param indice Indice del archivo que se va a eliminar
   */
  eliminarArchivo(indice: number) {
    this.dataFile.splice(indice, 1);
  }

/**
 * Saves the publication by gathering data from the form and uploaded files, then sends it to the server.
 * Displays loading and success/error messages based on the outcome.
 * @param event The event that triggered the save operation, used to manage loading state.
 * @returns A promise that resolves when the publication save operation is complete.
 */
  async savePublicacion(event: any) {
    this._services.addLoading(event.target);
    const dataForm = this.form.getRawValue();
    const arrayBase = this.dataFile.map((item) => item.url);
    const data = {
      text: dataForm.descripcion,
      fotos: arrayBase
    };
    const resPu:any = await this._publicaicon.savePublicacion(data);
    if (!resPu.error) {
      this._services.Alert({
        header: 'Publicado',
        message: 'La publicacion se ha guardado correctamente',
        buttons: ['Aceptar']
      });
      this.form.reset();
      this.dataFile = [];
      this.salir();
    }
    this._services.removeLoading(event.target);
  }

}
