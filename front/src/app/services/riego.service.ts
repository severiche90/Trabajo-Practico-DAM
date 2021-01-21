import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Riego } from '../model/Riego';

@Injectable({
  providedIn: 'root'
})

export class RiegoService
{
    urlBackend = "http://localhost:8000/api/";

    constructor(private _http: HttpClient) 
    {

    }

    
    getRiegos(id): Promise <Riego[]> 
    {
       return this._http.get(this.urlBackend + "riego/" + id + "/all").toPromise().then((sprinkle: Riego[]) => {
            return sprinkle;
        });
    }

    
    getRiego(id): Promise <Riego>
    {     
        return this._http.get(this.urlBackend + "riego/" + id).toPromise().then((sprinkle: Riego) => {
            return sprinkle;
        });
    }

    
    postRiego(sprinkle: Riego)
    {
        return this._http.post(this.urlBackend + "riego/add", {apertura: sprinkle.apertura, fecha: sprinkle.fecha, electrovalvulaId: sprinkle.electrovalvulaId}).toPromise().then((result) => {
            return result;
        });
    }
}