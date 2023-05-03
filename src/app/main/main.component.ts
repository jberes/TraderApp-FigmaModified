import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FakeStockDataService } from '../services/fake-stock-data.service';
import { FakePendingOrdersService } from '../services/fake-pending-orders.service';

// importing OpenFin FDC3 service
import * as openfinFdc3 from "openfin-fdc3";
import { Fdc3DataAdapter } from "igniteui-angular-fdc3";    // for working with FDC3 data adapter
import { Fdc3Message } from "igniteui-angular-fdc3";        // for receiving ViewChart message

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent  {
  public fakeStockDataStockData: any = null;
  public fakePendingOrdersPendingOrders: any = null;
  public FDC3adapter: Fdc3DataAdapter;
  public labelValue: string = 'Initial label value';

  constructor(private cdRef: ChangeDetectorRef,
    private fakeStockDataService: FakeStockDataService,
    private fakePendingOrdersService: FakePendingOrdersService,
  ) 
    {
      this.InitializeFDC3();
      this.initInterApp();
      this.fakeStockDataService.getStockData().subscribe(data => this.fakeStockDataStockData = data);
      this.fakePendingOrdersService.getPendingOrders().subscribe(data => this.fakePendingOrdersPendingOrders = data);
    }





  public async InitializeFDC3(): Promise<void> {

    // this is creating new every time, s/b only once
    this.FDC3adapter = new Fdc3DataAdapter(openfinFdc3);


    console.log("openfinFdc3: " + openfinFdc3);
    // subscribing to FDC3 "ViewChart" intent
    this.FDC3adapter.subscribe("ViewChart");
    console.log("viewChart line 44");

    // handling FDC3 intents sent via OpenFin's FDC3 service
    this.FDC3adapter.messageReceived = (msg: Fdc3Message) => {
        // at this point, FDC3 data adapter has already processed FDC3 intent
        // and generated data for tickers embedded in context of FDC3 message
        // so we can just update the FinancialChart
       
  
 //       this.UpdateChart(this.FDC3adapter.stockPrices);

        console.log("openfin received message: \n" + msg.json);
        this.labelValue = "Received FDC3...";
        // Optional access to properties of FDC3 message that can be used
        // for custom processing of FDC3 intent and its context:
        // let intentType: string = msg.intentType;         // FDC3 intent type, e.g. "ViewChart"
        // let contextType: string = msg.contextType;       // FDC3 context type, e.g. "fdc3.instrument"
        // let contextObject: Fdc3Context = msg.context;    // FDC3 context object
        // let contextJson: string = msg.json;              // string representation of FDC3 context object
        // let tickerSymbols: string[] = msg.tickerSymbols; // array of ticker symbol(s) embedded in FDC3 context
        // let tickerNames: string[] = msg.tickerNames;     // array of ticker name(s) embedded in FDC3 context

        const title = "FDC3 " + msg.intentType + " intent";
        let info = "";
        // info += "\n intent: " + msg.intentType;
        info += "\n ticker: " + msg.tickerSymbols.join(", ");
        info += "\n context: " + msg.contextType;

        console.log(info);
        
        this.labelValue = msg.tickerSymbols.join(", ");

console.log("openfin received message: \n" + msg.json);

//****************

//     console.log("Entering FIN");
//       if (!window.hasOwnProperty("fin")) {
//         console.log("chart... fin disconnected " );
//       } else {
//         console.log("chart... fin connected" );
//         fin.desktop.main(() => {
//             console.log("chart fin main");
            
//             fin.desktop.InterApplicationBus.subscribe("*", "FDC3") => {
//                 console.log("chart fin subscribe");
//                 if (message.intent == "ViewChart") {
//                     const data = message.context.data;
//                     let tickers: string = "";
//                     for (const info of message.context.data) {
//                         tickers += info.id.ticker
//                     }
//                     console.log("chart fin ViewChart " + data[0].id.ticker);
//                     // TODO lookup stock by ticker and pass data to the chart
//                     //this.setState({trendLineType: tickers});
//                 }
//             });
//         });
// }
// //

//*****************





        this.cdRef.detectChanges();
        //this.labelValue = "Done FDC3...";
        //OpenfinUtils.notify(title, info, "FDC3");
    };




    
    // optional, initalizing adapter with some popular stocks
    //this.FDC3adapter.stockSymbols = ["TSLA"];

    //this.UpdateChart(this.FDC3adapter.stockPrices);
}


public async initInterApp(): Promise<void> {
  console.log("Init with interapp called");
  //_interAppMessageField = document.querySelector("#inter-app-message")
  fin.desktop.InterApplicationBus.addSubscribeListener(function (uuid, topic) {
      console.log("The application " + uuid + " has subscribed to " + topic);
  });


  fin.desktop.InterApplicationBus.subscribe("*",
      "FDC3",
      function (message, uuid) {
          var _message = "The application " + uuid + " sent this message " + message;
         // _interAppMessageField.innerHTML = message.text + message.num;
          console.log(_message);
      });
};

}
