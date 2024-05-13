export interface ResultadoGeonameDB {
        geoname: GeonameDBDestinos[]
}
export interface GeonameDBDestinos {
    lat: string;
    lon: string;
}
export interface ResultadoAutosuggestDB {
    autosuggest: any;
    name: string;
    ciudad: string;
    image: string;
}