import { Injectable } from '@angular/core';
import { DatabaseService } from './db.service';
import { Destinos } from '../modelo/destinos';

@Injectable({
  providedIn: 'root'
})
export class DestinosService {

  constructor(
    private databaseService: DatabaseService 
  ) { }

  async agregarValor(destino:Destinos){
    this.databaseService.insertarValor(destino)
  }
  async getDestinos():Promise<Destinos[]>{
    return this.databaseService.obtenerTodos()
  }
  async eliminarDestino(destino:Destinos){
    if(destino.name != undefined ){
      await this.databaseService.eliminar(destino.name)
    }
  }
}
