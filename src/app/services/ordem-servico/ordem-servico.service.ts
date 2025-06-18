import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdemServicoService {

  constructor() { }

  getOS(){
      return fetch(environment.api_url+'ordem-servico', {
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        }
      })
      .then(response => response.json())
      .then(response => {
        return response.data;
      })
      .catch(error => console.error("Error", error))
    }
}
