import { Component, OnInit } from '@angular/core';
import { WebSocketDataService } from './services/web-socket-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'live-stocks';
  public mapOne = new Map;
  public prevMap = new Map;
  public map = new Map;
  public currentDataNew = [];
  public currentData = [];
  public prevData = [];
  public backgroundColor = 'green';
  public prevDate = new Date();

  constructor(
    private webSocketDataService: WebSocketDataService
  ) { };

  ngOnInit() {
    // fetching data from websocket
    this.webSocketDataService.stockData.asObservable().subscribe((response) => {
      if (response) {
        this.prevData = this.currentData;
        for (let i = 0; i < this.prevData.length; i++) {
          this.prevMap.set(this.prevData[i][0], this.prevData[i][1])
        }
        this.currentData = response;
        this.renderData(this.currentData);
      }
    })
  }

  public renderData(data) {
    this.mapOne = this.removeDuplicates(data);
    this.convert(this.mapOne);
  }

  // remove duplicate data
  public removeDuplicates(arr): any {
    for (let i = 0; i < arr.length; i++) {
      this.map.set(arr[i][0], arr[i][1])
    }
    return this.map;
  }

  // conversion of map into array
  public convert(original) {
    let multiArray = [];
    let date = this.prevDate;
    for (let key of Array.from(original.keys())) {
      let color = "green";
      let value = original.get(key);
      if (this.prevMap.has(key)) {
        if (value > this.prevMap.get(key)) {
          color = "green";
          date = new Date();
          this.prevDate = date;
        } else if (value === this.prevMap.get(key)) {
          color = "white";
          date = this.prevDate;
        } else {
          color = "red";
          date = new Date();
          this.prevDate = date;
        }
      } else {
        date = new Date();
      }
      multiArray.push([key, value, color, date]);
    }
    this.currentDataNew = multiArray;
  }
}