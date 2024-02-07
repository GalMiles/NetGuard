import { InvalidAttributeError } from "../error/error"

const validateUrl = (url: string) => {
  return /^(https?:\/\/|www\.)[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+/.test(url);
};

const formatUrl = (url: string) => {
  // Remove protocol
  const strippedProtocolUrl: string = url.replace(/^(?:https?:\/\/)/i, "");

  // Extract the domain name
  const domainWithTld: string = strippedProtocolUrl.split("/")[0];

  // Ensure the domain starts with "www."
  if (!domainWithTld.startsWith("www.")) {
    return `www.${domainWithTld}`;
  }

  return domainWithTld;
};

const isCompressedURL = (url: string) => {
  return /^(https?:\/\/)?(bit\.ly|goo\.gl|tinyurl\.com|t\.co|ow\.ly)\/[a-zA-Z0-9]+$/i.test(
    url,
  );
};

const expendURL = async (url: string) => {
  if (!url.startsWith("http")) url = `https://${url}`;
  const response = await fetch(url, {
    method: "HEAD",
    redirect: "follow",
  });
  if (!response) throw new InvalidAttributeError("URL");
  return response.url;
};

const manageUrl = async (urlToCheck: string) => {
  if (isCompressedURL(urlToCheck)) {
    urlToCheck = await expendURL(urlToCheck);
  }

  if (!validateUrl(urlToCheck)) throw new InvalidAttributeError("URL");

  //build url to check
  urlToCheck = formatUrl(urlToCheck);
  console.log("URL to check:", urlToCheck);
  return urlToCheck;
};

export { manageUrl };
