import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {TableElementInterface} from './../../interfaces/table-element-interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DashboardCoreService } from 'src/app/modules/dashboard/services/dashboard-core/dashboard-core.service';

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

  constructor(private readonly DashboardCoreSrvc: DashboardCoreService) { }

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

  exportAsCSV() {
    const exportArray = [...this.dataSource.data];
    const parsedExportData = this.DashboardCoreSrvc.parseDataForExport(exportArray, this.columns);
    this.DashboardCoreSrvc.downloadDataAsCSV(parsedExportData.data, parsedExportData.columns);
  }

}
