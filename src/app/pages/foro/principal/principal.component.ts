import { Component, OnInit } from '@angular/core';
import { ForoService } from '../../../services/foro.service';
import { Foro } from '../../../interfaces/Foro.interface';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  get user(){
    return this.authService.user
  }
  page : number = 0
  toBuscar : string = ''
  foros !: Foro[]
  constructor(private foroService : ForoService,
              private authService : AuthService) { }

  ngOnInit(): void {
    this.foroService.getForos().subscribe( resp => {
      this.foros = resp.foros
    })
  }
  nextPage(){
    if(this.page + 4 > this.foros.length) {
      return
    }
    this.page += 4
  }
  backPage(){
    if(this.page > 0){
      this.page -= 4
    }
  }


}
