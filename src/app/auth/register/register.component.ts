import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Register } from '../ models/main';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hidePass = false;
  hideConfirmPass = false;

  formRegister = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  }, { Validators: this.passwordMatchValidator });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const payload: Register = {
      ...this.formRegister.value,
      password: this.formRegister.value.password
    };
    this.authService
      .register(payload)
      .subscribe(
        (success) => { this.openSnackBar('Usuário criado com sucesso'); },
        (err) => { this.openSnackBar('Erro ao cadastrar usuário! Verifique os dados informados'); }
      );
  }

  goTologin() {
    this.router.navigateByUrl('/login');
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.controls.password.value;
    const confirmpassword = group.controls.password.value;
    return password === confirmpassword ? null : { mismatch: true };
  }

  openSnackBar(message) { this.snackBar.open(message, 'Fechar', { duration: 3000 }); }

}
