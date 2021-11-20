import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ForoService } from '../../../services/foro.service';
import { Foro } from '../../../interfaces/Foro.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-foro',
  templateUrl: './add-foro.component.html',
  styleUrls: ['./add-foro.component.scss']
})
export class AddForoComponent implements OnInit {
  get user(){
    return this.auth.user
  }
  foroForm : FormGroup = this.fb.group({
    title: [, Validators.required],
    desc: [, Validators.required],
  })

  newForo !: Foro
  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private foroService: ForoService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onCrear(){
    const {title, desc} = this.foroForm.value
    const creado_por = this.user.id
    this.newForo = {
      title,
      desc,
      creado_por
    }
    if(this.foroForm.valid){
      this.foroService.addForo(this.newForo).subscribe((resp:any) => {
        if(resp.ok){
          Swal.fire(
            'Listo!',
            'Se agrego correctamente el foro!',
            'success'
          )
          setTimeout(() => {
            this.router.navigateByUrl('/foro/busqueda')
          }, 1000);
        }else{
          Swal.fire(
            'Error!',
            'Error al agregar el foro!',
            'error'
          )
        }
      })
    }else{
      Swal.fire(
        'Error!',
        'Complete todos los campos!',
        'error'
      )
    }
    
  }

}
