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
  rootPassword = ''; // Enter Root Password here

  showDiv = {
    login: true,
  };
  constructor() { }

  ngOnInit(): void {
  }

  async getToken() {
    console.log(this.rootPassword);
    let client = new brigade.APIClient(this.apiAddress, '');
    let token = await client
      .authn()
      .sessions()
      .createRootSession(this.rootPassword)
      .then((val) => {
        console.log(val);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}



