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
        "Authorization": `Bearer ${environment.api_login}`
      }
    })
    .then(response => response.json())
    .then(response => {
      if (!response.ok) {
        console.error("Error", response.message);
      }
      return response.data;
    })
    .catch(error => console.error("Error", error))
  }
}
