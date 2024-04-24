import { Component } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { routes } from "src/app/shared/routes/routes";
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { SuppliersdataService } from '../suppliers.service';

@Component({
  selector: 'app-edit-suppliers',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,DropdownModule,CommonModule],
  templateUrl: './edit-suppliers.component.html',
  styleUrl: './edit-suppliers.component.scss',
  providers: [MessageService],
})
export class EditSuppliersComponent {
  editSupplierGroup:UntypedFormGroup
  routes = routes;

  wareHouseArray = [
    {name:'Electronifly'},
    {name:'Warehouse Gas'},
  ]

  statusArray = [
    {name:'Enabled'},
    {name:'Disabled'},
  ]
  constructor( private fb: UntypedFormBuilder,private router: Router,private Service: SuppliersdataService,private messageService: MessageService) {
    this.editSupplierGroup = this.fb.group({
      wareHouse:['',[Validators.required]],
      name:['',[Validators.required]],
      phoneNumber: ['', [Validators.required,Validators.pattern(new RegExp(/^.{3,20}$/))],],
      email:['',[Validators.required,Validators.email]],
      status:['',[Validators.required]],
      taxNumber:['',[]],
      openingBalance:['',[]],
      creditPeriod:['',[]],
      creditLimit:['',[]],
      billingAddress:['',[]],
      shippingAddress:['',[]],
    })
  }



  editCustomerForm(){
    console.log(this.editSupplierGroup.value);
    const payload = []
    if (this.editSupplierGroup.value) {
      this.Service.UpDataSupplierApi(payload).subscribe(
        (resp: any) => {
          if (resp) {
            if (resp.status === "success") {
              // const message = "User has been updated";
              this.messageService.add({ severity: "success", detail: resp.message });
              setTimeout(() => {
                this.router.navigate(["/customers"]);
              }, 400);
            } else {
              const message = resp.message;
              this.messageService.add({ severity: "error", detail: message });
            }
          }
        }
      );
    } else {
      console.log("Form is invalid!");
    }
  }
}
