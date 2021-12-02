import { Component, Input, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/interfaces/Usuario.interface';
import { Comentario } from '../../../interfaces/Comentario.interface';
import { AuthService } from '../../../services/auth.service';
import { ForoService } from '../../../services/foro.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.scss']
})
export class ComentarioComponent implements OnInit {
  @Input() comentario !: Comentario
  user !: Usuario
  likes : number = 0
  idforo !: number
  showLike :boolean = true
  get foroId() {
    return this.comentario.idforo
  }
  get logedUser(){
    return this.authService.user
  }
  constructor(private authService: AuthService,
              private foroService: ForoService,
              private router: Router,
              ) { }

  ngOnInit(): void {
    this.authService.getUserById(this.comentario.iduser).subscribe((resp:any) => {
      this.user = resp.user
    })

    this.foroService.getLikes(this.comentario.id!).subscribe((resp:any) => {
      this.likes = resp.qt
    })
    this.idforo = this.comentario.idforo

    this.foroService.addLike(this.logedUser.id!, this.comentario.id!).subscribe((resp:any) => {
      if(!resp.ok){
        this.showLike = false
      }
    })
  }
  delComentario(){
    this.foroService.delComentario(this.comentario.id!).subscribe((resp:any) => {
      if(resp.ok){
        window.location.reload()
      }
    })
  }
  addLike(){
    this.foroService.addLike(this.logedUser.id!, this.comentario.id!).subscribe((resp:any) => {
      this.ngOnInit()
    })
  }


}
