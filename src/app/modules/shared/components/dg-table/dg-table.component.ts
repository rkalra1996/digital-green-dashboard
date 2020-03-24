import { Component, OnInit, Input } from '@angular/core';
import {TableElementInterface} from './../../interfaces/table-element-interface';

@Component({
  selector: 'shared-dg-table',
  templateUrl: './dg-table.component.html',
  styleUrls: ['./dg-table.component.scss']
})
export class DgTableComponent implements OnInit{

  tableData: object;
  columns: string[];
  rows: TableElementInterface[];

  @Input() get tableDetails(): object {
    return this.tableData;
  }
  set tableDetails(value: object) {
    console.log('recieved new values in table as ', value);
    this.tableData = value;
    // extract the values
    if (this.tableData) {
      this.extractTableData();
    }
  }

  constructor() { }

  ngOnInit(): void {}

  extractTableData() {
    this.columns = this.tableData['columns'];
    this.rows = this.tableData['rows'];
  }

}
