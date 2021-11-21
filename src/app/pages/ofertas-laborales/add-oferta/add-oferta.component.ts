import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Oferta } from '../../../interfaces/Oferta.interface';
import { AuthService } from '../../../services/auth.service';
import { OfertasService } from '../../../services/ofertas.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-oferta',
  templateUrl: './add-oferta.component.html',
  styleUrls: ['./add-oferta.component.scss']
})
export class AddOfertaComponent implements OnInit {
  get user(){
    return this.auth.user
  }
  oferta !: Oferta
  ofertaForm : FormGroup = this.fb.group({
    title:[, [Validators.required]],
    desc: [, [Validators.required]],
    empresa: [, [Validators.required]],
    mail: [, [Validators.required, Validators.email]],
    jornada: [, [Validators.required]],
    categoria: [, [Validators.required]],
    min: [, [Validators.required]],
    max: [, [Validators.required]]
  })
  img : any
  constructor(private fb: FormBuilder, private auth: AuthService, private ofertaService: OfertasService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(!this.ofertaForm.valid){
      Swal.fire(
        'Error!',
        'Complete correctamente el formulario!',
        'error'
      )
    }else{
      if(this.img){
        const { title, desc, empresa, mail, jornada, categoria, min, max } = this.ofertaForm.value
        this.oferta = {
          title,
          desc,
          empresa,
          email: mail,
          creado_por: this.auth.user.id,
          categoria,
          img: this.img,
          salario_min : min,
          salario_max : max,
          tipo_jornada: jornada
        }
        this.ofertaService.addOferta(this.oferta).subscribe(async(resp:any) => {
          if(resp.ok){
            await (Swal.fire(
              'Listo!',
              'Oferta agregada correctamente!',
              'success'
            ))
            this.router.navigateByUrl('/ofertas/busqueda')
          }else{
            console.log(resp)
          }
        })
      }else{
        (Swal.fire(
          'Error!',
          'Debe agregar un logo de empresa!',
          'error'
        ))
      }
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
}
