import { Component, OnInit } from '@angular/core';

// Declaro esta fucion para que me carge todos los scripts, este error ocurre al cagar el login
declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    init_plugins();
  }

}
