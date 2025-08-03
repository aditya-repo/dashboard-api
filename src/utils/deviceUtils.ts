import { Request } from "express";

interface DeviceInfo {
  browser: string;
  browserVersion: string;
  os: string;
  osVersion: string;
  device: string;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

interface LocationInfo {
  country?: string;
  region?: string;
  city?: string;
  timezone?: string;
}

/**
 * Extract basic device information from user agent
 * @param userAgent - User agent string
 * @returns Device information object
 */
export const extractDeviceInfo = (userAgent: string): DeviceInfo => {
  const isMobile =
    /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );
  const isTablet = /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)/i.test(
    userAgent
  );

  return {
    browser: "Unknown",
    browserVersion: "Unknown",
    os: "Unknown",
    osVersion: "Unknown",
    device: isTablet ? "tablet" : isMobile ? "mobile" : "desktop",
    isMobile,
    isTablet,
    isDesktop: !isMobile && !isTablet,
  };
};

/**
 * Extract IP address from request
 * @param req - Express request object
 * @returns IP address string
 */
export const extractIPAddress = (req: Request): string => {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded && typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }

  const realIP = req.headers["x-real-ip"];
  if (realIP && typeof realIP === "string") {
    return realIP;
  }

  return req.connection.remoteAddress || req.socket.remoteAddress || "unknown";
};

/**
 * Extract location information from IP address
 * @param ipAddress - IP address string
 * @returns Location information object
 */
export const extractLocationFromIP = (ipAddress: string): LocationInfo => {
  try {
    // For now, return basic info - you can integrate with geoip-lite later
    // const geo = require('geoip-lite');
    // const geoData = geo.lookup(ipAddress);

    return {
      country: undefined, // geoData?.country,
      region: undefined, // geoData?.region,
      city: undefined, // geoData?.city,
      timezone: undefined, // geoData?.timezone,
    };
  } catch (error) {
    return {
      country: undefined,
      region: undefined,
      city: undefined,
      timezone: undefined,
    };
  }
};

/**
 * Get comprehensive request information
 * @param req - Express request object
 * @returns Object containing IP, user agent, device info, and location
 */
export const getRequestInfo = (req: Request) => {
  const userAgent = req.headers["user-agent"] || "";
  const ipAddress = extractIPAddress(req);

  return {
    ipAddress: ipAddress,
    userAgent: userAgent,
    deviceInfo: extractDeviceInfo(userAgent),
    location: extractLocationFromIP(ipAddress),
  };
};
