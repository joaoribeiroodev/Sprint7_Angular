import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../service/auth.service';
import { Usuario } from '../../model/usuario.model';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  menuAberto = false;
  menuUsuarioAberto = false;
  usuario: Usuario | null = null;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUsuario();
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this.fecharMenuUsuario();
  }

  toggleMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  fecharMenu(): void {
    this.menuAberto = false;
  }

  toggleMenuUsuario(): void {
    this.menuUsuarioAberto = !this.menuUsuarioAberto;
  }

  fecharMenuUsuario(): void {
    this.menuUsuarioAberto = false;
  }

  pararPropagacao(event: Event): void {
    event.stopPropagation();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  get nomeUsuario(): string {
    return this.usuario?.nome ?? 'admin';
  }

  get exibirMenuUsuario(): boolean {
    return this.menuUsuarioAberto;
  }
}
