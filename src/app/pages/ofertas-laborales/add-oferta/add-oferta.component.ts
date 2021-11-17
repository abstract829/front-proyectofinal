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
  oferta !: Oferta
  ofertaForm : FormGroup = this.fb.group({
    title:[, [Validators.required]],
    desc: [, [Validators.required]],
    empresa: [, [Validators.required]],
    mail: [, [Validators.required]],
    jornada: [, [Validators.required]],
    categoria: [, [Validators.required]],
    min: [, [Validators.required]],
    max: [, [Validators.required]]
  })
  constructor(private fb: FormBuilder, private auth: AuthService, private ofertaService: OfertasService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(!this.ofertaForm.valid){
      Swal.fire(
        'Error!',
        'Todos los campos son obligatorios!',
        'error'
      )
    }else{
      const { title, desc, empresa, mail, jornada, categoria, min, max } = this.ofertaForm.value
      this.oferta = {
        title,
        desc,
        empresa,
        email: mail,
        creado_por: this.auth.user.id,
        categoria,
        img: '/assets/mcdonals.png',
        salario_min : min,
        salario_max : max,
        tipo_jornada: jornada
      }
      this.ofertaService.addOferta(this.oferta).subscribe(async(resp:any) => {
        console.log(resp)
        if(resp.ok){
          await (Swal.fire(
            'Listo!',
            'Oferta agregada correctamente!',
            'success'
          ))
          this.router.navigateByUrl('/ofertas/busqueda')
        }
      })
    }
    
  }

}
