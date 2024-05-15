import { Injectable } from '@angular/core';
import { ResultadoAutosuggestDB, ResultadoGeonameDB } from '../ws/IvuelosDb';
import { Destinos } from '../modelo/destinos';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DestinosVuelosDataSourceService {
  private _baseUrlGeoname = "https://api.opentripmap.com/0.1/en/places/geoname?";
  private _baseUrlAutosuggest = "https://api.opentripmap.com/0.1/en/places/autosuggest?";

  constructor(private storage: Storage) { }

  async getDestinos(): Promise<Destinos[]> {
    // Crea un array para almacenar los resultados finales
    let resultadosArray: Destinos[] = [];
  
    // Obtiene los resultados de autosuggest
    const autosuggest = await this.getAutosuggestCB("name", "city", "image");

  
    // Itera sobre cada feature para obtener los detalles y llamar a getAutosuggest()
    for (const item of autosuggest.autosuggest) {
      const name = item.properties.name;
      const [lon, lat] = item.geometry.coordinates;
      const autosuggestData = await this.getAutosuggestCB(name, lat.toString(), lon.toString());
      const resultado = new Destinos(autosuggestData.name, autosuggestData['city'], autosuggestData.image, autosuggestData['valor']); // Corregido ciudad a ciudad
      resultadosArray.push(resultado);
    }
  
    return resultadosArray;
  }

  async getGeonameCB(): Promise<ResultadoGeonameDB> {
    const name = ""; // Si necesitas filtrar por nombre, agrégalo aquí
    const url = `${this._baseUrlGeoname}name=${name}&apikey=5ae2e3f221c38a28845f05b6c93e3546a222f144257f01544e75c104`;
    const respuesta = await fetch(url);
    const data: ResultadoGeonameDB = await respuesta.json();
    return data;
  }

  async getAutosuggestCB(name?: any, city?: any, image?: any): Promise<ResultadoAutosuggestDB> {
    const url = `${this._baseUrlAutosuggest}apikey=5ae2e3f221c38a28845f05b6c93e3546a222f144257f01544e75c104`;
    const respuesta = await fetch(url);
    const data: ResultadoAutosuggestDB = await respuesta.json();
    return data;
  }
  async guardarDestinos(destinos: Destinos[]) {
    await this.storage.set('destinos', destinos);
  }

  async obtenerDestinos(): Promise<Destinos[]> {
    return await this.storage.get('destinos') || [];
  }

}



 

 
