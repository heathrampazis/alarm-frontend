import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AlarmState } from '../models/alarm-state';

@Injectable({
  providedIn: 'root'
})
export class AlarmService {

  // private api = "http://localhost:8080/api/alarm";     // Works locally, not with Docker
  private api = "/api/alarm";

  private stateSubject =
    new BehaviorSubject<AlarmState>({
      armed: false,
      motionDetected: false,
      alarmTriggered: false
    });

  state$ = this.stateSubject.asObservable();

  // poll backend every second
  constructor(private http: HttpClient){
    interval(1000)
      .subscribe(() => {
        this.refresh();
      });
  }

  refresh(){
    this.http.get<AlarmState>(
      `${this.api}/state`
    )
    .subscribe({
      next: (state)=>{
        console.log("Angular received:", state);
        this.stateSubject.next(state);
      },
      error:(err)=>{
        console.error("Alarm state error:", err);
      }
    });
  }
  
  arm(){
    this.http.post<AlarmState>(
      `${this.api}/arm`,
      {}
    )
    .subscribe(state=>{
      this.stateSubject.next(state);
    });
  }

  disarm(){
    this.http.post<AlarmState>(
      `${this.api}/disarm`,
      {}
    )
    .subscribe(state=>{
      this.stateSubject.next(state);
    });
  }

  clearAlarm(){
    this.http.post<AlarmState>(
      `${this.api}/clear`,
      {}
    )
    .subscribe(state=>{
      this.stateSubject.next(state);
    });
  }
}