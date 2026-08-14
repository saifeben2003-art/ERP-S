import { useAppStore } from './store';
import {
  translateStatus, translateCategory, translateCommodity,
  translateEquipmentType, translateMovementType, translateLocationType,
  translateSyncStatus, translateSyncDirection,
} from './translations';

function escapeCsvField(value: unknown): string {
  const str = value === null || value === undefined ? '' : String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function downloadCsv(filename: string, csvContent: string) {
  // Add BOM for Excel UTF-8 support
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportCargoToCsv(items: Record<string, unknown>[]) {
  const locale = useAppStore.getState().locale;
  const headers = ['Code', 'Description', 'Weight (kg)', 'L (m)', 'W (m)', 'H (m)', 'Volume (CBM)', 'Category', 'Commodity', 'Status', 'Location', 'Project', 'Client', 'PO Ref', 'BL Ref', 'Created'];
  const rows = items.map((item) => [
    item.cargoCode, item.description, item.weight, item.length, item.width, item.height,
    item.volume || '', translateCategory(item.liftCategory as string, locale),
    translateCommodity(item.commodityType as string, locale),
    translateStatus(item.status as string, locale),
    (item as Record<string, unknown>).locationName || '',
    (item as Record<string, unknown>).projectName || '',
    item.clientName || '', item.poReference || '', item.blReference || '',
    item.createdAt ? new Date(item.createdAt as string).toLocaleDateString() : '',
  ]);
  const csv = [headers.map(escapeCsvField).join(','), ...rows.map((r) => r.map(escapeCsvField).join(','))].join('\n');
  downloadCsv(`cargo-export-${new Date().toISOString().slice(0, 10)}.csv`, csv);
}

export function exportProjectsToCsv(items: Record<string, unknown>[]) {
  const locale = useAppStore.getState().locale;
  const headers = ['Code', 'Name', 'Client', 'Status', 'Destination', 'Vessel', 'ETD', 'ETA', 'Items', 'Weight (tonnes)', 'Volume (CBM)'];
  const rows = items.map((item) => [
    item.projectCode, item.name, item.clientName,
    translateStatus(item.status as string, locale),
    item.destination || '', item.vesselName || '',
    item.etd ? new Date(item.etd as string).toLocaleDateString() : '',
    item.eta ? new Date(item.eta as string).toLocaleDateString() : '',
    item.totalItems, item.totalWeight, item.totalVolume,
  ]);
  const csv = [headers.map(escapeCsvField).join(','), ...rows.map((r) => r.map(escapeCsvField).join(','))].join('\n');
  downloadCsv(`projects-export-${new Date().toISOString().slice(0, 10)}.csv`, csv);
}

export function exportLocationsToCsv(items: Record<string, unknown>[]) {
  const locale = useAppStore.getState().locale;
  const headers = ['Code', 'Name', 'Type', 'Zone', 'Max Weight (t)', 'Max Dimension', 'Area (m²)', 'Current Load', 'Status'];
  const rows = items.map((item) => [
    item.code, item.name, translateLocationType(item.type as string, locale),
    item.zone || '', item.maxWeight || '', item.maxDimension || '',
    item.area || '', item.currentLoad,
    item.isActive ? 'Active' : 'Inactive',
  ]);
  const csv = [headers.map(escapeCsvField).join(','), ...rows.map((r) => r.map(escapeCsvField).join(','))].join('\n');
  downloadCsv(`locations-export-${new Date().toISOString().slice(0, 10)}.csv`, csv);
}

export function exportEquipmentToCsv(items: Record<string, unknown>[]) {
  const locale = useAppStore.getState().locale;
  const headers = ['Code', 'Name', 'Type', 'Capacity (t)', 'Manufacturer', 'Model', 'Serial No.', 'Status', 'Location', 'Cert Expiry'];
  const rows = items.map((item) => [
    item.equipmentCode, item.name, translateEquipmentType(item.type as string, locale),
    item.capacity || '', item.manufacturer || '', item.model || '', item.serialNumber || '',
    translateStatus(item.status as string, locale),
    item.currentLocation || '',
    item.certExpiry ? new Date(item.certExpiry as string).toLocaleDateString() : '',
  ]);
  const csv = [headers.map(escapeCsvField).join(','), ...rows.map((r) => r.map(escapeCsvField).join(','))].join('\n');
  downloadCsv(`equipment-export-${new Date().toISOString().slice(0, 10)}.csv`, csv);
}

export function exportMovementsToCsv(items: Record<string, unknown>[]) {
  const locale = useAppStore.getState().locale;
  const headers = ['Ref', 'Date', 'Cargo Code', 'Type', 'From', 'To', 'Equipment', 'Operator', 'Weight (kg)', 'Remarks'];
  const rows = items.map((item) => [
    item.movementRef,
    item.createdAt ? new Date(item.createdAt as string).toLocaleString() : '',
    item.cargoCode, translateMovementType(item.type as string, locale),
    (item as Record<string, unknown>).fromLocationCode || '',
    (item as Record<string, unknown>).toLocationCode || '',
    item.equipmentUsed || '', item.operatorName || '',
    item.actualWeight || '', item.remarks || '',
  ]);
  const csv = [headers.map(escapeCsvField).join(','), ...rows.map((r) => r.map(escapeCsvField).join(','))].join('\n');
  downloadCsv(`movements-export-${new Date().toISOString().slice(0, 10)}.csv`, csv);
}
