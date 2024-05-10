import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventColorService {
  colors: string[] = ['#FF8066','#845EC2', '#00C9A7', '#FEFEDF', '#FF6F91'];

  constructor() { }

  getColor(index: number): string {
    return this.colors[index % this.colors.length];
  }
}
