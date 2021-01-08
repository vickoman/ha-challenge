import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() listOfColumns: string[]
  @Input() dataList: {}[]
  constructor() { }

  ngOnInit(): void {
  }

  sortNull() {}

}
