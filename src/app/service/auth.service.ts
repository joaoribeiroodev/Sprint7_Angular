import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { API_URL } from '../constant/api.constants';
import { LoginRequest, Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly storageKey = 'usuarioLogado';

  constructor(private readonly http: HttpClient) {}

  login(credentials: LoginRequest, persistir = false): Observable<Usuario> {
    return this.http.post<Usuario>(`${API_URL}/login`, credentials).pipe(
      tap((usuario) => this.setUsuario(usuario, persistir))
    );
  }

  logout(): void {
    sessionStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.storageKey);
  }

  isAuthenticated(): boolean {
    return this.getUsuario() !== null;
  }

  getUsuario(): Usuario | null {
    const raw =
      sessionStorage.getItem(this.storageKey) || localStorage.getItem(this.storageKey);

    if (!raw) {
      return null;
    }

    try {
      const usuario = JSON.parse(raw) as Usuario;

      if (!usuario?.nome) {
        this.logout();
        return null;
      }

      return usuario;
    } catch {
      this.logout();
      return null;
    }
  }

  temSessaoPersistida(): boolean {
    return !!localStorage.getItem(this.storageKey);
  }

  private setUsuario(usuario: Usuario, persistir: boolean): void {
    sessionStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.storageKey);

    if (persistir) {
      localStorage.setItem(this.storageKey, JSON.stringify(usuario));
      return;
    }

    sessionStorage.setItem(this.storageKey, JSON.stringify(usuario));
  }
}
