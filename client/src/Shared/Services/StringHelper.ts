export class StringHelper {
  public static firstLetterToUpperCase(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  public static removeSnakeCase(word: string): string {
    const chunks = word.split('_');

    return StringHelper.firstLetterToUpperCase(chunks.join(' '));
  }

}