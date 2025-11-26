import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Product } from '../../models/product.model';
import { LucideAngularModule, Plus, Trash2, Edit, AlertTriangle, Package } from 'lucide-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  template: `
    <div class="page-header">
      <h2>Produtos</h2>
      <button class="btn btn-primary" (click)="openForm()">
        <lucide-icon [img]="Plus" class="w-4 h-4 mr-2"></lucide-icon> Novo Produto
      </button>
    </div>

    <!-- Loading State -->
    <div *ngIf="loading$ | async" class="flex justify-center items-center py-12">
      <div class="text-gray-500">Carregando...</div>
    </div>

    <!-- Error State -->
    <div *ngIf="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
      {{ errorMessage }}
    </div>

    <!-- List (Table) -->
    <div class="card overflow-hidden p-0" *ngIf="!showForm && !(loading$ | async)">
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
                  <lucide-icon [img]="Package" size="20" class="text-gray-400"></lucide-icon>
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
                               [img]="AlertTriangle" 
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
                  <button class="btn-icon" (click)="editProduct(product)">
                    <lucide-icon [img]="Edit" size="18"></lucide-icon>
                  </button>
                  <button class="btn-icon danger" (click)="deleteProduct(product.idProduto!)">
                    <lucide-icon [img]="Trash2" size="18"></lucide-icon>
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

    <!-- Form -->
    <div class="max-w-2xl mx-auto card" *ngIf="showForm">
      <h3 class="text-xl font-bold mb-6">{{ isEditing ? 'Editar' : 'Novo' }} Produto</h3>
      <form [formGroup]="productForm" (ngSubmit)="saveProduct()" class="space-y-4">
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
          <button type="button" class="btn btn-secondary" (click)="cancelForm()">Cancelar</button>
          <button type="submit" class="btn btn-primary" [disabled]="productForm.invalid || saving">
            {{ saving ? 'Salvando...' : 'Salvar' }}
          </button>
        </div>
      </form>
    </div>
  `
})
export class ProductsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dataService = inject(DataService);

  readonly Plus = Plus;
  readonly Trash2 = Trash2;
  readonly Edit = Edit;
  readonly AlertTriangle = AlertTriangle;
  readonly Package = Package;

  products$!: Observable<Product[]>;
  loading$ = this.dataService.loading$;

  showForm = false;
  isEditing = false;
  editingId: number | null = null;
  errorMessage = '';
  saving = false;

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
    this.loadProducts();
  }

  loadProducts() {
    this.products$ = this.dataService.getProducts();
  }

  openForm() {
    this.showForm = true;
    this.isEditing = false;
    this.productForm.reset({
      estoqueQuantidade: 0,
      estoqueMinimo: 5,
      precoCusto: 0,
      precoVenda: 0,
      unidade: 'un',
      ativo: true
    });
  }

  editProduct(product: Product) {
    this.showForm = true;
    this.isEditing = true;
    this.editingId = product.idProduto!;
    this.productForm.patchValue(product);
  }

  cancelForm() {
    this.showForm = false;
    this.editingId = null;
    this.errorMessage = '';
  }

  saveProduct() {
    if (this.productForm.valid) {
      this.saving = true;
      this.errorMessage = '';
      const product: Product = this.productForm.value;

      const operation = this.isEditing && this.editingId
        ? this.dataService.updateProduct(this.editingId, product)
        : this.dataService.addProduct(product);

      operation.subscribe({
        next: () => {
          this.saving = false;
          this.cancelForm();
          this.loadProducts();
        },
        error: (error) => {
          this.saving = false;
          this.errorMessage = error.message || 'Erro ao salvar produto';
        }
      });
    }
  }

  deleteProduct(id: number) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.dataService.deleteProduct(id).subscribe({
        next: () => {
          this.loadProducts();
        },
        error: (error) => {
          this.errorMessage = error.message || 'Erro ao excluir produto';
        }
      });
    }
  }
}
