import { Component, inject, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { notifications, menuOutline, homeOutline, personOutline } from 'ionicons/icons';
import { IonHeader, IonToolbar, IonButtons, IonImg, IonButton, IonIcon, IonMenuButton, IonSearchbar } from "@ionic/angular/standalone";
import { routes } from 'src/app/app.routes';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  standalone: true,
  imports: [IonSearchbar, IonIcon, IonButton, IonImg, IonButtons, IonToolbar, IonHeader, IonMenuButton],
})
export class NavComponent implements OnInit {

  arrayRutas = routes.find(route => route.path === 'dashboard')?.children?.filter(route => route.data).map(route => ({...route, activo: false})) || [];
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _services:ServicesService = inject(ServicesService);
  style = "with: '36px'";

  constructor() { 
    this.urlActiva(this._route.snapshot.url[0]?.path || '');
    addIcons({ personOutline, homeOutline });
    addIcons({ notifications, menuOutline });
    this._router.events.subscribe((events) => {
      if (events instanceof NavigationEnd) {
        const url = events.url.split('/')[2];
        this.urlActiva(url || '');
      }
    })
  }

  ngOnInit() {}

  urlActiva(url: string) {
    this.arrayRutas = this.arrayRutas.map(route => ({...route, activo: false}));
    const posi = this.arrayRutas.findIndex(route => route.path === url);
    this.arrayRutas[posi].activo = true;
  }

  irPagina(url: string) {
    this._services.url(`dashboard/${url}`);
  }

  clicBuscar() {
    console.log(this.style);
    this.style = "with: '100%'" ;
  }

}
