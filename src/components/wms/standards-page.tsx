'use client';

import { useState, useMemo } from 'react';
import { Barcode, AlertTriangle, ShieldCheck, Landmark, RefreshCw, Check, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  IMDG_CLASSES, ISO28000_REQUIREMENTS, ISO9001_PRINCIPLES, GS1_APPLICATION_IDENTIFIERS,
  encodeGS1_128, generateSSCC, calculateMod10CheckDigit,
} from '@/lib/standards';
import { useTranslation } from '@/hooks/use-translation';

// ─── Tab 1: GS1 Barcoding ─────────────────────────────────────────────────

function GS1BarcodingTab() {
  const { t } = useTranslation();
  const [sscc, setSscc] = useState<string>('');

  const aiEntries = useMemo(
    () => Object.entries(GS1_APPLICATION_IDENTIFIERS).map(([ai, data]) => ({ ai, ...data })),
    []
  );

  const gs1_128_example = useMemo(
    () => encodeGS1_128([
      { ai: '01', value: '06291234567890' },
      { ai: '17', value: '251231' },
      { ai: '10', value: 'BATCH2025A' },
    ]),
    []
  );

  const generateNewSSCC = () => setSscc(generateSSCC('62912345', 0));

  return (
    <div className="space-y-4">
      {/* UAE Country Code */}
      <Card className="border-slate-800 bg-slate-900/50">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm text-slate-200">
            <Barcode className="h-4 w-4 text-amber-400" /> GS1 UAE — Country Prefix
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-mono font-bold text-amber-400">629</span>
            <div>
              <p className="text-sm text-slate-300">UAE GS1 Country Code</p>
              <p className="text-xs text-slate-500" dir="rtl">رمز دولة الإمارات GS1</p>
            </div>
            <Badge variant="outline" className="ml-auto text-[10px] border-emerald-500/30 text-emerald-400">Active Member</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Application Identifiers Table */}
      <Card className="border-slate-800 bg-slate-900/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-slate-200">Application Identifiers (AI)</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-[320px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-800 hover:bg-transparent">
                  <TableHead className="text-xs text-slate-500 w-16">AI</TableHead>
                  <TableHead className="text-xs text-slate-500">Name</TableHead>
                  <TableHead className="text-xs text-slate-500 w-16">Length</TableHead>
                  <TableHead className="text-xs text-slate-500">Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {aiEntries.map((e) => (
                  <TableRow key={e.ai} className="border-slate-800 hover:bg-slate-800/50">
                    <TableCell className="py-2 text-xs font-mono font-medium text-amber-400/80">({e.ai})</TableCell>
                    <TableCell className="py-2 text-xs text-slate-300">{e.name}</TableCell>
                    <TableCell className="py-2 text-xs text-slate-400">{e.length}</TableCell>
                    <TableCell className="py-2 text-xs text-slate-400">{e.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* GS1-128 Encoding Example */}
      <Card className="border-slate-800 bg-slate-900/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-slate-200">GS1-128 Barcode Encoding</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1 text-xs text-slate-400">
            <p><span className="text-amber-400/70 font-mono">(01)</span> GTIN: 06291234567890</p>
            <p><span className="text-amber-400/70 font-mono">(17)</span> Expiry: 251231</p>
            <p><span className="text-amber-400/70 font-mono">(10)</span> Batch: BATCH2025A</p>
          </div>
          <Separator className="bg-slate-800" />
          <div className="font-mono text-sm text-emerald-400 break-all bg-slate-800/60 rounded px-3 py-2">
            {gs1_128_example}
          </div>
          <p className="text-[10px] text-slate-500">Concatenated AI + value pairs for GS1-128 linear barcode</p>
        </CardContent>
      </Card>

      {/* SSCC Generation */}
      <Card className="border-slate-800 bg-slate-900/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-slate-200">SSCC — Serial Shipping Container Code</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-xs text-slate-400">18-digit code: Extension Digit + Company Prefix + Serial Ref + Check Digit</p>
          <div className="flex items-center gap-3">
            <Button size="sm" variant="outline" onClick={generateNewSSCC}
              className="gap-1.5 border-slate-700 text-slate-300 hover:bg-slate-800">
              <RefreshCw className="h-3.5 w-3.5" /> Generate SSCC
            </Button>
            {sscc && (
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm text-amber-400 tracking-wider">{sscc}</span>
                <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-400">
                  Check: {calculateMod10CheckDigit(sscc.slice(0, -1))}
                </Badge>
              </div>
            )}
          </div>
          {sscc && (
            <div className="text-[10px] text-slate-500 font-mono flex gap-1">
              <span className="text-amber-400/60">{sscc[0]}</span>
              <span className="text-slate-500">|</span>
              <span className="text-cyan-400/60">{sscc.slice(1, 9)}</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">{sscc.slice(9, 17)}</span>
              <span className="text-slate-500">|</span>
              <span className="text-emerald-400/60">{sscc[17]}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Tab 2: IMDG Dangerous Goods ──────────────────────────────────────────

const CLASS_COLORS: Record<number, { bg: string; border: string; text: string }> = {
  1: { bg: 'bg-red-500/15', border: 'border-red-500/30', text: 'text-red-400' },
  2: { bg: 'bg-orange-500/15', border: 'border-orange-500/30', text: 'text-orange-400' },
  3: { bg: 'bg-red-500/15', border: 'border-red-500/30', text: 'text-red-400' },
  4: { bg: 'bg-red-500/15', border: 'border-red-500/30', text: 'text-red-400' },
  5: { bg: 'bg-yellow-500/15', border: 'border-yellow-500/30', text: 'text-yellow-400' },
  6: { bg: 'bg-white/10', border: 'border-white/20', text: 'text-slate-200' },
  7: { bg: 'bg-yellow-500/15', border: 'border-yellow-500/30', text: 'text-yellow-400' },
  8: { bg: 'bg-white/10', border: 'border-white/20', text: 'text-slate-200' },
  9: { bg: 'bg-gradient-to-br from-slate-800 to-slate-700', border: 'border-slate-500/30', text: 'text-slate-300' },
};

function IMDGTab() {
  return (
    <div className="space-y-4">
      {/* 9 Hazard Classes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {IMDG_CLASSES.map((cls) => {
          const c = CLASS_COLORS[cls.class];
          return (
            <Card key={cls.class} className={`border ${c.border} ${c.bg} hover:brightness-110 transition-all`}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{cls.symbol}</span>
                    <div>
                      <CardTitle className={`text-sm font-semibold ${c.text}`}>
                        Class {cls.class}: {cls.name}
                      </CardTitle>
                      <p className="text-xs text-slate-500 mt-0.5" dir="rtl">{cls.nameAr}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={`text-[10px] ${c.border} ${c.text}`}>Class {cls.class}</Badge>
                </div>
              </CardHeader>
              {cls.subclasses && (
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-1.5">
                    {cls.subclasses.map((sub) => (
                      <Badge key={sub.code} variant="outline" className={`text-[10px] ${c.border} ${c.text}`}>
                        {sub.code} — {sub.name}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {cls.subclasses.map((sub) => (
                      <span key={sub.code} className="text-[10px] text-slate-500" dir="rtl">{sub.nameAr}</span>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* Segregation Summary */}
      <Card className="border-slate-800 bg-slate-900/50">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm text-slate-200">
            <AlertTriangle className="h-4 w-4 text-amber-400" /> Segregation Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-amber-500/40" />
              <span className="text-slate-300">AWAY — Separate by at least 3m vertically</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-orange-500/40" />
              <span className="text-slate-300">SEGREGATE — Separate by at least 12m</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-red-500/40" />
              <span className="text-slate-300">ISOLATE — Separate by intervening cargo</span>
            </div>
          </div>
          <Separator className="bg-slate-800 my-3" />
          <div className="text-xs text-slate-500 space-y-1">
            <p>Key restrictions: Class 1 away from all other classes · Class 7 isolated from 2.1, 3, 5.1 · Class 6.2 isolated from 2.1, 3, 4.1, 5.1, 8</p>
            <p dir="rtl" className="text-slate-600">قيود الفصل: الصنف 1 بعيد عن جميع الأصناف الأخرى · الصنف 7 معزول</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Tab 3: ISO Standards ─────────────────────────────────────────────────

const ISO15489_REQUIREMENTS = [
  { id: 'R1', name: 'Records Policy', nameAr: 'سياسة السجلات', description: 'Documented records management policy' },
  { id: 'R2', name: 'Records Capture', nameAr: 'التقاط السجلات', description: 'Systematic capture of records' },
  { id: 'R3', name: 'Classification', nameAr: 'التصنيف', description: 'Classification and indexing system' },
  { id: 'R4', name: 'Access Control', nameAr: 'التحكم بالوصول', description: 'Access and security controls' },
  { id: 'R5', name: 'Retention', nameAr: 'الاحتفاظ', description: 'Retention and disposal schedules' },
  { id: 'R6', name: 'Storage', nameAr: 'التخزين', description: 'Physical and digital storage standards' },
  { id: 'R7', name: 'Migration', nameAr: 'الترحيل', description: 'Migration and format conversion' },
];

function ISOStandardsTab() {
  // ISO 28000 compliance toggles
  const [sc28000, setSc28000] = useState<Record<string, boolean>>(
    () => Object.fromEntries(ISO28000_REQUIREMENTS.map((r) => [r.id, false]))
  );

  const passCount28000 = Object.values(sc28000).filter(Boolean).length;
  const total28000 = ISO28000_REQUIREMENTS.length;
  const score28000 = Math.round((passCount28000 / total28000) * 100);

  const toggle28000 = (id: string) => setSc28000((prev) => ({ ...prev, [id]: !prev[id] }));

  // ISO 15489 compliance
  const [sc15489, setSc15489] = useState<Record<string, boolean>>(
    () => Object.fromEntries(ISO15489_REQUIREMENTS.map((r) => [r.id, false]))
  );
  const passCount15489 = Object.values(sc15489).filter(Boolean).length;
  const total15489 = ISO15489_REQUIREMENTS.length;
  const score15489 = Math.round((passCount15489 / total15489) * 100);
  const toggle15489 = (id: string) => setSc15489((prev) => ({ ...prev, [id]: !prev[id] }));

  const overallScore = Math.round(((passCount28000 + passCount15489) / (total28000 + total15489)) * 100);

  return (
    <div className="space-y-4">
      {/* Compliance Score */}
      <Card className="border-slate-800 bg-slate-900/50">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-amber-400" />
              <div>
                <p className="text-sm font-medium text-slate-200">Overall Compliance Score</p>
                <p className="text-xs text-slate-500">ISO 28000 + ISO 15489 combined</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-bold font-mono ${overallScore >= 80 ? 'text-emerald-400' : overallScore >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
                {overallScore}%
              </span>
              <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${overallScore >= 80 ? 'bg-emerald-500' : overallScore >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                  style={{ width: `${overallScore}%` }} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ISO 28000 */}
      <Card className="border-slate-800 bg-slate-900/50">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm text-slate-200">ISO 28000 — Supply Chain Security</CardTitle>
            <Badge variant="outline" className={`text-[10px] ${score28000 >= 80 ? 'border-emerald-500/30 text-emerald-400' : score28000 >= 50 ? 'border-amber-500/30 text-amber-400' : 'border-red-500/30 text-red-400'}`}>
              {score28000}% ({passCount28000}/{total28000})
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {ISO28000_REQUIREMENTS.map((req) => (
            <div key={req.id} className="flex items-center gap-3 p-2 rounded-md bg-slate-800/40 hover:bg-slate-800/60 transition-colors">
              <button onClick={() => toggle28000(req.id)}
                className={`w-6 h-6 rounded flex items-center justify-center border transition-all ${sc28000[req.id] ? 'bg-emerald-500/20 border-emerald-500/40' : 'bg-slate-800 border-slate-700'}`}>
                {sc28000[req.id] ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <X className="h-3.5 w-3.5 text-slate-600" />}
              </button>
              <div className="flex-1">
                <p className="text-xs text-slate-300">{req.name}</p>
                <p className="text-[10px] text-slate-500" dir="rtl">{req.nameAr}</p>
              </div>
              <p className="text-[10px] text-slate-500 hidden sm:block">{req.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ISO 9001 */}
      <Card className="border-slate-800 bg-slate-900/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-slate-200">ISO 9001 — Quality Management Principles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ISO9001_PRINCIPLES.map((p, i) => (
              <div key={p.id} className="flex items-center gap-2 p-2 rounded-md bg-slate-800/40">
                <span className="text-lg font-mono font-bold text-amber-400/60 w-6 text-center">{i + 1}</span>
                <div>
                  <p className="text-xs text-slate-300">{p.name}</p>
                  <p className="text-[10px] text-slate-500" dir="rtl">{p.nameAr}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ISO 15489 */}
      <Card className="border-slate-800 bg-slate-900/50">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm text-slate-200">ISO 15489 — Records Management</CardTitle>
            <Badge variant="outline" className={`text-[10px] ${score15489 >= 80 ? 'border-emerald-500/30 text-emerald-400' : score15489 >= 50 ? 'border-amber-500/30 text-amber-400' : 'border-red-500/30 text-red-400'}`}>
              {score15489}% ({passCount15489}/{total15489})
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {ISO15489_REQUIREMENTS.map((req) => (
            <div key={req.id} className="flex items-center gap-3 p-2 rounded-md bg-slate-800/40 hover:bg-slate-800/60 transition-colors">
              <button onClick={() => toggle15489(req.id)}
                className={`w-6 h-6 rounded flex items-center justify-center border transition-all ${sc15489[req.id] ? 'bg-emerald-500/20 border-emerald-500/40' : 'bg-slate-800 border-slate-700'}`}>
                {sc15489[req.id] ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <X className="h-3.5 w-3.5 text-slate-600" />}
              </button>
              <div className="flex-1">
                <p className="text-xs text-slate-300">{req.name}</p>
                <p className="text-[10px] text-slate-500" dir="rtl">{req.nameAr}</p>
              </div>
              <p className="text-[10px] text-slate-500 hidden sm:block">{req.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Tab 4: UAE Regulations ───────────────────────────────────────────────

const UAE_EMIRATES = [
  { name: 'Abu Dhabi', nameAr: 'أبوظبي', code: 'AUH' },
  { name: 'Dubai', nameAr: 'دبي', code: 'DXB' },
  { name: 'Sharjah', nameAr: 'الشارقة', code: 'SHJ' },
  { name: 'Ajman', nameAr: 'عجمان', code: 'AJM' },
  { name: 'Umm Al Quwain', nameAr: 'أم القيوين', code: 'UAQ' },
  { name: 'Ras Al Khaimah', nameAr: 'رأس الخيمة', code: 'RAK' },
  // Fujairah is the 7th emirate but user requested 6
];

function UAERegulationsTab() {
  return (
    <div className="space-y-4">
      {/* UAE VAT */}
      <Card className="border-slate-800 bg-slate-900/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-slate-200">UAE Value Added Tax (VAT)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-mono font-bold text-amber-400">5%</span>
            <div>
              <p className="text-sm text-slate-300">Standard VAT Rate (Federal Decree-Law No. 8/2017)</p>
              <p className="text-xs text-slate-500" dir="rtl">معدل الضريبة على القيمة المضافة — 5%</p>
            </div>
          </div>
          <Separator className="bg-slate-800" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Registration Threshold</p>
              <p className="text-slate-300">AED 375,000 mandatory / AED 187,500 voluntary</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Tax Authority</p>
              <p className="text-slate-300">Federal Tax Authority (FTA)</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Zero-Rated</p>
              <p className="text-slate-300">Export of goods, international transport</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Exempt</p>
              <p className="text-slate-300">Residential rent, local passenger transport</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* UAE Customs */}
      <Card className="border-slate-800 bg-slate-900/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-slate-200">UAE Customs Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-2 rounded bg-slate-800/40">
              <p className="text-[10px] uppercase tracking-wider text-amber-500/70 font-semibold mb-1">Common Customs Declaration</p>
              <p className="text-slate-300">Unified Customs Declaration via UAE Customs system</p>
            </div>
            <div className="p-2 rounded bg-slate-800/40">
              <p className="text-[10px] uppercase tracking-wider text-amber-500/70 font-semibold mb-1">Import Duties</p>
              <p className="text-slate-300">5% of CIF value for most goods</p>
            </div>
            <div className="p-2 rounded bg-slate-800/40">
              <p className="text-[10px] uppercase tracking-wider text-amber-500/70 font-semibold mb-1">Free Zones</p>
              <p className="text-slate-300">Duty-free within free zone; 5% on mainland transfer</p>
            </div>
            <div className="p-2 rounded bg-slate-800/40">
              <p className="text-[10px] uppercase tracking-wider text-amber-500/70 font-semibold mb-1">Restricted Goods</p>
              <p className="text-slate-300">Prior approval for chemicals, pharmaceuticals, telecom</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emirates Maritime */}
      <Card className="border-slate-800 bg-slate-900/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-slate-200">Emirates Maritime Regulations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1.5 text-xs text-slate-400">
            <p className="flex items-center gap-2"><span className="text-amber-500">•</span> Federal Law No. 24/1999 — Protection of Marine Environment</p>
            <p className="flex items-center gap-2"><span className="text-amber-500">•</span> UAE Maritime Authority — vessel registration & safety</p>
            <p className="flex items-center gap-2"><span className="text-amber-500">•</span> Port State Control — Tokyo MOU compliance</p>
            <p className="flex items-center gap-2"><span className="text-amber-500">•</span> ISPS Code — port facility security plans required</p>
          </div>
          <Separator className="bg-slate-800" />
          <p className="text-[10px] text-slate-500" dir="rtl">القانون الاتحادي رقم 24 لسنة 1999 — حماية البيئة البحرية</p>
        </CardContent>
      </Card>

      {/* DCSA Shipping Standards */}
      <Card className="border-slate-800 bg-slate-900/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-slate-200">DCSA Shipping Standards</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-[10px] border-cyan-500/30 text-cyan-400">DCSA eBL</Badge>
            <Badge variant="outline" className="text-[10px] border-cyan-500/30 text-cyan-400">DCSA Booking</Badge>
            <Badge variant="outline" className="text-[10px] border-cyan-500/30 text-cyan-400">DCSA Instruction</Badge>
            <Badge variant="outline" className="text-[10px] border-cyan-500/30 text-cyan-400">DCSA Event</Badge>
            <Badge variant="outline" className="text-[10px] border-cyan-500/30 text-cyan-400">DCSA Issuance</Badge>
          </div>
          <p className="text-xs text-slate-400">Digital Container Shipping Association — open standards for container shipping digitization. Aligns with UAE ports modernization.</p>
        </CardContent>
      </Card>

      {/* Branch Information */}
      <Card className="border-slate-800 bg-slate-900/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-slate-200">Branch Information — 6 Emirates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {UAE_EMIRATES.map((em) => (
              <div key={em.code} className="flex flex-col items-center p-3 rounded-md bg-slate-800/40 hover:bg-slate-800/60 transition-colors">
                <span className="text-sm font-mono font-bold text-amber-400">{em.code}</span>
                <span className="text-xs text-slate-300 mt-1">{em.name}</span>
                <span className="text-[10px] text-slate-500 mt-0.5" dir="rtl">{em.nameAr}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────

export function StandardsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-100 dark:text-slate-100">
          {t('header.standards')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          GS1 barcoding, IMDG dangerous goods, ISO compliance & UAE regulations
        </p>
      </div>
      <Tabs defaultValue="gs1">
        <TabsList className="bg-slate-900/80 border border-slate-800">
          <TabsTrigger value="gs1" className="gap-1.5 text-xs data-[state=active]:bg-slate-800 data-[state=active]:text-amber-400">
            <Barcode className="h-3.5 w-3.5" /> GS1 Barcoding
          </TabsTrigger>
          <TabsTrigger value="imdg" className="gap-1.5 text-xs data-[state=active]:bg-slate-800 data-[state=active]:text-amber-400">
            <AlertTriangle className="h-3.5 w-3.5" /> IMDG
          </TabsTrigger>
          <TabsTrigger value="iso" className="gap-1.5 text-xs data-[state=active]:bg-slate-800 data-[state=active]:text-amber-400">
            <ShieldCheck className="h-3.5 w-3.5" /> ISO Standards
          </TabsTrigger>
          <TabsTrigger value="uae" className="gap-1.5 text-xs data-[state=active]:bg-slate-800 data-[state=active]:text-amber-400">
            <Landmark className="h-3.5 w-3.5" /> UAE Regulations
          </TabsTrigger>
        </TabsList>
        <TabsContent value="gs1" className="mt-4"><GS1BarcodingTab /></TabsContent>
        <TabsContent value="imdg" className="mt-4"><IMDGTab /></TabsContent>
        <TabsContent value="iso" className="mt-4"><ISOStandardsTab /></TabsContent>
        <TabsContent value="uae" className="mt-4"><UAERegulationsTab /></TabsContent>
      </Tabs>
    </div>
  );
}
