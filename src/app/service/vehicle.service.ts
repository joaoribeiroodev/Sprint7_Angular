import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { API_URL } from '../constant/api.constants';
import { Veiculo, VeiculoData, VeiculosAPI } from '../model/veiculo.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(private readonly http: HttpClient) {}

  getVehicles(): Observable<Veiculo[]> {
    return this.http.get<VeiculosAPI>(`${API_URL}/vehicles`).pipe(
      map((response) => response.vehicles)
    );
  }

  getVehicleData(vin: string): Observable<VeiculoData> {
    return this.http.post<VeiculoData>(`${API_URL}/vehicleData`, { vin });
  }
}
