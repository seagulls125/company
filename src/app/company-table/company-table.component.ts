import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CompanyService } from '../company.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface UserData {
  name: string;
  symbol: string;
  market: string;
  price : string;
  time : string;
}

export const students = [
  {
    id : 1,
    chemistry : 45,
    physics : 65,
    maths : 12,
    pass : true
  },
  {
    id : 2,
    chemistry : 45,
    physics : 65,
    maths : 12,
    pass : false
  },
  {
    id : 3,
    chemistry : 45,
    physics : 65,
    maths : 12,
    pass : true
  }
]

@Component({
  selector: 'app-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.scss']
})
export class CompanyTableComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['name','symbol','market','price','time'];
  dataSource: MatTableDataSource<UserData>;

  company_data : any;       //company list data
  stock_data : [];          //price & time data
  display_data = [];        //table data for showing

  total = 0;                //total marks for students

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service : CompanyService) { 
  }

  ngOnInit(): void {
    const pass_students = students.filter(item => item['pass']);
    pass_students.forEach(item => {
      this.total += item['maths'] + item['physics'] + item['chemistry'];
    });
  }

  ngAfterViewInit() {
    this.service.getStockPrice().subscribe(res => {
      this.stock_data = res['stockPrices'];

      this.service.getCompanyData().subscribe(res => {
        this.company_data = res['companies'];
        this.company_data.map(item => {
          let temp = [];      //temporary record for adding to table
          let list = [];      //get stock data matching company id
          let latest =[];     //
          list = this.stock_data.filter(i => i['companyId'] == item['id']);
          
          if(list.length > 0) {
            latest = list.sort((a,b) => new Date(b['time']).getTime() - new Date(a['time']).getTime())[0];
          }
          else{
            latest['price'] = '';
            latest['time'] = '';
          }
  
          temp['name'] = item['name'];
          temp['symbol'] = item['symbol'];
          temp['market'] = item['market'];
          temp['price'] = latest['price'];
          temp['time'] = latest['time'];

          this.display_data.push(temp);
        });

        this.dataSource = new MatTableDataSource(this.display_data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });


    });
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
