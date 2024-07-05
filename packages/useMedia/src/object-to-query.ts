type QueryValue = boolean | number | string;

export interface QueryObject {
  [feature: string]: QueryValue;
}

const camelToHyphen = (str: string): string => {
  return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
};

const isDimension = (feature: string): boolean =>
  /(height|width)$/.test(feature);

const objToQueryPart = ([feature, value]: [string, QueryValue]): string => {
  feature = camelToHyphen(feature);
  if (isDimension(feature) && typeof value === "number") {
    value = `${value}px`;
  }
  if (value === true) {
    return feature;
  } else if (value === false) {
    return `not ${feature}`;
  } else {
    return `(${feature}: ${value})`;
  }
};

export const objectToQuery = (obj: QueryObject): string => {
  return Object.entries(obj).map(objToQueryPart).join(" and ");
};
