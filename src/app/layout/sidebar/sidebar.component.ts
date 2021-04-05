import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if(localStorage.length==0)
    window.location.replace("");

  }
  deconnecte()
  {
localStorage.clear();
window.location.replace("");


  }
}
