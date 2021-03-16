import { Component, OnInit } from '@angular/core';
import * as brigade from '@brigadecore/brigade-sdk';
import { StorageService } from '../services/storage.service';
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
  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
  }

  async getToken() {
    let client = new brigade.APIClient(environment.apiUrl, '');
    let token = await client
      .authn()
      .sessions()
      .createUserSession();
    localStorage.oidcToken = JSON.stringify(token);
    window.open(token.authURL, '_blank');
  }
}



