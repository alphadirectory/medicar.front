import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  navOptions: object;
  staffOptions: object = null;
  showFiller = false;

  constructor(
    private routes: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar

  ) { }

  selectPage(item) {
    this.routes.navigateByUrl(item.ref);
  }

  ngOnInit(): void {
    this.defineNavOptions();
  }

  defineNavOptions() {
    this.navOptions = [
      { name: 'Marcar consulta', icon: 'library_books', ref: 'marcar-consultas' },
      { name: 'Minhas Consultas', icon: 'access_alarms', ref: 'consultas' },
    ];
  }

  logOut() {
    if (confirm('Tem certeza que deseja encerrar a sessão?')) {
      const logout = this.authService.logOut();
      logout.subscribe(
        (res) => { this.openSnackBar('Deslogado com sucesso!'); },
        (err) => { console.log(err); }
      );
      this.routes.navigateByUrl('/login');
    }
  }

  openSnackBar(message) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000
    });
  }

  isStaff() {
    const user = this.authService.getClientData();
    if (user.hasOwnProperty('is_staff')) {
      return user.is_staff;
    } else {
      return false;
    }
  }

}
