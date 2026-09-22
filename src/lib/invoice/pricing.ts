// ==================== Invoice Pricing Engine — UAE ====================
// All rates in AED (UAE Dirham) | VAT 5%

// ---------- Storage Rates (AED per ton per day) ----------
export const STORAGE_RATES: Record<string, { perTonPerDay: number; label: string }> = {
  YARD:       { perTonPerDay: 18.00,  label: 'Open Yard' },
  WAREHOUSE:  { perTonPerDay: 28.00,  label: 'Warehouse' },
  BONDED:     { perTonPerDay: 42.00,  label: 'Bonded Warehouse' },
  REEFER:     { perTonPerDay: 55.00,  label: 'Reefer/Cold Storage' },
  HAZMAT:     { perTonPerDay: 65.00,  label: 'Hazmat Storage' },
  STAGING:    { perTonPerDay: 22.00,  label: 'Staging Area' },
  BERTH:      { perTonPerDay: 35.00,  label: 'Berth/Quay' },
};

// ---------- Free Days ----------
export const FREE_DAYS: Record<string, number> = {
  STANDARD: 7,     // 7 free days
  BONDED:   14,    // 14 days for bonded
  PROJECT:  21,    // 21 days for project cargo
  REEFER:   3,     // 3 days for reefer
};

// ---------- Handling Rates (AED per operation) ----------
export const HANDLING_RATES: Record<string, { rate: number; label: string }> = {
  RECEIVE:       { rate: 350,  label: 'Receive/Inbound' },
  MOVE:          { rate: 200,  label: 'Internal Move' },
  DISPATCH:      { rate: 350,  label: 'Dispatch/Outbound' },
  INSPECT:       { rate: 150,  label: 'Inspection' },
  WEIGH:         { rate: 100,  label: 'Weighing' },
  SURVEY:        { rate: 500,  label: 'Survey/Inspection Report' },
};

// ---------- Heavy Lift Surcharge ----------
export const HEAVY_LIFT_SURCHARGE = {
  HEAVY_LIFT:    1.5,   // 50% surcharge on handling
  OVERSIZE:      2.0,   // 100% surcharge (double)
  PROJECT_CARGO: 1.8,   // 80% surcharge
  STANDARD:      1.0,   // No surcharge
};

// ---------- Equipment Rental Rates (AED per day) ----------
export const EQUIPMENT_RATES: Record<string, { perDay: number; label: string }> = {
  CRANE_50T:    { perDay: 3500, label: '50T Mobile Crane' },
  CRANE_100T:   { perDay: 7500, label: '100T Mobile Crane' },
  CRANE_200T:   { perDay: 15000, label: '200T Crawler Crane' },
  FORKLIFT_5T:  { perDay: 800,  label: '5T Forklift' },
  FORKLIFT_10T: { perDay: 1200, label: '10T Forklift' },
  FORKLIFT_25T: { perDay: 2000, label: '25T Forklift' },
  SPREADER:     { perDay: 1500, label: 'Spreader Bar' },
  REACH_STACKER: { perDay: 2500, label: 'Reach Stacker' },
};

// ---------- UAE VAT ----------
export const UAE_VAT_RATE = 0.05; // 5%
export const UAE_CURRENCY = 'AED';

// ---------- UAE Branches ----------
export const UAE_BRANCHES = [
  { code: 'AUH', name: 'Abu Dhabi', nameAr: 'أبوظبي' },
  { code: 'DXB', name: 'Dubai', nameAr: 'دبي' },
  { code: 'SHJ', name: 'Sharjah', nameAr: 'الشارقة' },
  { code: 'AJM', name: 'Ajman', nameAr: 'عجمان' },
  { code: 'RAK', name: 'Ras Al Khaimah', nameAr: 'رأس الخيمة' },
  { code: 'FJR', name: 'Fujairah', nameAr: 'الفجيرة' },
] as const;

// ---------- Invoice Types ----------
export const INVOICE_TYPES = [
  { code: 'STO', type: 'STORAGE', label: 'Storage Invoice', labelAr: 'فاتورة تخزين' },
  { code: 'HND', type: 'HANDLING', label: 'Handling Invoice', labelAr: 'فاتورة مناولة' },
  { code: 'CUS', type: 'CUSTOMS', label: 'Customs Invoice', labelAr: 'فاتورة جمركية' },
  { code: 'TRN', type: 'TRANSPORT', label: 'Transport Invoice', labelAr: 'فاتورة نقل' },
  { code: 'EQP', type: 'EQUIPMENT', label: 'Equipment Rental', labelAr: 'فاتورة معدات' },
  { code: 'CRN', type: 'CREDIT_NOTE', label: 'Credit Note', labelAr: 'إشعار دائن' },
] as const;

// ---------- Payment Terms ----------
export const PAYMENT_TERMS = [
  { code: 'IMMEDIATE', days: 0, label: 'Immediate', labelAr: 'فوري' },
  { code: 'NET_15', days: 15, label: 'Net 15', labelAr: '15 يوم' },
  { code: 'NET_30', days: 30, label: 'Net 30', labelAr: '30 يوم' },
  { code: 'NET_60', days: 60, label: 'Net 60', labelAr: '60 يوم' },
  { code: 'NET_90', days: 90, label: 'Net 90', labelAr: '90 يوم' },
] as const;

// ==================== Calculation Functions ====================

/** Calculate storage charge with free days */
export function calculateStorageCharge(
  weightKg: number,
  storageDays: number,
  locationType: string,
  freeDaysCategory: string = 'STANDARD'
): { chargeableDays: number; charge: number; rate: number; freeDays: number } {
  const freeDays = FREE_DAYS[freeDaysCategory] || FREE_DAYS.STANDARD;
  const chargeableDays = Math.max(0, storageDays - freeDays);
  const rate = STORAGE_RATES[locationType] || STORAGE_RATES.YARD;
  const weightTons = weightKg / 1000;
  const charge = weightTons * chargeableDays * rate.perTonPerDay;

  return { chargeableDays, charge: Math.round(charge * 100) / 100, rate: rate.perTonPerDay, freeDays };
}

/** Calculate handling charge with heavy lift surcharge */
export function calculateHandlingCharge(
  movementType: string,
  liftCategory: string = 'STANDARD'
): { baseRate: number; surcharge: number; total: number } {
  const rate = HANDLING_RATES[movementType] || HANDLING_RATES.MOVE;
  const multiplier = HEAVY_LIFT_SURCHARGE[liftCategory as keyof typeof HEAVY_LIFT_SURCHARGE] || 1;
  const baseRate = rate.rate;
  const surcharge = baseRate * (multiplier - 1);
  const total = baseRate + surcharge;

  return { baseRate, surcharge: Math.round(surcharge * 100) / 100, total: Math.round(total * 100) / 100 };
}

/** Calculate VAT */
export function calculateVAT(subtotal: number, rate: number = UAE_VAT_RATE): number {
  return Math.round(subtotal * rate * 100) / 100;
}

/** Generate invoice number: INV-{Branch}-{Type}-{Year}-{Month}-{Seq} */
export function generateInvoiceNumber(
  branch: string,
  typeCode: string,
  sequence: number
): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const seq = String(sequence).padStart(4, '0');
  return `INV-${branch}-${typeCode}-${year}-${month}-${seq}`;
}

/** Calculate due date from payment terms */
export function calculateDueDate(issueDate: Date, paymentTerms: string): Date {
  const term = PAYMENT_TERMS.find(t => t.code === paymentTerms) || PAYMENT_TERMS[2]; // NET_30 default
  const due = new Date(issueDate);
  due.setDate(due.getDate() + term.days);
  return due;
}

/** Aging buckets for outstanding invoices */
export function getAgingBucket(dueDate: Date, now: Date = new Date()): string {
  const daysOverdue = Math.floor((now.getTime() - dueDate.getTime()) / 86400000);
  if (daysOverdue <= 0) return 'CURRENT';
  if (daysOverdue <= 30) return '1-30';
  if (daysOverdue <= 60) return '31-60';
  if (daysOverdue <= 90) return '61-90';
  return '90+';
}
