import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  today: NgbDateStruct;
  model: NgbDateStruct = { year: 0, month: 0, day: 0 }; 
  date?: { year: number; month: number }; 

  constructor(@Inject(DOCUMENT) private document: Document, private calendar: NgbCalendar) {
    this.today = this.calendar.getToday();
  }

  ngOnInit(): void {
    this.initializeCharts();
  }

  initializeCharts(): void {
    // Bar Chart for Appointments
    const appointmentsCanvas = this.document.getElementById('appointmentsChart') as HTMLCanvasElement;
    if (appointmentsCanvas) {
      const appointmentsCtx = appointmentsCanvas.getContext('2d');
      if (appointmentsCtx) {
        new Chart(appointmentsCtx, {
          type: 'bar',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', ],
            datasets: [
              {
                label: 'Cancelled',
                data: [30, 40, 20, 60, 70, 25,],
                backgroundColor: '#FF0000',
              },
              {
                label: 'Booked',
                data: [45, 60, 40, 80, 95, 60, ],
                backgroundColor: '#288ead',
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }
  }
}
