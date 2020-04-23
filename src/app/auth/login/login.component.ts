import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {

  formLogin: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  checked = false;  
  hide = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const logged = this.authService.isAuthenticated();
    if (logged) { this.router.navigateByUrl('/consultas'); }
  }

  goToRegister() { this.router.navigateByUrl('/register'); }

  onSubmit() {
    const payload = this.formLogin.value;
    this.authService.login(payload)
      .subscribe(
        () => {
          this.router.navigateByUrl('consultas');
          this.openSnackBar('Logado com sucesso');
        },
        () => { this.openSnackBar('Não foi possivel fazer login! Verifique se usuário e senha estão corretos'); }
      );
  }

  openSnackBar(message) { this.snackBar.open(message, 'Fechar', { duration: 3000 }); }
}

