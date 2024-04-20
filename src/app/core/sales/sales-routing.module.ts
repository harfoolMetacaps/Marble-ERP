import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesComponent } from './sales.component';
import { AddsalesComponent } from './addsales/addsales.component';
import { PaidSalesComponent } from './paid-sales/paid-sales.component';
import { UnpaidSalesComponent } from './unpaid-sales/unpaid-sales.component';


const routes: Routes = [
  {
    path: '',
    component: SalesComponent,
  },
  {
    path: 'add-sales',
    component: AddsalesComponent,
  },
  {
    path: 'paid-sales',
    component: PaidSalesComponent,
  },
  {
    path: 'unpaid-sales',
    component: UnpaidSalesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesRoutingModule { }