export class Translations {
  public readonly dictionary: Map<string, Map<string, string>> = new Map();

  constructor() {
    this.dictionary.set('EN', new Map<string, string>(
      [
        ['Si', 'Yes'],
        ['No', 'No'],
        ['Admin', 'Admin'],
        ['Usuario', 'User'],
      ]
    ));
    this.dictionary.set('ES', new Map<string, string>(
      [
        ['Si', 'Si'],
        ['No', 'No'],
        ['Admin', 'Admin'],
        ['Usuario', 'Usuario'],
      ]
    ));
  }
}