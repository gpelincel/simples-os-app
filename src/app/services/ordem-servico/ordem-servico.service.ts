import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdemServicoService {

  constructor() { }

  getOS(status:any = null){
    let url_params = '?';

    if (status) {
      url_params += `id_status=${status}`;
    }

      return fetch(environment.api_url+'ordem-servico'+url_params, {
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
