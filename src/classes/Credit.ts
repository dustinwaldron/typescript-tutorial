import { HasFormatter } from './../interfaces/HasFormatter';

export class Credit implements HasFormatter {
  constructor(
    readonly client: string, 
    private details: string, 
    public amount: number,
  ){}

  format() {
    return `${this.client} owes £${this.amount} for ${this.details}`;
  }
}