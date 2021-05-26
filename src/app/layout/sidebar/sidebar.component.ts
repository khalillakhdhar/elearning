import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
username:string;
grade:String;
  constructor() { }

  ngOnInit(): void {
    if(localStorage.length==0)
    window.location.replace("");
    this.grade=localStorage.getItem("grade");

  }
  deconnecte()
  {
localStorage.clear();
window.location.replace("");


  }
}
