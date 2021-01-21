import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Electrovalvula } from '../model/Electrovalvula';

@Injectable({
  providedIn: 'root'
})

export class ElectrovalvulaService
{
    urlBackend = "http://localhost:8000/api/";

    constructor(private _http: HttpClient) 
    {

    }

    
    getRiego(nombreDisp): Promise <Electrovalvula>
    {     
        return this._http.get(this.urlBackend + "ev/" + nombreDisp).toPromise().then((valve: Electrovalvula) => {
            return valve;
        });
    }
}