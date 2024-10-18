import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AlertOptions } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private _router:Router = inject(Router);
  private alertController: AlertController = inject(AlertController);

  constructor() { }

  /**
   * Navigate to a given url
   * @param url The url to navigate to
   */
  url(url:string) {
    this._router.navigate([url]);
  }

  /**
   * Creates an alert with the given data and presents it
   * @param data The options to create the alert
   */
  async Alert(data:AlertOptions) {
    const alert = await this.alertController.create(data);
    await alert.present();
  }

  /**
   * Transforms an observable into a promise, also handle the error with an alert
   * @param subscribe The observable to transform
   * @returns A promise that resolve with the data of the observable or an error
   */
  promise(subscribe:Observable<any>) {
    return new Promise((resolve, reject) => subscribe.subscribe((resul) => resolve(resul), async error => {
      const dataAler:AlertOptions = {};
      if (error.status == 500) {
        dataAler.message = error.error.message;
      } else if (error.status == 400) {
        dataAler.message = error.error.errors[0].message;
      }
      if (dataAler.message !== 'El usuario no se ha activado') {
        if (error.status == 401) {
          const res:any = await this.Alert(dataAler);
          console.log('entro');
          localStorage.removeItem('dataUser');
          location.href = '';
          resolve(error);
        } else {
          this.Alert(dataAler);
        }
        resolve(error);
      } else {
        resolve({ code: 1001, messege: "Activar cuenta" });
      }
    }));
  }

  /**
   * Clears the user data from local storage and navigates to the login page.
   */
  cerrarSesion() {
    localStorage.removeItem('dataUser');
    this.url('login');
  }

  /**
   * Adds a loading spinner to the element passed as a parameter and disables it
   * @param target The HTML element to add the spinner to
   */
  addLoading(target: any) {
    if (target) {
      target.innerHTML += " <i class='fas fa-spinner fa-pulse'></i>"; 
      target.disabled = true;
    } else {
      console.error('El elemento HTML es nulo.');
    }
  }

  /**
   * Removes the loading spinner from the element passed as a parameter and enables it
   * @param target The HTML element to remove the spinner from
   */
  removeLoading(target: any) {
    if (target) {
      let spinner = target.lastChild;
      if (spinner) {
        target.removeChild(spinner);
      }
      target.disabled = false;
    } else {
      console.error('El elemento HTML es nulo.');
    }
  }
}
