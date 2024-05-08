import { Component, OnInit } from '@angular/core';
import { IonRow, IonCol, IonIcon, IonImg, IonList, IonItem, IonButton, IonContent, IonCard} from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { airplaneOutline, cameraOutline, trashOutline } from 'ionicons/icons'
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-destinos',
  templateUrl: './destinos.component.html',
  styleUrls: ['./destinos.component.scss'],
  standalone: true,
  imports:[ IonicModule, CommonModule, FormsModule,IonRow, IonCol, IonIcon, IonImg, IonList, IonItem, IonButton, IonContent, IonCard

  ]
})
export class DestinosComponent  implements OnInit {

  constructor() { addIcons({
    airplaneOutline, cameraOutline, trashOutline
  })}

  ngOnInit() {}
  handleIconClick(icon: string) {
    console.log(`Se hizo clic en el icono ${icon}`);
    // Agrega aquí la lógica para manejar el clic en el icono
  }

}
