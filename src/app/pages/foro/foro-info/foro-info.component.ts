import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ForoService } from '../../../services/foro.service';
import { Foro } from '../../../interfaces/Foro.interface';
import { Comentario } from '../../../interfaces/Comentario.interface';
import { AuthService } from '../../../services/auth.service';
import { Usuario } from 'src/app/interfaces/Usuario.interface';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-foro-info',
  templateUrl: './foro-info.component.html',
  styleUrls: ['./foro-info.component.scss']
})
export class ForoInfoComponent implements OnInit {
  foro !: Foro
  user !: Usuario
  comentarios !: Comentario[]
  toComentar : string = ''
  get logedUser(){
    return this.authService.user
  }
  constructor(private route: ActivatedRoute,
              private foroService: ForoService,
              private authService : AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(({id}) => {
      this.foroService.getForoById(id).subscribe((resp:any) => {
        this.foro = resp.foro
        this.authService.getUserById(this.foro.creado_por!).subscribe((resp:any)=>{
          this.user = resp.user
        })
        this.foroService.getComentariosByForoId(this.foro.id!).subscribe( resp => {
          this.comentarios = resp.comentarios
        })
      })
    })
  }
  addComentario(){
    const send = {
      iduser : this.logedUser.id,
      idforo: this.foro.id,
      comentario: this.toComentar
    }
    this.foroService.addComentario(send).subscribe((resp:any) =>{
      if(resp.ok){
        this.ngOnInit()
      }
    })
  }
  delForo(){
    this.foroService.delForo(this.foro.id!).subscribe((resp:any) => {
      if(resp.ok){
        Swal.fire(
          'Listo!',
          'Se elimino correctamente el foro!',
          'success'
        )
      }else{
        Swal.fire(
          'Error!',
          'Hubo un error eliminando el foro!',
          'error'
        )
      }
    })
    setTimeout(() => {
      this.router.navigateByUrl('/foro/busqueda')
    }, 1000);
  }
}
