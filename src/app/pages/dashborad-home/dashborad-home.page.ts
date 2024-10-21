import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonApp, IonSplitPane, IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { NavComponent } from 'src/app/components/nav/nav.component';
import { CrearPublicacionComponent } from 'src/app/components/crear-publicacion/crear-publicacion.component';

@Component({
  selector: 'app-dashborad-home',
  templateUrl: './dashborad-home.page.html',
  styleUrls: ['./dashborad-home.page.scss'],
  standalone: true,
  imports: [IonIcon, IonTabButton, IonTabBar, IonSplitPane, IonApp, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NavComponent, CrearPublicacionComponent]
})
export class DashboradHomePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
