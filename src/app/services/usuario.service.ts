import { inject, Injectable } from '@angular/core';
import { ServicesService } from './services.service';
import { DataService } from './data.service';
import { environment } from 'src/environments/environment.prod';
import { HttpParams } from '@angular/common/http';

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

  /**
   * Updates a user by sending a PUT request with the provided data to the update user API endpoint.
   * @param data The updated user data
   * @param id The ID of the user to be updated
   * @returns A promise that resolves with the response from the update user API
   */
  updateUser(data:any, id:number) {
    const url = `${ environment.apiUrl }${ environment.api.user.name }/${ environment.api.user.service.updateUser }/${ id }`;
    return this._service.promise(this._data.metodoPut(url, data));
  }

  /**
   * Searches for users by sending a POST request with the provided data to the search users API endpoint.
   * @param data The search criteria or data for the user query
   * @returns A promise that resolves with the response from the search users API
   */
  buscarUsuarios(data:any) {
    let params = new HttpParams();
    params = params.append('search', data);
    const param = params.toString();
    const url = `${ environment.apiUrl }${ environment.api.user.name }/${ environment.api.user.service.buscarUsuarios }?${param}`;
    return this._service.promise(this._data.metodoGet(url));
  }
}
