interface Colors {
  green: 'green';
  blue: 'blue';
  magenta: 'magenta';
}

declare namespace NodeJS {
  export interface Global {
    logger: (param: any, color?: keyof Colors) => void;
  }
}

declare var logger: (param: any, color?: keyof Colors) => void;
