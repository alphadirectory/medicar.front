import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConsultasInjectorService } from '../services/consultas-injetor.service';
import { MedicarService } from '../services/medicar.service';



@Component({
  selector: 'app-marcar',
  templateUrl: './marcar.component.html',
  styleUrls: ['./marcar.component.css']
})
export class MarcarComponent implements OnInit {

  confirmBtnDisable = true;
  payload: object;

  constructor(
    private consultasInjectorService: ConsultasInjectorService,
    private router: Router,
    private medicaService: MedicarService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.consultasInjectorService.getAllParams().subscribe(
      res => {
        if (res && res.hasOwnProperty('agenda_id') && res.hasOwnProperty('horario')) {
          this.confirmBtnDisable = false;
          this.payload = res;
        }
      }
    );
  }

  saveDate() {
    this.medicaService.saveConsulta(this.payload).subscribe(
      res => {
        this.openSnackBar('Consulta marcada com sucesso!');
        this.backToHome();
      },
      err => {
        if (err.hasOwnProperty('error')) { this.openSnackBar(JSON.stringify(err.error)); }
      }
    );
  }

  cancelActions() {
    this.consultasInjectorService.cleanBehaviors();
    this.backToHome();
  }

  backToHome() { this.router.navigateByUrl('/consultas'); }

  openSnackBar(message) { this.snackBar.open(message, 'Fechar', { duration: 3000 }); }

}
