import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';

import { Bill } from './../models/bill.model';
import { BaseApi } from '../../../shared/core/base-api';

@Injectable()
export class BillService extends BaseApi {
    constructor(public http: Http) {
        super(http);
    }

    getBill(): Observable<Bill> {
        return this.get('bill');
    }

    getCurrency(): Observable<any> {
        return this.http.get('http://data.fixer.io/api/latest?access_key=46d2eb5fef968f8a3a8b6e669484a04f')
        .map((response: Response) => response.json());
    }
}