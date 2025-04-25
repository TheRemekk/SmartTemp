import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {
  MeasureData,
  MeasureResponse,
  MeasureSensor,
  MeasureSensorActiveDTO,
  MeasureSensorDTO
} from "../models/measure.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MeasureSensorsService {
  apiUrl = `${environment.apiUrl}/sensors`;
  constructor(private http: HttpClient) {}

  addSensor(body: MeasureSensor): Observable<MeasureResponse> {
    return this.http.post<MeasureResponse>(`${this.apiUrl}/add`, body, {
      withCredentials: true,
    });
  }

  getAllSensors(): Observable<MeasureSensor[]> {
    return this.http.get<MeasureSensor[]>(`${this.apiUrl}/list`, {
      withCredentials: true,
    });
  }

  getSensorByName(name: string): Observable<MeasureSensor> {
    const params = new HttpParams()
      .set('name', name);

    return this.http.get<MeasureSensor>(`${this.apiUrl}/getByName`, {
      params,
      withCredentials: true,
    });
  }

  updateSensorIp(body: MeasureSensorDTO): Observable<MeasureResponse> {
    return this.http.patch<MeasureResponse>(`${this.apiUrl}/updateIp`, body, {
      withCredentials: true,
    });
  }

  changeSensorActivation(body: MeasureSensorActiveDTO): Observable<MeasureResponse> {
    return this.http.patch<MeasureResponse>(`${this.apiUrl}/changeActivation`, body, {
      withCredentials: true,
    });
  }

  deleteSensor(name: string): Observable<MeasureResponse> {
    const params = new HttpParams()
      .set('name', name);

    return this.http.delete<MeasureResponse>(`${this.apiUrl}/delete`, {
      params,
      withCredentials: true,
    });
  }

  sendMessage(name: string, level: string): Observable<any> {
    const params = new HttpParams()
      .set('name', name)
      .set('mode', 'T')
      .set('level', level);

    return this.http.post<any>(`${this.apiUrl}/sendMessage`, null, {
      params,
      withCredentials: true,
    });
  }
}
