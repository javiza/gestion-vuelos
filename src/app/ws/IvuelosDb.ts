// IvuelosDb.ts
export interface ResultadoGeonameDB {
    geoname: GeonameDBDestinos[]
}

export interface GeonameDBDestinos {
    lat: string;
    lon: string;
}

export interface ResultadoAutosuggestDB {
    [x: string]: any;
    autosuggest: any;
    name: string;
    ciudad: string;
    image: string;
}
