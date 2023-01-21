import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  id: number=0;
  employee: Employee | undefined;
  constructor(private route: ActivatedRoute, private router: Router, private employeService: EmployeeService) { }

  employees: Employee[] | undefined;
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.employee = new Employee();
    this.employeService.getEmployeeById(this.id).subscribe( data => {
      this.employee = data;
    });
  }

  private getEmployees(){
    this.employeService.getEmployeesList().subscribe(data => {
      this.employees = data;
    });
    this.router.navigate(['employees']);
  }
  employeeDetails(id: number){
    this.router.navigate(['employee-details', id]);
  }

  updateEmployee(id: number){
    this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id: number){
    this.employeService.deleteEmployee(id).subscribe( data => {
      console.log(data);
      this.getEmployees();
    })
  }
}
