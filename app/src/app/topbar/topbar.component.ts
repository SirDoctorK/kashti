import { Component, OnInit } from '@angular/core';
import * as brigade from '@brigadecore/brigade-sdk';
import { environment } from '../../environments/environment';

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

  async getToken() {
    let client = new brigade.APIClient(environment.apiUrl, '');
    let token = await client
      .authn()
      .sessions()
      .createUserSession();
    localStorage.oidcToken = JSON.stringify(token);
    window.location.href = token.authURL;
  }
}



