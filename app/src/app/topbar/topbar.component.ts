import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})

export class TopbarComponent implements OnInit {

  title = 'kashti';
  showDiv = {
    login: true,
  };
  constructor() { }

  ngOnInit(): void {
  }
}



