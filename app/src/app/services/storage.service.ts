import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class StorageService {
    private addUserSource = new BehaviorSubject<string>('false');
    public addUser$ = this.addUserSource.asObservable();

    constructor() {
        this.addUser$.subscribe(status => window.localStorage.setItem('has_login', status));
    }

    getAddUser(): Observable<string> {
        let userStatus = window.localStorage.getItem('has_login');
        userStatus = (userStatus === 'false' || userStatus == null) ? 'true' : 'false';
        this.addUserSource.next(userStatus);
        return this.addUser$;
    }
}
