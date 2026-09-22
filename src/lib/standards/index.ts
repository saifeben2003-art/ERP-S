// ==================== International Standards Library ====================

// ---------- GS1 Barcoding Standards ----------
export const GS1_APPLICATION_IDENTIFIERS = {
  '01': { name: 'GTIN', length: 14, description: 'Global Trade Item Number' },
  '02': { name: 'GTIN_CONTENT', length: 14, description: 'GTIN of contained items' },
  '10': { name: 'BATCH_LOT', length: 20, description: 'Batch or lot number' },
  '11': { name: 'PROD_DATE', length: 6, description: 'Production date (YYMMDD)' },
  '15': { name: 'BEST_BEFORE', length: 6, description: 'Best before date (YYMMDD)' },
  '17': { name: 'EXPIRY', length: 6, description: 'Expiration date (YYMMDD)' },
  '21': { name: 'SERIAL', length: 20, description: 'Serial number' },
  '30': { name: 'VARIABLE_QTY', length: 8, description: 'Variable quantity' },
  '37': { name: 'COUNT', length: 8, description: 'Count of items' },
  '310': { name: 'NET_WEIGHT_KG', length: 6, description: 'Net weight in kg' },
  '330': { name: 'GROSS_WEIGHT_KG', length: 6, description: 'Gross weight in kg' },
  '400': { name: 'ORDER_NUMBER', length: 30, description: 'Customer order number' },
  '410': { name: 'SHIP_TO_GLN', length: 13, description: 'Ship to GLN' },
  '420': { name: 'SHIP_TO_POSTAL', length: 20, description: 'Ship to postal code' },
  '7001': { name: 'NSN', length: 14, description: 'NATO Stock Number' },
} as const;

/** Generate GS1-128 barcode string */
export function encodeGS1_128(fields: Array<{ ai: string; value: string }>): string {
  return fields.map(f => `${f.ai}${f.value}`).join('');
}

/** Calculate GS1 Mod10 check digit */
export function calculateMod10CheckDigit(data: string): number {
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    const digit = parseInt(data[i], 10);
    sum += i % 2 === 0 ? digit : digit * 3;
  }
  return (10 - (sum % 10)) % 10;
}

/** Generate SSCC (Serial Shipping Container Code) */
export function generateSSCC(companyPrefix: string, extensionDigit: number = 0): string {
  // Company prefix for UAE GS1 member: 629 (UAE GS1 country code)
  const serialRef = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join('');
  const withoutCheck = `${extensionDigit}${companyPrefix}${serialRef}`;
  const checkDigit = calculateMod10CheckDigit(withoutCheck);
  return withoutCheck + checkDigit;
}

/** Validate GTIN-14 */
export function validateGTIN(gtin: string): boolean {
  if (!/^\d{14}$/.test(gtin)) return false;
  const checkDigit = calculateMod10CheckDigit(gtin.slice(0, 13));
  return checkDigit === parseInt(gtin[13], 10);
}

// ---------- IMDG Code — Dangerous Goods ----------
export interface IMDGClass {
  class: number;
  name: string;
  nameAr: string;
  symbol: string;
  subclasses?: Array<{ code: string; name: string; nameAr: string }>;
}

export const IMDG_CLASSES: IMDGClass[] = [
  { class: 1, name: 'Explosives', nameAr: 'متفجرات', symbol: '💣' },
  {
    class: 2, name: 'Gases', nameAr: 'غازات', symbol: '🔴',
    subclasses: [
      { code: '2.1', name: 'Flammable', nameAr: 'قابل للاشتعال' },
      { code: '2.2', name: 'Non-flammable', nameAr: 'غير قابل للاشتعال' },
      { code: '2.3', name: 'Toxic', nameAr: 'سام' },
    ],
  },
  { class: 3, name: 'Flammable Liquids', nameAr: 'سوائل قابلة للاشتعال', symbol: '🔥' },
  {
    class: 4, name: 'Flammable Solids', nameAr: 'مواد صلبة قابلة للاشتعال', symbol: '⚠️',
    subclasses: [
      { code: '4.1', name: 'Flammable solid', nameAr: 'صلب قابل للاشتعال' },
      { code: '4.2', name: 'Spontaneously combustible', nameAr: 'ذاتي الاشتعال' },
      { code: '4.3', name: 'Emits flammable gas', nameAr: 'ينبعث غاز قابل للاشتعال' },
    ],
  },
  {
    class: 5, name: 'Oxidizing Substances', nameAr: 'مواد مؤكسدة', symbol: '⚡',
    subclasses: [
      { code: '5.1', name: 'Oxidizer', nameAr: 'مؤكسدة' },
      { code: '5.2', name: 'Organic peroxide', nameAr: 'فوق أكسيد عضوي' },
    ],
  },
  {
    class: 6, name: 'Toxic & Infectious', nameAr: 'مواد سامة ومعدية', symbol: '☠️',
    subclasses: [
      { code: '6.1', name: 'Toxic', nameAr: 'سامة' },
      { code: '6.2', name: 'Infectious', nameAr: 'معدية' },
    ],
  },
  { class: 7, name: 'Radioactive', nameAr: 'مواد مشعة', symbol: '☢️' },
  { class: 8, name: 'Corrosive', nameAr: 'مواد آكلة', symbol: '🧪' },
  { class: 9, name: 'Misc. Dangerous', nameAr: 'مواد وأشياء خطرة متنوعة', symbol: '📋' },
];

/** Segregation requirements between IMDG classes */
export type SegregationLevel = 'AWAY' | 'SEGREGATE' | 'ISOLATE' | 'NO_RESTRICTION';

const SEGREGATION_MAP: Record<string, SegregationLevel> = {
  '1-2': 'AWAY', '1-3': 'AWAY', '1-4': 'AWAY', '1-5': 'AWAY',
  '2.1-3': 'AWAY', '3-6.1': 'SEGREGATE', '3-8': 'SEGREGATE',
  '4.1-3': 'SEGREGATE', '4.2-3': 'SEGREGATE', '4.3-3': 'SEGREGATE',
  '5.1-3': 'SEGREGATE', '5.1-6.1': 'SEGREGATE', '5.1-8': 'SEGREGATE',
  '5.1-7': 'ISOLATE', '6.2-2.1': 'ISOLATE', '6.2-3': 'ISOLATE',
  '6.2-4.1': 'ISOLATE', '6.2-5.1': 'ISOLATE', '6.2-8': 'ISOLATE',
  '7-2.1': 'ISOLATE', '7-3': 'ISOLATE', '7-5.1': 'ISOLATE',
};

/** Check segregation between two hazard classes */
export function checkSegregation(classA: string, classB: string): SegregationLevel {
  const key1 = `${classA}-${classB}`;
  const key2 = `${classB}-${classA}`;
  return SEGREGATION_MAP[key1] || SEGREGATION_MAP[key2] || 'NO_RESTRICTION';
}

// ---------- ISO 28000 — Supply Chain Security ----------
export interface ISO28000Audit {
  accessControl: boolean;
  chainOfCustody: boolean;
  tamperEvidence: boolean;
  incidentReporting: boolean;
  backgroundChecks: boolean;
  emergencyProcedures: boolean;
}

export const ISO28000_REQUIREMENTS = [
  { id: 'SC1', name: 'Access Control', nameAr: 'منع الوصول غير المصرح', description: 'Restricted access to warehouse areas' },
  { id: 'SC2', name: 'Chain of Custody', nameAr: 'سلسلة الحيازة', description: 'Complete documentation of cargo handover' },
  { id: 'SC3', name: 'Tamper Evidence', nameAr: 'أدلة التلاعب', description: 'Seals and tamper-evident packaging' },
  { id: 'SC4', name: 'Incident Reporting', nameAr: 'الإبلاغ عن الحوادث', description: 'Security incident reporting procedure' },
  { id: 'SC5', name: 'Background Checks', nameAr: 'فحص الخلفيات', description: 'Personnel security screening' },
  { id: 'SC6', name: 'Emergency Procedures', nameAr: 'إجراءات الطوارئ', description: 'Emergency response and evacuation plans' },
];

// ---------- ISO 9001 — Quality Management ----------
export const ISO9001_PRINCIPLES = [
  { id: 'Q1', name: 'Customer Focus', nameAr: 'التركيز على العميل' },
  { id: 'Q2', name: 'Leadership', nameAr: 'القيادة' },
  { id: 'Q3', name: 'Engagement of People', nameAr: 'مشاركة الأشخاص' },
  { id: 'Q4', name: 'Process Approach', nameAr: 'نهج العمليات' },
  { id: 'Q5', name: 'Improvement', nameAr: 'التحسين المستمر' },
  { id: 'Q6', name: 'Evidence-based Decision', nameAr: 'اتخاذ قرار مبني على الأدلة' },
  { id: 'Q7', name: 'Relationship Management', nameAr: 'إدارة العلاقات' },
];
