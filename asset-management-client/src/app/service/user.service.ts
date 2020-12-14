import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    noAuthHeader = {
        headers: new HttpHeaders({ 'NoAuth': 'True' })
    };

    constructor(private http: HttpClient) {}

    login(userObj: User) {
        return this.http.post(environment.apiBaseUrl + '/login', userObj, this.noAuthHeader);
    }

    setToken(token: string) {
        localStorage.setItem('token', token);
    }

    getToken(): string {
        return localStorage.getItem('token');
    }

    deleteToken() {
        localStorage.removeItem('token');
    }

    getUserPayload() {
        let token = localStorage.getItem('token');
        if (token) {
            let userPayload = atob(token.split('.')[1]);
            return JSON.parse(userPayload);
        } else {
            return null;
        }
    }

    isLoggedIn() {
        let userPayload = this.getUserPayload();
        if (userPayload) {
            return userPayload.exp > (Date.now() / 1000);
        } else {
            return false;
        }
    }
}