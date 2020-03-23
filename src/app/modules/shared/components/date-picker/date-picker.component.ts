import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'shared-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit, OnChanges {

  @Input() pickerTitle: string;
  @Input() pickerDate: string;
  @Output() selectedDate = new EventEmitter();
  currentDate = new FormControl();
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.detectDate();
  }

  changeEvent(event) {
    console.log('date selected as ', event.value);
    this.selectedDate.emit(event.value);
  }

  /**
   * Detects date. If the user supplies a date, it will set that else it will display the current date
   */
  detectDate() {
    if (this.pickerDate) {
      this.currentDate.setValue(new Date(this.pickerDate));
    } else {
      this.currentDate.setValue(new Date());
    }
  }

}
