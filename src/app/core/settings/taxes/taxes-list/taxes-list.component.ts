import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import {  RouterModule } from '@angular/router';
import { MessageService, SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { routes } from 'src/app/shared/routes/routes';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from 'src/app/common-component/modals/confirm-dialog/confirm-dialog.component';
import { ShowHideDirective } from 'src/app/common-component/show-hide-directive/show-hide.directive';
import { ToastModule } from 'primeng/toast';
import { AddTaxesComponent } from '../add-taxes/add-taxes.component';
import { EditTaxesComponent } from '../edit-taxes/edit-taxes.component';
import { TaxesService } from '../taxes.service';

@Component({
  selector: 'app-taxes-list',
  templateUrl: './taxes-list.component.html',
  styleUrl: './taxes-list.component.scss',
  
  standalone: true,
  imports: [MatTableModule, MatButtonModule, SharedModule, TableModule, CommonModule,
    SharedModule, RouterModule, ButtonModule, FormsModule, ConfirmDialogComponent, ShowHideDirective, ToastModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService]
})
export class TaxesListComponent {
  
  public routes = routes;
  searchDataValue = "";
  selectedTaxes = [];
  originalData: any = [];
  showDialog = false;
  modalData: any = {};
  taxID: any;

  taxesListData = [];

  constructor(public dialog: MatDialog,
    private service: TaxesService,
    private messageService: MessageService
  ) {

  }

  openAddDialog() {
    
    const dialogRef = this.dialog.open(AddTaxesComponent);
    dialogRef.afterClosed().subscribe(dialog => {
      if (dialog === true) return;
      this.service.CreateTax(dialog).subscribe((resp: any) => {
        if (resp.status === 'success') {
          const message = "Tax has been added";
          this.messageService.add({ severity: 'success', detail: message });
          this.getTaxesList();
        } else {
          const message = resp.message
          this.messageService.add({ severity: 'error', detail: message });
        }
      })
    })
  }
  openEditDialog(Id: string) {
    if (!Id) return;
    const dialogRef = this.dialog.open(EditTaxesComponent, {
      data: Id
    });

    dialogRef.afterClosed().subscribe(dialog => {
      if (dialog === true) return;
      dialog.id = Id;
      this.service.updateTaxById(dialog).subscribe((resp: any) => {
        if (resp.status === 'success') {
          const message = "Tax Details has been updated"
          this.messageService.add({ severity: 'success', detail: message });
          this.getTaxesList();
        } else {
          const message = resp.message
          this.messageService.add({ severity: 'error', detail: message });
        }
      })
    })
  }

  getTaxesList(){
    this.service.getAllTaxList().subscribe((resp:any)=>{
      this.taxesListData = resp.data
    })
  }

  ngOnInit(): void{
    this.getTaxesList()
  }



  deletetaxes(Id: any) {
    this.taxID = Id;
    this.modalData = {
      title: "Delete",
      messege: "Are you sure you want to delete this Tax Details"
    }
    this.showDialog = true;
    
  }

  showNewDialog() {
    this.showDialog = true;
  }

  callBackModal() {
    this.service.deleteTaxById(this.taxID).subscribe(resp => {
      const message = "Visit Reason  has been deleted"
      this.messageService.add({ severity: 'success', detail: message });
      this.getTaxesList();
      this.showDialog = false;
    })
  }

  close() {
    this.showDialog = false;
  }


  public searchData(value: any): void {
    this.taxesListData = this.originalData.map(i => {
      if (i.name.toLowerCase().includes(value.trim().toLowerCase())) {
        return i;
      }
    });
  }


}