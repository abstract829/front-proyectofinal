import { Component, Input, OnInit } from '@angular/core';
import { Foro } from '../../../interfaces/Foro.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.scss']
})
export class ForoComponent implements OnInit {
  @Input() foro !: Foro
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onClickForo(){
    this.router.navigateByUrl(`/foro/info/${this.foro.id}`)
  }
}
