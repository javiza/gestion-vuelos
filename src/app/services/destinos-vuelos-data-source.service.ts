import { Injectable } from '@angular/core';
import { ResultadoAutosuggestDB, ResultadoGeonameDB } from '../ws/IvuelosDb';
import { Destinos } from '../modelo/destinos';

@Injectable({
  providedIn: 'root'
})
export class DestinosVuelosDataSourceService {
  private _baseUrlGeoname = "https://api.opentripmap.com/0.1/en/places/geoname?";
  private _baseUrlAutosuggest = "https://api.opentripmap.com/0.1/en/places/autosuggest?";

  constructor() { }

  async getDestinos(): Promise<Destinos[]> {
    // Obtiene los resultados de autosuggest
    const autosuggest = await this.getAutosuggestCB();

    // Crea un array para almacenar los resultados finales
    const resultadosArray: Destinos[] = [];

    // Itera sobre cada geoname para obtener los detalles y llamar a getAutosuggest()
    for (const geo of autosuggest.autosuggest) {
      const autosuggestData = await this.getAutosuggestCB(geo.name, geo.lat, geo.lon);
      const resultado = new Destinos(autosuggestData.name, autosuggestData.ciudad, autosuggestData.image);
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

  async getAutosuggestCB(name: string, lon: string, lat: string): Promise<ResultadoAutosuggestDB> {
    const url = `${this._baseUrlAutosuggest}name=${name}&radius=100000&lon=${lon}&lat=${lat}&apikey=5ae2e3f221c38a28845f05b6c93e3546a222f144257f01544e75c104`;
    const respuesta = await fetch(url);
    const data: ResultadoAutosuggestDB = await respuesta.json();
    return data;
  }
}
