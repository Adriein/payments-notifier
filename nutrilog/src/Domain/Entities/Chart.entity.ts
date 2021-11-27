export class Chart {
  constructor(private x: any[], private y: any[]) {}

  public generateHashMap(): { x: any[]; y: any[] } {
    return { x: this.x, y: this.y };
  }
}
