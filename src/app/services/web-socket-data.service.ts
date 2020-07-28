import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
    providedIn: 'root'
})

export class WebSocketDataService {
    public stockData: WebSocketSubject<any> = webSocket('ws://stocks.mnet.website');
}