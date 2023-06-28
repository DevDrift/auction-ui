import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-fortune-wheel',
    templateUrl: './fortune-wheel.component.html',
    styleUrls: ['./fortune-wheel.component.scss']
})
export class FortuneWheelComponent implements OnInit {
    sectors: any[] = [
        { label: 'Сектор 1', color: '#FF0000' },
        { label: 'Сектор 2', color: '#00FF00' },
        { label: 'Сектор 3', color: '#0000FF' },
    ];

    rotation: number = 0;

    constructor() {
    }

    ngOnInit(): void {
    }
}
