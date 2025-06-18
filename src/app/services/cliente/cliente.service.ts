import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

  getClientes(){
    return fetch(environment.api_url+'cliente', {
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
