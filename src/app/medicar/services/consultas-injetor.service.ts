import { Injectable } from '@angular/core';
import { ConsultaForm } from '../models/main';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultasInjectorService {

  private dataFormConsultas$: BehaviorSubject<ConsultaForm> = new BehaviorSubject(null);

  constructor() { }

  addEspecialidade(data) { this.dataFormConsultas$.next({ especialidade: data }); }

  cleanBehaviors() { this.dataFormConsultas$.complete(); }

  addMedico(data) {
    const params = {
      medico: data,
      especialidade: this.dataFormConsultas$.value.especialidade
    };
    this.dataFormConsultas$.next(params);
  }

  readyToFinish(data) { this.dataFormConsultas$.next(data); }

  getAllParams(): Observable<ConsultaForm> { return this.dataFormConsultas$.asObservable(); }

}
