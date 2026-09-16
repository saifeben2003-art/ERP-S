// ─── HS Codes ───────────────────────────────────────────────────────────────

export interface HsCodeEntry {
  code: string;
  descriptionEn: string;
  descriptionAr: string;
  unit: string;
  notes: string;
}

export const hsCategories = [
  'Machinery',
  'Steel & Iron',
  'Electrical',
  'Transport Equipment',
] as const;

export const hsCodes: HsCodeEntry[] = [
  // Machinery (84xx) — 9 entries
  { code: '8429.52', descriptionEn: 'Self-propelled bulldozers', descriptionAr: 'بلدوزرات ذاتية الحركة', unit: 'unit', notes: 'Heavy lift' },
  { code: '8429.59', descriptionEn: 'Self-propelled graders/levellers', descriptionAr: 'جرارات تسوية ذاتية الحركة', unit: 'unit', notes: 'Oversize' },
  { code: '8429.51', descriptionEn: 'Self-propelled front-end shovel loaders', descriptionAr: 'رافعات أمامية ذاتية الحركة', unit: 'unit', notes: 'Heavy lift' },
  { code: '8430.49', descriptionEn: 'Self-propelled trenching machinery', descriptionAr: 'آلات حفر خنادق ذاتية الحركة', unit: 'unit', notes: 'Oversize' },
  { code: '8425.42', descriptionEn: 'Self-propelled lifting equipment', descriptionAr: 'معدات رفع ذاتية الحركة', unit: 'unit', notes: 'Heavy lift' },
  { code: '8419.89', descriptionEn: 'Industrial drying machinery', descriptionAr: 'آلات تجفيف صناعية', unit: 'unit', notes: 'Standard' },
  { code: '8421.29', descriptionEn: 'Filtering or purifying machinery', descriptionAr: 'آلات ترشيح أو تنقية', unit: 'unit', notes: 'Standard' },
  { code: '8427.90', descriptionEn: 'Fork-lift trucks', descriptionAr: 'رافعات شوكية', unit: 'unit', notes: 'Standard' },
  { code: '8428.39', descriptionEn: 'Continuous-action elevators/conveyors', descriptionAr: 'رافعات ونواقل مستمرة الحركة', unit: 'unit', notes: 'Heavy lift' },

  // Steel & Iron (72-73xx) — 8 entries
  { code: '7208.10', descriptionEn: 'Hot-rolled steel plate, thickness ≥ 10mm', descriptionAr: 'صفائح فولاذية مدلفنة ساخنة، سمك ≥ 10 مم', unit: 'MT', notes: 'Heavy lift' },
  { code: '7208.25', descriptionEn: 'Hot-rolled steel coils', descriptionAr: 'لفائف فولاذية مدلفنة ساخنة', unit: 'MT', notes: 'Standard' },
  { code: '7208.37', descriptionEn: 'Hot-rolled steel sheet, 3mm ≤ t < 4.75mm', descriptionAr: 'صفائح فولاذية مدلفنة ساخنة، 3 مم ≤ س < 4.75 مم', unit: 'MT', notes: 'Standard' },
  { code: '7209.15', descriptionEn: 'Cold-rolled steel sheet, 0.5mm ≤ t < 1mm', descriptionAr: 'صفائح فولاذية مدلفنة باردة، 0.5 مم ≤ س < 1 مم', unit: 'MT', notes: 'Standard' },
  { code: '7210.70', descriptionEn: 'Painted or coated steel sheet', descriptionAr: 'صفائح فولاذية مطلية أو مغلفة', unit: 'MT', notes: 'Standard' },
  { code: '7214.30', descriptionEn: 'Steel bars, hot-rolled, with indentations', descriptionAr: 'قضبان فولاذية مدلفنة ساخنة مع نتوءات', unit: 'MT', notes: 'Heavy lift' },
  { code: '7216.31', descriptionEn: 'U-shaped iron/steel sections', descriptionAr: 'مقاطع حديد/فولاذ على شكل حرف U', unit: 'MT', notes: 'Oversize' },
  { code: '7308.90', descriptionEn: 'Steel structures and parts thereof', descriptionAr: 'هياكل فولاذية وأجزاؤها', unit: 'MT', notes: 'Project cargo' },

  // Electrical (85xx) — 7 entries
  { code: '8504.23', descriptionEn: 'Liquid dielectric transformers, power > 10 MVA', descriptionAr: 'محولات ذات عازل سائل، قدرة > 10 ميغافولت أمبير', unit: 'unit', notes: 'Heavy lift' },
  { code: '8504.33', descriptionEn: 'Other transformers, power ≤ 1 kVA', descriptionAr: 'محولات أخرى، قدرة ≤ 1 كيلوفولت أمبير', unit: 'unit', notes: 'Standard' },
  { code: '8501.10', descriptionEn: 'Electric motors, DC', descriptionAr: 'محركات كهربائية، تيار مستمر', unit: 'unit', notes: 'Standard' },
  { code: '8501.52', descriptionEn: 'AC multi-phase motors, 0.75kW–75kW', descriptionAr: 'محركات متعددة الأطوار تيار متردد، 0.75–75 كيلووات', unit: 'unit', notes: 'Standard' },
  { code: '8535.30', descriptionEn: 'Fuses, voltage > 1kV', descriptionAr: 'فيوزات، جهد > 1 كيلوفولت', unit: 'unit', notes: 'Standard' },
  { code: '8536.90', descriptionEn: 'Electrical apparatus for switching/protecting circuits', descriptionAr: 'أجهزة كهربائية لتبديل/حماية الدوائر', unit: 'unit', notes: 'Standard' },
  { code: '8544.42', descriptionEn: 'Electric power cables, voltage > 80V', descriptionAr: 'كابلات طاقة كهربائية، جهد > 80 فولت', unit: 'MT', notes: 'Heavy lift' },

  // Transport Equipment (86-89xx) — 6 entries
  { code: '8609.00', descriptionEn: 'Containers (including modular containers)', descriptionAr: 'حاويات (بما فيها الحاويات النمطية)', unit: 'unit', notes: 'Standard' },
  { code: '8701.20', descriptionEn: 'Road tractors for semi-trailers', descriptionAr: 'جرارات طرق شبه مقطورات', unit: 'unit', notes: 'Heavy lift' },
  { code: '8705.10', descriptionEn: 'Lift trucks/stackers, self-propelled', descriptionAr: 'رافعات/راصات ذاتية الحركة', unit: 'unit', notes: 'Heavy lift' },
  { code: '8705.20', descriptionEn: 'Special-purpose mobile cranes', descriptionAr: 'رافعات متحركة لأغراض خاصة', unit: 'unit', notes: 'Super heavy' },
  { code: '8906.00', descriptionEn: 'Vessels and floating structures (disassembled)', descriptionAr: 'سفن وهياكل عائمة (مفككة)', unit: 'MT', notes: 'Project cargo' },
  { code: '8716.40', descriptionEn: 'Container chassis', descriptionAr: 'هياكل الحاويات', unit: 'unit', notes: 'Oversize' },
];

// ─── INCOTERMS 2020 ─────────────────────────────────────────────────────────

export interface Incoterm {
  code: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  sellerObligations: string[];
  buyerObligations: string[];
  riskTransfer: string;
  seaOnly: boolean;
}

export const incoterms: Incoterm[] = [
  {
    code: 'EXW',
    nameEn: 'Ex Works',
    nameAr: 'تسليم المصنع',
    descriptionEn: 'The seller makes goods available at their premises. The buyer bears all costs and risks.',
    descriptionAr: 'يجعل البائع البضائع متاحة في مقره. يتحمل المشتري جميع التكاليف والمخاطر.',
    sellerObligations: ['Make goods available at premises', 'Provide commercial invoice', 'Assist in obtaining export license'],
    buyerObligations: ['Load goods on vehicle', 'Bear all export/import clearance costs', 'Pay transport to destination', 'Bear all risks from pickup'],
    riskTransfer: 'At seller\'s premises before loading',
    seaOnly: false,
  },
  {
    code: 'FCA',
    nameEn: 'Free Carrier',
    nameAr: 'تسليم الناقل',
    descriptionEn: 'The seller delivers goods, cleared for export, to the carrier named by the buyer.',
    descriptionAr: 'يسلم البائع البضائع، الم cleared للتصدير، إلى الناقل الذي يحدده المشتري.',
    sellerObligations: ['Deliver goods to carrier', 'Clear goods for export', 'Provide commercial invoice', 'Loading at origin if at seller\'s premises'],
    buyerObligations: ['Pay carriage costs', 'Arrange import clearance', 'Bear risks after delivery to carrier', 'Unload at destination'],
    riskTransfer: 'When goods delivered to carrier',
    seaOnly: false,
  },
  {
    code: 'FAS',
    nameEn: 'Free Alongside Ship',
    nameAr: 'تسليم بجانب السفينة',
    descriptionEn: 'The seller places goods alongside the vessel nominated by the buyer at the named port.',
    descriptionAr: 'يضع البائع البضائع بجانب السفينة التي يحددها المشتري في الميناء المحدد.',
    sellerObligations: ['Place goods alongside vessel', 'Clear goods for export', 'Provide commercial invoice'],
    buyerObligations: ['Pay loading costs', 'Pay main carriage', 'Arrange import clearance', 'Bear all risks from alongside ship'],
    riskTransfer: 'When goods alongside the vessel',
    seaOnly: true,
  },
  {
    code: 'FOB',
    nameEn: 'Free On Board',
    nameAr: 'تسليم على ظهر السفينة',
    descriptionEn: 'The seller delivers goods on board the vessel nominated by the buyer at the named port.',
    descriptionAr: 'يسلم البائع البضائع على ظهر السفينة التي يحددها المشتري في الميناء المحدد.',
    sellerObligations: ['Deliver goods on board vessel', 'Clear goods for export', 'Provide commercial invoice', 'Bear loading costs'],
    buyerObligations: ['Pay main carriage', 'Arrange import clearance', 'Bear risks once goods are on board', 'Unloading at destination'],
    riskTransfer: 'When goods are on board the vessel',
    seaOnly: true,
  },
  {
    code: 'CFR',
    nameEn: 'Cost and Freight',
    nameAr: 'التكلفة والشحن',
    descriptionEn: 'The seller pays the costs and freight to bring goods to the named port of destination.',
    descriptionAr: 'يدفع البائع التكاليف والشحن لنقل البضائع إلى ميناء الوصول المحدد.',
    sellerObligations: ['Deliver goods on board vessel', 'Clear goods for export', 'Pay freight to destination port', 'Provide commercial invoice'],
    buyerObligations: ['Bear risk after loading', 'Pay insurance (not included)', 'Arrange import clearance', 'Pay unloading at destination'],
    riskTransfer: 'When goods are on board the vessel (seller pays freight)',
    seaOnly: true,
  },
  {
    code: 'CIF',
    nameEn: 'Cost, Insurance and Freight',
    nameAr: 'التكلفة والتأمين والشحن',
    descriptionEn: 'The seller pays costs, freight, and minimum insurance to bring goods to the named port.',
    descriptionAr: 'يدفع البائع التكاليف والشحن والتأمين الأدنى لنقل البضائع إلى الميناء المحدد.',
    sellerObligations: ['Deliver goods on board vessel', 'Clear goods for export', 'Pay freight to destination port', 'Provide minimum marine insurance', 'Provide commercial invoice'],
    buyerObligations: ['Bear risk after loading', 'Arrange import clearance', 'Pay additional insurance if desired', 'Pay unloading at destination'],
    riskTransfer: 'When goods are on board the vessel',
    seaOnly: true,
  },
  {
    code: 'CPT',
    nameEn: 'Carriage Paid To',
    nameAr: 'النقل مدفوع إلى',
    descriptionEn: 'The seller pays for carriage to the named destination. Risk transfers when goods are handed to the first carrier.',
    descriptionAr: 'يدفع البائع تكاليف النقل إلى وجهة محددة. تنتقل المخاطر عند تسليم البضائع لأول ناقل.',
    sellerObligations: ['Deliver goods to first carrier', 'Clear goods for export', 'Pay freight to destination', 'Provide commercial invoice'],
    buyerObligations: ['Bear risk after first carrier', 'Pay insurance (not included)', 'Arrange import clearance', 'Unloading at destination'],
    riskTransfer: 'When goods handed to first carrier',
    seaOnly: false,
  },
  {
    code: 'CIP',
    nameEn: 'Carriage and Insurance Paid To',
    nameAr: 'النقل والتأمين مدفوعان إلى',
    descriptionEn: 'Like CPT but seller also provides insurance against buyer\'s risk during carriage.',
    descriptionAr: 'مثل CPT لكن البائع يوفر أيضاً تأميناً ضد مخاطر المشتري أثناء النقل.',
    sellerObligations: ['Deliver goods to first carrier', 'Clear goods for export', 'Pay freight to destination', 'Provide comprehensive insurance', 'Provide commercial invoice'],
    buyerObligations: ['Bear risk after first carrier', 'Arrange import clearance', 'Pay additional insurance if desired', 'Unloading at destination'],
    riskTransfer: 'When goods handed to first carrier',
    seaOnly: false,
  },
  {
    code: 'DAP',
    nameEn: 'Delivered at Place',
    nameAr: 'تسليم في المكان',
    descriptionEn: 'The seller delivers goods to the named destination, not cleared for import. Unloading at buyer\'s risk.',
    descriptionAr: 'يسلم البائع البضائع إلى الوجهة المحددة غير المخلى جمركياً. التفريغ على مسؤولية المشتري.',
    sellerObligations: ['Deliver goods to named destination', 'Clear goods for export', 'Pay carriage to destination', 'Provide commercial invoice'],
    buyerObligations: ['Arrange import clearance', 'Pay import duties/taxes', 'Unload goods at destination', 'Bear risk from arrival at destination'],
    riskTransfer: 'When goods placed at buyer\'s disposal at destination',
    seaOnly: false,
  },
  {
    code: 'DPU',
    nameEn: 'Delivered at Place Unloaded',
    nameAr: 'تسليم في المكان مفرغة',
    descriptionEn: 'The seller delivers goods unloaded at the named destination. Only Incoterm where seller unloads.',
    descriptionAr: 'يسلم البائع البضائع مفرغة في الوجهة المحددة. الشحنة الوحيدة التي يفرغ فيها البائع.',
    sellerObligations: ['Deliver goods to named destination', 'Clear goods for export', 'Pay carriage to destination', 'Unload goods at destination', 'Provide commercial invoice'],
    buyerObligations: ['Arrange import clearance', 'Pay import duties/taxes', 'Bear risk after unloading'],
    riskTransfer: 'When goods unloaded at destination',
    seaOnly: false,
  },
  {
    code: 'DDP',
    nameEn: 'Delivered Duty Paid',
    nameAr: 'تسليم مع دفع الرسوم',
    descriptionEn: 'The seller delivers goods cleared for import, paying all duties. Maximum seller obligation.',
    descriptionAr: 'يسلم البائع البضائع المخلى جمركياً مع دفع جميع الرسوم. أقصى التزام للبائع.',
    sellerObligations: ['Deliver goods to named destination', 'Clear goods for export and import', 'Pay all duties and taxes', 'Pay carriage to destination', 'Provide commercial invoice'],
    buyerObligations: ['Unload goods at destination', 'Bear risk after delivery at destination'],
    riskTransfer: 'When goods placed at buyer\'s disposal at destination',
    seaOnly: false,
  },
];

// ─── Container Specs ────────────────────────────────────────────────────────

export interface ContainerSpec {
  type: string;
  name: string;
  nameAr: string;
  externalL: number;
  externalW: number;
  externalH: number;
  internalL: number;
  internalW: number;
  internalH: number;
  maxWeight: number;
  maxPayload: number;
  capacityCBM: number;
  capacityCFT: number;
  tareWeight: number;
}

export const containerSpecs: ContainerSpec[] = [
  { type: '20GP', name: '20ft General Purpose', nameAr: 'حاوية 20 قدم عامة', externalL: 6.058, externalW: 2.438, externalH: 2.591, internalL: 5.898, internalW: 2.352, internalH: 2.393, maxWeight: 24000, maxPayload: 21700, capacityCBM: 33.2, capacityCFT: 1172, tareWeight: 2300 },
  { type: '40GP', name: '40ft General Purpose', nameAr: 'حاوية 40 قدم عامة', externalL: 12.192, externalW: 2.438, externalH: 2.591, internalL: 12.032, internalW: 2.352, internalH: 2.393, maxWeight: 30480, maxPayload: 26680, capacityCBM: 67.7, capacityCFT: 2390, tareWeight: 3800 },
  { type: '40HC', name: '40ft High Cube', nameAr: 'حاوية 40 قدم عالية', externalL: 12.192, externalW: 2.438, externalH: 2.896, internalL: 12.032, internalW: 2.352, internalH: 2.698, maxWeight: 30480, maxPayload: 26460, capacityCBM: 76.3, capacityCFT: 2694, tareWeight: 4020 },
  { type: '45HC', name: '45ft High Cube', nameAr: 'حاوية 45 قدم عالية', externalL: 13.716, externalW: 2.438, externalH: 2.896, internalL: 13.556, internalW: 2.352, internalH: 2.698, maxWeight: 30480, maxPayload: 25600, capacityCBM: 86.1, capacityCFT: 3040, tareWeight: 4880 },
  { type: '20OT', name: '20ft Open Top', nameAr: 'حاوية 20 قدم مفتوحة القمة', externalL: 6.058, externalW: 2.438, externalH: 2.591, internalL: 5.898, internalW: 2.352, internalH: 2.345, maxWeight: 24000, maxPayload: 21380, capacityCBM: 32.5, capacityCFT: 1148, tareWeight: 2620 },
  { type: '40OT', name: '40ft Open Top', nameAr: 'حاوية 40 قدم مفتوحة القمة', externalL: 12.192, externalW: 2.438, externalH: 2.591, internalL: 12.032, internalW: 2.352, internalH: 2.345, maxWeight: 30480, maxPayload: 26280, capacityCBM: 66.4, capacityCFT: 2345, tareWeight: 4200 },
  { type: '20FR', name: '20ft Flat Rack', nameAr: 'حاوية 20 قدم منصة مسطحة', externalL: 6.058, externalW: 2.438, externalH: 2.591, internalL: 5.620, internalW: 2.200, internalH: 2.233, maxWeight: 30480, maxPayload: 27600, capacityCBM: 27.6, capacityCFT: 975, tareWeight: 2880 },
  { type: '40FR', name: '40ft Flat Rack', nameAr: 'حاوية 40 قدم منصة مسطحة', externalL: 12.192, externalW: 2.438, externalH: 2.591, internalL: 11.832, internalW: 2.228, internalH: 2.043, maxWeight: 45000, maxPayload: 39200, capacityCBM: 53.8, capacityCFT: 1900, tareWeight: 5800 },
];

// ─── Conversion Units & Functions ───────────────────────────────────────────

export interface UnitDef {
  abbr: string;
  name: string;
  toBase: number;
}

export const weightUnits: UnitDef[] = [
  { abbr: 'kg', name: 'Kilogram', toBase: 1 },
  { abbr: 'lb', name: 'Pound', toBase: 0.453592 },
  { abbr: 'ton', name: 'Metric Ton (t)', toBase: 1000 },
  { abbr: 'MT', name: 'Long Ton (1016 kg)', toBase: 1016.047 },
];

export const lengthUnits: UnitDef[] = [
  { abbr: 'm', name: 'Meter', toBase: 1 },
  { abbr: 'ft', name: 'Foot', toBase: 0.3048 },
  { abbr: 'in', name: 'Inch', toBase: 0.0254 },
  { abbr: 'cm', name: 'Centimeter', toBase: 0.01 },
];

export const volumeUnits: UnitDef[] = [
  { abbr: 'CBM', name: 'Cubic Meter', toBase: 1 },
  { abbr: 'CFT', name: 'Cubic Foot', toBase: 0.0283168 },
  { abbr: 'gal', name: 'US Gallon', toBase: 0.00378541 },
  { abbr: 'L', name: 'Liter', toBase: 0.001 },
];

export function convertWeight(value: number, from: string, to: string): number {
  const fromUnit = weightUnits.find((u) => u.abbr === from);
  const toUnit = weightUnits.find((u) => u.abbr === to);
  if (!fromUnit || !toUnit) return 0;
  return (value * fromUnit.toBase) / toUnit.toBase;
}

export function convertLength(value: number, from: string, to: string): number {
  const fromUnit = lengthUnits.find((u) => u.abbr === from);
  const toUnit = lengthUnits.find((u) => u.abbr === to);
  if (!fromUnit || !toUnit) return 0;
  return (value * fromUnit.toBase) / toUnit.toBase;
}

export function convertVolume(value: number, from: string, to: string): number {
  const fromUnit = volumeUnits.find((u) => u.abbr === from);
  const toUnit = volumeUnits.find((u) => u.abbr === to);
  if (!fromUnit || !toUnit) return 0;
  return (value * fromUnit.toBase) / toUnit.toBase;
}

// ─── Lift Categories ────────────────────────────────────────────────────────

export interface LiftCategorySpec {
  nameEn: string;
  nameAr: string;
  minWeight: number;
  maxWeight: number;
  color: string;
  bgColor: string;
  borderColor: string;
  requirements: string[];
  equipment: string[];
}

export const liftCategories: LiftCategorySpec[] = [
  {
    nameEn: 'Standard',
    nameAr: 'قياسي',
    minWeight: 0,
    maxWeight: 100,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    requirements: [
      'Standard forklift (≥ rated capacity)',
      'Basic lifting plan not required',
      'Single-sling attachment permitted',
      'No special permits needed',
    ],
    equipment: ['Forklift', 'Pallet Jack', 'Hand Crane'],
  },
  {
    nameEn: 'Heavy Lift',
    nameAr: 'رفع ثقيل',
    minWeight: 100,
    maxWeight: 300,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
    requirements: [
      'Mobile crane with certified operator',
      'Lift plan required (basic)',
      'Multi-point sling rigging required',
      'Ground bearing assessment needed',
      'Spotter/banksman required',
    ],
    equipment: ['Mobile Crane (100t+)', 'Spreader Bar', 'Shackles', 'Multi-leg Slings'],
  },
  {
    nameEn: 'Super Heavy',
    nameAr: 'رفع فائق الثقل',
    minWeight: 300,
    maxWeight: 1000,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
    requirements: [
      'Specialized heavy-lift crane required',
      'Detailed lift plan with engineering review',
      'Third-party inspection mandatory',
      'Structural analysis of load required',
      'Weather window assessment required',
      'Emergency response plan mandatory',
    ],
    equipment: ['Crawler Crane (300t+)', 'Heavy Spreader Bar', 'Custom Rigging', 'Hydraulic Jacks', 'Skidding System'],
  },
  {
    nameEn: 'Oversize',
    nameAr: 'حجم كبير',
    minWeight: 0,
    maxWeight: 0,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    requirements: [
      'Route survey required (over-dimension)',
      'Transport permits from all authorities',
      'Escort vehicles mandatory (front + rear)',
      'Traffic management plan required',
      'Bridge/load limit analysis on route',
      'Night transport may be required',
    ],
    equipment: ['Multi-axle Trailer', 'Booster Axle', 'Escort Vehicles', 'Traffic Control'],
  },
  {
    nameEn: 'Project Cargo',
    nameAr: 'بضائع المشاريع',
    minWeight: 0,
    maxWeight: 0,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/20',
    requirements: [
      'Full project logistics plan required',
      'Dedicated project manager assigned',
      'Custom packaging and crating',
      'Insurance surveyor may be required',
      'Pre-shipment inspection mandatory',
      'Multi-modal transport coordination',
      'Site access and laydown area planning',
    ],
    equipment: ['Heavy Haul Fleet', 'Crane Fleet', 'Flat Racks', 'Breakbulk Vessel', 'Modular Trailers'],
  },
];
