import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dispositivo } from '../model/Dispositivo';

@Injectable({
    providedIn: 'root'
})

export class DispositivoService
{
	urlBackend = "http://localhost:8000/api/";
    
    constructor(private _http: HttpClient) 
    {
        
    }
	
	
    getDispositivos(): Promise <Dispositivo[]> 
    {
        return this._http.get(this.urlBackend + "dispositivo").toPromise().then((listado: Dispositivo[]) => {
            return listado;
        });
    }

	
    getDispositivo(id): Promise <Dispositivo>
    {         
		return this._http.get(this.urlBackend + "dispositivo/" + id).toPromise().then((listado: Dispositivo) => {
            return listado;
        });
    }

    
    getElectrovalvula(id): Promise <Dispositivo>
    {         
        return this._http.get(this.urlBackend + "dispositivo/" + id + "/ev").toPromise().then((listado: Dispositivo) => {
            return listado;
        });
    }

}