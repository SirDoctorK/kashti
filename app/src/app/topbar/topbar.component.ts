import { Component, OnInit } from '@angular/core';
import * as brigade from '@brigadecore/brigade-sdk';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})

export class TopbarComponent implements OnInit {

  title = 'kashti';
  apiAddress = ''; // Enter API address here

  showDiv = {
    login: true,
  };
  constructor() { }

  ngOnInit(): void {
  }

  async getToken() {
    let client = new brigade.APIClient(this.apiAddress, '');
    let token = await client
      .authn()
      .sessions()
      .createUserSession();
    localStorage.oidcToken = JSON.stringify(token);
    window.location.href = token.authURL;
  }
}



