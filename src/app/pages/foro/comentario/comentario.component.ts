import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/Usuario.interface';
import { Comentario } from '../../../interfaces/Comentario.interface';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.scss']
})
export class ComentarioComponent implements OnInit {
  @Input() comentario !: Comentario
  user !: Usuario
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUserById(this.comentario.iduser).subscribe((resp:any) => {
      this.user = resp.user
    })
  }

}
