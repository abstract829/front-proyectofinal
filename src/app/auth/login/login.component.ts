import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  miForm: FormGroup = this.fb.group({
    email: ['jose@email.com'],
    password: []
  })
  constructor(private fb : FormBuilder,
              private auth : AuthService,
              private router : Router) { }

  ngOnInit(): void {
  }
  onLogin(e:Event){
    e.preventDefault()
    const { email, password } = this.miForm.value
    this.auth.verifyEmail( email ).subscribe( resp => {
      if(resp.ok){
        if(resp.user?.password == password){
          this.auth.user = resp.user!
          localStorage.setItem('token', resp.token!)
          this.router.navigateByUrl('/ofertas')
        }else{
          Swal.fire(
            'Error!',
            'Password incorrecta!',
            'error'
          )
        }
      }else{
        Swal.fire(
          'Error!',
          'El correo no existe!',
          'error'
        )
      }
    })
  }
  toRegister(){
    
    this.router.navigateByUrl('/auth/register')
  }
}
