import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdemServicoService {

  constructor() { }

  getOS(params:any = null){
    let url_params = '?';

    if (params) {
      params.forEach((param:any) => {
        url_params+=`${param.label}=${param.value}&`
      });
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
