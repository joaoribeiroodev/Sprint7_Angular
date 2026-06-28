import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  takeUntil
} from 'rxjs/operators';

import { Veiculo, VeiculoData } from '../models/veiculo.model';
import { Usuario } from '../models/usuario.model';
import { AuthService } from '../services/auth.service';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  veiculos: Veiculo[] = [];
  veiculosFiltrados: Veiculo[] = [];
  veiculoSelecionado: Veiculo | null = null;
  dadosVeiculo: VeiculoData | null = null;
  mensagemErroVin = '';
  carregandoVeiculos = true;
  carregandoVin = false;
  menuAberto = false;
  menuUsuarioAberto = false;
  usuario: Usuario | null = null;

  private buscaModeloInterno = '';
  private veiculoSelecionadoIdInterno: number | string = '';
  private codigoVinInterno = '';
  private readonly buscaModelo$ = new Subject<string>();
  private readonly buscaVin$ = new Subject<string>();
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly vehicleService: VehicleService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUsuario();
    this.carregarVeiculos();
    this.configurarBuscaModelo();
    this.configurarBuscaVin();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  get buscaModelo(): string {
    return this.buscaModeloInterno;
  }

  set buscaModelo(valor: string) {
    this.buscaModeloInterno = valor;
    this.buscaModelo$.next(valor);
  }

  get veiculoSelecionadoId(): number | string {
    return this.veiculoSelecionadoIdInterno;
  }

  set veiculoSelecionadoId(id: number | string) {
    this.veiculoSelecionadoIdInterno = id;
    const veiculo = this.veiculos.find((item) => String(item.id) === String(id));
    if (veiculo) {
      this.veiculoSelecionado = veiculo;
      this.buscaModeloInterno = veiculo.vehicle;
    }
  }

  get codigoVin(): string {
    return this.codigoVinInterno;
  }

  set codigoVin(valor: string) {
    this.codigoVinInterno = valor;
    this.buscaVin$.next(valor);
  }

  get nomeUsuario(): string {
    return this.usuario?.nome ?? 'admin';
  }

  get exibirMenuUsuario(): boolean {
    return this.menuUsuarioAberto;
  }

  get exibirMetricas(): boolean {
    return !this.carregandoVeiculos;
  }

  get exibirCarregandoVeiculos(): boolean {
    return this.carregandoVeiculos;
  }

  get exibirVeiculoSelecionado(): boolean {
    return !!this.veiculoSelecionado;
  }

  get exibirSelectVeiculos(): boolean {
    return this.veiculosFiltrados.length > 0;
  }

  get exibirNenhumModelo(): boolean {
    return this.veiculosFiltrados.length === 0;
  }

  get urlImagemVeiculo(): string {
    return this.veiculoSelecionado?.img ?? '';
  }

  get altImagemVeiculo(): string {
    return this.veiculoSelecionado?.vehicle ?? '';
  }

  get exibirDadosVeiculo(): boolean {
    return !!this.dadosVeiculo;
  }

  get exibirCarregandoVin(): boolean {
    return this.carregandoVin;
  }

  get exibirErroVin(): boolean {
    return !!this.mensagemErroVin;
  }

  get totalVendasExibicao(): string | number {
    return this.veiculoSelecionado?.volumetotal ?? '';
  }

  get conectadosExibicao(): string | number {
    return this.veiculoSelecionado?.connected ?? '';
  }

  get softwareUpdatesExibicao(): string | number {
    return this.veiculoSelecionado?.softwareUpdates ?? '';
  }

  get odometroExibicao(): string {
    return this.dadosVeiculo ? `${this.dadosVeiculo.odometro} Km` : '';
  }

  get combustivelExibicao(): string {
    return this.dadosVeiculo ? `${this.dadosVeiculo.nivelCombustivel} %` : '';
  }

  get statusExibicao(): string {
    return this.dadosVeiculo?.status ?? '';
  }

  get latitudeExibicao(): string {
    return this.dadosVeiculo ? this.formatCoordenada(this.dadosVeiculo.lat) : '';
  }

  get longitudeExibicao(): string {
    return this.dadosVeiculo ? this.formatCoordenada(this.dadosVeiculo.long) : '';
  }

  private formatCoordenada(valor: number): string {
    return String(valor).replace('.', ',');
  }

  private carregarVeiculos(): void {
    this.vehicleService.getVehicles().subscribe({
      next: (veiculos: Veiculo[]) => {
        this.veiculos = veiculos;
        this.veiculosFiltrados = veiculos;
        this.carregandoVeiculos = false;

        if (veiculos.length > 0) {
          this.veiculoSelecionadoIdInterno = veiculos[0].id;
          this.veiculoSelecionado = veiculos[0];
          this.buscaModeloInterno = veiculos[0].vehicle;
        }
      },
      error: () => {
        this.carregandoVeiculos = false;
      }
    });
  }

  private configurarBuscaModelo(): void {
    this.buscaModelo$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        map((termo) => termo.trim().toLowerCase()),
        takeUntil(this.destroy$)
      )
      .subscribe((termo) => {
        this.veiculosFiltrados = termo
          ? this.veiculos.filter((veiculo) =>
              veiculo.vehicle.toLowerCase().includes(termo)
            )
          : [...this.veiculos];

        if (
          this.veiculoSelecionado &&
          !this.veiculosFiltrados.some((veiculo) => veiculo.id === this.veiculoSelecionado?.id)
        ) {
          const primeiroVeiculo = this.veiculosFiltrados[0] ?? null;
          this.veiculoSelecionado = primeiroVeiculo;
        }
      });
  }

  private configurarBuscaVin(): void {
    this.buscaVin$
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        map((vin) => vin.trim().toUpperCase()),
        filter((vin) => vin.length > 0),
        switchMap((vin) => {
          this.carregandoVin = true;
          this.mensagemErroVin = '';
          return this.vehicleService.getVehicleData(vin).pipe(
            map((dados) => ({ dados, erro: null as string | null })),
            catchError((error) =>
              of({
                dados: null,
                erro:
                  error.error?.message ||
                  'Código VIN utilizado não foi encontrado!'
              })
            )
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(({ dados, erro }) => {
        this.carregandoVin = false;
        this.dadosVeiculo = dados;
        this.mensagemErroVin = erro ?? '';
      });
  }
}
