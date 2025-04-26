import { v4 as uuid } from 'uuid' // função v4 cria um id aleatório( como uma chave única)
// O as uuid é um alias para que possamos usar a função v4() com o nome uuid.

export class Cliente {
    id?: string;
    nome?: string;
    cpf?: string;
    dataNascimento?: string;
    email?: string;

    // criar um cliente vazio
    static newCliente() {
        const cliente = new Cliente();
        cliente.id = uuid();
        return cliente;
    }
}