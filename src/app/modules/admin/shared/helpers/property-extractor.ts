export function extractOwnProperties<T>(obj: any): T {
  let ownProperties!: T;
  for (const key in ownProperties) {
    if (obj.hasOwnProperty(key)) {
      ownProperties[key] = obj[key];
    }
  }
  return ownProperties;
}