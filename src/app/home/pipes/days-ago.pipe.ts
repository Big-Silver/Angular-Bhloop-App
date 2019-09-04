import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'daysAgo'
})
export class DaysAgoPipe implements PipeTransform {

    transform(value: Date): number {
        const today = new Date();
        const createdAt = new Date(value);
        const msInDay = 24 * 60 * 60 * 1000;
        createdAt.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        const diff = (+today - +createdAt) / msInDay;
        return diff;
    }

}
