import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicarService } from '../services/medicar.service';
import { Consultas } from '../models/main';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {

  consultas$: Observable<Consultas[]>;
  displayedColumns: string[] = ['especialidade', 'medico', 'dia', 'horario', 'action'];

  constructor(
    private mainService: MedicarService,
    private snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {
    this.getConsultas();
  }

  getConsultas() {
    this.consultas$ = this.mainService.getConsultas();
  }

  delete(row) {
    this.mainService.saveConsulta(row.id).subscribe(
      res => { this.openSnackBar('Sua consulta foi desmarcada!'); },
      err => { this.openSnackBar(err.message);}
    );
  }

  openSnackBar(message) { this.snackBar.open(message, 'Fechar', { duration: 3000 }); }

}
