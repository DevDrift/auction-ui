import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-simple',
    templateUrl: './simple.component.svg',
    styleUrls: ['./simple.component.scss']
})
export class SimpleComponent implements OnInit {
    liveData: any;
    displayTime: string;
    timer: number;
    interval: any;
    private socket: WebSocket | undefined;

    constructor() {
        this.timer = 600;
        this.displayTime = "10:00"
        this.connect();
    }

    ngOnInit(): void {
        this.loadDefaultData()
        this.startTimer();
    }

    startTimer() {
        this.interval = setInterval(() => {
            this.timer--;
            this.displayTime = this.convertTime(this.timer);

            if (this.timer === 0) {
                clearInterval(this.interval);
                // Дополнительные действия по достижении 0, например, вызов метода или перенаправление на другую страницу.
            }
        }, 1000);
    }

    private connect() {
        this.socket = new WebSocket('ws://localhost:10000/auction');
        this.socket.onopen = () => {
            console.log('Connected to server');
        };
        this.socket.onmessage = (event) => {
            this.liveData = JSON.parse(event.data);
        };
        this.socket.onclose = (event) => {
            console.log(`WebSocket disconnected with code ${event.code}`);
            setTimeout(() => {
                console.log('Attempting to reconnect...');
                this.connect();
            }, 1000);
        };
        this.socket.onerror = (error) => {
            this.loadDefaultData()
            console.log(`WebSocket error: ${error}`);
        };
    }

    private loadDefaultData() {
        this.liveData = {
            time: "10:00",
            rewardCost: "100",
            userName: "deema_k",
        }
    }

    convertTime(seconds: number): string {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const displayMinutes = this.padNumber(minutes);
        const displaySeconds = this.padNumber(remainingSeconds);
        return `${displayMinutes}:${displaySeconds}`;
    }

    padNumber(num: number): string {
        return num.toString().padStart(2, '0');
    }

}
