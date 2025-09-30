import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule, // 👈 importa o slide-toggle
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  nome = '';
  senha = '';
  logarAutomaticamente = false; // 👈 nova propriedade
  dataAtual = new Date();

  constructor(private router: Router) {}

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  login() {
    if (this.nome !== 'admin' || this.senha !== '123456') {
      alert('Nome ou senha inválidos');
    } else {
      // ✅ Salva no localStorage se estiver marcado
      if (this.logarAutomaticamente) {
        localStorage.setItem('usuarioLogado', JSON.stringify({
          nome: this.nome,
          senha: this.senha
        }));
      } else {
        localStorage.removeItem('usuarioLogado');
      }

      this.router.navigate(['/home']);
    }
  }

  // ✅ opcional: carregar login salvo ao iniciar
  ngOnInit() {
    const salvo = localStorage.getItem('usuarioLogado');
    if (salvo) {
      const dados = JSON.parse(salvo);
      this.nome = dados.nome;
      this.senha = dados.senha;
      this.logarAutomaticamente = true;
    }
  }
}
