import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { routes } from "src/app/shared/routes/routes";
import { staffService } from "../staff.service";
import { MessageService } from "primeng/api";
import { Router } from "@angular/router";
import { WarehouseService } from "../../settings/warehouse/warehouse.service";
import { HttpErrorResponse } from "@angular/common/http";
interface data {
  value: string;
}
@Component({
  selector: "app-add-staff",
  templateUrl: "./add-staff.component.html",
  styleUrls: ["./add-staff.component.scss"],
})
export class AddStaffComponent {
  public routes = routes;
  addStaffForm!: FormGroup;
  public selectedValue!: string;

  Designation = [
    { value: "Select  Designation" },
    { value: "Labor" },
    { value: "Gaurd" },
    { value: "Accountant" },
    { value: "Sales Manager" },
    { value: "Transporter" },
    { value: "Marketing Manager" },
  ];
  warehouseData = [];
  personNameRegex = /^(?! )[A-Za-z]{3,15}(?: [A-Za-z]{3,15})?$/;
  AddressRegex = /^(?! )[A-Za-z]{3,100}(?: [A-Za-z]{3,100})?$/;
  AccountNumberRegex = /^[0-9]{14}$/;
  phoneRegex = /^[0-9]{10}$/;
  IfscCodeRegex = /^[0-9]{11}$/;
  pinRegex = /^\d{6}$/;
  emailRegex: string =
    "^(?!.*\\s)[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
  constructor(
    private fb: FormBuilder,
    private service: staffService,
    private messageService: MessageService,
    private router: Router,
    private warehouseService: WarehouseService
  ) {
    this.addStaffForm = this.fb.group({
      upiId: ["", [Validators.pattern(this.personNameRegex)]],
      dateOfBirth: ["", Validators.required],
      warehouseDetails: ["", Validators.required],
      firstName: [
        "",
        [Validators.required, Validators.pattern(this.personNameRegex)],
      ],
      lastName: [
        "",
        [Validators.required, Validators.pattern(this.personNameRegex)],
      ],
      mobile: ["", [Validators.required, Validators.pattern(this.phoneRegex)]],
      email: ["", [Validators.pattern(this.emailRegex)]],
      pincode: ["", [Validators.required, Validators.pattern(this.pinRegex)]],
      designation: ["", [Validators.required]],
      city: ["", [Validators.required, Validators.pattern(this.AddressRegex)]],
      address: ["", [Validators.pattern(this.AddressRegex)]],
      bankName: ["", [Validators.pattern(this.AddressRegex)]],
      accountName: ["", [Validators.pattern(this.AddressRegex)]],
      accountNumber: ["", [Validators.pattern(this.AccountNumberRegex)]],
      ifscCode: ["", [Validators.pattern(this.IfscCodeRegex)]],
    });
  }

  ngOnInit(): void {
    this.warehouseService.getAllWarehouseList().subscribe((resp: any) => {
      this.warehouseData = resp.data;
    });
  }

  addStaffFormSubmit() {
    // debugger
    const formData = this.addStaffForm.value;
    console.log("Form data", formData);
    
    console.log(this.addStaffForm.value);
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: formData.dateOfBirth,
      email: formData.email,
      mobile:formData.mobile,
      warehouseDetails: {
        _id: formData._id,
        name: formData.name,
      },
      designation: formData.designation,
      city: formData.city,
      pinCode: formData.pinCode,
      address:formData.address,
      upiId: formData.upiId,
      bankName:formData.bankName,
      accountName: formData.accountName,
      accountNumber: formData.accountNumber,
      ifscCode: formData.ifscCode,
    };
  
    if (this.addStaffForm.valid) {
      console.log("Form is valid", this.addStaffForm.value);
      this.service.addStaffData(payload).subscribe(
        (resp: any) => {
          console.log(resp);
          if (resp.status === "success") {
            const message = "Staff has been added";
            this.messageService.add({ severity: "success", detail: message });
            setTimeout(() => {
              this.router.navigate(["/staff/staff-list"]);
            }, 400);
          } else {
            const message = resp.message;
            this.messageService.add({ severity: "error", detail: message });
          }
        },
        (error: HttpErrorResponse) => {
          console.error("Error occurred:", error);
          if (error.status === 401) {
            // Handle unauthorized access - possibly logout
            console.log("Unauthorized - logging out");
            // Add your logout logic here
          } else {
            const message = error.message;
            this.messageService.add({ severity: "error", detail: message });
          }
        }
      );
    } else {
      console.log("Form is invalid!");
    }
  }
}
