'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CargoItem, Movement, CargoStatus } from '@/types/wms';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Search,
  MapPin,
  Clock,
  Package,
  Truck,
  Warehouse,
  ArrowRight,
  Filter,
  Ship,
  CheckCircle2,
  X,
  Move,
  ScanLine,
} from 'lucide-react';
import { format } from 'date-fns';

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const STATUS_TABS: { label: string; value: CargoStatus | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'In Transit', value: 'IN_TRANSIT' },
  { label: 'Received', value: 'RECEIVED' },
  { label: 'In Yard', value: 'IN_YARD' },
  { label: 'In Warehouse', value: 'IN_WAREHOUSE' },
  { label: 'Dispatched', value: 'DISPATCHED' },
  { label: 'Delivered', value: 'DELIVERED' },
];

const STATUS_VARIANT: Record<CargoStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  IN_TRANSIT: 'outline',
  RECEIVED: 'secondary',
  IN_YARD: 'default',
  IN_WAREHOUSE: 'default',
  DISPATCHED: 'outline',
  DELIVERED: 'destructive',
};

const STATUS_LABEL: Record<CargoStatus, string> = {
  IN_TRANSIT: 'In Transit',
  RECEIVED: 'Received',
  IN_YARD: 'In Yard',
  IN_WAREHOUSE: 'In Warehouse',
  DISPATCHED: 'Dispatched',
  DELIVERED: 'Delivered',
};

const STATUS_ICON: Record<CargoStatus, React.ReactNode> = {
  IN_TRANSIT: <Ship className="h-4 w-4" />,
  RECEIVED: <CheckCircle2 className="h-4 w-4" />,
  IN_YARD: <MapPin className="h-4 w-4" />,
  IN_WAREHOUSE: <Warehouse className="h-4 w-4" />,
  DISPATCHED: <Truck className="h-4 w-4" />,
  DELIVERED: <CheckCircle2 className="h-4 w-4" />,
};

const MOVEMENT_COLORS: Record<string, string> = {
  RECEIVE: 'bg-green-500',
  MOVE: 'bg-blue-500',
  DISPATCH: 'bg-purple-500',
  INSPECT: 'bg-amber-500',
};

const MOVEMENT_ICON: Record<string, React.ReactNode> = {
  RECEIVE: <Package className="h-4 w-4" />,
  MOVE: <Move className="h-4 w-4" />,
  DISPATCH: <Truck className="h-4 w-4" />,
  INSPECT: <ScanLine className="h-4 w-4" />,
};

const MOVEMENT_BADGE: Record<string, string> = {
  RECEIVE: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  MOVE: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  DISPATCH: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  INSPECT: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

function formatDateTime(iso: string) {
  try {
    return format(new Date(iso), 'MMM d, yyyy HH:mm');
  } catch {
    return iso;
  }
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                    */
/* ------------------------------------------------------------------ */

function ShipmentCard({
  item,
  onClick,
}: {
  item: CargoItem;
  onClick: () => void;
}) {
  return (
    <Card
      className="cursor-pointer transition-all hover:border-amber-500/60 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <CardTitle className="truncate text-sm font-semibold">
              {item.cargoCode ?? item.description}
            </CardTitle>
            <CardDescription className="mt-0.5 truncate text-xs">
              {item.blReference}
            </CardDescription>
          </div>
          <Badge variant={STATUS_VARIANT[item.status]} className="ml-2 shrink-0 gap-1">
            {STATUS_ICON[item.status]}
            {STATUS_LABEL[item.status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
        {item.poReference && (
          <div className="flex items-center gap-1.5">
            <Package className="h-3.5 w-3.5" />
            <span className="truncate">PO: {item.poReference}</span>
          </div>
        )}
        {item.description && (
          <p className="line-clamp-2 leading-relaxed">{item.description}</p>
        )}
        <div className="flex items-center justify-between pt-1">
          {item.weight && (
            <span className="font-medium dark:text-slate-300">{item.weight} kg</span>
          )}
          {item.lastMovedAt && (
            <span className="flex items-center gap-1 text-slate-400">
              <Clock className="h-3 w-3" />
              {formatDateTime(item.lastMovedAt)}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function MovementTimeline({ movements }: { movements: Movement[] }) {
  if (movements.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-400">
        <Clock className="mb-2 h-8 w-8" />
        <p className="text-sm">No movement history available.</p>
      </div>
    );
  }

  return (
    <div className="relative space-y-0">
      {movements.map((m, i) => {
        const isLast = i === movements.length - 1;
        const color = MOVEMENT_COLORS[m.type] ?? 'bg-slate-400';
        const badgeCls = MOVEMENT_BADGE[m.type] ?? 'bg-slate-100 text-slate-700';
        const icon = MOVEMENT_ICON[m.type] ?? <Move className="h-4 w-4" />;

        return (
          <div key={m.id ?? i} className="relative flex gap-4 pb-8">
            {/* Line + node */}
            <div className="relative flex flex-col items-center">
              <span
                className={`z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white shadow ${color}`}
              >
                {icon}
              </span>
              {!isLast && <span className="absolute top-8 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" />}
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${badgeCls}`}
                >
                  {m.type}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Clock className="h-3 w-3" />
                  {formatDateTime(m.timestamp ?? m.createdAt ?? '')}
                </span>
              </div>

              {(m.fromLocation || m.toLocation) && (
                <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-sm dark:text-slate-300">
                  {m.fromLocation && <span>{m.fromLocation}</span>}
                  {m.fromLocation && m.toLocation && (
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  )}
                  {m.toLocation && <span>{m.toLocation}</span>}
                </div>
              )}

              {m.operator && (
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Operator: {m.operator}
                </p>
              )}
              {m.notes && (
                <p className="mt-1 text-xs italic text-slate-400">{m.notes}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MapPlaceholder() {
  return (
    <Card className="dark:border-slate-700 dark:bg-slate-800">
      <CardContent className="flex h-full min-h-[220px] flex-col items-center justify-center gap-3 text-slate-400">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
          <MapPin className="h-7 w-7 text-amber-600 dark:text-amber-400" />
        </div>
        <p className="text-sm font-medium dark:text-slate-300">Live Map Tracking</p>
        <p className="text-xs">Coming Soon</p>
      </CardContent>
    </Card>
  );
}

function DetailSkeleton() {
  return (
    <div className="space-y-4 p-4">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="space-y-3 pt-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CardSkeleton() {
  return (
    <Card className="dark:border-slate-700 dark:bg-slate-800">
      <CardHeader className="pb-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="mt-1 h-3 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
        <div className="flex justify-between">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-28" />
        </div>
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                         */
/* ------------------------------------------------------------------ */

export function TrackingPage() {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<CargoStatus | 'ALL'>('ALL');
  const [cargoItems, setCargoItems] = useState<CargoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCargo, setSelectedCargo] = useState<CargoItem | null>(null);
  const [movements, setMovements] = useState<Movement[]>([]);
  const [movementsLoading, setMovementsLoading] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const debouncedQuery = useDebounce(query, 400);

  /* --- Fetch cargo --- */
  const fetchCargo = useCallback(async (search: string) => {
    abortRef.current?.abort();
  const ctrl = new AbortController();
    abortRef.current = ctrl;
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      const res = await fetch(`/api/cargo?${params}`, { signal: ctrl.signal });
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setCargoItems(data.items ?? []);
    } catch (err) {
      if ((err as DOMException).name !== 'AbortError') {
        setCargoItems([]);
      }
    } finally {
      if (!ctrl.signal.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCargo(debouncedQuery);
  }, [debouncedQuery, fetchCargo]);

  /* --- Fetch movements --- */
  const fetchMovements = useCallback(async (cargoId: string) => {
    setMovementsLoading(true);
    try {
      const res = await fetch(`/api/movements?cargoId=${cargoId}`);
      if (!res.ok) throw new Error('Failed to fetch movements');
      const data = await res.json();
      setMovements(data.movements ?? []);
    } catch {
      setMovements([]);
    } finally {
      setMovementsLoading(false);
    }
  }, []);

  /* --- Select cargo --- */
  const handleSelectCargo = useCallback(
    (item: CargoItem) => {
      setSelectedCargo(item);
      setSheetOpen(true);
      setMovements([]);
      if (item.id) fetchMovements(item.id);
    },
    [fetchMovements],
  );

  const handleDesktopSelect = useCallback(
    (item: CargoItem) => {
      setSelectedCargo(item);
      setMovements([]);
      if (item.id) fetchMovements(item.id);
    },
    [fetchMovements],
  );

  /* --- Filtered items --- */
  const filteredItems = useMemo(
    () =>
      activeTab === 'ALL'
        ? cargoItems
        : cargoItems.filter((c) => c.status === activeTab),
    [cargoItems, activeTab],
  );

  /* ---------------------------------------------------------------- */

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 md:p-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Shipment Tracking
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Search and track cargo across the entire supply chain.
        </p>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search by cargo code, BL ref, PO ref…"
            className="pl-9 dark:border-slate-700 dark:bg-slate-800"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 dark:border-slate-700"
          onClick={() => setActiveTab('ALL')}
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Status tabs */}
      <div className="flex flex-wrap gap-2">
        {STATUS_TABS.map((tab) => {
          const isActive = activeTab === tab.value;
          return (
            <Button
              key={tab.value}
              variant={isActive ? 'default' : 'outline'}
              size="sm"
              className={
                isActive
                  ? 'bg-amber-600 text-white hover:bg-amber-700'
                  : 'dark:border-slate-700 dark:text-slate-400'
              }
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </Button>
          );
        })}
      </div>

      {/* Main content area: list + detail (desktop) / list only (mobile with sheet) */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Left: card grid (3 cols) */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 py-16 dark:border-slate-700">
              <Package className="mb-3 h-10 w-10 text-slate-300 dark:text-slate-600" />
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                No shipments found
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Try adjusting your search or filter.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredItems.map((item) => (
                <ShipmentCard
                  key={item.id}
                  item={item}
                  onClick={() =>
                    /* on large screens use desktop panel, on small open sheet */
                    window.innerWidth >= 1024
                      ? handleDesktopSelect(item)
                      : handleSelectCargo(item)
                  }
                />
              ))}
            </div>
          )}
        </div>

        {/* Right: detail panel (desktop only) */}
        <div className="hidden space-y-4 lg:col-span-2 lg:block">
          {selectedCargo ? (
            <>
              <Card className="dark:border-slate-700 dark:bg-slate-800">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-base">
                        {selectedCargo.cargoCode ?? selectedCargo.description}
                      </CardTitle>
                      <CardDescription className="mt-0.5">
                        {selectedCargo.blReference}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      onClick={() => {
                        setSelectedCargo(null);
                        setMovements([]);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm dark:text-slate-300">
                  <Badge
                    variant={STATUS_VARIANT[selectedCargo.status]}
                    className="gap-1"
                  >
                    {STATUS_ICON[selectedCargo.status]}
                    {STATUS_LABEL[selectedCargo.status]}
                  </Badge>
                  {selectedCargo.poReference && (
                    <p>PO: {selectedCargo.poReference}</p>
                  )}
                  {selectedCargo.description && (
                    <p className="text-slate-600 dark:text-slate-400">
                      {selectedCargo.description}
                    </p>
                  )}
                  {selectedCargo.weight && <p>Weight: {selectedCargo.weight} kg</p>}
                  {selectedCargo.dimensions && (
                    <p>Dimensions: {selectedCargo.dimensions}</p>
                  )}
                </CardContent>
              </Card>

              {/* Map placeholder */}
              <MapPlaceholder />

              {/* Timeline */}
              <Card className="dark:border-slate-700 dark:bg-slate-800">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                    <Clock className="h-4 w-4 text-amber-500" />
                    Movement History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {movementsLoading ? (
                    <DetailSkeleton />
                  ) : (
                    <MovementTimeline movements={movements} />
                  )}
                </CardContent>
              </Card>
            </>
          ) : (
            <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 text-slate-400 dark:border-slate-700">
              <Truck className="mb-3 h-10 w-10" />
              <p className="text-sm">Select a shipment to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sheet for detail */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto rounded-t-2xl dark:border-slate-700 dark:bg-slate-900">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              {selectedCargo?.cargoCode ?? selectedCargo?.description ?? 'Shipment Details'}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            {selectedCargo && (
              <Card className="dark:border-slate-700 dark:bg-slate-800">
                <CardContent className="space-y-2 pt-4 text-sm dark:text-slate-300">
                  <Badge
                    variant={STATUS_VARIANT[selectedCargo.status]}
                    className="gap-1"
                  >
                    {STATUS_ICON[selectedCargo.status]}
                    {STATUS_LABEL[selectedCargo.status]}
                  </Badge>
                  {selectedCargo.blReference && <p>BL: {selectedCargo.blReference}</p>}
                  {selectedCargo.poReference && <p>PO: {selectedCargo.poReference}</p>}
                  {selectedCargo.description && (
                    <p className="text-slate-500 dark:text-slate-400">
                      {selectedCargo.description}
                    </p>
                  )}
                  {selectedCargo.weight && <p>Weight: {selectedCargo.weight} kg</p>}
                  {selectedCargo.dimensions && (
                    <p>Dimensions: {selectedCargo.dimensions}</p>
                  )}
                </CardContent>
              </Card>
            )}
            <MapPlaceholder />
            <Card className="dark:border-slate-700 dark:bg-slate-800">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                  <Clock className="h-4 w-4 text-amber-500" />
                  Movement History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {movementsLoading ? (
                  <DetailSkeleton />
                ) : (
                  <MovementTimeline movements={movements} />
                )}
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
