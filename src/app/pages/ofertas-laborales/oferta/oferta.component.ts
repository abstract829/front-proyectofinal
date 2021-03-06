import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Oferta } from '../../../interfaces/Oferta.interface';
import { OfertasService } from '../../../services/ofertas.service';


@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.scss']
})
export class OfertaComponent implements OnInit {
  @Input() oferta!: Oferta
  constructor(private router: Router, private os: OfertasService) { }

  ngOnInit(): void {
  }
  onClickOferta(){
    this.router.navigateByUrl(`ofertas/info/${this.oferta!.id}`)
  }
  
}
