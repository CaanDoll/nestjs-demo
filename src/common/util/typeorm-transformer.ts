import * as moment from 'moment';
import { ValueTransformer } from 'typeorm';
import { genBizId } from './gen-biz-id';

export class LocalDateTransformer implements ValueTransformer {
  public from(value: string): string {
    return moment(value).format('YYYY-MM-DD HH:mm:ss');
  }

  public to(value: Date): Date {
    return value;
  }
}

export class EnvTransformer implements ValueTransformer {
  public from(value: string): string {
    return value;
  }

  public to(value: string): string {
    return process.env.NODE_ENV;
  }
}

export class ArrayToStringTransformer implements ValueTransformer {
  public from(value: string): [] | string {
    let res: string = value;

    try {
      res = JSON.parse(value);
    } catch (e) {
      res = value;
    }
    return res;
  }

  public to(value: []): string {
    return JSON.stringify(value || []);
  }
}

export class ObjectToStringTransformer implements ValueTransformer {
  public from(value: string): {} | string {
    let res: string = value;

    try {
      res = JSON.parse(value);
    } catch (e) {
      res = value;
    }
    return res;
  }

  public to(value: {}): string {
    return JSON.stringify(value || {});
  }
}

export class BizIdTransformer implements ValueTransformer {
  public from(value: string): string {
    return value;
  }

  public to(value): string {
    return value || genBizId();
  }
}
