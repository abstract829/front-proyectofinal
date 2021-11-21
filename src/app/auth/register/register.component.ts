import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../interfaces/Usuario.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  miForm: FormGroup = this.fb.group({
    name: [, Validators.required],
    email: [, [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    tipo_user: [,Validators.required],
    password: [,[Validators.required, Validators.minLength(6)]]
  })

  user !: Usuario
  constructor(private fb : FormBuilder,
              private auth : AuthService,
              private router: Router) { }
  ngOnInit(): void {
  }

  onRegister(e:Event){
    e.preventDefault()
    const { email, tipo_user, name, password } = this.miForm.value
    this.auth.verifyEmail(email).subscribe(resp => {
      if(resp.ok){
        (Swal.fire(
          'Error!',
          'El email ya esta registrado!',
          'error'
        ))
      }else{
        if(this.miForm.valid){
          this.user = { name, email, tipo_user, password }
          this.auth.crearUsuario(this.user).subscribe((resp:any) =>{
            if(resp.ok){
              this.auth.user = resp.user
              localStorage.setItem('token', resp.token!)
              this.router.navigateByUrl('/ofertas/busqueda')
            }else{
              console.log(resp)
            }
          })
        }else{
          (Swal.fire(
            'Error!',
            'Debe completar todos los campos!',
            'error'
          ))
        }
      }
    })
  }
  validar(campo: string){
    const el = document.querySelector(`.${campo}_error`)
    if(!this.miForm.get(campo)?.valid){
      el?.classList.remove('hide')
    }else{
      el?.classList.add('hide')
    }
  }
  toLogIn(){
    this.router.navigateByUrl('/auth/login')
  }
}
