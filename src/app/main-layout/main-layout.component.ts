import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
  constructor(private router: Router) {}

  handleLinkClicked(route: string) {
    this.router.navigateByUrl(route);
  }
}
