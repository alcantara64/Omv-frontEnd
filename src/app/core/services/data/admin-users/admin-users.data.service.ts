import { User } from './../../../models/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export abstract class AdminUsersDataService {

    constructor() { }
   
    abstract getActiveAdminUsers(): Observable<User[]>;
    abstract getDisabledAdminUsers(): Observable<User[]>;
    abstract getUnassignedAdminUsers(): Observable<User[]>;
}