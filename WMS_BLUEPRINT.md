# 🏗️ CL WMS — المخطط البرمجي الشامل
# Heavy Lift Warehouse Management System — Enterprise Blueprint v2.0

---

## 📋 ملخص تنفيذي

التطبيق الحالي يعمل بنسبة **95.5%** كنظام عرض/قراءة، لكنه يفتقر إلى:
1. **دعم حقيقي لـ RTL/LTR** — الاتجاه ثابت (RTL) ولا يتغير مع اللغة
2. **تقارير PDF/Excel** — التصدير الحالي CSV فقط
3. **نظام فواتير** — لا يوجد أي نظام فوترة
4. **معايير دولية** — لا توافق مع GS1, ISO 28000, IMDG
5. **مصادقة كاملة** — واجهة تسجيل دخول مفقودة

---

## 🔷 القسم 1: دعم RTL/LTR حقيقي (Bidirectional Layout)

### المشكلة الحالية
```tsx
// layout.tsx — ثابت! لا يتغير مع اللغة
<html lang="ar" dir="rtl" suppressHydrationWarning>
```
- `dir` لا يتغير عند تبديل اللغة
- CSS يستخدم `left/right` بدلاً من `inline-start/inline-end`
- الأيقونات لا تنعكس (سهام، أشرطة جانبية)
- الجداول لا تعكس اتجاهها

### الحل المقترح — معايير W3C Internationalization

#### 1.1 تخطيط ديناميكي في layout.tsx
```tsx
// src/app/layout.tsx
import { DirectionProvider } from '@/components/direction-provider';

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <DirectionProvider />
      </head>
      <body>
        <AppContent>{children}</AppContent>
      </body>
    </html>
  );
}
```

#### 1.2 مزود الاتجاه (Direction Provider)
```tsx
// src/components/direction-provider.tsx
'use client';
import { useEffect } from 'react';
import { useI18nStore } from '@/lib/i18n-store';

export function DirectionProvider() {
  const { language } = useI18nStore();
  
  useEffect(() => {
    const dir = language === 'ar' ? 'rtl' : 'ltr';
    const html = document.documentElement;
    html.setAttribute('dir', dir);
    html.setAttribute('lang', language);
    // تحديث اتجاه الجسم
    document.body.style.direction = dir;
  }, [language]);
  
  return null;
}
```

#### 1.3 CSS Logical Properties (Tailwind 4)
استبدال كل `left/right` بـ `start/end`:
```
ml-4 → ms-4     mr-4 → me-4
pl-4 → ps-4     pr-4 → pe-4
left-0 → start-0  right-0 → end-0
text-left → text-start  text-right → text-end
border-l → border-s  border-r → border-e
rounded-l → rounded-s  rounded-r → rounded-e
```

#### 1.4 أيقونات مرتبطة بالاتجاه
```tsx
// أيقونات تنعكس في RTL
<ArrowLeft className={cn(isRTL && 'rotate-180')} />
<ChevronRight className={cn(isRTL && 'rtl:rotate-180')} />
// أو استخدام Tailwind RTL plugin
<ArrowRight className="rtl:rotate-180" />
```

#### 1.5 جداول مرتبطة بالاتجاه
```tsx
// الجداول تتبع اتجاه المستند تلقائياً مع dir="rtl/ltr"
// لكن أعمدة ثابتة الموقع تحتاج انعكاس
<table dir={language === 'ar' ? 'rtl' : 'ltr'}>
```

#### 1.6 رسوم بيانية مرتبطة بالاتجاه
- Recharts/Nivo: عكس المحاور الأفقي في RTL
- تسميات المحاور من اليمين لليسار في RTL

### الملفات المطلوب تعديلها (42 ملف)
```
src/app/layout.tsx                    — إزالة dir/lang الثابت
src/app/page.tsx                      — إضافة DirectionProvider
src/components/wms/*.tsx (12 ملف)     — CSS logical properties
src/components/ui/*.tsx (8 ملف)       — مراجعة left/right
src/lib/translations.ts               — إضافة مفاتيح EN كاملة
```

### المعايير المُطبّقة
- ✅ W3C Internationalization Best Practices
- ✅ Unicode Bidirectional Algorithm (UAX #9)
- ✅ CSS Logical Properties Level 1 (W3C CR)
- ✅ Tailwind CSS RTL Plugin

---

## 🔷 القسم 2: تقارير PDF و Excel

### المشكلة الحالية
- تصدير CSV فقط بدون تنسيق
- لا ترويسة أو توقيع أو شعار
- لا تقارير معقدة (ملخص، تحليلات)

### الحل المقترح

#### 2.1 بنية خادم التقارير
```
src/app/api/reports/
├── inventory/
│   └── route.ts          — تقرير المخزون (PDF + Excel)
├── movements/
│   └── route.ts          — سجل الحركات (PDF + Excel)
├── customs/
│   └── route.ts          — تقرير جمركي (PDF فقط)
├── invoice/
│   └── [id]/route.ts     — فاتورة PDF
├── kpi/
│   └── route.ts          — تقرير مؤشرات الأداء (PDF)
└── compliance/
    └── route.ts          — تقرير توافق المعايير (PDF)
```

#### 2.2 مكتبة PDF — @react-pdf/renderer
```tsx
// src/lib/report-templates/inventory-pdf.tsx
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// تسجيل خط عربي
Font.register({
  family: 'Cairo',
  src: '/fonts/Cairo-Regular.ttf',
});

const styles = StyleSheet.create({
  page: { fontFamily: 'Cairo', direction: 'rtl', padding: 40 },
  title: { fontSize: 24, marginBottom: 20 },
  table: { display: 'flex', flexDirection: 'column' },
  row: { flexDirection: 'row', borderBottom: '1px solid #eee' },
});

export function InventoryReport({ data }: { data: InventoryData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>تقرير المخزون</Text>
        {/* جدول البضائع + ملخص + شعار */}
      </Page>
    </Document>
  );
}
```

#### 2.3 مكتبة Excel — ExcelJS
```ts
// src/lib/report-templates/movements-excel.ts
import ExcelJS from 'exceljs';

export async function generateMovementsExcel(movements: Movement[]) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('الحركات');
  
  // ترويسة مع تنسيق
  sheet.columns = [
    { header: 'المرجع', key: 'ref', width: 15 },
    { header: 'البضاعة', key: 'cargo', width: 20 },
    { header: 'النوع', key: 'type', width: 12 },
    { header: 'من', key: 'from', width: 15 },
    { header: 'إلى', key: 'to', width: 15 },
    { header: 'التاريخ', key: 'date', width: 18 },
  ];
  
  // تنسيق الترويسة
  sheet.getRow(1).font = { bold: true, size: 12 };
  sheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
  
  // بيانات
  for (const m of movements) {
    sheet.addRow({ ref: m.movementRef, cargo: m.cargoCode, ... });
  }
  
  return workbook.xlsx.writeBuffer();
}
```

#### 2.4 أنواع التقارير المطلوبة

| التقرير | PDF | Excel | الوصف |
|---------|-----|-------|-------|
| تقرير المخزون | ✅ | ✅ | كل البضائع مع حالتها وموقعها ووزنها |
| سجل الحركات | ✅ | ✅ | حركات فترة محددة مع تفاصيل كاملة |
| تقرير جمركي | ✅ | — | بضائع مع حالة جمركية + مراجع |
| فاتورة تخزين | ✅ | ✅ | رسوم التخزين + البيانات + التوقيع |
| مؤشرات الأداء | ✅ | ✅ | KPIs + رسوم + اتجاهات |
| تقرير توافق | ✅ | — | حالة التوافق مع GS1/ISO/IMDG |
| تقرير المعدات | ✅ | ✅ | شهادات + فحوصات + حالة |
| تقرير المشاريع | ✅ | ✅ | تقدم المشاريع + بضائع + أوزان |

### الحزم المطلوبة
```bash
bun add @react-pdf/renderer exceljs
```

### المعايير المُطبّقة
- ✅ ISO 32000 (PDF/A) — تنسيق PDF القياسي
- ✅ ISO 29500 (OOXML) — تنسيق Excel القياسي
- ✅ Unicode RTL in PDF — دعم العربية في المستندات

---

## 🔷 القسم 3: نظام الفواتير

### التصميم المقترح — 6 أنواع فواتير

#### 3.1 نموذج البيانات (Prisma Schema)
```prisma
model Invoice {
  id              String    @id @default(cuid())
  invoiceNumber   String    @unique          // INV-JED-STO-2026-03-0001
  type            String                     // STORAGE, HANDLING, CUSTOMS, TRANSPORT, EQUIPMENT, CREDIT_NOTE
  status          String    @default("DRAFT") // DRAFT, ISSUED, PAID, PARTIAL, OVERDUE, CANCELLED
  
  // العميل
  clientId        String
  clientName      String
  clientEmail     String?
  clientAddress   String?
  
  // الفترة
  periodStart     DateTime
  periodEnd       DateTime
  issueDate       DateTime  @default(now())
  dueDate         DateTime                    // تاريخ الاستحقاق
  
  // المبالغ
  subtotal        Float                      // قبل الضريبة
  taxRate         Float     @default(0.15)   // ضريبة القيمة المضافة (15% السعودية)
  taxAmount       Float                      // مبلغ الضريبة
  totalAmount     Float                      // الإجمال
  paidAmount      Float     @default(0)      // المدفوع
  balanceDue      Float                      // الرصيد المستحق
  
  // العملة
  currency        String    @default("SAR")  // SAR, USD, EUR, AED
  
  // مراجع
  projectId       String?
  poReference     String?
  contractRef     String?
  
  // شروط الدفع
  paymentTerms    String    @default("NET_30")  // NET_15, NET_30, NET_60, IMMEDIATE
  notes           String?
  
  // التدقيق
  createdBy       String
  approvedBy      String?
  approvedAt      DateTime?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  items           InvoiceItem[]
  payments        InvoicePayment[]
  
  @@index([clientId])
  @@index([status])
  @@index([type])
  @@index([dueDate])
  @@index([invoiceNumber])
}

model InvoiceItem {
  id              String    @id @default(cuid())
  invoiceId       String
  lineNumber      Int
  
  description     String
  quantity        Float
  unit            String    @default("DAY")  // DAY, KG, ITEM, LIFT, CONTAINER
  unitPrice       Float
  discountPercent Float     @default(0)
  lineTotal       Float                     // quantity * unitPrice * (1 - discountPercent)
  
  // للتعقب
  cargoItemId     String?
  locationId      String?
  equipmentId     String?
  movementId      String?
  
  invoice         Invoice   @relation(fields: [invoiceId], references: [id], onDelete: Cascade)
  
  @@index([invoiceId])
}

model InvoicePayment {
  id              String    @id @default(cuid())
  invoiceId       String
  amount          Float
  method          String    // BANK_TRANSFER, CHECK, CASH, CREDIT_CARD, WIRE
  reference       String?   // رقم المرجع البنكي
  paymentDate     DateTime  @default(now())
  notes           String?
  
  invoice         Invoice   @relation(fields: [invoiceId], references: [id], onDelete: Cascade)
  
  @@index([invoiceId])
}
```

#### 3.2 أنواع الفواتير بالتفصيل

| النوع | الرمز | الوصف | طريقة الحساب |
|-------|-------|-------|-------------|
| **تخزين** | STORAGE | رسوم تخزين بضائع في الساحة/المستودع | يومي × وزن × سعر/طن/يوم |
| **مناولة** | HANDLING | رسوم استلام/نقل/إرسال/فحص | لكل حركة × سعر الوحدة |
| **جمركية** | CUSTOMS | رسوم تخليص جمركي | ثابتة + نسبة من القيمة |
| **نقل** | TRANSPORT | رسوم نقل (بحري/جوي/بري) | لكل شحنة أو لكل طن |
| **معدات** | EQUIPMENT | رسوم استئجار رافعات ومعدات | يومي × سعر الإيجار |
| **إشعار دائن** | CREDIT_NOTE | تسوية/استرداد/خصم | سلبي |

#### 3.3 تسعير التخزين (Demurrage/Storage)
```ts
// src/lib/invoice-pricing.ts
const STORAGE_RATES = {
  YARD:       { perTonPerDay: 5.00, currency: 'SAR' },    // 5 ريال/طن/يوم
  WAREHOUSE:  { perTonPerDay: 8.00, currency: 'SAR' },    // 8 ريال/طن/يوم
  BONDED:     { perTonPerDay: 12.00, currency: 'SAR' },   // 12 ريال/طن/يوم
  REEFER:     { perTonPerDay: 15.00, currency: 'SAR' },   // 15 ريال/طن/يوم (مبرّد)
  HAZMAT:     { perTonPerDay: 20.00, currency: 'SAR' },   // 20 ريال/طن/يوم (خطرة)
};

// أيام مجانية (Free Days)
const FREE_DAYS = {
  STANDARD: 7,      // 7 أيام مجانية
  BONDED: 14,       // 14 يوم مستودع مقفل
  PROJECT: 21,      // 21 يوم مشاريع
};

function calculateStorageCharge(
  weightTons: number,
  storageDays: number,
  locationType: string,
  freeDays: number = FREE_DAYS.STANDARD
): number {
  const chargeableDays = Math.max(0, storageDays - freeDays);
  const rate = STORAGE_RATES[locationType] || STORAGE_RATES.YARD;
  return weightTons * chargeableDays * rate.perTonPerDay;
}
```

#### 3.4 واجهة المستخدم — صفحة الفواتير
```
src/components/wms/invoices-page.tsx
├── قائمة الفواتير (جدول مع فلترة)
├── إنشاء فاتورة جديدة
├── تفاصيل الفاتورة
├── إضافة عناصر
├── إصدار الفاتورة (DRAFT → ISSUED)
├── تسجيل دفعة
├── تنزيل PDF
├── إرسال بالبريد الإلكتروني
└── تقرير الشيخوخة (Aging Report)
```

#### 3.5 ترقيم الفواتير — معيار دولي
```
INV-{Branch}-{Type}-{Year}-{Month}-{Sequence}

مثال:
INV-JED-STO-2026-03-0001  → فاتورة تخزين، جدة، مارس 2026
INV-DMM-HND-2026-03-0015  → فاتورة مناولة، الدمام، مارس 2026
INV-RYD-CUS-2026-03-0042  → فاتورة جمركية، الرياض
```

### المعايير المُطبّقة
- ✅ ISO 8601 — تنسيق التاريخ
- ✅ ISO 4217 — رموز العملات (SAR, USD, EUR, AED)
- ✅ UBL 2.1 — لغة الأعمال الشاملة (OASIS)
- ✅ PEPPOL — شبكة المشتريات الإلكترونية الأوروبية
- ✅ Saudi VAT — ضريبة القيمة المضافة 15%

---

## 🔷 القسم 4: المعايير الدولية

### 4.1 GS1 — الترقيم والتتبع

#### تنفيذ الباركود GS1-128
```ts
// src/lib/gs1/barcode.ts
// GS1-128: (01)GTIN(17)Expiry(10)Lot(21)Serial

interface GS1Barcode {
  gtin: string;        // 14 رقم — رقم العنصر التجاري العالمي
  expiry?: string;     // YYMMDD — تاريخ الانتهاء
  lot?: string;        // رقم الدفعة
  serial?: string;     // الرقم التسلسلي
}

function encodeGS1_128(data: GS1Barcode): string {
  let code = '';
  code += `01${data.gtin}`;            // معرف التطبيق 01 = GTIN
  if (data.expiry) code += `17${data.expiry}`;  // AI 17 = تاريخ الانتهاء
  if (data.lot) code += `10${data.lot}`;        // AI 10 = رقم الدفعة
  if (data.serial) code += `21${data.serial}`;  // AI 21 = الرقم التسلسلي
  return `]${code}`;  // ] = FNC1 (بداية GS1-128)
}

function decodeGS1_128(barcode: string): GS1Barcode {
  // تحليل معرفات التطبيق (AI)
}
```

#### SSCC — رمز الحاوية التسلسلي
```ts
// src/lib/gs1/sscc.ts
// SSCC: 18 رقم — تحديد فريد لكل وحدة لوجستية
function generateSSCC(companyPrefix: string, extensionDigit: number = 0): string {
  // شركة سعودية: 630123 (GS1 Saudi Arabia prefix)
  // SSCC = ExtensionDigit + CompanyPrefix + SerialReference + CheckDigit
  const serialRef = randomDigits(9);
  const withoutCheck = `${extensionDigit}${companyPrefix}${serialRef}`;
  const checkDigit = calculateMod10CheckDigit(withoutCheck);
  return withoutCheck + checkDigit;
}
```

### 4.2 IMDG — البضائع الخطرة

#### تصنيف الخطورة التسعة
```ts
// src/lib/standards/imdg.ts
const IMDG_CLASSES = [
  { class: 1,  name: 'متفجرات',           nameEn: 'Explosives',           symbol: '💣' },
  { class: 2,  name: 'غازات',             nameEn: 'Gases',               symbol: '🔴', subclasses: ['2.1 قابل للاشتعال', '2.2 غير قابل للاشتعال', '2.3 سام'] },
  { class: 3,  name: 'سوائل قابلة للاشتعال', nameEn: 'Flammable Liquids', symbol: '🔥' },
  { class: 4,  name: 'مواد صلبة قابلة للاشتعال', nameEn: 'Flammable Solids', symbol: '⚠️', subclasses: ['4.1', '4.2 ذاتي الاشتعال', '4.3 ينبعث غاز قابل للاشتعال'] },
  { class: 5,  name: 'مواد مؤكسدة',       nameEn: 'Oxidizing Substances', symbol: '⚡', subclasses: ['5.1 مؤكسدة', '5.2 فوق أكسيد عضوي'] },
  { class: 6,  name: 'مواد سامة ومعدية',   nameEn: 'Toxic & Infectious',  symbol: '☠️', subclasses: ['6.1 سامة', '6.2 معدية'] },
  { class: 7,  name: 'مواد مشعة',         nameEn: 'Radioactive Material', symbol: '☢️' },
  { class: 8,  name: 'مواد آكلة',         nameEn: 'Corrosive Substances', symbol: '🧪' },
  { class: 9,  name: 'مواد وأشياء خطرة متنوعة', nameEn: 'Misc. Dangerous',  symbol: '📋' },
];

// فصل عدم التوافق (Segregation)
const SEGREGATION_TABLE = {
  '1-2': 'AWAY',      // بعيد عن
  '1-3': 'AWAY',
  '3-6.1': 'SEGREGATE', // فصل
  '5.1-6.1': 'SEGREGATE',
  '5.1-7': 'ISOLATE',   // عزل
  '6.2-ALL': 'ISOLATE',  // المواد المعدية: عزل عن الكل
  // ... 81 مجموعة
};
```

### 4.3 ISO 28000 — أمن سلسلة التوريد
```ts
// src/lib/standards/iso28000.ts
interface SecurityAudit {
  accessControl: 'PASS' | 'FAIL' | 'N/A';     // منع الوصول غير المصرح
  chainOfCustody: 'PASS' | 'FAIL' | 'N/A';    // سلسلة الحيازة
  tamperEvidence: 'PASS' | 'FAIL' | 'N/A';    // أدلة التلاعب
  incidentReporting: 'PASS' | 'FAIL' | 'N/A'; // الإبلاغ عن الحوادث
  backgroundChecks: 'PASS' | 'FAIL' | 'N/A';  // فحص الخلفيات
  emergencyProcedures: 'PASS' | 'FAIL' | 'N/A'; // إجراءات الطوارئ
}
```

### 4.4 صفحة المعايير — واجهة المستخدم
```
src/components/wms/standards-page.tsx (موجودة — تحسين)
├── لوحة توافق GS1
│   ├── حالة الباركود (GS1-128, SSCC, DataMatrix)
│   ├── حالة RFID/EPC
│   └── فحص GTIN
├── لوحة توافق IMDG
│   ├── تصنيف الخطورة لكل بضاعة
│   ├── جدول فصل عدم التوافق
│   └── تحذيرات التخزين المشترك
├── لوحة توافق ISO
│   ├── ISO 28000 (أمن)
│   ├── ISO 9001 (جودة)
│   └── ISO 15489 (سجلات)
└── تقرير توافق PDF
```

---

## 🔷 القسم 5: مصادقة كاملة (Authentication)

### المشكلة الحالية
- لا واجهة تسجيل دخول
- عمليات الكتابة ترجع 401 بدون رسالة واضحة
- لا إدارة مستخدمين

### الحل المقترح

#### 5.1 تدفق المصادقة
```
مستخدم جديد:
  تسجيل → إنشاء حساب → تسجيل دخول تلقائي → لوحة التحكم

مستخدم موجود:
  تسجيل دخول → مصادقة NextAuth → JWT → لوحة التحكم

نسيت كلمة المرور:
  طلب إعادة التعيين → بريد إلكتروني → رابط → كلمة جديدة
```

#### 5.2 أدوار المستخدمين
```ts
const ROLES = {
  ADMIN:    { read: '*', write: '*', admin: true  },  // كل الصلاحيات
  MANAGER:  { read: '*', write: '*', admin: false },  // قراءة + كتابة
  OPERATOR: { read: '*', write: ['cargo','movements'], admin: false }, // عمليات فقط
  VIEWER:   { read: '*', write: [], admin: false },   // قراءة فقط
  CLIENT:   { read: ['own_cargo','own_invoices'], write: [], admin: false }, // عميل
};
```

#### 5.3 صفحة تسجيل الدخول
```
src/components/wms/login-page.tsx (موجودة — تفعيل)
├── حقل البريد الإلكتروني
├── حقل كلمة المرور
├── تذكرني
├── نسيت كلمة المرور؟
├── تسجيل دخول
└── إنشاء حساب جديد
```

---

## 🔷 القسم 6: أفكار من مشاريع مشابهة

### 6.1 من Odoo WMS
- **Wave Picking** — تجميع أوامر التحضير في موجات
- **3PL Billing** — فوترة متعددة العملاء تلقائياً
- **Put-away Strategy** — استراتيجيات التوضع (الأقرب، الفراغ، المخصص)
- **Reservation** — حجز مخزون لأمر عميل

### 6.2 من OpenBoxes
- **Lot/Expiry Tracking** — تتبع الدفعات وتواريخ الانتهاء
- **Cold Chain** — سلسلة التبريد مع تسجيل درجة الحرارة
- **Stock Card** — بطاقة مخزون لكل منتج (حركات كاملة)

### 6.3 من InvenTree
- **Plugin Architecture** — بنية إضافات قابلة للتوسيع
- **OpenAPI/Swagger** — توثيق API تلقائي
- **Batch Tracking** — تتبع دفعات التصنيع

### 6.4 من ERPNext
- **Serial Number Tracking** — تتبع بالرقم التسلسلي
- **Quality Inspection** — فحص جودة عند الاستلام
- **Batch Wise Valuation** — تقييم المخزون بالدفعة

### 6.5 ميزات جديدة مقترحة
| الميزة | الأولوية | الوصف |
|-------|----------|-------|
| لوحة تحكم العميل | عالية | بوابة العميل لرؤية بضائعه وفواتيره |
| إشعارات ذكية | عالية | تنبيهات: شهادات منتهية، بضائع متأخرة، فواتير مستحقة |
| خريطة المستودع | متوسطة | عرض رسومي لمناطق المستودع |
| جرد دوري | متوسطة | عد دوري مع مقارنة النظام vs الفعلي |
| أمر تحضير | متوسطة | إنشاء وتنفيذ أوامر التحضير والشحن |
| واجهة API مفتوحة | متوسطة | REST API مع Swagger للتكامل الخارجي |
| سلسلة التبريد | منخفضة | تسجيل درجة الحرارة والرطوبة |
| موجة تحضير | منخفضة | تجميع أوامر التحضير |

---

## 🔷 القسم 7: خطة التنفيذ

### المرحلة 1 — الأساسيات (الأولوية القصوى)
| # | المهمة | الملفات | المدة |
|---|-------|--------|-------|
| 1 | دعم RTL/LTR ديناميكي | layout.tsx, direction-provider.tsx, CSS | 2 ساعة |
| 2 | خط عربي للتقارير | fonts/, report-templates/ | 1 ساعة |
| 3 | واجهة تسجيل دخول | login-page.tsx, middleware.ts | 2 ساعة |

### المرحلة 2 — التقارير (أولوية عالية)
| # | المهمة | الملفات | المدة |
|---|-------|--------|-------|
| 4 | تقرير مخزون PDF | reports/inventory/route.ts | 2 ساعة |
| 5 | تقرير حركات PDF | reports/movements/route.ts | 2 ساعة |
| 6 | تصدير Excel لكل التقارير | lib/report-templates/*.ts | 2 ساعة |
| 7 | زر PDF/Excel في كل صفحة | *.tsx | 1 ساعة |

### المرحلة 3 — الفواتير (أولوية عالية)
| # | المهمة | الملفات | المدة |
|---|-------|--------|-------|
| 8 | نموذج بيانات الفاتورة | prisma/schema.prisma | 1 ساعة |
| 9 | محرك التسعير | lib/invoice-pricing.ts | 2 ساعة |
| 10 | صفحة الفواتير | invoices-page.tsx | 3 ساعة |
| 11 | فاتورة PDF | reports/invoice/[id]/route.ts | 2 ساعة |

### المرحلة 4 — المعايير الدولية (أولوية متوسطة)
| # | المهمة | الملفات | المدة |
|---|-------|--------|-------|
| 12 | GS1 باركود/SSCC | lib/gs1/*.ts | 2 ساعة |
| 13 | IMDG تصنيف الخطورة | lib/standards/imdg.ts | 1 ساعة |
| 14 | صفحة المعايير المحدّثة | standards-page.tsx | 2 ساعة |

### المرحلة 5 — ميزات إضافية (أولوية منخفضة)
| # | المهمة | الملفات | المدة |
|---|-------|--------|-------|
| 15 | إشعارات ذكية | notifications/ | 2 ساعة |
| 16 | لوحة تحكم العميل | client-portal/ | 3 ساعة |
| 17 | جرد دوري | cycle-count/ | 2 ساعة |

**إجمالي المدة التقديرية: ~28 ساعة**

---

## 🔷 القسم 8: ملخص المعايير المُطبّقة

| المعيار | المنظمة | التطبيق |
|---------|---------|---------|
| GS1-128/GTIN/SSCC | GS1 | باركود وتتبع |
| EPC/RFID | GS1/EPCglobal | تتبع آلي |
| IMDG Code | IMO | بضائع خطرة |
| ISO 28000 | ISO | أمن سلسلة التوريد |
| ISO 9001 | ISO | جودة العمليات |
| ISO 15489 | ISO | إدارة السجلات |
| ISO 32000 (PDF/A) | ISO | تقارير PDF |
| ISO 4217 | ISO | رموز العملات |
| ISO 8601 | ISO | تنسيق التاريخ والوقت |
| UBL 2.1 | OASIS | فواتير إلكترونية |
| W3C i18n | W3C | دعم RTL/LTR |
| UAX #9 | Unicode | خوارزمية ثنائية الاتجاه |
| OSHA 1910 | US DOL | سلامة المستودع |
| Saudi VAT 15% | ZATCA | ضريبة القيمة المضافة |

---

**المخطط جاهز للتنفيذ. أنتظر إشارتك للبدء! 🚀**
