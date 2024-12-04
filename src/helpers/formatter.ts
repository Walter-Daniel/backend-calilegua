export class Formatter {
  static currency(value: number): string {
    return new Intl.NumberFormat('es-Ar', {
      style: 'currency',
      currency: 'ARS',
    }).format(value);
  }
}
