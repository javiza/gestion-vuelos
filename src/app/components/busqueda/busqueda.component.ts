import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonButtons,
   IonIcon, IonImg, IonButton, IonLabel, IonList, IonItem, IonSearchbar } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { airplaneOutline, cameraOutline, trashOutline } from 'ionicons/icons'
import { addIcons } from 'ionicons';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular'
import { Destinos } from 'src/app/modelo/destinos';
import { DestinosVuelosDataSourceService } from '../../services/destinos-vuelos-data-source.service'; // Importa el servicio
import { Camera, Photo, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, IonHeader,
    IonToolbar, IonTitle, IonContent, IonLabel, IonButtons, IonIcon,
    IonImg, IonList, IonItem, IonButton, IonCard,
    IonSearchbar
  ],
})
export class BusquedaComponent implements OnInit {
  destinosFiltrados: Destinos[] = []
  destinoSeleccionado: Destinos | undefined = undefined

  toastMensaje: string = ""
  destinos: Destinos[] = []; //inicializa el arreglo de destino

  foto: Photo|null = null

  constructor(
    private route: ActivatedRoute,
    private toastController: ToastController,
    private destinoRepository: DestinosVuelosDataSourceService //inyecta el servicio
  ) {
    addIcons({
      airplaneOutline, cameraOutline, trashOutline
    })
  }
  async ngOnInit() {
      this.route.params.subscribe(async params => {
        this.destinos = params['resultados']; //obtiene el parametro 'resultados' de la ruta
        this.destinos = await this.destinoRepository.getDestinos(resultadosArray); //llama al metodo getDestinos del servicio
      })
    }

  
    manejarInput(event: any) {
      const terminoBuscado: string = event.target.value ?? ''
      const fnBusqueda = (destinos: string) =>
        destinos.toLowerCase().includes(terminoBuscado.toLowerCase())
      this.destinosFiltrados = this.destinos.filter(fnBusqueda)
    }
    abrirModalValor(destinos: Destinos) {
      this.destinoSeleccionado = destinos
    }
  async confirmarGuardarValor(){
      this.toastMensaje = `Confirmado ${this.destinoSeleccionado?.valor} en ${this.destinoSeleccionado}`
      await this.mostrarToast()
      this.cerrarModal()
    }
    cerrarModal(){
      this.abrirModalValor = false
    }
  async mostrarToast(){
      const toast = await this.toastController.create({
        message: this.toastMensaje,
        duration: 3000,
        position: "top"
      })
      await toast.present()
    }
  async tomarFoto(){
    this.foto = await Camera.getPhoto({
      quality:90,
      resultType: CameraResultType.Uri,
      saveToGallery: true,
      correctOrientation: true
    })
  }
  
}
