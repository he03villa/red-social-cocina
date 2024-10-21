import { inject, Injectable } from '@angular/core';
import { ServicesService } from './services.service';
import { DataService } from './data.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private _data: DataService = inject(DataService);
  private _service: ServicesService = inject(ServicesService);

  constructor() { }

  /**
   * Logs in a user by sending a POST request with the provided data to the login API endpoint.
   * @param data The login credentials or data for the user
   * @returns A promise that resolves with the response from the login API
   */
  login(data:any) {
    const url = `${ environment.apiUrl }${ environment.api.user.name }/${ environment.api.user.service.login }`;
    return this._service.promise(this._data.metodoPost(url, data));
  }

  /**
   * Saves a user by sending a POST request with the provided data to the save user API endpoint.
   * @param data The user data to be saved
   * @returns A promise that resolves with the response from the save user API
   */
  saveUser(data:any) {
    const url = `${ environment.apiUrl }${ environment.api.user.name }/${ environment.api.user.service.saveUser }`;
    return this._service.promise(this._data.metodoPost(url, data));
  }

  updateUser(data:any, id:number) {
    const url = `${ environment.apiUrl }${ environment.api.user.name }/${ environment.api.user.service.updateUser }/${ id }`;
    return this._service.promise(this._data.metodoPut(url, data));
  }
}
