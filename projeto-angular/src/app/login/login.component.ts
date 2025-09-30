import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

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
  usuario = {
    nome:"",
    senha:""
  }
  logarAutomaticamente = false; // 👈 nova propriedade
  dataAtual = new Date();

  constructor(private authService: AuthService ,private router: Router) {}

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  login() {
    console.log(this.usuario)
    if (this.usuario.nome !== 'admin' || this.usuario.senha !== '123456') {
      alert('Nome ou senha inválidos');
    } else {
      console.log(this.usuario)
      // ✅ Salva no localStorage se estiver marcado
      if (this.logarAutomaticamente) {
        localStorage.setItem('usuarioLogado', JSON.stringify({
          nome: this.usuario.nome,
          senha: this.usuario.senha
        }));
      } else {
        localStorage.removeItem('usuarioLogado');
      }

      this.authService.login(this.usuario).subscribe({
        next:(response) => {
          this.router.navigate(["/home"])
        }
      })
    }
  }

  // ✅ opcional: carregar login salvo ao iniciar
  ngOnInit() {
    const salvo = localStorage.getItem('usuarioLogado');
    if (salvo) {
      const dados = JSON.parse(salvo);
      this.usuario.nome = dados.nome;
      this.usuario.senha = dados.senha;
      this.logarAutomaticamente = true;
    }
  }
}
