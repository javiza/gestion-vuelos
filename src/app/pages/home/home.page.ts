import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonList, IonItem, IonSearchbar } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusquedaComponent } from '../../components/busqueda/busqueda.component';
import { DestinosComponent } from '../../components/destinos/destinos.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule,CommonModule,FormsModule, IonHeader, 
    IonToolbar, IonTitle, IonContent, IonLabel, IonList,
     IonSearchbar, IonItem, BusquedaComponent, DestinosComponent],
})
export class HomePage implements OnInit{
  ngOnInit(){}
  constructor (){}
 
}
