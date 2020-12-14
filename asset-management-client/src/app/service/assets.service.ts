import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Asset } from "../models/assets.model";

@Injectable({
    providedIn: 'root'
})

export class AssetsService {
    constructor(private http: HttpClient) {}

    getAllAssets(): Observable<Asset[]> {
        return this.http.get<Asset[]>(environment.apiBaseUrl + '/assets');
    }
}