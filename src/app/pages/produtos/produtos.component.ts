/**
 * Este componente gerencia a tela de Produtos.
 * Ele permite controlar o estoque, preços e cadastro de produtos,
 * delegando a lógica de dados para o ProdutoService.
 */
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/product.model';
import { LucideAngularModule, Plus, Trash2, Edit, AlertTriangle, Package, Search } from 'lucide-angular';
import { Observable, BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  template: `
    <div class="page-header">
      <h2>Produtos</h2>
      <button class="btn btn-primary" (click)="abrirFormulario()">
        <lucide-icon [img]="Adicionar" class="w-4 h-4 mr-2"></lucide-icon> Novo Produto
      </button>
    </div>

    <!-- Busca -->
    <div class="mb-6 relative" *ngIf="!exibirFormulario">
        <lucide-icon [img]="Buscar" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"></lucide-icon>
        <input type="text" placeholder="Buscar por nome, descrição, valor, quantidade ou categoria..." class="form-control pl-10">
    </div>  

    <!-- Carregando -->
    <div *ngIf="carregando$ | async" class="flex justify-center items-center py-12">
      <div class="text-gray-500">Carregando...</div>
    </div>

    <!-- Erro -->
    <div *ngIf="mensagemDeErro" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
      {{ mensagemDeErro }}
    </div>

    <!-- Lista (Tabela) -->
    <div class="card overflow-hidden p-0" *ngIf="!exibirFormulario && !(carregando$ | async)">
      <div class="overflow-x-auto">
        <table class="data-table w-full">
          <thead>
            <tr>
              <th class="text-left p-4 bg-gray-50 font-semibold text-gray-600">Produto</th>
              <th class="text-left p-4 bg-gray-50 font-semibold text-gray-600">Categoria</th>
              <th class="text-right p-4 bg-gray-50 font-semibold text-gray-600">Estoque</th>
              <th class="text-right p-4 bg-gray-50 font-semibold text-gray-600">Preço Venda</th>
              <th class="text-right p-4 bg-gray-50 font-semibold text-gray-600">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let product of products$ | async" 
                class="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                [class.bg-red-50]="product.estoqueQuantidade <= product.estoqueMinimo">
              <td class="p-4">
                <div class="flex items-center gap-3">
                  <lucide-icon [img]="Pacote" size="20" class="text-gray-400"></lucide-icon>
                  <div>
                    <div class="font-medium text-gray-800">{{ product.nome }}</div>
                    <div class="text-sm text-gray-500" *ngIf="product.descricao">{{ product.descricao }}</div>
                  </div>
                </div>
              </td>
              <td class="p-4 text-gray-600">{{ product.categoria }}</td>
              <td class="p-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <lucide-icon *ngIf="product.estoqueQuantidade <= product.estoqueMinimo" 
                               [img]="Alerta" 
                               size="16" 
                               class="text-danger"></lucide-icon>
                  <span [class.text-danger]="product.estoqueQuantidade <= product.estoqueMinimo"
                        [class.font-semibold]="product.estoqueQuantidade <= product.estoqueMinimo">
                    {{ product.estoqueQuantidade }} {{ product.unidade }}
                  </span>
                </div>
              </td>
              <td class="p-4 text-right font-medium text-gray-800">{{ product.precoVenda | currency:'BRL' }}</td>
              <td class="p-4 text-right">
                <div class="flex justify-end gap-2">
                  <button class="btn-icon" (click)="editarProduto(product)">
                    <lucide-icon [img]="Editar" size="18"></lucide-icon>
                  </button>
                  <button class="btn-icon danger" (click)="deletarProduto(product.idProduto!)">
                    <lucide-icon [img]="Remover" size="18"></lucide-icon>
                  </button>
                </div>
              </td>
            </tr>
            <tr *ngIf="(products$ | async)?.length === 0">
              <td colspan="5" class="p-8 text-center text-gray-500">Nenhum produto cadastrado.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Formulário -->
    <div class="max-w-2xl mx-auto card" *ngIf="exibirFormulario">
      <h3 class="text-xl font-bold mb-6">{{ estaEditando ? 'Editar' : 'Novo' }} Produto</h3>
      <form [formGroup]="productForm" (ngSubmit)="salvarProduto()" class="space-y-4">
        <div>
          <label class="block mb-1 font-medium text-gray-600">Nome do Produto</label>
          <input type="text" formControlName="nome" class="form-control">
        </div>
        
        <div>
          <label class="block mb-1 font-medium text-gray-600">Descrição</label>
          <input type="text" formControlName="descricao" class="form-control">
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 font-medium text-gray-600">Categoria</label>
            <input type="text" formControlName="categoria" class="form-control">
          </div>
          <div>
            <label class="block mb-1 font-medium text-gray-600">Unidade</label>
            <input type="text" formControlName="unidade" class="form-control" placeholder="un, kg, L">
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 font-medium text-gray-600">Quantidade em Estoque</label>
            <input type="number" formControlName="estoqueQuantidade" class="form-control">
          </div>
          <div>
            <label class="block mb-1 font-medium text-gray-600">Estoque Mínimo</label>
            <input type="number" formControlName="estoqueMinimo" class="form-control">
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 font-medium text-gray-600">Preço de Custo (R$)</label>
            <input type="number" formControlName="precoCusto" class="form-control" step="0.01">
          </div>
          <div>
            <label class="block mb-1 font-medium text-gray-600">Preço de Venda (R$)</label>
            <input type="number" formControlName="precoVenda" class="form-control" step="0.01">
          </div>
        </div>
        
        <div class="flex justify-end gap-3 mt-6">
          <button type="button" class="btn btn-secondary" (click)="cancelarFormulario()">Cancelar</button>
          <button type="submit" class="btn btn-primary" [disabled]="productForm.invalid || salvando">
            {{ salvando ? 'Salvando...' : 'Salvar' }}
          </button>
        </div>
      </form>
    </div>
  `
})
export class ProdutosComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productService = inject(ProdutoService);

  readonly Adicionar = Plus;
  readonly Remover = Trash2;
  readonly Editar = Edit;
  readonly Alerta = AlertTriangle;
  readonly Pacote = Package;
  readonly Buscar = Search;

  products$!: Observable<readonly Produto[]>;
  carregando$ = new BehaviorSubject<boolean>(false);

  exibirFormulario = false;
  estaEditando = false;
  editandoId: number | null = null;
  mensagemDeErro = '';
  salvando = false;

  productForm: FormGroup;

  constructor() {
    this.productForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: [''],
      categoria: ['', Validators.required],
      estoqueQuantidade: [0, [Validators.required, Validators.min(0)]],
      estoqueMinimo: [5, [Validators.required, Validators.min(0)]],
      precoCusto: [0, [Validators.min(0)]],
      precoVenda: [0, [Validators.required, Validators.min(0)]],
      unidade: ['un', Validators.required],
      ativo: [true]
    });
  }

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.carregando$.next(true);
    this.productService.buscarTodos().pipe(
      finalize(() => this.carregando$.next(false))
    ).subscribe({
      next: (data) => {
        this.products$ = new BehaviorSubject(data).asObservable();
      },
      error: (error) => {
        console.error('Erro ao carregar produtos:', error);
        this.mensagemDeErro = 'Erro ao carregar produtos';
      }
    });
  }

  abrirFormulario() {
    this.exibirFormulario = true;
    this.estaEditando = false;
    this.productForm.reset({
      estoqueQuantidade: 0,
      estoqueMinimo: 5,
      precoCusto: 0,
      precoVenda: 0,
      unidade: 'un',
      ativo: true
    });
  }

  editarProduto(product: Produto) {
    this.exibirFormulario = true;
    this.estaEditando = true;
    this.editandoId = product.idProduto!;
    this.productForm.patchValue(product);
  }

  cancelarFormulario() {
    this.exibirFormulario = false;
    this.editandoId = null;
    this.mensagemDeErro = '';
  }

  salvarProduto() {
    if (this.productForm.valid) {
      this.salvando = true;
      this.mensagemDeErro = '';
      const product: Produto = this.productForm.value;

      const operation = this.estaEditando && this.editandoId
        ? this.productService.alterar(this.editandoId, product)
        : this.productService.criar(product);

      operation.subscribe({
        next: () => {
          this.salvando = false;
          this.cancelarFormulario();
          this.carregarProdutos();
        },
        error: (error) => {
          this.salvando = false;
          this.mensagemDeErro = error.message || 'Erro ao salvar produto';
        }
      });
    }
  }

  deletarProduto(id: number) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.productService.excluir(id).subscribe({
        next: () => {
          this.carregarProdutos();
        },
        error: (error) => {
          this.mensagemDeErro = error.message || 'Erro ao excluir produto';
        }
      });
    }
  }
}
