import { Component, OnInit } from '@angular/core';
import * as brigade from '@brigadecore/brigade-sdk';
import { environment } from '../../environments/environment';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})

export class TopbarComponent implements OnInit {

  title = 'kashti';
  subscription: any;
  status = 'false';

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
    const container = document.querySelector('.container');
    const session = JSON.parse(localStorage.getItem('oidcToken') || '{}');
    const token =  session.token || '';
    if (this.subscription && token !== '') {
      this.subscription.unsubscribe();
      container?.classList.remove('active');
      const client = new brigade.APIClient(environment.apiUrl, token);
      await client.authn().sessions().delete();
      localStorage.removeItem('oidcToken');
    }else if (typeof this.subscription === 'undefined' || token === '') {
      const client = new brigade.APIClient(environment.apiUrl, '' );
      const cToken = await client
          .authn()
          .sessions()
          .createUserSession();
      container?.classList.add('active');
      localStorage.oidcToken = JSON.stringify(cToken);
      window.open(cToken.authURL, '_blank');
    }
    this.subscription = this.storageService.getAddUser().subscribe();
  }
}
