import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  get user(){
    return this.auth.user
  }
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }
  onLogout(){
    localStorage.clear()
  }

}
