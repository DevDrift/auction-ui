import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
    selector: 'app-simple',
    templateUrl: './simple.component.svg',
    styleUrls: ['./simple.component.scss']
})
export class SimpleComponent implements OnInit, OnDestroy {
    liveData: any;
    displayTime: string;
    interval: any;
    private auctionSocket: WebSocket | undefined;
    private timerSocket: WebSocket | undefined;

    constructor() {
        this.displayTime = ""
        this.connect();
    }

    ngOnInit(): void {
        this.loadDefaultData()
    }
    private connect() {
        this.auctionSocket = new WebSocket('ws://localhost:10000/auction');
        this.auctionSocket.onopen = () => {
            console.log('Connected to server');
        };
        this.auctionSocket.onmessage = (event) => {
            this.liveData = JSON.parse(event.data);
        };
        this.auctionSocket.onclose = (event) => {
            console.log(`WebSocket disconnected with code ${event.code}`);
            setTimeout(() => {
                console.log('Attempting to reconnect...');
                this.connect();
            }, 1000);
        };
        this.auctionSocket.onerror = (error) => {
            this.loadDefaultData()
            console.log(`WebSocket error: ${error}`);
        };

        this.timerSocket = new WebSocket('ws://localhost:10000/auctionTimer');
        this.timerSocket.onopen = () => {
            console.log('Connected to server');
        };
        this.timerSocket.onmessage = (event) => {
            this.displayTime = JSON.parse(event.data).timer;
        };
        this.timerSocket.onclose = (event) => {
            console.log(`WebSocket disconnected with code ${event.code}`);
            setTimeout(() => {
                console.log('Attempting to reconnect...');
                this.connect();
            }, 1000);
        };
        this.timerSocket.onerror = (error) => {
            console.log(`WebSocket error: ${error}`);
        };
    }

    private loadDefaultData() {
        this.liveData = {
            rewardCost: "",
            userName: "",
        }
    }

    ngOnDestroy(): void {
        if (this.auctionSocket) {
            this.auctionSocket.close();
        }
        if (this.timerSocket) {
            this.timerSocket.close();
        }
    }
}
