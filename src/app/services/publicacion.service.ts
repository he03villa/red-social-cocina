import { inject, Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ServicesService } from './services.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  private _data: DataService = inject(DataService);
  private _service: ServicesService = inject(ServicesService);

  constructor() { }

  savePublicacion(data:any) {
    const url = `${ environment.apiUrl }${ environment.api.publicacion.name }/${ environment.api.publicacion.service.savePublicacion }`;
    return this._service.promise(this._data.metodoPost(url, data));
  }
}
