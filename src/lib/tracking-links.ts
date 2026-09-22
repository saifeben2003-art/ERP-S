/**
 * Generate tracking URLs for common carriers
 * These are public tracking links that don't require API keys
 */

export interface TrackingInfo {
  carrier: string;
  trackingNumber: string;
  type: 'air' | 'sea' | 'courier';
  trackingUrl: string | null;
}

// Known carrier tracking URL patterns
const CARRIER_URLS: Record<string, (trackingNumber: string) => string> = {
  // Air cargo
  'EK': (awb) => `https://www.skycargo.com/Portal/TrackShipment?AWBNo=${awb}`,  // Emirates SkyCargo
  'EY': (awb) => `https://cargo.etihad.com/track/${awb}`,  // Etihad Cargo
  'SV': (awb) => `https://www.saudiacargo.com/Track/Shipment/${awb}`,  // Saudia Cargo
  'FX': (awb) => `https://www.fedex.com/fedextrack/?trkn=${awb}`,  // FedEx
  'LH': (awb) => `https://lufthansa-cargo.com/track/${awb}`,  // Lufthansa Cargo
  'TK': (awb) => `https://www.turkishcargo.com.tr/track/${awb}`,  // Turkish Cargo

  // Sea freight
  'MAERSK': (bl) => `https://www.maersk.com/tracking/${bl}`,
  'MSC': (bl) => `https://www.msc.com/en/track-a-shipment?trackNumber=${bl}`,
  'CMA': (bl) => `https://www.cma-cgm.com/ebusiness/tracking/search?SearchBy=BL&Reference=${bl}`,
  'HAPAG': (bl) => `https://www.hapag-lloyd.com/en/online_business/track_and_trace/_by_booking.html?blno=${bl}`,
  'OOCL': (bl) => `https://www.oocl.com/Pages/BLTracking.aspx?BLNo=${bl}`,
  'ZIM': (bl) => `https://www.zim.com/tools/track-a-shipment?bl=${bl}`,

  // UAE-specific
  'DPW': (bl) => `https://www.dpworld.ae/tracking/${bl}`,  // DP World
  'ADPORTS': (bl) => `https://www.adports.ae/track/${bl}`,  // Abu Dhabi Ports

  // Couriers
  'DHL': (num) => `https://www.dhl.com/en/express/tracking.html?AWB=${num}`,
  'UPS': (num) => `https://www.ups.com/track?tracknum=${num}`,
  'ARAMEX': (num) => `https://www.aramex.com/tracking?number=${num}`,
};

/**
 * Get tracking URL for an AWB number
 * AWB format: XXX-XXXXXXXX (3-digit airline code + 8-digit number)
 */
export function getAirTrackingUrl(awbNumber: string): TrackingInfo | null {
  if (!awbNumber) return null;

  const clean = awbNumber.replace(/[\s-]/g, '');
  const airlineCode = clean.substring(0, 2); // First 2 digits of AWB prefix

  // Map AWB prefixes to carriers
  const prefixMap: Record<string, string> = {
    '07': 'EK',  // Emirates
    '60': 'EY',  // Etihad
    '06': 'SV',  // Saudia
    '02': 'FX',  // FedEx
  };

  const carrier = prefixMap[airlineCode] || '';
  const urlFn = carrier ? CARRIER_URLS[carrier] : null;

  return {
    carrier: carrier || 'Unknown Airline',
    trackingNumber: awbNumber,
    type: 'air',
    trackingUrl: urlFn ? urlFn(awbNumber) : null,
  };
}

/**
 * Get tracking URL for a B/L number with shipping line
 */
export function getSeaTrackingUrl(blNumber: string, shippingLine?: string): TrackingInfo | null {
  if (!blNumber) return null;

  const line = shippingLine?.toUpperCase().replace(/[\s-]/g, '') || '';
  const urlFn = line ? CARRIER_URLS[line] : null;

  return {
    carrier: shippingLine || 'Unknown Shipping Line',
    trackingNumber: blNumber,
    type: 'sea',
    trackingUrl: urlFn ? urlFn(blNumber) : null,
  };
}

/**
 * Generate a generic tracking link using public tracking sites
 */
export function getGenericTrackingLink(trackingNumber: string, type: 'air' | 'sea' | 'courier'): string {
  if (type === 'air') {
    return `https://www.track-trace.com/aircargo?number=${trackingNumber}`;
  } else if (type === 'sea') {
    return `https://www.track-trace.com/container?number=${trackingNumber}`;
  }
  return `https://www.track-trace.com/?number=${trackingNumber}`;
}
