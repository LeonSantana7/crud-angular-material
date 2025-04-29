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

  atualizar(cliente: Cliente){
    const storage = this.obterStorage();
    storage.forEach(c => {
      if(c.id === cliente.id){
        Object.assign(c, cliente);
      }
    })
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
  }

  deletar(cliente: Cliente){
    const storage = this.obterStorage();
    const novaLista = storage.filter(c => c.id !== cliente.id);

    // const indexItem = storage.indexOf(cliente);
    // if(indexItem > -1){
    //   storage.splice(indexItem, 1);
    // }

    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(novaLista));
  }

  pesquisarClientes(nomeBusca: string) : Cliente[] {
    const clientes = this.obterStorage();

    if(!nomeBusca){
      return clientes;
    }

    // cliente.nome: Jose da Silva
    // nomeBusca: Jose
    // O método indexOf é uma função de strings (e também de arrays) em JavaScript e TypeScript que serve para procurar a posição de um valor dentro de outro.
    return clientes.filter(cliente => cliente.nome?.indexOf(nomeBusca) !== -1)
  }

  buscarClientePorId(id: string) : Cliente | undefined{
    const clientes = this.obterStorage();
    return clientes.find(cliente => cliente.id === id ); // encontrar só um elemento
  }
  
  // Método para obter a lista de clientes do LocalStorage
  private obterStorage(): Cliente[] {
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
