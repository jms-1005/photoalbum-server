import { Component, OnInit } from '@angular/core';
import { Employee } from '../interfaces/employee.interface';
import { EmployeesService } from '../services/employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  employees:Employee[] = [];

  constructor(private es:EmployeesService) { }

  ngOnInit(): void {
    this.es.getAllEmployees().subscribe( employees => {
      console.log(employees);
      this.employees = employees;
    })
  }

}
