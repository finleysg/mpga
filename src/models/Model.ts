export interface IModel {
  id: number | undefined;
  prepJson(obj: any): string;
  fromJson(obj: any): any;
}

export class BaseModel implements IModel {
  id: number | undefined;

  prepJson(): any {
    return this.snakeCase(this);
  }

  fromJson(json: any): any {
    if (json) {
      return this.camelCase(json);
    }
    return null;
  }

  snakeCase(obj: any): any {
    const newObj: { [index: string]: any } = {};
    if (obj) {
      for (const d in obj) {
        if (obj.hasOwnProperty(d) && !this.isLocalProperty(d)) {
          const prop = d
            .replace(/[\w]([A-Z])/g, function (m) {
              return m[0] + "_" + m[1];
            })
            .toLowerCase();
          if (!obj[d] && this.isBooleanProperty(prop)) {
            obj[d] = false; // coerce null booleans to false
          }
          newObj[prop] = obj[d];
        }
      }
    }
    return newObj;
  }

  isBooleanProperty(prop: string): boolean {
    return (
      prop != null &&
      (prop.startsWith("is_") || prop.startsWith("use_") || prop.startsWith("can_") || prop.startsWith("has_"))
    );
  }

  isLocalProperty(prop: string): boolean {
    return ["deleted", "dirty", "localId"].indexOf(prop) >= 0;
  }

  camelCase(obj: any): any {
    const newObj: { [index: string]: any } = {};
    if (obj) {
      for (const d in obj) {
        if (obj.hasOwnProperty(d)) {
          newObj[
            d.replace(/(_\w)/g, function (k) {
              return k[1].toUpperCase();
            })
          ] = this.isDate(d) ? new Date(obj[d]) : obj[d];
        }
      }
    }
    return newObj;
  }

  isDate(propName: string): boolean {
    return propName != null && (propName.endsWith("_date") || propName.endsWith("_start") || propName.endsWith("_end"));
  }
}
