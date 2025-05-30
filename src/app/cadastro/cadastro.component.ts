import { Municipio } from './../brasilapi.models';
import { BrasilapiService } from './../brasilapi.service';
import { Component, OnInit, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatSelectChange, MatSelectModule } from '@angular/material/select'
import { FormsModule, } from '@angular/forms'
import { Cliente } from './cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Estado } from '../brasilapi.models';


@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    NgxMaskDirective,
    MatSelectModule
  ],
  providers: [provideNgxMask()],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit {

  cliente: Cliente = Cliente.newCliente();
  atualizando: boolean = false;
  snack: MatSnackBar = inject(MatSnackBar);
  estados: Estado[] = [];
  municipio: Municipio[] = [];

  constructor(private service: ClienteService,
    private brasilapiService: BrasilapiService,
    private route: ActivatedRoute, // usa o ActivatedRoute sempre que precisa acessar informações da rota atual — como parâmetros, query params ou dados resolvidos pela rota.
    private router: Router, // Quem "responde a uma ação" (como navegar após um clique) é o Router.

  ) {

  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((query: any) => {
      const params = query['params'];
      const id = params['id']
      if (id) {

        let clienteEncontrado = this.service.buscarClientePorId(id);
        if (clienteEncontrado) {
          this.atualizando = true;
          this.cliente = clienteEncontrado;
          if (this.cliente.uf) {
            const event = { value: this.cliente.uf }
            this.carregarMunicipios(event as MatSelectChange);
          }
        }
      }
    })
    this.carregarUFs();

  }

  carregarUFs() {
    //observable subscriber
    this.brasilapiService.listarUFs().subscribe({
      next: listaEstados => this.estados = listaEstados,
      error: erro => console.log("Ocorreu um erro", erro)
    })
  }

  carregarMunicipios(event: MatSelectChange) {
    const ufSelecionada = event.value;
    this.brasilapiService.listaMunicipio(ufSelecionada).subscribe({
      next: listaMunicipios => this.municipio = listaMunicipios,
      error: erro => console.log("Ocorreu um erro", erro)
    })
  }
  salvar() {
    if (!this.atualizando) {
      this.service.salvar(this.cliente);
      this.cliente = Cliente.newCliente();
      this.mostrarMensagem('Salvo com sucesso!');
    } else {
      this.service.atualizar(this.cliente);
      this.router.navigate(['/consulta']);
      this.mostrarMensagem('Atualizado com sucesso');
    }
  }

  mostrarMensagem(mensagem: string) {
    this.snack.open(mensagem, "Ok");
  }
}
