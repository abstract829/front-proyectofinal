import { Component, OnInit } from '@angular/core';
import { ForoService } from '../../../services/foro.service';
import { Foro } from '../../../interfaces/Foro.interface';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  foros !: Foro[]
  constructor(private foroService : ForoService) { }

  ngOnInit(): void {
    this.foroService.getForos().subscribe( resp => {
      this.foros = resp.foros
    })
  }



}
