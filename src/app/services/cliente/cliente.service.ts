import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/models/cliente/cliente';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  api_url = environment.api_url + 'cliente';

  constructor() { }

  getOS(id: string|number) {
    return fetch(`${this.api_url}/ordem-servico/${id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((error) => console.error('Error', error));
  }

  getEquipamentos(id: string|number){
    return fetch(`${this.api_url}/equipamento/${id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        return response.data;
      })
      .catch((error) => console.error('Error', error));
  }

  getClientes(
    next_page: string | null = null,
    search: string | null = null
  ) {
    search = search ? '?search=' + search : '';
    const url = next_page
      ? next_page
      : this.api_url + search;
    return fetch(url, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((error) => console.error('Error', error));
  }

  getByCNPJ(cnpj:string){
    const url = "https://open.cnpja.com/office/"+cnpj;

    return fetch(url)
    .then((response) => response.json())
    .then(response => {
      return response;
    })
    .catch((error) => console.log(error));
  }

  getCEP(cep:string){
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    return fetch(url)
    .then((response) => response.json())
    .then(response => {
      return response;
    })
  }

  getByID(id:number|string){
    return fetch(this.api_url+'/'+id, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((error) => console.error('Error', error));
  }

  async excluirCliente(id:number|string){
    return fetch(this.api_url+'/'+id, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((error) => console.error('Error', error));
  }

  storeCliente(cliente: Cliente) {
      return fetch(this.api_url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        method: 'POST',
        body: JSON.stringify(cliente),
      })
        .then((response) => response.json())
        .then((response) => {
          return response;
        })
        .catch((error) => console.error('Error', error));
    }

  updateCliente(cliente: Cliente) {
      return fetch(this.api_url+'/'+cliente.id, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        method: 'PUT',
        body: JSON.stringify(cliente),
      })
        .then((response) => response.json())
        .then((response) => {
          return response;
        })
        .catch((error) => console.error('Error', error));
    }
}
