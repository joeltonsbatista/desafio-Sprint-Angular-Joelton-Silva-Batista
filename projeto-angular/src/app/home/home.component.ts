import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuComponent } from "../menu/menu.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, MenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router) {}

  logout() {
    // Limpa sessão
    localStorage.removeItem('token');
    sessionStorage.clear();

    // Redireciona para login
    this.router.navigate(['/login']);
  }
}
