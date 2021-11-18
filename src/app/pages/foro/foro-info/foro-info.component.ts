import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForoService } from '../../../services/foro.service';
import { Foro } from '../../../interfaces/Foro.interface';
import { Comentario } from '../../../interfaces/Comentario.interface';
import { AuthService } from '../../../services/auth.service';
import { Usuario } from 'src/app/interfaces/Usuario.interface';

@Component({
  selector: 'app-foro-info',
  templateUrl: './foro-info.component.html',
  styleUrls: ['./foro-info.component.scss']
})
export class ForoInfoComponent implements OnInit {
  foro !: Foro
  user !: Usuario
  comentarios !: Comentario[]
  constructor(private route: ActivatedRoute,
              private foroService: ForoService,
              private authService : AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe(({id}) => {
      this.foroService.getForoById(id).subscribe((resp:any) => {
        this.foro = resp.foro
        this.authService.getUserById(this.foro.creado_por).subscribe((resp:any)=>{
          this.user = resp.user
        })
        this.foroService.getComentariosByForoId(this.foro.id!).subscribe( resp => {
          this.comentarios = resp.comentarios
        })
      })
    })
  }

}
