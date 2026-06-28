import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm?: NgForm;

  nome = '';
  senha = '';
  mensagemErro = '';
  carregando = false;
  mostrarSenha = false;
  logarAutomaticamente = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.logarAutomaticamente = this.authService.temSessaoPersistida();
  }

  onSubmit(): void {
    this.mensagemErro = '';

    if (!this.nome || !this.senha) {
      this.mensagemErro = 'O campo de usuário ou senha não foi preenchido!';
      return;
    }

    this.carregando = true;

    this.authService.login({ nome: this.nome, senha: this.senha }, this.logarAutomaticamente).subscribe({
      next: () => {
        this.carregando = false;
        this.router.navigate(['/home']);
      },
      error: (error: { error?: { message?: string } }) => {
        this.carregando = false;
        this.mensagemErro =
          error.error?.message ||
          'O nome de usuário ou senha está incorreto ou não foi cadastrado!';
      }
    });
  }

  alternarVisibilidadeSenha(): void {
    this.mostrarSenha = !this.mostrarSenha;
  }

  get exibirCampoSenhaOculta(): boolean {
    return !this.mostrarSenha;
  }

  get exibirCampoSenhaVisivel(): boolean {
    return this.mostrarSenha;
  }

  get exibirIconeSenhaOculta(): boolean {
    return !this.mostrarSenha;
  }

  get exibirIconeSenhaVisivel(): boolean {
    return this.mostrarSenha;
  }

  get exibirMensagemErro(): boolean {
    return !!this.mensagemErro;
  }

  get botaoEntrarDesabilitado(): boolean {
    return this.carregando || !this.loginForm || !!this.loginForm.invalid;
  }
}
