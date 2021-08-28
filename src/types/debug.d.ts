interface Colors {
  green: 'green';
  blue: 'blue';
  magenta: 'magenta';
}

declare namespace NodeJS {
  export interface Global {
    debug: (param: any, color?: keyof Colors) => void;
  }
}

declare var debug: (param: any, color?: keyof Colors) => void;
