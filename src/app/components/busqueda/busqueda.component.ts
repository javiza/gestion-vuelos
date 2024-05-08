import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonList, IonItem, IonSearchbar } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss'],
  standalone: true,
  imports: [IonicModule,CommonModule,FormsModule, IonHeader, 
    IonToolbar, IonTitle, IonContent, IonLabel, IonList, IonSearchbar, IonItem],
})
export class BusquedaComponent  implements OnInit {

  constructor() { }

  ngOnInit(){
    this.destinosFiltrados = [...this.destinosVuelos]
  }
  manejarInput(event: any) {
    const terminoBuscado:string = event.target.value ?? ''
    const fnBusqueda = (destino:string) =>
      destino.toLowerCase().includes(terminoBuscado.toLowerCase())
    this.destinosFiltrados = this.destinosVuelos.filter(fnBusqueda)
  }
  destinosFiltrados:string[] = []
  destinosVuelos = [
    "sao paolo",
    "santiago",
    "chillan"
  ]

}
