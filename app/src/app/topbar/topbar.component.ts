import { Component, OnInit } from '@angular/core';
import * as brigade from '@brigadecore/brigade-sdk';
import { environment } from '../../environments/environment';
import { StorageService } from '../services/storage.service';
import {NULL_AS_ANY} from "@angular/compiler-cli/src/ngtsc/typecheck/src/expression";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})

export class TopbarComponent implements OnInit {

  title = 'kashti';
  subscription: any;
  status = 'false';

  showDiv = {
    login: true,
  };
  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.storageService.addUser$.subscribe(
        status => {
          this.status = status;
        }
    );
  }

  // tslint:disable-next-line:typedef
  async checkStatus() {
    const client = new brigade.APIClient(environment.apiUrl, '');
    if (this.subscription) {
      this.subscription.unsubscribe();
      // const token = await client
      //     .authn()
      //     .sessions().delete();
      // localStorage.oidcToken = JSON.stringify(token);
      // console.log('destroyed');
    }
    this.subscription = this.storageService.getAddUser().subscribe();
    if (localStorage.getItem('oidcToken') === null) {
      const token = await client
          .authn()
          .sessions()
          .createUserSession();
      localStorage.oidcToken = JSON.stringify(token);
      window.open(token.authURL, '_blank');
    }
  }
}



