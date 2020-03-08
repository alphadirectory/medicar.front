import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConsultasInjectorService } from '../services/consultas-injetor.service';
import { MedicarService } from '../services/medicar.service';


@Component({
  selector: 'app-agendas',
  templateUrl: './agendas.component.html',
  styleUrls: ['./agendas.component.css']
})
export class AgendasComponent implements OnInit {

  agendasOptions = [];
  hoursListOptions = [];
  selectDayDisable = true;
  selectHourDisable = true;
  agendaSelected: number;
  hourSelected: string;
  chosenDate: number;


  constructor(
    private medicarService: MedicarService,
    private consultasInjectorService: ConsultasInjectorService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAvaibleAgendas();
  }

  getAvaibleAgendas() {
    this.consultasInjectorService.getAllParams().subscribe(
      res => {
        if (res && res.hasOwnProperty('medico')) {
          const response = this.medicarService.getAgendas(res);
          response.subscribe(
            res => {
              if (res.length === 0) {
                this.openSnackBar('Nenhuma Agenda disponível! Tente outro medico ou aguarde atualização');
              } else {
                this.selectDayDisable = false;
                this.agendasOptions = res;
              }
            },
            err => { this.openSnackBar('Ops! Tivemos um problema interno! tente novamente mais tarde.'); }
          );
        }
      }
    );
  }

  selectDay(day) {
    if (day.hasOwnProperty('horario')) {
      if (day.horario.length > 0) {
        this.chosenDate = day.id;
        this.hoursListOptions = day.horario;
        this.selectHourDisable = false;
      } else {
        this.openSnackBar('Não encontramos nenhum horário disponível para essa data');
      }
    }
  }

  selectHour(horario) {
    const payload = {
      agenda_id: this.chosenDate,
      horario: horario
    };
    this.consultasInjectorService.readyToFinish(payload);
  }

  openSnackBar(message) { this.snackBar.open(message, 'Fechar', { duration: 3000 }); }
}
