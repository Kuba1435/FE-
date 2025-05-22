import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-compononet',
  imports: [],
  templateUrl: './login-compononet.component.html',
  styleUrl: './login-compononet.component.css'
})
export class LoginCompononetComponent {
  constructor(private router: Router) {}

  onLogin(event: Event) {
    event.preventDefault();
    // Zde můžete přidat ověření přihlašovacích údajů
    this.router.navigate(['/home']);
  }
}


