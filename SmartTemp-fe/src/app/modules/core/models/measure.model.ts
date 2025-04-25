export interface MeasureData {
  measurDate: string;
  sensor: string;
  temp: number;
  mois: number;
  level: number;
}

export interface MeasureDataList {
  measurDates: string[];
  sensor: string;
  temps: number[];
  mois: number[];
  levels: number[];
}

export interface MeasureSensor {
  name: string;
  ip: string;
  active: boolean;
}

export interface MeasureSensorDTO {
  name: string;
  ip: string;
}

export interface MeasureSensorActiveDTO {
  name: string;
  active: boolean;
}


export interface MeasureResponse {
  timestamp: string;
  message: string;
  code: string;
}



