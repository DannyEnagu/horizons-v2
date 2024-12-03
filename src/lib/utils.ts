import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from 'query-string';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDateTime = (date: string) => {
  return new Date(date).toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
  });
}

export const limitString = (str: string, limit: number) => {
  return str.length > limit ? str.slice(0, limit) + "..." : str;
}

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export const generateUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl
    },
    { skipNull: true }
  );
};

export const getUpdatedParams = (value: string, key: string, searchParams: string) => {
  return generateUrlQuery({
    params: searchParams,
    key: key,
    value
  });
};

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export const removeKeysFromQuery = ({
  params,
  keysToRemove
}: RemoveUrlQueryParams) => {
  const currentUrl = qs.parse(params);
  
  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl
    },
    { skipNull: true }
  );
};

export const parseHtmlString = (htmlString: string) => {
  // Remove html tags and limit the string to 150 characters
  const cleanString = htmlString.replace(/<[^>]+>/g, '');
  // Remove 'Job Description:' from the string
  return limitString(cleanString.replace('Job Description:', ''), 150);
}
