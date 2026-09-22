# 🏗️ HEAVY LIFT WMS — خطة النقاط الخمس الشاملة
# Comprehensive 5-Point Implementation Blueprint

**التاريخ:** 2026-03-05 | **العملة:** AED | **ضريبة:** 5% UAE | **الفروع:** DXB, AUH, SHJ, AJM, RAK, FJR

---

## ═══════════════════════════════════════════════════════════════
## النقطة 1: تصميم متجاوب لكل الأجهزة (Responsive Design)
## ═══════════════════════════════════════════════════════════════

### المشكلة الحالية
- صفحة الفواتير: جدول بدون overflow-x-auto، أعمدة بدون إخفاء responsive
- صفحة الفواتير: Sheet بعرض ثابت 480px يفيض على الهاتف
- صفحة الفواتير: Dialog forms بـ grid-cols-2/3/5/12 بدون breakpoints للموبايل
- Select triggers بعرض ثابت 160px/180px
- صفحات أخرى: Dialog form grids غير متجاوبة
- Dashboard: قفزة من 2→5 أعمدة بدون md:grid-cols-3

### المعايير المستهدفة
| الجهاز | العرض | الأعمدة | السلوك |
|--------|-------|---------|--------|
| Mobile | <640px | 1 عمود | Stack vertically, full width |
| Tablet | 640-1024px | 2-3 أعمدة | Grid with responsive columns |
| Desktop | >1024px | 4-5 أعمدة | Full grid layout |

### خطة التنفيذ

#### 1.1 صفحة الفواتير (الأكثر مشاكل)
- **الجدول:** إضافة `overflow-x-auto` wrapper + `hidden sm:table-cell` / `hidden md:table-cell` للأعمدة غير الأساسية
- **Sheet:** تغيير `w-[480px]` إلى `w-full sm:w-[480px]`
- **Dialog grids:** 
  - `grid-cols-2` → `grid-cols-1 sm:grid-cols-2`
  - `grid-cols-3` → `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
  - `grid-cols-5` (aging) → `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5`
  - `grid-cols-12` (line items) → تخطيط عمودي على الموبايل
- **Select triggers:** `w-[160px]` → `w-full sm:w-[160px]`

#### 1.2 صفحات أخرى
- Projects, Movements, Locations, Equipment: `grid-cols-2` → `grid-cols-1 sm:grid-cols-2`
- Locations: `grid-cols-3` → `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Dashboard: إضافة `md:grid-cols-3` بين sm:2 و lg:5
- Movements: إضافة `md:grid-cols-3`

#### 1.3 Tables عامة
- جميع الجداول بدون overflow → إضافة `overflow-x-auto`
- جميع الجداول بدون responsive hiding → إضافة `hidden` breakpoints

---

## ═══════════════════════════════════════════════════════════════
## النقطة 2: إصلاح نظام الفواتير بالكامل
## ═══════════════════════════════════════════════════════════════

### المشكلة الحالية — 10 أخطاء حرجة
| # | المشكلة | السبب | التأثير |
|---|---------|-------|---------|
| 1 | إنشاء فاتورة تفشل دائماً | POST يرسل `lineItems` لكن API يتوقع `items` | 400 Error |
| 2 | لا يوجد `clientId` | Frontend لا يرسله لكن API يتطلبه | 400 Error |
| 3 | لا يوجد `lineTotal` | Frontend لا يحسب lineTotal لكل بند | حسابات خاطئة |
| 4 | إصدار فاتورة يفشل | يرسل `{status:'ISSUED'}` بدل `{action:'issue'}` | Unknown action |
| 5 | تسجيل دفعة يفشل | ينادي endpoint غير موجود `/payments` | 404 Error |
| 6 | تحميل PDF يفشل | ينادي endpoint غير موجود `/pdf` | 404 Error |
| 7 | جلب الفواتير | يستخدم `data.invoices` لكن API يرجع `data.items` | قائمة فارغة |
| 8 | Interface لا يتطابق | Frontend `amount` لا يطابق DB `totalAmount/balanceDue` | بيانات خاطئة |
| 9 | Payment terms ناقصة | ينقص IMMEDIATE و NET_90 | خيارات ناقصة |
| 10 | Aging حساب خاطئ | Frontend يستخدم `amount` بدل `balanceDue` | أرقام خاطئة |

### خطة التنفيذ

#### 2.1 إصلاح Frontend Invoice Interface
```typescript
interface Invoice {
  id: string;
  invoiceNumber: string;
  type: InvoiceType;
  status: InvoiceStatus;
  // Client
  clientId: string;
  clientName: string;
  clientEmail?: string;
  clientAddress?: string;
  // Period
  periodStart: string;
  periodEnd: string;
  issueDate: string;
  dueDate: string;
  // Amounts (AED)
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  paidAmount: number;
  balanceDue: number;
  currency: string;
  // References
  projectId?: string;
  poReference?: string;
  contractRef?: string;
  // Terms
  paymentTerms: PaymentTerms;
  notes?: string;
  branch: Branch;
  // Items & Payments
  items: InvoiceItem[];
  payments: InvoicePayment[];
  // Audit
  createdBy: string;
  createdAt: string;
}
```

#### 2.2 إصلاح Invoice Creation
- إرسال `items` بدل `lineItems`
- حساب `lineTotal = quantity * unitPrice` لكل بند
- إرسال `clientId` (يدوياً أو من project)
- إضافة `lineNumber` تلقائي

#### 2.3 إصلاح Invoice Actions
- Issue: `PATCH /api/invoices/{id}` مع `{ action: 'issue' }`
- Cancel: `PATCH /api/invoices/{id}` مع `{ action: 'cancel' }`
- Payment: `PATCH /api/invoices/{id}` مع `{ action: 'payment', paymentAmount, paymentMethod, paymentReference }`

#### 2.4 إضافة Invoice PDF Endpoint
- إنشاء `/api/invoices/[id]/pdf/route.ts`
- توليد PDF باستخدام @react-pdf/renderer
- تصميم احترافي: logo، بيانات العميل، بنود الفاتورة، VAT، الإجمال

#### 2.5 إضافة Payment Terms المفقودة
- إضافة `IMMEDIATE` و `NET_90` للـ Select

#### 2.6 إصلاح Fetch Mapping
- `data.items` بدل `data.invoices`

---

## ═══════════════════════════════════════════════════════════════
## النقطة 3: تقارير بمعايير عالمية PDF + Excel + Word
## ═══════════════════════════════════════════════════════════════

### المشكلة الحالية
- صفحة التقارير تصدر JSON فقط
- PDF endpoint يرجع JSON وليس ملف PDF حقيقي
- لا يوجد تصدير Word/DOCX
- لا توجد أزرار UI للتصدير المتعدد
- PDF يستخدم Helvetica (not professional English font)
- PDF hardcoded "Page 1 of 1"

### المعايير المستهدفة
| الصيغة | المكتبة | المعيار |
|--------|---------|---------|
| PDF | @react-pdf/renderer | ISO 19005-1 (PDF/A), UAE FTA compliant |
| Excel | exceljs | ISO 29500 (OOXML), UAE VAT format |
| Word | docx | ISO 29500 (OOXML), professional template |

### أنواع التقارير
1. **Inventory Report** — قائمة البضائع مع المواقع والأوزان
2. **Movements Report** — سجل الحركات مع المعدات
3. **Invoice Report** — فواتير صادرة/معلقة
4. **Aging Report** — تقارير استحقاق الديون
5. **Equipment Report** — حالة المعدات والشهادات
6. **Project Report** — حالة المشاريع مع البضائع
7. **Dashboard Summary** — ملخص KPIs
8. **Custom Report** — تقرير مخصص

### خطة التنفيذ

#### 3.1 تثبيت مكتبة docx
```bash
bun add docx
```

#### 3.2 إصلاح PDF Generation (Server-side)
- توليد PDF على الـ server باستخدام @react-pdf/renderer
- إرجاع Buffer حقيقي مع Content-Type: application/pdf
- استخدام خط Inter/Roboto عبر Font.register()
- Dynamic page numbers مع `render` prop

#### 3.3 إنشاء Word/DOCX Export
- إنشاء `src/lib/report-templates/word-utils.ts`
- استخدام مكتبة `docx` لتوليد مستندات Word
- تصميم احترافي: header، table، footer
- دعم RTL للعربية

#### 3.4 إضافة UI Buttons للتقارير
- إضافة 3 أزرار: PDF, Excel, Word
- Dropdown menu لاختيار نوع التقرير
- لكل نوع تقرير: اختيار الصيغة

#### 3.5 إنشاء Report API Routes إضافية
- `/api/reports/invoices?format=pdf|excel|word`
- `/api/reports/aging?format=pdf|excel|word`
- `/api/reports/equipment?format=pdf|excel|word`
- `/api/reports/projects?format=pdf|excel|word`

---

## ═══════════════════════════════════════════════════════════════
## النقطة 4: مراجعة شاملة وإصلاح كل الأخطاء
## ═══════════════════════════════════════════════════════════════

### قائمة الفحص الشاملة

#### 4.1 RTL/LTR
- [ ] layout.tsx يستخدم dir و lang ديناميكياً
- [ ] CSS logical properties (start/end بدل left/right)
- [ ] Sidebar يتحول بشكل صحيح
- [ ] الجداول تتناسب مع الاتجاه

#### 4.2 i18n
- [ ] كل النصوص مترجمة
- [ ] تبديل اللغة يعمل فوراً
- [ ] التاريخ والعملة حسب اللغة

#### 4.3 Auth & Security
- [ ] Login/Register يعمل
- [ ] JWT tokens صحيحة
- [ ] Role-based access يعمل
- [ ] Middleware يحمي الـ API

#### 4.4 CRUD Operations
- [ ] Cargo: Create, Read, Update, Delete
- [ ] Projects: Create, Read, Update, Delete
- [ ] Locations: Create, Read, Update, Delete
- [ ] Equipment: Create, Read, Update, Delete
- [ ] Movements: Create, Read
- [ ] Invoices: Create, Issue, Pay, Cancel, PDF

#### 4.5 Data Integrity
- [ ] Invoice numbers فريدة
- [ ] Status workflows صحيحة
- [ ] Calculations (VAT, totals) صحيحة
- [ ] Foreign keys سليمة

#### 4.6 Performance
- [ ] لا توجد استعلامات N+1
- [ ] Pagination تعمل
- [ ] Loading states موجودة
- [ ] Error boundaries تعمل

#### 4.7 Accessibility
- [ ] ARIA labels
- [ ] Keyboard navigation
- [ ] Screen reader support
- [ ] Color contrast

---

## ═══════════════════════════════════════════════════════════════
## النقطة 5: تقرير شامل نهائي
## ═══════════════════════════════════════════════════════════════

### محتوى التقرير
1. ملخص المشروع والمعايير
2. حالة كل موديول
3. الأخطاء المكتشفة والمصلحة
4. نسبة التغطية لكل نقطة
5. توصيات للتحسين المستقبلي
6. Screenshots للنتائج

---

## ترتيب التنفيذ

| المرحلة | المهمة | الأولوية | المدة |
|---------|--------|----------|-------|
| 1 | إصلاح الفواتير (النقطة 2) | 🔴 حرج | أولاً |
| 2 | تصميم متجاوب (النقطة 1) | 🟡 متوسط | ثانياً |
| 3 | تقارير PDF/Excel/Word (النقطة 3) | 🟡 متوسط | ثالثاً |
| 4 | مراجعة شاملة (النقطة 4) | 🟢 تحسين | رابعاً |
| 5 | تقرير نهائي (النقطة 5) | 🟢 توثيق | أخيراً |
