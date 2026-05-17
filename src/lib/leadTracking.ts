export type LeadTrackingData = {
  source?: string;
  referrer?: string;
  landingPage?: string;
  pagePath?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
};

const LEAD_TRACKING_STORAGE_KEY = "admissionsTopper_leadTracking";

function normalizeHost(urlValue: string) {
  return urlValue.replace(/^www\./i, "").toLowerCase();
}

function getSourceLabel(referrer: string, utmSource: string | null) {
  if (utmSource) {
    return `UTM: ${utmSource}`;
  }

  if (!referrer) {
    return "Direct visit";
  }

  try {
    const referrerHost = normalizeHost(new URL(referrer).hostname);

    if (referrerHost.includes("google.")) return "Google";
    if (referrerHost.includes("bing.")) return "Bing";
    if (referrerHost.includes("yahoo.")) return "Yahoo";
    if (referrerHost.includes("facebook.") || referrerHost.includes("instagram.")) return "Social";
    if (referrerHost.includes("whatsapp.")) return "WhatsApp";

    return referrerHost;
  } catch {
    return "Referrer";
  }
}

function captureLeadTrackingData(): LeadTrackingData {
  if (typeof window === "undefined") {
    return {};
  }

  const currentUrl = new URL(window.location.href);
  const referrer = document.referrer || "";
  const utmSource = currentUrl.searchParams.get("utm_source");
  const utmMedium = currentUrl.searchParams.get("utm_medium");
  const utmCampaign = currentUrl.searchParams.get("utm_campaign");
  const utmTerm = currentUrl.searchParams.get("utm_term");
  const utmContent = currentUrl.searchParams.get("utm_content");

  return {
    source: getSourceLabel(referrer, utmSource),
    referrer: referrer || undefined,
    landingPage: window.location.href,
    pagePath: `${window.location.pathname}${window.location.search}`,
    utmSource: utmSource || undefined,
    utmMedium: utmMedium || undefined,
    utmCampaign: utmCampaign || undefined,
    utmTerm: utmTerm || undefined,
    utmContent: utmContent || undefined,
  };
}

export function readLeadTrackingData(): LeadTrackingData {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const stored = sessionStorage.getItem(LEAD_TRACKING_STORAGE_KEY);

    if (stored) {
      return JSON.parse(stored) as LeadTrackingData;
    }
  } catch {
    // Ignore storage issues and fall back to the current page snapshot.
  }

  return captureLeadTrackingData();
}

export function storeLeadTrackingData() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    if (!sessionStorage.getItem(LEAD_TRACKING_STORAGE_KEY)) {
      sessionStorage.setItem(LEAD_TRACKING_STORAGE_KEY, JSON.stringify(captureLeadTrackingData()));
    }
  } catch {
    // Ignore storage failures so lead capture still works without persistence.
  }
}

export function getLeadTrackingData(): LeadTrackingData {
  return readLeadTrackingData();
}