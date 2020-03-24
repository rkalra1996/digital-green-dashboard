import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {TableElementInterface} from './../../interfaces/table-element-interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'shared-dg-table',
  templateUrl: './dg-table.component.html',
  styleUrls: ['./dg-table.component.scss']
})
export class DgTableComponent implements OnInit{

  tableData: object;
  columns: string[];
  rows: TableElementInterface[];
  dataSource = new MatTableDataSource<TableElementInterface>([]);

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

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  extractTableData() {
    this.columns = this.tableData['columns'];
    this.rows = this.tableData['rows'];
    this.dataSource.data = this.rows;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
