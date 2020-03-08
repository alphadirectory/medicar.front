import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Agendas, Consulta, Consultas, Especialidades, Medicos } from '../models/main';

@Injectable({
  providedIn: 'root'
})

export class MedicarService {

  constructor(private http: HttpClient) { }

  getConsultas(): Observable<Consultas[]> {
    return this.http.get<Consultas[]>(`${this.url}consultas`)
      .pipe(
        tap(res => true),
        catchError((err) => {
          console.log(`@ERROR! ${err.message}`);
          return throwError(err);
        })
      );
  }

  getEspecialidades(payload = null): Observable<Especialidades[]> {
    return this.http.get<Especialidades[]>(`${this.url}especialidades/${this.querystrinBuilder(payload)}`);
  }

  getMedicos(payload = null): Observable<Medicos[]> {
    return this.http.get<Medicos[]>(`${this.url}medicos/${this.querystrinBuilder(payload)}`)
      .pipe(
        tap(res => true),
        catchError((err) => {
          console.log(`@ERROR! ${err.message}`);
          return throwError(err);
        })
      );
  }

  getAgendas(payload = null): Observable<Agendas[]> {
    return this.http.get<Agendas[]>(`${this.url}agendas/${this.querystrinBuilder(payload)}`);
  }

  saveConsulta(payload): Observable<Consulta[]> {
    return this.http.post<Consulta[]>(`${this.url}consultas/`, payload);
  }

  delete(id) {
    return this.http.delete(`${this.url}consultas/${id}`);
  }

  querystrinBuilder(payload = null) {
    if (payload === null) {
      return '';
    }
    let body = '?';
    Object.keys(payload).forEach((key) => {
      body += `${key}=${encodeURIComponent(payload[key])}&`;
    });
    return body.substring(0, (body.length - 1));
  }
 
  get url(): string {
    return `${environment.urlApi}`;
  }

}
