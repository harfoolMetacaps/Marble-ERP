import { Component, OnInit } from "@angular/core";
import { Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { DataService } from "src/app/shared/data/data.service";
import {
  pageSelection,
  apiResultFormat,
  invoicereport,
} from "src/app/shared/models/models";
import { routes } from "src/app/shared/routes/routes";
interface data {
  value: string;
}
@Component({
  selector: "app-inventory-reports",
  // standalone: true,
  // imports: [],
  templateUrl: "./inventory-reports.component.html",
  styleUrl: "./inventory-reports.component.scss",
})
export class InventoryReportsComponent implements OnInit {
  public routes = routes;
  picker1: any;

  public selectedValue!: string;
  public invoiceReports: Array<invoicereport> = [];
  dataSource!: MatTableDataSource<invoicereport>;

  public showFilter = false;
  public searchDataValue = "";
  public lastIndex = 0;
  public pageSize = 10;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;

  constructor(public data: DataService) {}
  ngOnInit() {
    this.getTableData();
  }
  private getTableData(): void {
    this.invoiceReports = [];
    this.serialNumberArray = [];

    this.data.getInvoiceReports().subscribe((data: apiResultFormat) => {
      this.totalData = data.totalData;
      data.data.map((res: invoicereport, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          this.invoiceReports.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<invoicereport>(
        this.invoiceReports
      );
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.invoiceReports = this.dataSource.filteredData;
  }

  public sortData(sort: Sort) {
    const data = this.invoiceReports.slice();

    if (!sort.active || sort.direction === "") {
      this.invoiceReports = data;
    } else {
      this.invoiceReports = data.sort((a, b) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === "asc" ? 1 : -1);
      });
    }
  }

  public getMoreData(event: string): void {
    if (event == "next") {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    } else if (event == "previous") {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    }
  }

  public moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.skip = this.pageSelection[pageNumber - 1].skip;
    this.limit = this.pageSelection[pageNumber - 1].limit;
    if (pageNumber > this.currentPage) {
      this.pageIndex = pageNumber - 1;
    } else if (pageNumber < this.currentPage) {
      this.pageIndex = pageNumber + 1;
    }
    this.getTableData();
  }

  public PageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData();
  }

  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalData / pageSize;
    if (this.totalPages % 1 != 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    /* eslint no-var: off */
    for (var i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }
  selectedList: data[] = [
    { value: "Select Patient" },
    { value: "Bernardo James" },
    { value: "Galaviz Lalema" },
    { value: "Tarah Williams" },
  ];

  invertoryData = [
    {
      Product: "Acer Aspire Desktop",
      itemCode: "6924912299",
      Category: "Desktops",
      Brand: "Acer",
      purchasePrice: "$601.00",
      salesPrice: "$618.00",
      currentStock: "102 pc",
      
    },
    {
      Product: "adidas Golf Shoes",
      itemCode: "8501385280",
      Category: "Shoes",
      Brand: "Adidas",
      purchasePrice: "$44.00",
      salesPrice: "$56.00",
      currentStock: "13 pc",
     
    },
    {
      Product: "adidas Tennis Shoes",
      itemCode: "4170463355",
      Category: "Shoes",
      Brand: "Adidas",
      purchasePrice: "$48.00",
      salesPrice: "$56.00",
      currentStock: "159 pc",
      
    },
    {
      Product: "Apple AirPods Max",
      itemCode: "5799345586",
      Category: "Headphones",
      Brand: "Apple",
      purchasePrice: "$23.00",
      salesPrice: "$26.00",
      currentStock: "135 pc",
      
    },
    {
      Product: "Apple AirPods Pro",
      itemCode: "2184642538",
      Category: "Headphones",
      Brand: "Apple",
      purchasePrice: "$19.00",
      salesPrice: "$21.00",
      currentStock: "10 pc",
      
    },
    {
      Product: "Apple EarPods",
      itemCode: "9628991420",
      Category: "Headphones",
      Brand: "Apple",
      purchasePrice: "$31.00",
      salesPrice: "$34.00",
      currentStock: "175 pc",
     
    },
    {
      Product: "Apple iMac",
      itemCode: "8942352935",
      Category: "Desktops",
      Brand: "Dell",
      purchasePrice: "$999.26",
      salesPrice: "$978.00",
      currentStock: "36 pc",
      
    },
    {
      Product: "Apple iPhone 11 (64GB) - Black",
      itemCode: "3180727514",
      Category: "Mobiles",
      Brand: "Apple",
      purchasePrice: "$40.00",
      salesPrice: "$41.00",
      currentStock: "33 pc",
     
    },
    {
      Product: "Apple iPhone 12 (128GB) - Green",
      itemCode: "7490438838",
      Category: "Mobiles",
      Brand: "Apple",
      purchasePrice: "$40.00",
      salesPrice: "$43.00",
      currentStock: "-7 pc",
    },
    {
      Product: "Apple iPhone 13 Pro Max",
      itemCode: "6425074325",
      Category: "Mobiles",
      Brand: "Apple",
      purchasePrice: "$37.00",
      salesPrice: "$41.00",
      currentStock: "71 pc",
    },
  ];
}