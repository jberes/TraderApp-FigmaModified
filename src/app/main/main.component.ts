import { Component, OnInit } from '@angular/core';
import { FakeStockDataService } from '../services/fake-stock-data.service';
import { FakePendingOrdersService } from '../services/fake-pending-orders.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public fakeStockDataStockData: any = null;
  public fakePendingOrdersPendingOrders: any = null;

  constructor(
    private fakeStockDataService: FakeStockDataService,
    private fakePendingOrdersService: FakePendingOrdersService,
  ) {}

  ngOnInit() {
    // depending on implementation, data subscriptions might need to be unsubbed later
    this.fakeStockDataService.getStockData().subscribe(data => this.fakeStockDataStockData = data);
    this.fakePendingOrdersService.getPendingOrders().subscribe(data => this.fakePendingOrdersPendingOrders = data);
  }
}
