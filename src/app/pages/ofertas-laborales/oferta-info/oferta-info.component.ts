import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfertasService } from '../../../services/ofertas.service';
import { Oferta } from '../../../interfaces/Oferta.interface';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-oferta-info',
  templateUrl: './oferta-info.component.html',
  styleUrls: ['./oferta-info.component.scss']
})
export class OfertaInfoComponent implements OnInit {
  oferta !: Oferta
  get user(){
    return this.auth.user
  }
  constructor(private route : ActivatedRoute,
              private ofertasService : OfertasService,
              private auth : AuthService,
              private router: Router) { }
  getJornada(oferta: Oferta){
    if(oferta.tipo_jornada == 1){
      return 'Part time'
    }else if(oferta.tipo_jornada == 2){
      return 'Full time'
    }else if(oferta.tipo_jornada == 3){
      return 'Por horas'
    }
    return
  }
  ngOnInit(): void {
    
    this.route.params.subscribe(({id}) => {
      console.log(id)
      this.ofertasService.getOfertaById(id).subscribe(resp => {
        if(resp.ok){
          this.oferta = resp.ofertas![0]
          console.log(this.oferta)
        }else{
          console.log(resp.msg)
        }
      })
    })
  }
  onBorrar(){
    this.ofertasService.delOferta(this.oferta.id!).subscribe(async(resp:any) => {
      if(resp.ok){
        await (Swal.fire(
          'Listo!',
          'Oferta eliminada correctamente!',
          'success'
        ))
        this.router.navigateByUrl('/ofertas/busqueda')
      }
    })
  }
}
