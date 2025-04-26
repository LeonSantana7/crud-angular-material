import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {


  static REPO_CLIENTES = "_CLIENTES";

  constructor() { }

  salvar(cliente: Cliente) {
    const storage = this.obterStorage();
    storage.push(cliente);

    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
  }

  // Método para obter a lista de clientes do LocalStorage
  obterStorage(): Cliente[] {
    // Tenta buscar o item salvo no LocalStorage com a chave REPO_CLIENTES
    const repositorioClientes = localStorage.getItem(ClienteService.REPO_CLIENTES);

    if (repositorioClientes) {
      // Se encontrou algo, converte o JSON de volta para um array de Cliente
      const clientes: Cliente[] = JSON.parse(repositorioClientes);
      // Retorna a lista de clientes recuperada
      return clientes;
    }

    // Se não encontrou nada no LocalStorage:
    // Cria uma lista vazia de clientes
    const clientes: Cliente[] = [];

    // Salva essa lista vazia no LocalStorage
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));

    // Retorna a lista vazia
    return clientes;
  }
}
