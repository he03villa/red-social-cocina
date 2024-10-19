import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonApp, IonSplitPane } from '@ionic/angular/standalone';
import { NavComponent } from 'src/app/components/nav/nav.component';

@Component({
  selector: 'app-dashborad-home',
  templateUrl: './dashborad-home.page.html',
  styleUrls: ['./dashborad-home.page.scss'],
  standalone: true,
  imports: [IonSplitPane, IonApp, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NavComponent]
})
export class DashboradHomePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
