export class SlaceId {
  static value(id: string): string {
    return id.toString().slice(-5);
  }
}
