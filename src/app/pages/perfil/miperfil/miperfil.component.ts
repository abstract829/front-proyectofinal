import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.scss']
})
export class MiperfilComponent implements OnInit {
  get user(){
    return this.auth.user
  }
  getTipo(){
    if(this.user.tipo_user == 1) return 'Egresado'
    if(this.user.tipo_user == 2) return 'Empresario'
    if(this.user.tipo_user == 3) return 'Estudiante'
    return null
  }
  userForm : FormGroup = this.fb.group({
  name: [this.user.name, [Validators.required]],
  email: [this.user.email , [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
  password: [],
  nuevapassword: [, Validators.minLength(6)]
  })
  img : any
  toggleForm: boolean = false
  togglePassword: boolean = false
  constructor(private auth: AuthService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  onEditar(){
    this.toggleForm = !this.toggleForm
  }
  onPassword(){
    this.togglePassword = !this.togglePassword
  }
  async onGuardarInfo(){
    const { name, email } = this.userForm.value
    if(this.userForm.get('email')!.valid && this.userForm.get('name')!.valid){
      const newDatos = {...this.user}
      newDatos.email = email
      newDatos.name = name
      await this.auth.editarUsuario(newDatos).subscribe((resp:any) => {
        if(resp.ok){
          this.auth.user = newDatos
          Swal.fire(
            'Listo!',
            'Usuario actualizado con exito!',
            'success'
          )
        }else{
          (Swal.fire(
            'Error!',
            'Error editando los datos!',
            'error'
          ))
        }
      })
      this.onEditar()
    }else{  
      (Swal.fire(
        'Error!',
        'Los datos no son validos!',
        'error'
      ))
    }
  }
  async onGuardarPass(){
    const { password, nuevapassword } = this.userForm.value
    if(password === this.user.password){
      if(nuevapassword === null || nuevapassword.length < 6){
        (Swal.fire(
          'Error!',
          'La password nueva no es valida!',
          'error'
        ))
      }else{
        const newDatos = {...this.user}
        newDatos.password = nuevapassword
        await this.auth.editarUsuario(newDatos).subscribe((resp:any)=>{
          if(resp.ok){
            this.auth.user = newDatos

            Swal.fire(
              'Listo!',
              'Password cambiada con exito!',
              'success'
            )
          }else{
            (Swal.fire(
              'Error!',
              'Error editando los datos!',
              'error'
            ))
          }
        })

        this.onPassword()
      }
      
    }else{
      (Swal.fire(
        'Error!',
        'La password no es la actual!',
        'error'
      ))
    }
  }
  getBase64 = (file:any) => new Promise((resolve,reject)=>{
    var reader = new FileReader();
    let resp
    reader.readAsDataURL(file);
    reader.onload = function () {
      resolve({
        img: reader.result
      })
    };
    reader.onerror = function (error) {
      reject({
        error
      })
    };
  })
  async capturar(e : any){
    await this.getBase64(e.target.files[0]).then((res:any) => {
      if(res.img){
        this.img = res.img
      }
    })
  }
  guardarFoto(){
    if(this.img){
      this.auth.agregarFoto(this.user.id!, this.img).subscribe(resp => {
        this.auth.user.img = this.img
        Swal.fire(
          'Listo!',
          'Foto actualizada con exito!',
          'success'
        )
      })
    }else{
        Swal.fire(
          'Error!',
          'No has seleccionado ninguna imagen!',
          'error'
        )
    }
  }
}
