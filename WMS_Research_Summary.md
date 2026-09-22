# تقرير البحث الشامل: معايير أنظمة إدارة المستودعات (WMS)
# Comprehensive WMS Research Report

---

## 1. المعايير الدولية لأنظمة إدارة المستودعات | International WMS Standards

### 1.1 ISO 28000 — نظام إدارة أمن سلسلة التوريد (Supply Chain Security Management)

| البند | التفاصيل |
|-------|----------|
| **الاسم الكامل** | ISO 28000:2007 — Specification for security management systems for the supply chain |
| **النطاق** | يحدد متطلبات نظام إدارة الأمن لسلسلة التوريد، يشمل التمويل، التصنيع، إدارة المعلومات، والنقل |
| **الهدف** | ضمان وتأمين سلسلة التوريد من المخاطر الأمنية عبر جميع المستويات |
| **التطبيق في WMS** | تأمين حركة البضائع داخل المستودع، منع الوصول غير المصرح به، تتبع سلسلة الحيازة |
| **الشهادة** | تصدر经由 جهات تصديق مثل DNV و Bureau Veritas |

**المتطلبات الرئيسية:**
- تقييم المخاطر الأمنية وتحديد نقاط الضعف في سلسلة التوريد
- خطط الأمن وعمليات الطوارئ
- مراقبة وقياس أداء نظام إدارة الأمن
- تحسين مستمر للنظام الأمني
- توثيق سلسلة الحيازة (Chain of Custody)
- حماية البضائع ذات الخطورة العالية

---

### 1.2 ISO 9001 — نظام إدارة الجودة (Quality Management System)

| البند | التفاصيل |
|-------|----------|
| **الاسم الكامل** | ISO 9001:2015 — Quality management systems — Requirements |
| **النطاق** | متطلبات نظام إدارة الجودة عندما تحتاج المنظمة لإثبات قدرتها على توفير منتجات/خدمات متوافقة |
| **التطبيق في WMS** | ضمان جودة عمليات الاستلام، التخزين، التحضير، والشحن |

**المبادئ السبعة لـ ISO 9001:**
1. التركيز على العميل (Customer Focus)
2. القيادة (Leadership)
3. مشاركة الأشخاص (Engagement of People)
4. نهج العمليات (Process Approach)
5. التحسين المستمر (Improvement)
6. اتخاذ القرار المبني على الأدلة (Evidence-based Decision Making)
7. إدارة العلاقات (Relationship Management)

---

### 1.3 معايير GS1 — الترقيم والتتبع عالمياً (Barcoding, EPC/RFID)

| المعيار | الوصف | التطبيق في WMS |
|---------|-------|----------------|
| **GS1-128** | ترميز شريطي للتبادل التجاري | تسمية البضائع والبالتات والكراتين |
| **GS1 DataMatrix** | ترميز ثنائي الأبعاد 2D | تتبع الأدوية والمنتجات الصغيرة |
| **EPC/RFID** | رمز المنتج الإلكتروني + تحديد الترددات الراديوية | التتبع الآلي في المستودع، جرد تلقائي |
| **GDSN** | شبكة بيانات المزامنة العالمية | مزامنة بيانات المنتج عبر سلسلة التوريد |
| **GS1 EPCIS** | معيار أحداث التتبع والاستعلام | سجل حركة البضائع عبر جميع نقاط التتبع |
| **GTIN** | رقم العنصر التجاري العالمي | تحديد فريد لكل منتج عالمياً |
| **SSCC** | رمز الحاوية الشحن التسلسلي | تحديد فريد لكل وحدة لوجستية |
| **GLN** | رقم الموقع العالمي | تحديد المواقع الفيزيائية والقانونية |

**الأهمية الخاصة للمستودعات:**
- مسح الشريط عند الاستلام والشحن للتحقق التلقائي
- تتبع تاريخ الصلاحية والدفعة (Lot/Batch) تلقائياً
- جرد دوري باستخدام RFID بدون مسح يدوي
- التوافق مع متطلبات DSCSA (قانون أمن سلسلة توريد الأدوية الأمريكي)

---

### 1.4 ISO 15489 — إدارة السجلات والوثائق (Records Management)

| البند | التفاصيل |
|-------|----------|
| **الاسم الكامل** | ISO 15489-1:2016 — Information and documentation — Records management |
| **التطبيق في WMS** | إدارة سجلات المستودع: إيصالات الاستلام، أوامر التحضير، سجلات الجرد، وثائق التخليص الجمركي |

**المتطلبات:**
- سياسة إدارة سجلات موثقة
- تصنيف السجلات وفترات الاحتفاظ (Retention Schedules)
- أمنية السجلات وسلامتها
- السجلات كدليل قانوني (Audit Trail)
- التخلص من السجلات المنتهية بأمان
- إدارة السجلات الإلكترونية مع البيانات الوصفية (Metadata)

---

### 1.5 معايير OSHA — السلامة في المستودعات

| المعيار | الرمز | التطبيق |
|---------|-------|---------|
| **الرافعات الشوكية** | 29 CFR 1910.178 | تدريب مشغلي الرافعات، فحص يومي، سرعات آمنة |
| **العمل بالارتفاع** | 29 CFR 1910.23-30 | حواجز سقوط، سلالم ثابتة، منصات عمل |
| **التعامل اليدوي** | 29 CFR 1910.176 | حدود رفع، تقنيات رفع آمنة |
| **مخرج الطوارئ** | 29 CFR 1910.37 | مخارج واضحة، إضاءة طوارئ، خطة إخلاء |
| **التخزين العام** | 29 CFR 1910.176 | توزيع الحمل، استقرار الركائز، حدود ارتفاع |
| **معدات الحماية الشخصية** | 29 CFR 1910.132-138 | خوذات، أحذية آمنة، واقيات ظهر |
| **التهوية** | 29 CFR 1910.94 | تهوية كافية خاصة مع مواد خطرة |
| **العلامات واللافتات** | 29 CFR 1910.145 | تحذيرات، إلزامات، علامات خطر |

---

### 1.6 IMDG Code — مدونة البضائع الخطرة البحرية الدولية

| البند | التفاصيل |
|-------|----------|
| **الاسم الكامل** | International Maritime Dangerous Goods Code |
| **الجهة المصدرة** | المنظمة البحرية الدولية (IMO) |
| **النطاق** | نقل البضائع الخطرة بحراً في شكل معبأ |
| **التحديث** | كل سنتين (النسخة الحالية: Amendment 42-24) |

**التصنيفات التسعة للبضائع الخطرة:**
1. المتفجرات (Explosives)
2. الغازات (Gases)
3. السوائل القابلة للاشتعال (Flammable Liquids)
4. المواد الصلبة القابلة للاشتعال (Flammable Solids)
5. المواد المؤكسدة وبيروكسيدات العضوية
6. المواد السامة والمعدية (Toxic and Infectious)
7. المواد المشعة (Radioactive)
8. المواد المسببة للتآكل (Corrosive)
9. مواد و أشياء خطرة متنوعة (Miscellaneous)

**التطبيق في WMS الساحلي:**
- فصل البضائع غير المتوافقة (Segregation Table)
- متطلبات التعبئة والتسمية (Packaging and Marking)
- وثيقة الإقرار البحري (Dangerous Goods Declaration)
- خطة الطوارئ الخاصة بالبضائع الخطرة (EmS Fires and Spills)
- قيود التخزين في الحاويات والمستودعات

---

### 1.7 UNECE — تسهيل التجارة والأعمال الإلكترونية

| المعيار | الوصف |
|---------|-------|
| **UN/EDIFACT** | المعيار الدولي الوحيد للتبادل الإلكتروني للبيانات — رسائل مثل DESADV (إشعار الإرسال)، INVOIC (فاتورة)، INVENTORY (جرد) |
| **UN/LOCODE** | رموز مواقع الأمم المتحدة — تحديد الموانئ والمطارات والمستودعات |
| **UN/ECE Recommendation 1** | نموذج فاتورة التجارة الدولية |
| **UN/ECE Recommendation 25** | استخدام EAN للترقيم |
| **UN/ECE Recommendation 36** | إطار البيانات الوصفية للتجارة الإلكترونية |
| **WCO Data Model** | نموذج بيانات منظمة الجمارك العالمية — لتوحيد البيانات الجمركية |

---

### 1.8 DCSA — معايير الشحن الحاوي الرقمي (Digital Container Shipping Association)

| المعيار | الوصف |
|---------|-------|
| **DCSA Track and Trace API** | API موحد لتتبع الحاويات عبر جميع شركات الشحن |
| **DCSA Event Standards** | معيار أحداث الشحن (Booking, Transport Equipment, Shipment events) |
| **DCSA BL Standards** | معيار سند الشحن الإلكتروني (eBL) |
| **DCSA Interface Standards** | معايير واجهات OpenAPI لتبادل البيانات |

**الأهمية لمستودعات الموانئ:**
- تتبع آلي للحاويات عبر ناقلين متعددين
- تحديثات آنية لوقت الوصول المتوقع (ETA)
- سندات شحن إلكترونية تقلل الوثائق الورقية
- تكامل مباشر عبر API مع أنظمة TMS/WMS

---

## 2. أفضل ممارسات RTL/LTR | RTL/LTR Best Practices in Enterprise Apps

###< 2.1 نهج SAP في دعم النص ثنائي الاتجاه

**SAP S/4HANA و SAP7 Fiori:**
- SAP يدعم لغات RTL محدودة: العربية، العبرية، الفارسية (ملاحظة SAP #1291845)
- نظام SAP GUI: يع? يعكس اتجاه الواجهة بالكامل لـ RTL
- SAP Fiori (HTML5): يستخدم CSS `dir="rtl"` مع منطق BiDi للنص المختلط
- قواعد BiDi في SAP:
  - الأرقام تظل LTR داخل نص RTL
  - النص اللاتيني يظل LTR
  - ترتيب الأقواس يتبع اتجاه الفقرة الأساسي
- التوطين يتضمن: ترجمة جميع الرسائل، عكس ترتيب التبويبات، عكس اتجاه الجداول

### 2.2 نهج Oracle في دعم RTL

**Oracle Cloud ERP / Fusion Applications:**
- يستخدم Oracle ADF (Application Development Framework) مع دعم BiDi مدمج
- تحديد اتجاه الواجهة حسب لغة جلسة المستخدم
- Oracle JET (JavaScript Extension Toolkit) يدعم RTL عبر `oj.RTLMode`
- الجداول والنماذج تعكس تلقائياً مع الحفاظ على محاذاة الأرقام
- التقارير (3(Oracle BI Publisher) تدعم RTL مع قوالب مخصصة

### 2.3 نهج Microsoft Dynamics في دعم RTL

**Dynamics 365 / Business Central:**
- Dynamics 365 يدعم العربية والعبرGبرية ك لغات واجهة كاملة
- يحدد الاتجاه عبر إعداد لغة المستخدم (Language ID)
- واجهة الويب تستخدم `dir="rtl"` على عنصر `<html>`
- Business Central (AL Language): دعم RTL في التقارير RDLC و Word
- Power Platform: يدعم RTL في Canvas Apps و Model-Driven Apps

### 2.4 CSS Logical Properties — الطريقة الحديثة لـ RTL

```css
/* ❌ الطريقة القديمة — مشاكل في RTL */
.element {
  margin-left>left: 16px;
  margin-right: 8px;
  text-align: left;
  border-left: 2px solid gray;
  padding-left: 12px;
}

/* ✅ الطريقة الحديثة — تعمل تلقائياً في RTL */
.element {
  margin-inline-start: 16px;   /* يسار في LTR، يمين في RTL */
  margin-inline-end: 8px;      /* يمين في LTR، يسار في RTL */
  text-align: start;           /* يسار في LTR، يمين في RTL */
  border-inline-start: 2px solid gray;
  padding-inline-start: 12px;
  
  /* خصائص الكتلة (عمودي) — لا تتأثر بالاتجاه */
  margin-block-start: 8px;     /* أعلى */
  margin-block-end: 8px;       /* أسفل */
  
  /* خصائص مختصرة */
  margin-inline: 16px 8px;     /* start end */
  inset-inline-start: 0;       /* بديل left/right في position */
}
```

**جدول الخصائص المنطقية:**

| الخاصية الفيزيائية (قديم) | الخاصية المنطقية (حديث) | سلوك RTL |
|---------------------------|------------------------|----------|
| `left` | `inline-start` | يمين |
| `right` | `inline-end` | يسار |
| `margin-left` | `margin-inline-start` | هامش أيمن |
| `margin-right` | `margin-inline-end` | هامش أيسر |
| `text-align: left` | `text-align: start` | محاذاة يمين |
| `float: left` | `float: inline-start` | طفو يمين |
| `border-left` | `border-inline-start` | حد أيمن |
| `padding-left` | `padding-inline-start` | حشوة أيمن |

### 2.5 Next.js i18n مع دعم RTL

```typescript
// next.config.ts — إعداد i18n مع RTL
const nextConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar', 'he', 'fr'],
    rtlLocales: ['ar', 'he'],  // locales التي تستخدم RTL
  },
};

// middleware.ts — تحديد الاتجاه
import { NextRequest, NextResponse } from 'next/server';

const RTL_LOCALES = ['ar', 'he', 'fa', 'ur'];

export function middleware(request: NextRequest) {
  const locale = request.cookies.get('NEXT_LOCALE')?.value || 'en';
  const dir = RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr';
  
  const response = NextResponse.next();
  response.cookies.set('text-direction', dir);
  return response;
}

// app/[locale]/layout.tsx — تطبيق الاتجاه
export default function LocaleLayout({ children, params }) {
  const { locale } = params;
  const direction = RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr';
  
  return (
    <html lang={locale} dir={direction}>
      <body>{children}</body>
    </html>
  );
}
```

**أنماط إدارة الترجمة مع RTL:**
- استخدام `next-intl` أو `react-i18next` مع كشوف ترجمة منفصلة لكل لغة
- تخزين اتجاه النص في السياق (Context) للوصول إليه من أي مكون
- استخدام `useLocale()` hook مخصص لإرجاع `{ locale, dir, isRTL }`

### 2.6 Tailwind CSS مع دعم RTL

**الطريقة 1: tailwindcss-rtl (البرنامج المساعد)**
```bash
npm install tailwindcss-rtl
```

```javascript
// tailwind.config.ts
export default {
  content: ['./src/**/*.{ts,tsx}'],
  plugins: [
    require('tailwindcss-rtl'),  // يضيف أدوات rtl: و ltr:
  ],
};
```

```html
<!-- استخدام البادئات rtl: / ltr: -->
<div class="ltr:ml-4 rtl:mr-4 ltr:text-left rtl:text-right">
  محتوى يتكيف مع الاتجاه
</div>

<!-- أو باستخدام الخصائص المن"خصائص المنطقية (أ2أفضل) -->
<div class="ms-4 pe-2 text-start4 text6 start-08 border-s-2")2">
  مح=محتوى يست=2Dوى( يستخدم خصائص منط8)خصائص منطقية
</div>
```

**أدوات Tailwind المنطقية (Logical Utilities):**

| الأداة' الأ* الأداة الفيزيائية | الأداة المنطقية | RTL مكافئ |
|-------------------|----------------|-----------|
/| `ml-4` | `ms-4` | `mr-4@mr6 mrDmr-4` |
| `mr-4` | `me-4` | `ml-4` |
| `pl-4` | `ps-4` | `pr, ps-4'` | `prGpr-4` |
| `pr-4` | `pe-4` | `pl-5pl&pl-4` |
| `text-left`6` | `text-start` | `text-right` |
| `float-left` | `float-start` |B `float-right` |
| `"border& `: border-l` | `border-sEborder-s` | `border-r` |
| `rounded-l` | `rounded-s` | `rounded0rounded-r` |
| `left-4` | `start-4` | `right-4` |
| `right-4` | `end-4` | `left-4` |

**الطريقة 2: CSS Logical Properties أصلاً في Tailwind 3.3+**
- Tailwind 3.3+ يدعم الخصائص المنطقية أصلاً بدون إضافات
- `ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`

### 2.7 مكونات حساسة للاتجاه

**الأيقونات الموجهة (Direction-Aware Icons):**
```tsx
// أيقونة تعكس في RTL
function DirectionalIcon({ icon }: { icon: string }) {
  const { dir } = useDirection();
  return (
    <svg 
      className={dir === 'rtl' ? 'scale-x-[-1]' : ''}
      // ... 
    />
  );
}

// أيقونات تحتاج عكس: الأسهم، القوائم الجانبية، أزرار الرجوع
// أيقونات لا تحتاج عكس: أيقونات متماثلة (دائرة، مربع، حذف)
```

**الجداول (Tables):**
```tsx
// الجداول في RTL: الأعمدة تعكس، المحاذاة تتكيف
<table dir={dir}>
  <thead>
    <tr>
      <th className="text-start">{t('item')}</th>
      <th className="text-end">{t('quantity')}</th>
    </tr>
  </thead>
</table>
```

**النماذج (Forms):**
```tsx
// النماذج: تسميات وحقول إدخال تتكيف تلقائياً مع dir="rtl"
<div>
  <label className="block text-start mb-1">{t('label')}</label>
  <input className="w-full ps-3 border-s border-s-1 rounded-s" />
</div>
```

**الرسوم البيانية (Charts):**
- محور X يعكس في RTL (من اليمين لليسار)
- تسميات المحاور تتبع ا) تسمية اتجاه النص
- Tooltips تظهر بالاتجاه المناسب
- مكتبات مثل Recharts و Chart.js تحتاج تعديل يدوي

---

## 3. إنشاء تقارير PDF/Excel في Next.js |+ PDF, PDF/Excel Report Generation

### 3.1 إنشاء PDF من جانب الخادم (Server-Side PDF Generation)

#### الطريقة 1: Puppeteer + Next.js (الأفضل للتقارير المعقدة)

7&9

```typescript
// lib9 lib2 lib/pdf-generator.ts
import puppeteer from 'puppeteer';

export async function generatePDF(htmlContent: string): Promise<: Promise<Buffer> {
  const browser = await* browserA+ await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '5'--: '--disable-setuid-sandbox'],
  });
  
  const page = await browser.newPage();
  await page" await page.setContent; setContent0% setContent(htmlContent% htmlContent, { waitUntil: 'network2' });
  
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin%: { top2& top: '20mm', bottom: '20mm', left>' left: '15mm', right>'6 right: '15mm' },
    displayHeaderFooter: true,
    headerTemplate: '<div style="font-size:9px;width:100%;text-align:center;margin:0 auto;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
  });
  
  await browser%&: close();
  return Buffer.from(pdf);
}

// app/api/reports/inventory/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generatePDF } from '@/, @/lib2 '@/' '@/lib/pdf-generator';
import { renderToString } from '8 react-dom/server';
import InventoryReport from '@/components/reports/InventoryReport';

export async function GET(request: NextRequest) {
  const data = await fetchInventoryData();
  const html = renderToString(<InventoryReport data2 data={data,%0+6 data} />);
  const pdf = await generatePDF(html);
  
  return new NextResponse2 NextResponse(pdf, {
    headers2& headers: {
%0;      'Content-Type': 'application/pdf',
      'Content-Disposition'' 'attachment; filename="inventory-report.pdf"',
    },
  });
}
```

**المميزات:** دعم CSS كامل، رسوم بيانية، عربي RTL، ترويسة وتذييل
**العيوب:** ثقيل (يحتاج Chromium)، بطيء (~2-5 ثواني لكل تقرير)

#### الطريقة 2: PDFKit (خفيف — للتقارير البسيطة)

```typescript
import PDFDocument from 'pdfkit';

export async function generateInventoryPDF(data: InventoryData): Promise<Buffer> {
  return new Promise((resolve) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const buffers: Buffer[] = [];
    
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    
    doc.fontSize(20).text('Inventory Report', { align: 'center' });
    doc.moveDown();
    
    data.items.forEach((item) => {
      doc.fontSize(10).text(`${item.sku}  ${item.name}  ${item.quantity}`);
    });
    
    doc.end();
  });
}
```

**المميزات:** سريع، خفيف، لا يحتاج متصفح
**العيوب:** دعم محدود لـ RTL/Arabic، لا يدعم CSS، رسم محدود

#### الطريقة 3: React-PDF (مكونات React لـ PDF)

```tsx
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Cairo',
  src: '/fonts/Cairo-Regular.ttf',
});

const styles = StyleSheet.create({
  page: { fontFamily: 'Cairo', direction: 'rtl', padding: 30 },
  title: { fontSize: 20, textAlign: 'center', marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
});

const InventoryDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>تقرير المخزون</Text>
      {data.items.map(item => (
        <View style={styles.row} key={item.id}>
          <Text>{item.sku}</Text>
          <Text>{item.name}</Text>
          <Text>{item.quantity}</Text>
        </View>
      ))}
    </Page>
  </Document>
);
```

**المميزات:** مكونات React، دعم RTL، قابل للتدفق
**العيوب:** لا يدعم كل CSS، أبطأ من PDFKit

#### مقارنة مكتبات PDF

| المكتبة | السرعة | حجم الحزمة | دعم RTL | دعم CSS | التوصية |
|---------|--------|-----------|---------|---------|---------|
| **Puppeteer** | بطيء (2-5s) | ثقيل (Chromium) | كامل | كامل | تقارير معقدة + عربية |
| **PDFKit** | سريع (<0.5s) | خفيف | محدود | لا | تقارير بسيطة إنجليزية |
| **React-PDF** | متوسط | متوسط | جيد | جزئي | تقارير React مع عربية |
| **jsPDF** | متوسط | خفيف | محدود | لا | تقارير سريعة عميل |
| **pdfmake** | متوسط | متوسط | جيد | جزئي | تقارير جدولية مع عربية |

### 3.2 تصدير Excel (Excel Export)

#### الطريقة 1: ExcelJS (الأفضل للتنسيق الغني)

```typescript
import ExcelJS from 'exceljs';

export async function exportInventoryExcel(data: InventoryItem[]): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Inventory');
  
  worksheet.columns = [
    { header: 'SKU', key: 'sku', width: 15 },
    { header: 'Product Name', key: 'name', width: 30 },
    { header: 'Quantity', key: 'quantity', width: 12 },
    { header: 'Location', key: 'location', width: 15 },
    { header: 'Value', key: 'value', width: 15 },
  ];
  
  worksheet.getRow(1).font = { bold: true, size: 12 };
  worksheet.getRow(1).fill = {
    type: 'pattern', pattern: 'solid',
    fgColor: { argb: 'FF4472C4' },
  };
  
  data.forEach(item => worksheet.addRow(item));
  worksheet.getColumn('value').numFmt = '#,##0.00';
  
  const buffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(buffer);
}
```

**المميزات:** تنسيق غني (ألوان، حدود، تنسيق شرطي)، دمج خلايا، صيغ، تدفق للملفات الكبيرة
**العيوب:** أبطأ من SheetJS للبيانات الضخمة

#### الطريقة 2: SheetJS / xlsx (الأسرع)

```typescript
import * as XLSX from 'xlsx';

export function exportToExcel(data: any[], sheetName: string): Buffer {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
}
```

**المميزات:** سريع جداً، يدعم 20+ صيغة، 7.8M تحميلات أسبوعية
**العيوب:** تنسيق محدود، لا يدعم الصيغ بسهولة

#### مقارنة مكتبات Excel

| المكتبة | السرعة | التنسيق | التدفق | الصيغ المدعومة | التوصية |
|---------|--------|---------|--------|---------------|---------|
| **ExcelJS** | متوسط | غني جداً | نعم | xlsx فقط | تقارير مهنية منسقة |
| **SheetJS** | سريع | محدود | نعم (Pro) | 20+ صيغة | تصدير بيانات سريع |
| **node-xlsx** | سريع | محدود | لا | xlsx, csv | مهام بسيطة |

### 3.3 قوالب تقارير WMS

| نوع التقرير | PDF | Excel | المحتوى |
|------------|-----|-------|---------|
| **تقرير المخزون** | Puppeteer | ExcelJS | SKU, الكمية, الموقع, القيمة, الحالة |
| **سجل الحركة** | Puppeteer | ExcelJS | نوع الحركة, من/إلى, الكمية, التاريخ, المستخدم |
| **تقرير الجرد** | React-PDF | ExcelJS | مخزون نظامي vs فعلي, الفروقات, التعديلات |
| **وثائق جمركية** | Puppeteer | — | بيان جمركي, قائمة تعبئة, فاتورة تجارية, شهادة منشأ |
| **تقرير الأداء** | Puppeteer | ExcelJS | معدل التحضير, دقة الانتقاء, وقت الدورة |
| **تقرير البضائع الخطرة** | Puppeteer | — | تصنيف IMDG, التخزين, الفصل, وثائق الشحن |
| **فواتير التخزين** | Puppeteer | ExcelJS | رسوم التخزين, الرسوم, الضرائب, الإجمالي |

---

## 4. نظام الفواتير في WMS | Invoice System in WMS

### 4.1 أنواع الفواتير في أنظمة المستودعات المهنية

#### أ. فاتورة التخزين (Storage Invoice)

```
┌─────────────────────────────────────────────┐
│           فاتورة رسوم التخزين               │
├─────────────────────────────────────────────┤
│ العميل: شركة النور للتجارة                 │
│ الفترة: 01/03/2026 - 31/03/2026             │
├─────────────────────────────────────────────┤
│ البند          │ الوحدة │ السعر  │ المبلغ    │
│ تخزين عام     │ م2/يوم │ 0.50   │ 4,650    │
│ تخزين مبرد    │ م2/يوم │ 2.00   │ 8,400    │
│ تخزين خطير    │ م2/يوم │ 3.50   │ 2,100    │
│ رسوم ديموراج  │ يوم    │ 75.00  │ 2,250    │
│ تأمين تخزين   │ %0.5   │ —      │ 87.00    │
├─────────────────────────────────────────────┤
│ الإجمالي قبل الضريبة      │ 17,487.00     │
│ ضريبة القيمة المضافة 15%   │ 2,623.05     │
│ الإجمالي بعد الضريبة       │ 20,110.05    │
└─────────────────────────────────────────────┘
```

**مكونات رسوم التخزين:**
- **رسوم التخزين الأساسية**: حساب بالمساحة (م2) أو بالوحدة (بالة، كراتين) أو بالوزن
- **الديموراج (Demurrage)**: رسوم تأخير في الميناء/المستودع بعد انتهاء فترة السماح (Free Time). عادة $75-200/يوم للحاوية
- **رسوم التوقيف (Detention)**: رسوم تأخير إرجاع الحاوية الفارغة
- **تصاعد الأسعار**: رسوم تزداد تدريجياً بعد فترة السماح (Free Days)
- **تأمين التخزين**: نسبة من قيمة البضاعة المخزنة

#### ب. رسوم التداول (Handling Charges)

| نوع الرسوم | الوصف | طريقة الحساب |
|-----------|-------|-------------|
| **رسوم الرفع (Lift)** | رفع البضاعة داخل/خارج المستودع | بالطن أو بالوحدة |
| **رسوم النقل (Move)** | نقل بين المواقع داخل المستودع | بالحركة |
| **رسوم التحضير (Pick)** | تحضير طلبات العملاء | بالسطر أو بالوحدة |
| **رسوم التفتيش (Inspect)** | فحص البضاعة الواردة | بالفحص |
| **رسوم إعادة التعبئة** | تغيير التعبئة أو التغليف | بالوحدة |
| **رسوم التمييز (VAS)** | خدمات القيمة المضافة (تسمية، تجميع) | بالخدمة |
| **رسوم التفريغ/التحميل** | عمليات الرصيف (Inbound/Outbound) | بالوحدة أو بالطن |

#### ج. رسوم التخليص الجمركي (Customs Clearance Fees)

| البند | الوصف |
|-------|-------|
| **رسوم الإقرار الجمركي** | إعداد وتقديم الإقرار الجمركي |
| **رسوم الفحص الجمركي** | حضور الفحص المادي |
| **رسوم المعالجة** | معالجة البيانات والتوثيق |
| **رسوم التخليص العاجل** | خدمة التخليص السريع |
| **رسوم الاستشارة** | استشارة جمركية/قانونية |
| **غرامات الجمارك** | أي غرامات أو عقوبات جمركية |
| **رسوم الوكيل** | عمولة وكيل التخليص |

#### د. فاتورة النقل والشحن (Transport/Freight Invoice)

- رسوم النقل البري (FTL, LTL)
- رسوم الشحن البحري (FCL, LCL)
- رسوم الشحن الجوي
- رسوم النقل المتعدد الوسائط (Multimodal)
- رسوم الوقود (Fuel Surcharge)
- رسوم الأمن (Security Surcharge)
- رسوم تغيير الوجهة (Diversion Fee)

#### ه. فاتورة تأجير المعدات (Equipment Rental)

| المعدات | طريقة الحساب |
|---------|-------------|
| رافعات شوكية (Forklifts) | بالساعة/اليوم |
| رافعات (Reach) | بالساعة |
| منصة متحركة (Scissor Lift) | بالساعة/اليوم |
| سقالات وتركيب (Racking) | بالشهر/المتر |
| أجهزة قياس/وزن | بالاستخدام أو باليوم |
| حاويات خاصة (Reefer, Open Top) | باليوم |

### 4.2 إشعارات الدائن والتعديلات (Credit Notes and Adjustments)

```
┌─────────────────────────────────────────────┐
│           إشعار دائن (Credit Note)          │
│           رقم: CN-2026-0042                 │
│           مرجع فاتورة: INV-2026-0198        │
├─────────────────────────────────────────────┤
│ سبب الإشعار:                                │
│ 1. خطأ في حساب رسوم التخزين (تصحيح)        │
│ 2. إرجاع بضاعة تالفة                        │
│ 3. خصم تعاقدي لم يطبق                     │
│ 4. تعديل بعد اعتراض العميل                  │
├─────────────────────────────────────────────┤
│ المبلغ: -3,450.00                           │
│ ضريبة القيمة المضافة 15%: -517.50          │
│ إجمالي الإشعار الدائن: -3,967.50           │
└─────────────────────────────────────────────┘
```

**أنواع التعديلات:**
- إشعار دائن (Credit Note): تقليل المبلغ المستحق
- إشعار مدين (Debit Note): زيادة المبلغ المستحق
- تصحيح خطأ (Error Correction)
- تعديل تعاقدي (Contractual Adjustment)
- خصم سريع (Early Payment Discount)
- خصم حجمي (Volume Discount)

### 4.3 معايير ترقيم الفواتير (Invoice Numbering Standards)

**البنية الموصى بها:**
```
INV-{السنة}-{التسلسل}
INV-2026-000001

أو أكثر تفصيلاً:
INV-{الفرع}-{النوع}-{السنة}-{الشهر}-{التسلسل}
INV-KWI-STR-2026-03-000001

حيث:
  INV  = فاتورة (Invoice)
  KWI  = فرع الكويت (Branch Code)
  STR  = تخزين (Storage Type)
  2026 = السنة
  03   = الشهر
  000001 = رقم تسلسلي (6 أرقام على الأقل)
```

**أنواع الفواتير بالرموز:**

| الرمز | النوع |
|-------|-------|
| INV | فاتورة ضريبية (Tax Invoice) |
| PRO | فاتورة مبدئية (Proforma Invoice) |
| CN | إشعار دائن (Credit Note) |
| DN | إشعار مدين (Debit Note) |
| STO | فاتورة تخزين (Storage Invoice) |
| H0ND | فاتورة تداول (Handling Invoice) |
| CUS | فاتورة تخليص جمركي |
| TRN | فاتورة نقل (Transport Invoice) |
| EQP | فاتورة معدات (Equipment Invoice) |

**قواعد مهمة:**
- الرقم التسلسلي لا يتكرر أبداً (حتى عند الحذف)
- الفجوات في التسلسل مسموحة (للفواتير الملغاة)
- كل فاتورة تحتوي: رقم فريد، تاريخ إصدار، تاريخ استحقاق
- التوافق مع متطلبات هيئة الزكاة والضريبة (السعودية) و VAT MOSS (EU)

### 4.4 شروط الدفع وشيوخ الحساب (Payment Terms and Aging)

**شروط الدفع الشائعة في WMS:**

| الرمز | الوصف | الأيام |
|-------|-------|--------|
| Net 30 | الدفع خلال 30 يوم | 30 |
| Net 60 | الدفع خلال 60 يوم | 60 |
| Net 90 | الدفع خلال 90 يوم | 90 |
| 2/10 Net 30 | خصم 2% إذا الدفع خلال 10 أيام، وإلا 30 يوم | 10/30 |
| COD | الدفع عند التسليم | 0 |
| EOM | الدفع نهاية الشهر | ~30 |
| MFI | الدفع الشهر من إصدار الفاتورة | 30 |

**تقرير شيوخ الحساب (Aging Report):**

```
┌──────────┬──────────┬──────────┬──────────┬──────────┬──────────┐
│ العميل   │ حالي     │ 1-30 يوم │ 31-60 يوم│ 61-90 يوم│ +90 يوم  │
├──────────┼──────────┼──────────┼──────────┼──────────┼──────────┤
│ شركة النور│ 12,500   │ 8,300    │ 3,200    │ —        │ —        │
│ مؤسسة الفج│ 5,000    │ —        │ 7,800    │ 4,500    │ 2,100    │
│ مجموعة الق│ 22,000   │ 15,600   │ —        │ —        │ 8,900    │
├──────────┼──────────┼──────────┼──────────┼──────────┼──────────┤
│ الإجمالي │ 39,500   │ 23,900   │ 11,000   │ 4,500    │ 11,000   │
└──────────┴──────────┴──────────┴──────────┴──────────┴──────────┘
```

---

## 5. مشاريع WMS مفتوحة المصدر مشابهة | Similar Open-Source WMS Projects

### 5.1 جدول المقارنة الشاملة

| الميزة | OpenBoxes | InvenTree | PartKeepr | Snipe-IT | Odoo WMS | ERPNext | Shuup | Saleor |
|--------|-----------|-----------|-----------|----------|----------|---------|-------|--------|
| **اللغة** | Groovy/Grails | Python/Django | PHP/Symfony | PHP/Laravel | Python | Python | Python | Python/GraphQL |
| **الترخيص** | Eclipse 1.0 | MIT | GPL3 | AGPL3 | LGPL3 | GPL3 | BSD | BSD |
| **إدارة المخزون** | ●●●● | ●●●● | ●●● | ●● | ●●●●● | ●●●● | ●●●● | ●●● |
| **تتبع الدفعات** | ●●●● | ●●● | ●● | ○ | ●●● | ●●● | ●● | ●● |
| **تتبع انتهاء الصلاحية** | ●●●● | ●● | ●● | ○ | ●●● | ●●● | ● | ● |
| **أماكن متعددة** | ●●● | ●●● | ●● | ●● | ●●●● | ●●● | ●●● | ●● |
| **باركود/RFID** | ●●● | ●●● | ●●● | ●●● | ●●● | ●●● | ●● | ●● |
| **نظام الفواتير** | ●● | ●● | ○ | ○ | ●●●●● | ●●●● | ●●● | ●●● |
| **RTL/عربي** | ● | ○ | ○ | ○ | ●●● | ●●● | ● | ●● |
| **API** | ●●● | ●●●● | ●● | ●●● | ●●●● | ●●●● | ●●●● | ●●●● |
| **واجهة حديثة** | ●● | ●●●● | ●● | ●● | ●●● | ●● | ●●●● | ●●●● |
| **3PL/متعدد العملاء** | ●●● | ○ | ○ | ○ | ●●●● | ●●● | ●● | ● |

●●●●● = ممتاز | ●●●● = جيد جداً | ●●● = جيد | ●● = محدود | ● = ضعيف | ○ = غير موجود

### 5.2 تفصيل المشاريع

#### OpenBoxes
- **المجال**: الرعاية الصح+الرعاية الصحية، المستودعات، التوزيع
- **المميزات الرئيسية**:
  - تتبع الشحنات والدفاعات (Lot tracking) بتفصيل كامل
  - إدارة تاريخ انتهاء الصلاحية مع تنبيهات
  - توقعات الطلب وتخطيط الاحتياجات (Demand Forecasting)
  - دعم مواقع متعددة ومستودعات متعددة
  - تقارير مخصصة لمتطلبات الصحة (FDA, PEPFAR)
  - سير عمل (Workflow) لعمليات الاستلام والشحن
- **التعلم منه**: نظام تتبع الدفعات المتقدم، التكامل مع أنظمة ERP عبر API

#### InvenTree
- **المجال**: إدارة قطع التصنيع والمكونات الإلكترونية
- **المميزات الرئيسية**:
  - إدارة هرمية للفئات (BOM support)
  - نظام طلبات شراء مدمج (Purchase Orders)
  - واجهة API قوية (REST API مع Django REST Framework)
  - دعم باركود ورموز QR
  - إضافة مكونات مخصصة (Plugin system)
  - واجهة حديثة (React-based frontend)
- **التعلم منه**: تصميم API ممتاز، نظام الإضافات، واجهة React

#### PartKeepr
- **المجال**: مكونات إلكترونية
- **المميزات**:
  - إدارة وحدات القياس والتحويل بينها
  - تتبع مستوى المخزون مع تنبيهات إعادة الطلب
  - دعم خلاصات البيانات (Digi-Key, Mouser integration)
- **التعلم منه**: تكامل مع موردي المكونات

#### Snipe-IT
- **التخصص**: إدارة أصول ت (IT Asset Management)
- **التعلم منه**: نظام الترخيص والصيانة للأصول, QR tags

#### Odoo WMS
- **الأكثر شمولية** بين المشاريع مفتوحة المصدر
- **المميزات**:
  - قواعد إعادة التموين التلقائية (Replenishment Rules)
  - مسارات التداول (Putaway, Removal Strategies)
  - نظام باركود متكامل مع تطبيق جوال
  - عمليات الدفع والاستلام (Dock Operations)
  - التخطيط التجميعي (Cluster Picking, Wave Picking)
  - التكامل الكامل مع المحاسبة والمشتريات والمبيعات
  - دعم RTL والعربية
  - نظام 3PL متعدد العملاء
- **التعلم منه**: شمولية التكامل بين الوحدات، استراتيجيات التحضير المتقدمة

#### ERPNext
- **الوصف**: نظام ERP كامل مفتوح المصدر
- **المميزات**:
  - وحدة مستودعات متكاملة مع المحاسبة
  - تتبع الرقم التسلسلي والدفعة
  - جرد دوري وتعديلات
  - دعم RTL والعربية
  - نظام فواتير كامل
  - Frappe Framework: إطار عمل قوي للتخصيص
- **التعلم منه**: إطار Frappe، نظام DocType، التكامل السلس بين الوحدات

#### Shuup
- **المجال**: التجارة الإلكترونية متعددة البائعين (Multi-vendor)
- **التعلم منه**: بنية متعددة البائعين، نظام طلبات متقدم

#### Saleor
- **المجال**: التجارة الإلكترونية GraphQL
- **المميزات**:
  - API مفتوح GraphQL (نقي)
  - واجهة Dashboard حديثة
  - دعم RTL
- **التعلم منه**: بنية GraphQL، واجهة Dashboard، معالجة الدفع

### 5.3 الميزات الجديرة بالتبني من المشاريع مفتوحة المصدر

| الميزة | المصدر | الأولوية |
|--------|--------|---------|
| **نظام تتبع الدفعات المتقدم** | OpenBoxes | عالية |
| **تنبيهات انتهاء الصلاحية** | OpenBoxes | عالية |
| **API موحد بمعيار OpenAPI** | InvenTree, Saleor | عالية |
| **استراتيجيات تحضير متقدمة** | Odoo | عالية |
| **نظام إضافات/Plugin** | InvenTree, Odoo | متوسطة |
| **تكامل مع أنظمة المحاسبة** | Odoo, ERPNext | عالية |
| **نظام 3PL/متعدد العملاء** | Odoo | عالية |
| **واجهة إدارة حديثة (React)** | InvenTree, Saleor | عالية |
| **تطبيق جوال للباركود** | Odoo | متوسطة |
| **نظام إشعارات ووركفلو** | OpenBoxes, ERPNext | متوسطة |
| **معايير GS1/RFID** | Odoo | عالية |
| **نظام فواتير شامل** | Odoo, ERPNext | عالية |
| **GraphQL API** | Saleor | منخفضة |

---

## ملخص التوصيات | Executive Recommendations

### الأولويات العليا للتنفيذ:

1. **المعايير الدولية**: بدء بموافقة GS1 (GTIN, SSCC, GS1-128) كأولوية قصوى — هذه المعايير أساسية لأي نظام WMS عالمي
2. **دعم RTL/العربية**: استخدام CSS Logical Properties مع Tailwind 3.3+ كنهج أساسي، مع `dir="rtl"` على مستوى `<html>`، و Next.js i18n
3. **تقارير PDF**: Puppeteer للتقارير المهنية مع دعم عربي كامل، ExcelJS لملفات Excel منسقة
4. **نظام الفواتير**: بناء نظام فواتير مرن يشمل: تخزين، تداول، تخليص، نقل، إشعارات دائن/مدين، مع ترقيم تسلسلي صارم
5. **التعلم من المصادر المفتوحة**: التركيز على API موحد (OpenAPI/REST)، نظام إضافات، تتبع الدفعات، واستراتيجيات تحضير متقدمة من Odoo و InvenTree

---

*تم إعداد هذا التقرير بناءً على بحث شامل للمصادر الدولية والمعايير الرسمية*
*Report compiled from comprehensive research of international sources and official standards*
