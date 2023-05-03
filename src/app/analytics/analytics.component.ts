import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

declare let $: any;
$.ig.RevealSdkSettings.setBaseUrl("https://reveal-api.azurewebsites.net/");

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements AfterViewInit {
  
  @ViewChild('revealView') el!: ElementRef;

  async ngAfterViewInit() {
    let dashboard = await $.ig.RVDashboard.loadDashboard("Trader View - Expenses");
    var revealView = new $.ig.RevealView(this.el.nativeElement);
    revealView.dashboard = dashboard;
    };

}
