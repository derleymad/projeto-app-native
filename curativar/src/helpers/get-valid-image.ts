import { TFormatKeys } from "../types/picture";

const keys: TFormatKeys[] = ['medium', 'small', 'thumbnail'];
const isValid = (value: any) => (value !== undefined && value !== null);

export default function getValidImage(formats?: any, size = ''): string {
  if (!isValid(formats)) return '';

  if (isValid(formats[size])) return formats[size].url;

  const [ firstUrl ] = keys.map(key => {
    if (isValid(formats[key]))
      return formats[key]?.url ?? '';

    return '';
  }).filter(value => value !== '');

  return firstUrl ?? '';
}