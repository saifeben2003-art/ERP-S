'use client';

import { useState, useMemo } from 'react';
import { BookOpen, Globe, Ruler, Box, Weight, ArrowRightLeft, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  hsCodes, hsCategories, incoterms, containerSpecs,
  weightUnits, lengthUnits, volumeUnits,
  convertWeight, convertLength, convertVolume,
  liftCategories,
} from '@/lib/standards-data';
import type { Incoterm, ContainerSpec, LiftCategorySpec, UnitDef } from '@/lib/standards-data';

// ─── HS Codes Tab ───────────────────────────────────────────────────────────

function HsCodesTab() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('ALL');

  const catMap: Record<string, string[]> = {
    Machinery: ['84'],
    'Steel & Iron': ['72', '73'],
    Electrical: ['85'],
    'Transport Equipment': ['86', '87', '89'],
  };

  const filtered = useMemo(() => {
    return hsCodes.filter((h) => {
      const matchCat = category === 'ALL' || (catMap[category]?.some((p) => h.code.startsWith(p)));
      const q = search.toLowerCase();
      const matchSearch = !q || h.code.includes(q) || h.descriptionEn.toLowerCase().includes(q) || h.descriptionAr.includes(q);
      return matchCat && matchSearch;
    });
  }, [search, category]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input placeholder="Search HS codes or descriptions..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="pl-9 border-slate-700 bg-slate-900/50 text-slate-300" />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-44 border-slate-700 bg-slate-900/50 text-slate-300">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="border-slate-700 bg-slate-800">
            <SelectItem value="ALL" className="text-slate-300 focus:bg-slate-700">All Categories</SelectItem>
            {hsCategories.map((c) => (
              <SelectItem key={c} value={c} className="text-slate-300 focus:bg-slate-700">{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Card className="border-slate-800 bg-slate-900/50">
        <CardContent className="p-0">
          <div className="max-h-[500px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-800 hover:bg-transparent">
                  <TableHead className="text-xs text-slate-500">HS Code</TableHead>
                  <TableHead className="text-xs text-slate-500">Description (EN)</TableHead>
                  <TableHead className="text-xs text-slate-500 hidden lg:table-cell">Description (AR)</TableHead>
                  <TableHead className="text-xs text-slate-500">Unit</TableHead>
                  <TableHead className="text-xs text-slate-500">Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0
                  ? <TableRow className="border-slate-800 hover:bg-transparent"><TableCell colSpan={5} className="text-center py-8 text-slate-500">No HS codes found</TableCell></TableRow>
                  : filtered.map((h) => (
                    <TableRow key={h.code} className="border-slate-800 hover:bg-slate-800/50">
                      <TableCell className="py-2.5 text-xs font-mono font-medium text-amber-400/80">{h.code}</TableCell>
                      <TableCell className="py-2.5 text-xs text-slate-300">{h.descriptionEn}</TableCell>
                      <TableCell className="py-2.5 text-xs text-slate-400 hidden lg:table-cell" dir="rtl">{h.descriptionAr}</TableCell>
                      <TableCell className="py-2.5"><Badge variant="outline" className="text-[10px] border-slate-700 text-slate-400">{h.unit}</Badge></TableCell>
                      <TableCell className="py-2.5">
                        <Badge variant="outline" className={
                          h.notes === 'Heavy lift' ? 'text-[10px] border-amber-500/30 text-amber-400' :
                          h.notes === 'Super heavy' ? 'text-[10px] border-red-500/30 text-red-400' :
                          h.notes === 'Oversize' ? 'text-[10px] border-purple-500/30 text-purple-400' :
                          h.notes === 'Project cargo' ? 'text-[10px] border-cyan-500/30 text-cyan-400' :
                          'text-[10px] border-slate-700 text-slate-400'
                        }>{h.notes}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Incoterm Card ──────────────────────────────────────────────────────────

function IncotermCard({ item }: { item: Incoterm }) {
  const [open, setOpen] = useState(false);
  return (
    <Card className="border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-colors">
      <button className="w-full text-left" onClick={() => setOpen(!open)}>
        <CardHeader className="pb-0 cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-amber-400 font-mono w-14">{item.code}</span>
              <div>
                <CardTitle className="text-sm text-slate-200">{item.nameEn}</CardTitle>
                <p className="text-xs text-slate-500 mt-0.5" dir="rtl">{item.nameAr}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {item.seaOnly && <Badge variant="outline" className="text-[10px] border-blue-500/30 text-blue-400">Sea Only</Badge>}
              {open ? <ChevronUp className="h-4 w-4 text-slate-500" /> : <ChevronDown className="h-4 w-4 text-slate-500" />}
            </div>
          </div>
        </CardHeader>
      </button>
      <CardContent className="pt-2">
        <p className="text-xs text-slate-400 mb-3">{item.descriptionEn}</p>
        {open && (
          <div className="space-y-3 animate-in fade-in-0 slide-in-from-top-2 duration-200">
            <Separator className="bg-slate-800" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-amber-500/70 font-semibold mb-1.5">Seller Obligations</p>
                <ul className="space-y-1">{item.sellerObligations.map((o, i) => <li key={i} className="text-xs text-slate-400 flex gap-1.5"><span className="text-amber-500">•</span>{o}</li>)}</ul>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-cyan-500/70 font-semibold mb-1.5">Buyer Obligations</p>
                <ul className="space-y-1">{item.buyerObligations.map((o, i) => <li key={i} className="text-xs text-slate-400 flex gap-1.5"><span className="text-cyan-500">•</span>{o}</li>)}</ul>
              </div>
            </div>
            <Separator className="bg-slate-800" />
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Risk Transfer:</span>
              <span className="text-xs text-slate-300">{item.riskTransfer}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function IncotermsTab() {
  return (
    <div className="grid gap-3 max-h-[600px] overflow-y-auto pr-1">
      {incoterms.map((t) => <IncotermCard key={t.code} item={t} />)}
    </div>
  );
}

// ─── Converter Card ─────────────────────────────────────────────────────────

function ConverterCard({ label, icon, units, convert }: {
  label: string;
  icon: React.ReactNode;
  units: UnitDef[];
  convert: (v: number, from: string, to: string) => number;
}) {
  const [value, setValue] = useState('1');
  const [from, setFrom] = useState(units[0].abbr);
  const [to, setTo] = useState(units[1].abbr);

  const numVal = parseFloat(value) || 0;
  const result = convert(numVal, from, to);

  const makeSelect = (val: string, onChange: (v: string) => void) => (
    <Select value={val} onValueChange={onChange}>
      <SelectTrigger className="w-24 border-slate-700 bg-slate-800 text-slate-300 text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="border-slate-700 bg-slate-800">
        {units.map((u) => <SelectItem key={u.abbr} value={u.abbr} className="text-slate-300 focus:bg-slate-700 text-xs">{u.abbr}</SelectItem>)}
      </SelectContent>
    </Select>
  );

  return (
    <Card className="border-slate-800 bg-slate-900/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm text-slate-200">
          {icon}<span>{label}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <Input type="number" value={value} onChange={(e) => setValue(e.target.value)}
            className="flex-1 border-slate-700 bg-slate-800 text-slate-200 text-sm" />
          {makeSelect(from, setFrom)}
        </div>
        <div className="flex items-center justify-center">
          <ArrowRightLeft className="h-4 w-4 text-amber-500/60" />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-9 rounded-md border border-slate-700 bg-slate-800/70 flex items-center px-3">
            <span className="text-sm font-mono text-amber-400">{numVal === 0 ? '0' : result % 1 === 0 ? result.toString() : result.toFixed(4).replace(/0+$/, '').replace(/\.$/, '')}</span>
          </div>
          {makeSelect(to, setTo)}
        </div>
      </CardContent>
    </Card>
  );
}

function ConversionsTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <ConverterCard label="Weight" icon={<Weight className="h-4 w-4 text-amber-400" />} units={weightUnits} convert={convertWeight} />
      <ConverterCard label="Length" icon={<Ruler className="h-4 w-4 text-amber-400" />} units={lengthUnits} convert={convertLength} />
      <ConverterCard label="Volume" icon={<Box className="h-4 w-4 text-amber-400" />} units={volumeUnits} convert={convertVolume} />
    </div>
  );
}

// ─── Container Tab ──────────────────────────────────────────────────────────

function ContainerCard({ spec, onClick }: { spec: ContainerSpec; onClick: () => void }) {
  return (
    <Card className="border-slate-800 bg-slate-900/50 hover:border-amber-500/30 transition-colors cursor-pointer" onClick={onClick}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base text-amber-400 font-mono">{spec.type}</CardTitle>
        <p className="text-xs text-slate-500">{spec.name}</p>
      </CardHeader>
      <CardContent className="space-y-1.5">
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
          <span className="text-slate-500">Capacity</span><span className="text-slate-300">{spec.capacityCBM} CBM</span>
          <span className="text-slate-500">Max Payload</span><span className="text-slate-300">{spec.maxPayload.toLocaleString()} kg</span>
          <span className="text-slate-500">Tare Weight</span><span className="text-slate-300">{spec.tareWeight.toLocaleString()} kg</span>
          <span className="text-slate-500">Internal (L×W×H)</span><span className="text-slate-300">{spec.internalL}×{spec.internalW}×{spec.internalH}m</span>
        </div>
      </CardContent>
    </Card>
  );
}

function ContainerDetail({ spec, onClose }: { spec: ContainerSpec; onClose: () => void }) {
  return (
    <Card className="border-amber-500/30 bg-slate-900/80">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg text-amber-400 font-mono">{spec.type} — {spec.name}</CardTitle>
            <p className="text-xs text-slate-500 mt-1" dir="rtl">{spec.nameAr}</p>
          </div>
          <button onClick={onClose} className="text-xs text-slate-500 hover:text-slate-300 border border-slate-700 rounded px-2 py-1 hover:bg-slate-800 transition-colors">Close</button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">External Dimensions</p>
            <p className="text-xs text-slate-300">L: {spec.externalL}m · W: {spec.externalW}m · H: {spec.externalH}m</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Internal Dimensions</p>
            <p className="text-xs text-slate-300">L: {spec.internalL}m · W: {spec.internalW}m · H: {spec.internalH}m</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Capacity</p>
            <p className="text-xs text-slate-300">{spec.capacityCBM} CBM / {spec.capacityCFT} CFT</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Max Gross Weight</p>
            <p className="text-xs text-slate-300">{spec.maxWeight.toLocaleString()} kg</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Max Payload</p>
            <p className="text-xs text-slate-300">{spec.maxPayload.toLocaleString()} kg</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Tare Weight</p>
            <p className="text-xs text-slate-300">{spec.tareWeight.toLocaleString()} kg</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ContainersTab() {
  const [selected, setSelected] = useState<ContainerSpec | null>(null);
  return (
    <div className="space-y-4">
      {selected && <ContainerDetail spec={selected} onClose={() => setSelected(null)} />}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {containerSpecs.map((c) => <ContainerCard key={c.type} spec={c} onClick={() => setSelected(c)} />)}
      </div>
    </div>
  );
}

// ─── Lift Classes Tab ───────────────────────────────────────────────────────

function LiftCategoryCard({ cat }: { cat: LiftCategorySpec }) {
  return (
    <Card className={`border ${cat.borderColor} ${cat.bgColor} hover:brightness-110 transition-all`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className={`text-base ${cat.color} font-semibold`}>{cat.nameEn}</CardTitle>
          <span className={`text-xs ${cat.color} opacity-70`} dir="rtl">{cat.nameAr}</span>
        </div>
        {cat.maxWeight > 0 && (
          <p className="text-xs text-slate-500 mt-1">{cat.minWeight}–{cat.maxWeight} MT</p>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1.5">Requirements</p>
          <ul className="space-y-1">{cat.requirements.map((r, i) => <li key={i} className="text-xs text-slate-400 flex gap-1.5"><span className={cat.color}>•</span>{r}</li>)}</ul>
        </div>
        <Separator className="bg-slate-800" />
        <div>
          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1.5">Equipment</p>
          <div className="flex flex-wrap gap-1.5">{cat.equipment.map((e) => <Badge key={e} variant="outline" className={`text-[10px] ${cat.borderColor} ${cat.color}`}>{e}</Badge>)}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function LiftClassesTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {liftCategories.map((c) => <LiftCategoryCard key={c.nameEn} cat={c} />)}
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────

export function StandardsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">International Standards</h1>
        <p className="text-sm text-slate-500 mt-1">HS codes, INCOTERMS, conversions, containers & lift classifications</p>
      </div>
      <Tabs defaultValue="hs-codes">
        <TabsList className="bg-slate-900/80 border border-slate-800">
          <TabsTrigger value="hs-codes" className="gap-1.5 text-xs data-[state=active]:bg-slate-800 data-[state=active]:text-amber-400">
            <BookOpen className="h-3.5 w-3.5" /> HS Codes
          </TabsTrigger>
          <TabsTrigger value="incoterms" className="gap-1.5 text-xs data-[state=active]:bg-slate-800 data-[state=active]:text-amber-400">
            <Globe className="h-3.5 w-3.5" /> INCOTERMS
          </TabsTrigger>
          <TabsTrigger value="conversions" className="gap-1.5 text-xs data-[state=active]:bg-slate-800 data-[state=active]:text-amber-400">
            <ArrowRightLeft className="h-3.5 w-3.5" /> Conversions
          </TabsTrigger>
          <TabsTrigger value="containers" className="gap-1.5 text-xs data-[state=active]:bg-slate-800 data-[state=active]:text-amber-400">
            <Box className="h-3.5 w-3.5" /> Containers
          </TabsTrigger>
          <TabsTrigger value="lift-classes" className="gap-1.5 text-xs data-[state=active]:bg-slate-800 data-[state=active]:text-amber-400">
            <Weight className="h-3.5 w-3.5" /> Lift Classes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="hs-codes" className="mt-4"><HsCodesTab /></TabsContent>
        <TabsContent value="incoterms" className="mt-4"><IncotermsTab /></TabsContent>
        <TabsContent value="conversions" className="mt-4"><ConversionsTab /></TabsContent>
        <TabsContent value="containers" className="mt-4"><ContainersTab /></TabsContent>
        <TabsContent value="lift-classes" className="mt-4"><LiftClassesTab /></TabsContent>
      </Tabs>
    </div>
  );
}
