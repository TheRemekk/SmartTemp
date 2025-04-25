import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {MeasureData, MeasureDataList} from "../models/measure.model";

@Injectable({
  providedIn: 'root'
})
export class MeasureDataService {
  apiUrl = `${environment.apiUrl}/data`;
  constructor(private http: HttpClient) {}

  getDataList(sensorName: string, minValue: string, maxValue: string): Observable<MeasureDataList> {
    const params = new HttpParams()
      .set('sensorName', sensorName)
      .set('minValue', minValue)
      .set('maxValue', maxValue);

    return this.http.get<MeasureDataList>(`${this.apiUrl}/get`, {
      params: params,
      withCredentials: true,
    });
  }

  getLatestData(sensorName: string) {
    const params = new HttpParams()
      .set('sensorName', sensorName)

    return this.http.get<MeasureData>(`${this.apiUrl}/latest`, {
      params,
      withCredentials: true,
    });
  }
}
