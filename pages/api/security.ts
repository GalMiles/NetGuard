// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MissingAttributeError, InvalidAttributeError } from "./error/error"
import { errorHandler } from "./middleware/errorHandler";
import { manageUrl } from "./utils/urlManipulation";

type Data = {
  message: string;
  success: boolean;
  unsafe: boolean;
  domain: string;
  ip_address: string;
  server: string;
  content_type: string;
  status_code: number;
  page_size: number;
  domain_rank: number;
  dns_valid: boolean;
  parking: boolean;
  spamming: boolean;
  malware: boolean;
  phishing: boolean;
  suspicious: boolean;
  adult: boolean;
  risk_score: number;
  country_code: string;
  language_code: string;
  category: string;
  domain_age: {
    human: string;
    timestamp: number;
    iso: string;
  };
  redirected: boolean;
  final_url: string;
  request_id: string;
};

type ResponseData = {
  info: {
    domain: string;
    ip: string;
    country: string;
    language: string;
  };
  risks: {
    phishing: boolean;
    malware: boolean;
  };
  risk_level: string;
  score: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // variables
    let urlToCheck: string = req.query.url.toString();
    let url: string;

    // validations
    if (req.method !== "GET") throw new Error("Invalid method");
    if (!urlToCheck) throw new MissingAttributeError("URL");
    urlToCheck = await manageUrl(urlToCheck);

    // fetch data
    // url = `https://www.ipqualityscore.com/api/json/url/${process.env.API_ANALYTICS_KEY}/${urlToCheck}`;
    // const response = await fetch(url);

    //build response
    let response: Data;
    if (urlToCheck === "www.google.com") {
      response = {
        message: "success",
        success: true,
        unsafe: true,
        domain: urlToCheck,
        ip_address: "127.01.01.01",
        server: "some server",
        content_type: "application/json",
        status_code: 200,
        page_size: 1870,
        domain_rank: 0,
        dns_valid: true,
        parking: false,
        spamming: false,
        malware: false,
        phishing: false,
        suspicious: false,
        adult: false,
        risk_score: 0,
        country_code: "US",
        language_code: "EN",
        category: "search engine",
        domain_age: {
          human: "18 years ago",
          timestamp: 1678888,
          iso: "iso",
        },
        redirected: false,
        final_url: "https://google.com",
        request_id: "dufypJGB",
      };
    } else if (urlToCheck === "www.ronymilano.co.il") {
      response = {
        message: "success",
        success: true,
        unsafe: true,
        domain: urlToCheck,
        ip_address: "127.54.52.54",
        server: "some server",
        content_type: "application/json",
        status_code: 200,
        page_size: 1870,
        domain_rank: 35,
        dns_valid: true,
        parking: false,
        spamming: false,
        malware: false,
        phishing: false,
        suspicious: false,
        adult: false,
        risk_score: 0,
        country_code: "US",
        language_code: "HE",
        category: "e-commers",
        domain_age: {
          human: "1 years ago",
          timestamp: 16788,
          iso: "iso",
        },
        redirected: false,
        final_url: "https://google.com",
        request_id: "dufypJGB",
      };
    } else if (urlToCheck === "www.stips.co.il") {
      response = {
        message: "success",
        success: true,
        unsafe: true,
        domain: urlToCheck,
        ip_address: "127.34.46.54",
        server: "some server",
        content_type: "application/json",
        status_code: 200,
        page_size: 180,
        domain_rank: 0,
        dns_valid: false,
        parking: false,
        spamming: false,
        malware: false,
        phishing: true,
        suspicious: false,
        adult: false,
        risk_score: 87,
        country_code: "US",
        language_code: "HE",
        category: "e-commers",
        domain_age: {
          human: "1 years ago",
          timestamp: 16788,
          iso: "iso",
        },
        redirected: false,
        final_url: "https://stips.co.il",
        request_id: "dufypJGB",
      };
    } else if (urlToCheck === "www.pornhub.com") {
      response = {
        message: "success",
        success: true,
        unsafe: true,
        domain: urlToCheck,
        ip_address: "127.34.46.54",
        server: "some server",
        content_type: "application/json",
        status_code: 200,
        page_size: 1809,
        domain_rank: 48,
        dns_valid: true,
        parking: false,
        spamming: false,
        malware: false,
        phishing: true,
        suspicious: true,
        adult: true,
        risk_score: 48,
        country_code: "US",
        language_code: "EN",
        category: "e-commers",
        domain_age: {
          human: "15 years ago",
          timestamp: 1678833,
          iso: "iso",
        },
        redirected: false,
        final_url: "https://pornhub",
        request_id: "dufypJGB",
      };
    }
    const resObj: ResponseData = controller(response);
    res.status(200).json(resObj);
  } catch (err) {
    errorHandler(res, err);
  }
}

const controller = (data: Data) => {
  // const data: Data = await response.json();
  const resObject: ResponseData = {
    info: {
      domain: data.domain,
      ip: data.ip_address,
      country: data.country_code,
      language: data.language_code,
    },
    risks: {
      phishing: data.phishing,
      malware: data.malware,
    },
    risk_level:
      (data.malware && data.phishing && !data.dns_valid) ||
      data.risk_score >= 90
        ? "High"
        : data.malware ||
            data.phishing ||
            data.risk_score >= 75 ||
            !data.dns_valid
          ? "Medium"
          : "Low",
    score: data.risk_score,
  };

  return resObject;
};
