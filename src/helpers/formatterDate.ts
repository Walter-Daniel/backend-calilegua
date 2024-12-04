export class FormatterDate {
  static formatDate(date: Date): string {
    // Solo la fecha
    return new Intl.DateTimeFormat('es-AR', {
      dateStyle: 'short',
    }).format(date);
  }

  static formatTime(date: Date): string {
    // Solo la hora
    return new Intl.DateTimeFormat('es-AR', {
      timeStyle: 'short',
    }).format(date);
  }
}
