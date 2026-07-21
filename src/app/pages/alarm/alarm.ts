import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { AlarmService } from '../../services/alarm.service';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.html',
  imports: [
    AsyncPipe
  ]
})
export class Alarm {

  constructor(public alarmService: AlarmService){}

  arm() {
    this.alarmService.arm();
  }

  disarm() {
    this.alarmService.disarm();
  }

  clearAlarm() {
    this.alarmService.clearAlarm();
  }
}