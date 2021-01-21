import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medicion } from '../model/Medicion';

@Injectable({
  providedIn: 'root'
})

export class MedicionService
{
    urlBackend = "http://localhost:8000/api/";

    constructor(private _http: HttpClient) 
    {

    }

    
    getMediciones(id): Promise <Medicion[]> 
    {
        return this._http.get(this.urlBackend + "medicion/" + id + "/all").toPromise().then((measurement: Medicion[]) => {
            return measurement;
        });
    }

    
    getMedicion(id): Promise <Medicion>
    {     
        return this._http.get(this.urlBackend + "medicion/" + id).toPromise().then((measurement: Medicion) => {
            return measurement;
        });
    }

    
    postMedicion(measurement: Medicion)
    {
        return this._http.post(this.urlBackend + "medicion/add", {fecha: measurement.fecha, valor: measurement.valor, dispositivoId: measurement.dispositivoId}).toPromise().then((result) => {
            return result;
        });
    }
}