'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import {
  ScanLine, Camera, CameraOff, Type, History, Package, MapPin,
  ChevronRight, Zap, RotateCcw, Search, Loader2, XCircle,
  CheckCircle2, Eye, ArrowRightLeft, AlertTriangle, Trash2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation, translateStatus, translateLocationType } from '@/lib/translations';
import type { CargoStatus, LocationType } from '@/types/wms';

// ==================== LOCAL TRANSLATIONS ====================

const scannerLocal: Record<string, string> = {
  'scanner.title': 'ماسح البضائع',
  'scanner.subtitle': 'امسح الباركود أو أدخل الرمز يدوياً',
  'scanner.scan': 'مسح',
  'scanner.manual': 'إدخال يدوي',
  'scanner.placeholder': 'أدخل رمز الباركود...',
  'scanner.search': 'بحث',
  'scanner.found': 'تم العثور',
  'scanner.notFound': 'لم يتم العثور على نتائج',
  'scanner.recentScans': 'عمليات المسح الأخيرة',
  'scanner.clearHistory': 'مسح السجل',
  'scanner.switchCamera': 'تبديل الكاميرا',
  'scanner.cargoItem': 'بضاعة',
  'scanner.location': 'موقع',
  'scanner.viewDetails': 'عرض التفاصيل',
  'scanner.viewInventory': 'عرض المخزون',
  'scanner.changeStatus': 'تغيير الحالة',
  'scanner.scanning': 'جاري المسح...',
  'scanner.cameraUnavailable': 'الكاميرا متاحة للمراقبة - استخدم الإدخال اليدوي للمسح',
  'scanner.cameraError': 'تعذر الوصول إلى الكاميرا',
  'scanner.torchOn': 'تشغيل المصباح',
  'scanner.torchOff': 'إيقاف المصباح',
  'scanner.noRecentScans': 'لا توجد عمليات مسح سابقة',
  'scanner.weight': 'الوزن',
  'scanner.client': 'العميل',
  'scanner.zone': 'المنطقة',
  'scanner.currentLoad': 'الحمولة الحالية',
  'scanner.ton': 'طن',
  'scanner.items': 'قطعة',
  'scanner.days': 'يوم',
  'scanner.paste': 'لصق',
};

const scannerLocalEn: Record<string, string> = {
  'scanner.title': 'Barcode Scanner',
  'scanner.subtitle': 'Scan a barcode or enter the code manually',
  'scanner.scan': 'Scan',
  'scanner.manual': 'Manual Entry',
  'scanner.placeholder': 'Enter barcode...',
  'scanner.search': 'Search',
  'scanner.found': 'Found',
  'scanner.notFound': 'No results found',
  'scanner.recentScans': 'Recent Scans',
  'scanner.clearHistory': 'Clear History',
  'scanner.switchCamera': 'Switch Camera',
  'scanner.cargoItem': 'Cargo',
  'scanner.location': 'Location',
  'scanner.viewDetails': 'View Details',
  'scanner.viewInventory': 'View Inventory',
  'scanner.changeStatus': 'Change Status',
  'scanner.scanning': 'Scanning...',
  'scanner.cameraUnavailable': 'Camera available for monitoring - use manual entry to scan',
  'scanner.cameraError': 'Cannot access camera',
  'scanner.torchOn': 'Torch On',
  'scanner.torchOff': 'Torch Off',
  'scanner.noRecentScans': 'No recent scans',
  'scanner.weight': 'Weight',
  'scanner.client': 'Client',
  'scanner.zone': 'Zone',
  'scanner.currentLoad': 'Current Load',
  'scanner.ton': 'ton',
  'scanner.items': 'items',
  'scanner.days': 'days',
  'scanner.paste': 'Paste',
};

// ==================== TYPES ====================

interface ScanRecord {
  barcode: string;
  type: 'CARGO' | 'LOCATION' | 'NOT_FOUND';
  timestamp: number;
  result: ScannerResponse | null;
}

interface ScannerResponse {
  type: 'CARGO' | 'LOCATION';
  data: Record<string, unknown>;
}

// ==================== STATUS STYLES ====================

const statusStyles: Record<string, string> = {
  IN_YARD: 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border-emerald-500/20',
  IN_TRANSIT: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  DISPATCHED: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
  RECEIVED: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
  IN_WAREHOUSE: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
  DELIVERED: 'bg-slate-400/10 text-slate-500 dark:text-slate-500 border-slate-400/20',
};

// ==================== COMPONENT ====================

export function ScannerPage() {
  const { t, locale } = useTranslation();

  // Local scanner translations
  const st = useCallback((key: string): string => {
    const map = locale === 'en' ? scannerLocalEn : scannerLocal;
    return map[key] || key;
  }, [locale]);

  // State
  const [mode, setMode] = useState<'camera' | 'manual'>('camera');
  const [manualBarcode, setManualBarcode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScannerResponse | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const [recentScans, setRecentScans] = useState<ScanRecord[]>([]);
  const [cameraActive, setCameraActive] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [barcodeDetectorAvailable, setBarcodeDetectorAvailable] = useState(true);
  const [scanLineY, setScanLineY] = useState(0);

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const streamRef = useRef<MediaStream | null>(null);
  const scanIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scanLineDirection = useRef<1 | -1>(1);

  // ==================== BARCODE LOOKUP ====================

  const lookupBarcode = useCallback(async (barcode: string) => {
    if (!barcode.trim()) return;

    setIsScanning(true);
    setScanError(null);
    setScanResult(null);

    try {
      const res = await fetch(`/api/scanner?barcode=${encodeURIComponent(barcode.trim())}`);
      const data = await res.json();

      if (res.ok) {
        setScanResult(data as ScannerResponse);

        // Add to recent scans
        setRecentScans((prev) => {
          const record: ScanRecord = {
            barcode: barcode.trim(),
            type: (data as ScannerResponse).type,
            timestamp: Date.now(),
            result: data as ScannerResponse,
          };
          const filtered = prev.filter((r) => r.barcode !== barcode.trim());
          return [record, ...filtered].slice(0, 10);
        });
      } else {
        setScanError(data.error || st('scanner.notFound'));
        setRecentScans((prev) => {
          const record: ScanRecord = {
            barcode: barcode.trim(),
            type: 'NOT_FOUND',
            timestamp: Date.now(),
            result: null,
          };
          const filtered = prev.filter((r) => r.barcode !== barcode.trim());
          return [record, ...filtered].slice(0, 10);
        });
      }
    } catch {
      setScanError(st('scanner.notFound'));
    } finally {
      setIsScanning(false);
    }
  }, [st]);

  // ==================== BARCODE DETECTION ====================

  const detectBarcode = useCallback(async () => {
    if (!videoRef.current || !barcodeDetectorAvailable) return;

    try {
      // Type assertion for BarcodeDetector which may not be in TypeScript's lib
      const BarcodeDetectorAPI = (window as unknown as { BarcodeDetector?: new (opts: { formats: string[] }) => { detect: (source: HTMLVideoElement) => Promise<{ rawValue: string }[]> } }).BarcodeDetector;

      if (!BarcodeDetectorAPI) return;

      const detector = new BarcodeDetectorAPI({ formats: ['qr_code', 'ean_13', 'ean_8', 'code_128', 'code_39', 'upc_a', 'upc_e'] });
      const barcodes = await detector.detect(videoRef.current);

      if (barcodes.length > 0) {
        const code = barcodes[0].rawValue;
        if (code && !isScanning) {
          await lookupBarcode(code);
        }
      }
    } catch {
      // Silently fail - user can use manual entry
    }
  }, [barcodeDetectorAvailable, isScanning, lookupBarcode]);

  // ==================== CAMERA MANAGEMENT ====================

  const startCamera = useCallback(async () => {
    try {
      // Stop existing stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setCameraActive(true);

      // Check BarcodeDetector support
      const hasDetector = 'BarcodeDetector' in window;
      setBarcodeDetectorAvailable(hasDetector);

      if (hasDetector) {
        // Scan every 500ms
        scanIntervalRef.current = setInterval(detectBarcode, 500);
      }
    } catch {
      setCameraActive(false);
      setScanError(st('scanner.cameraError'));
    }
  }, [facingMode, detectBarcode, st]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = 0;
    }
    setCameraActive(false);
  }, []);

  const toggleTorch = useCallback(async () => {
    if (!streamRef.current) return;
    const track = streamRef.current.getVideoTracks()[0];
    if (!track) return;

    const capabilities = track.getCapabilities?.() as { torch?: boolean } | undefined;
    if (!capabilities?.torch) return;

    try {
      const newTorch = !torchOn;
      await track.applyConstraints({
        advanced: [{ torch: newTorch } as MediaTrackConstraintSet],
      });
      setTorchOn(newTorch);
    } catch {
      // Torch not supported
    }
  }, [torchOn]);

  const switchCamera = useCallback(() => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
    setCameraActive(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  // ==================== SCAN LINE ANIMATION ====================

  useEffect(() => {
    if (!cameraActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let linePos = 0;

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Draw corner brackets (viewfinder)
      const bracketLen = Math.min(w, h) * 0.15;
      const bracketWidth = 3;
      const margin = 30;
      const cornerColor = '#34d399'; // emerald-400

      ctx.strokeStyle = cornerColor;
      ctx.lineWidth = bracketWidth;
      ctx.lineCap = 'round';

      // Top-left
      ctx.beginPath();
      ctx.moveTo(margin, margin + bracketLen);
      ctx.lineTo(margin, margin);
      ctx.lineTo(margin + bracketLen, margin);
      ctx.stroke();

      // Top-right
      ctx.beginPath();
      ctx.moveTo(w - margin - bracketLen, margin);
      ctx.lineTo(w - margin, margin);
      ctx.lineTo(w - margin, margin + bracketLen);
      ctx.stroke();

      // Bottom-left
      ctx.beginPath();
      ctx.moveTo(margin, h - margin - bracketLen);
      ctx.lineTo(margin, h - margin);
      ctx.lineTo(margin + bracketLen, h - margin);
      ctx.stroke();

      // Bottom-right
      ctx.beginPath();
      ctx.moveTo(w - margin - bracketLen, h - margin);
      ctx.lineTo(w - margin, h - margin);
      ctx.lineTo(w - margin, h - margin - bracketLen);
      ctx.stroke();

      // Draw scanning line (amber gradient)
      const lineY = margin + (linePos * (h - 2 * margin));
      const gradient = ctx.createLinearGradient(margin, lineY, w - margin, lineY);
      gradient.addColorStop(0, 'rgba(251, 191, 36, 0)');
      gradient.addColorStop(0.2, 'rgba(251, 191, 36, 0.9)');
      gradient.addColorStop(0.5, 'rgba(251, 146, 60, 1)');
      gradient.addColorStop(0.8, 'rgba(251, 191, 36, 0.9)');
      gradient.addColorStop(1, 'rgba(251, 191, 36, 0)');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(margin, lineY);
      ctx.lineTo(w - margin, lineY);
      ctx.stroke();

      // Glow effect
      const glowGradient = ctx.createLinearGradient(margin, lineY - 15, margin, lineY + 15);
      glowGradient.addColorStop(0, 'rgba(251, 191, 36, 0)');
      glowGradient.addColorStop(0.5, 'rgba(251, 191, 36, 0.15)');
      glowGradient.addColorStop(1, 'rgba(251, 191, 36, 0)');
      ctx.fillStyle = glowGradient;
      ctx.fillRect(margin, lineY - 15, w - 2 * margin, 30);

      // Update scan line position
      linePos += 0.005 * scanLineDirection.current;
      if (linePos >= 1) {
        linePos = 1;
        scanLineDirection.current = -1;
      } else if (linePos <= 0) {
        linePos = 0;
        scanLineDirection.current = 1;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [cameraActive]);

  // ==================== CAMERA EFFECTS ====================

  useEffect(() => {
    if (mode === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [mode, facingMode, startCamera, stopCamera]);

  // ==================== MANUAL ENTRY ====================

  const handleManualSearch = useCallback(() => {
    if (manualBarcode.trim()) {
      lookupBarcode(manualBarcode);
    }
  }, [manualBarcode, lookupBarcode]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleManualSearch();
    }
  }, [handleManualSearch]);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setManualBarcode(text.trim());
      }
    } catch {
      // Clipboard API not available
    }
  }, []);

  const handleRecentClick = useCallback((barcode: string) => {
    setManualBarcode(barcode);
    setMode('manual');
    lookupBarcode(barcode);
  }, [lookupBarcode]);

  const clearHistory = useCallback(() => {
    setRecentScans([]);
  }, []);

  // ==================== RENDER HELPERS ====================

  const formatTime = (timestamp: number) => {
    const d = new Date(timestamp);
    return d.toLocaleTimeString(locale === 'en' ? 'en-US' : 'ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusStyle = (status: string) => {
    return statusStyles[status] || 'bg-slate-500/10 text-slate-500 border-slate-500/20';
  };

  // ==================== RENDER ====================

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6" dir={locale === 'en' ? 'ltr' : 'rtl'}>
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-amber-500/10">
          <ScanLine className="w-6 h-6 text-amber-500" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            {st('scanner.title')}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {st('scanner.subtitle')}
          </p>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800/60 rounded-xl">
        <button
          onClick={() => setMode('camera')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
            mode === 'camera'
              ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          {cameraActive ? (
            <Camera className="w-4 h-4" />
          ) : (
            <CameraOff className="w-4 h-4" />
          )}
          {st('scanner.scan')}
        </button>
        <button
          onClick={() => setMode('manual')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
            mode === 'manual'
              ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <Type className="w-4 h-4" />
          {st('scanner.manual')}
        </button>
      </div>

      {/* Camera Scanner Area */}
      {mode === 'camera' && (
        <Card className="overflow-hidden border-0 dark:bg-slate-800/40 bg-slate-50">
          <CardContent className="p-0">
            <div className="relative aspect-[4/3] bg-slate-950 dark:bg-slate-900 rounded-t-xl overflow-hidden">
              {/* Video Feed */}
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                playsInline
                muted
                autoPlay
              />

              {/* Canvas Overlay */}
              <canvas
                ref={canvasRef}
                width={640}
                height={480}
                className="absolute inset-0 w-full h-full pointer-events-none"
              />

              {/* Camera Controls Overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <div className="flex items-center justify-center gap-3">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white/90 hover:text-white hover:bg-white/20"
                    onClick={switchCamera}
                    aria-label={st('scanner.switchCamera')}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`text-white/90 hover:text-white hover:bg-white/20 ${torchOn ? 'bg-amber-500/30' : ''}`}
                    onClick={toggleTorch}
                    aria-label={torchOn ? st('scanner.torchOff') : st('scanner.torchOn')}
                  >
                    <Zap className={`w-4 h-4 ${torchOn ? 'text-amber-400' : ''}`} />
                  </Button>
                </div>
              </div>

              {/* Camera not available overlay */}
              {!cameraActive && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 text-center p-6">
                  <CameraOff className="w-12 h-12 text-slate-500 mb-3" />
                  <p className="text-sm text-slate-400 max-w-xs">
                    {st('scanner.cameraUnavailable')}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Manual Entry Area */}
      {mode === 'manual' && (
        <Card className="border-0 dark:bg-slate-800/40 bg-slate-50">
          <CardContent className="p-6 space-y-4">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Input
                  value={manualBarcode}
                  onChange={(e) => setManualBarcode(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={st('scanner.placeholder')}
                  className="h-14 text-lg bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-700 focus:border-amber-500 dark:focus:border-amber-500 text-right"
                  dir="ltr"
                  autoFocus
                  disabled={isScanning}
                />
              </div>
              <Button
                onClick={handleManualSearch}
                disabled={isScanning || !manualBarcode.trim()}
                className="h-14 px-6 bg-amber-500 hover:bg-amber-600 text-white"
              >
                {isScanning ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
              </Button>
            </div>
            <div className="flex justify-start">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePaste}
                className="text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400"
              >
                {st('scanner.paste')}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Scanning Indicator */}
      {isScanning && (
        <div className="flex items-center justify-center gap-2 py-3">
          <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
          <span className="text-sm text-amber-600 dark:text-amber-400 font-medium">
            {st('scanner.scanning')}
          </span>
        </div>
      )}

      {/* Scan Result - CARGO */}
      {scanResult?.type === 'CARGO' && !isScanning && (
        <Card className="border-0 dark:bg-slate-800/40 bg-slate-50 overflow-hidden">
          <div className="h-1 bg-emerald-500" />
          <CardContent className="p-5 space-y-4">
            {/* Type Badge + Found indicator */}
            <div className="flex items-center justify-between">
              <Badge
                variant="outline"
                className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 gap-1.5 px-3 py-1"
              >
                <Package className="w-3.5 h-3.5" />
                {st('scanner.cargoItem')}
              </Badge>
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-xs font-medium">{st('scanner.found')}</span>
              </div>
            </div>

            {/* Cargo Info */}
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">Code</p>
                  <p className="font-bold text-slate-900 dark:text-white text-lg" dir="ltr">
                    {(scanResult.data as Record<string, string>).cargoCode}
                  </p>
                </div>
                <Badge variant="outline" className={getStatusStyle((scanResult.data as Record<string, string>).status)}>
                  {translateStatus((scanResult.data as Record<string, string>).status as CargoStatus, locale as 'ar' | 'en')}
                </Badge>
              </div>

              {(scanResult.data as Record<string, string>).description && (
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {(scanResult.data as Record<string, string>).description}
                </p>
              )}

              <Separator className="bg-slate-200 dark:bg-slate-700/50" />

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3">
                {(scanResult.data as Record<string, unknown>).location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-[10px] text-slate-400">Location</p>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200" dir="ltr">
                        {((scanResult.data as Record<string, { code?: string }>).location)?.code || '-'}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-[10px] text-slate-400">{st('scanner.weight')}</p>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      {(scanResult.data as Record<string, number>).weight} {st('scanner.ton')}
                    </p>
                  </div>
                </div>
                {(scanResult.data as Record<string, string>).clientName && (
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-[10px] text-slate-400">{st('scanner.client')}</p>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                        {(scanResult.data as Record<string, string>).clientName}
                      </p>
                    </div>
                  </div>
                )}
                {(scanResult.data as Record<string, number>).storageDays !== undefined && (
                  <div className="flex items-center gap-2">
                    <History className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-[10px] text-slate-400">Storage</p>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                        {(scanResult.data as Record<string, number>).storageDays} {st('scanner.days')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <Separator className="bg-slate-200 dark:bg-slate-700/50" />
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60"
              >
                <Eye className="w-4 h-4 me-2" />
                {st('scanner.viewDetails')}
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10"
              >
                <ArrowRightLeft className="w-4 h-4 me-2" />
                {st('scanner.changeStatus')}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Scan Result - LOCATION */}
      {scanResult?.type === 'LOCATION' && !isScanning && (
        <Card className="border-0 dark:bg-slate-800/40 bg-slate-50 overflow-hidden">
          <div className="h-1 bg-blue-500" />
          <CardContent className="p-5 space-y-4">
            {/* Type Badge + Found indicator */}
            <div className="flex items-center justify-between">
              <Badge
                variant="outline"
                className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 gap-1.5 px-3 py-1"
              >
                <MapPin className="w-3.5 h-3.5" />
                {st('scanner.location')}
              </Badge>
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-xs font-medium">{st('scanner.found')}</span>
              </div>
            </div>

            {/* Location Info */}
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">Code</p>
                  <p className="font-bold text-slate-900 dark:text-white text-lg" dir="ltr">
                    {(scanResult.data as Record<string, string>).code}
                  </p>
                </div>
                <Badge variant="outline" className="bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20">
                  {translateLocationType((scanResult.data as Record<string, string>).type as LocationType, locale as 'ar' | 'en')}
                </Badge>
              </div>

              {(scanResult.data as Record<string, string>).name && (
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {(scanResult.data as Record<string, string>).name}
                </p>
              )}

              <Separator className="bg-slate-200 dark:bg-slate-700/50" />

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3">
                {(scanResult.data as Record<string, string>).zone && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-[10px] text-slate-400">{st('scanner.zone')}</p>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                        {(scanResult.data as Record<string, string>).zone}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-[10px] text-slate-400">{st('scanner.currentLoad')}</p>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      {(scanResult.data as Record<string, number>).currentItems || 0} {st('scanner.items')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <Separator className="bg-slate-200 dark:bg-slate-700/50" />
            <Button
              variant="outline"
              className="w-full border-blue-500/30 text-blue-600 dark:text-blue-400 hover:bg-blue-500/10"
            >
              <Eye className="w-4 h-4 me-2" />
              {st('scanner.viewInventory')}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Not Found Error State */}
      {scanError && !isScanning && (
        <Card className="border-0 dark:bg-slate-800/40 bg-slate-50 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-3 rounded-full bg-red-500/10">
                <XCircle className="w-8 h-8 text-red-500" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {st('scanner.notFound')}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {scanError}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Scans */}
      {recentScans.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-slate-400" />
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {st('scanner.recentScans')}
              </h3>
              <Badge variant="secondary" className="text-xs">
                {recentScans.length}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearHistory}
              className="text-slate-400 hover:text-red-500 h-7 px-2"
            >
              <Trash2 className="w-3.5 h-3.5 me-1" />
              {st('scanner.clearHistory')}
            </Button>
          </div>

          <Card className="border-0 dark:bg-slate-800/40 bg-slate-50 overflow-hidden">
            <ScrollArea className="max-h-96">
              <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {recentScans.map((record) => (
                  <button
                    key={`${record.barcode}-${record.timestamp}`}
                    onClick={() => handleRecentClick(record.barcode)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700/30 transition-colors text-start"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`p-1.5 rounded-md ${
                        record.type === 'CARGO'
                          ? 'bg-emerald-500/10'
                          : record.type === 'LOCATION'
                            ? 'bg-blue-500/10'
                            : 'bg-red-500/10'
                      }`}
                      >
                        {record.type === 'CARGO' ? (
                          <Package className={`w-3.5 h-3.5 ${
                            record.type === 'CARGO' ? 'text-emerald-500' : 'text-blue-500'
                          }`} />
                        ) : record.type === 'LOCATION' ? (
                          <MapPin className="w-3.5 h-3.5 text-blue-500" />
                        ) : (
                          <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate" dir="ltr">
                          {record.barcode}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {record.type === 'CARGO'
                            ? st('scanner.cargoItem')
                            : record.type === 'LOCATION'
                              ? st('scanner.location')
                              : st('scanner.notFound')
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] text-slate-400">
                        {formatTime(record.timestamp)}
                      </span>
                      <ChevronRight className={`w-4 h-4 text-slate-300 dark:text-slate-600 ${locale === 'en' ? '' : 'rotate-180'}`} />
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>
      )}
    </div>
  );
}
