import { Injectable } from '@angular/core';
import { OrdemServicoDTO } from 'src/app/domain/OrdemServicoDTO';
import { OrdemServico } from 'src/app/models/ordem-servico/ordem-servico';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AgendaService {
  api_url = environment.api_url + 'agenda';

  constructor() {}

  getAgendamentos(data_filter:string|null = null) {
    let url = data_filter ? this.api_url+`?data=${data_filter}`:this.api_url;

    return fetch(url, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.data.length > 0) {
          const ordens = response.data;
          return ordens.map((os:OrdemServicoDTO) => new OrdemServico(os));
        } else {
          return [];
        }
      })
      .catch((error) => console.error('Error', error));
  }
}
