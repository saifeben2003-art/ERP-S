// ==================== PDF Report Templates (using @react-pdf/renderer) ====================
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register Cairo font for Arabic + bilingual support
Font.register({
  family: 'Cairo',
  fonts: [
    {
      src: '/fonts/Cairo-Regular.ttf',
      fontWeight: 'normal',
    },
    {
      src: '/fonts/Cairo-Regular.ttf',
      fontWeight: 'bold',
    },
  ],
});

// Dynamic footer component with page numbers
function ReportFooter() {
  return (
    <View style={styles.footer} fixed>
      <Text style={styles.footerText}>CL WMS — Combi Lift | Confidential</Text>
      <Text style={styles.footerText} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
    </View>
  );
}

// Cairo font registered above — supports both Arabic and Latin characters

const COLORS = {
  primary: '#0F172A',
  secondary: '#1E293B',
  accent: '#059669',
  warning: '#F59E0B',
  danger: '#EF4444',
  text: '#334155',
  muted: '#64748B',
  border: '#E2E8F0',
  bg: '#F8FAFC',
  white: '#FFFFFF',
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Cairo',
    fontSize: 10,
    color: COLORS.text,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottom: `2px solid ${COLORS.primary}`,
  },
  headerLeft: {
    flexDirection: 'column',
  },
  company: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 10,
    color: COLORS.muted,
  },
  headerRight: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  reportTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  date: {
    fontSize: 9,
    color: COLORS.muted,
  },
  table: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    padding: 6,
  },
  tableHeaderCell: {
    fontSize: 9,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 5,
    borderBottom: `0.5px solid ${COLORS.border}`,
  },
  tableRowAlt: {
    flexDirection: 'row',
    padding: 5,
    borderBottom: `0.5px solid ${COLORS.border}`,
    backgroundColor: COLORS.bg,
  },
  tableCell: {
    fontSize: 9,
    color: COLORS.text,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTop: `1px solid ${COLORS.border}`,
    paddingTop: 8,
  },
  footerText: {
    fontSize: 8,
    color: COLORS.muted,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  kpiCard: {
    width: '23%',
    padding: 10,
    backgroundColor: COLORS.bg,
    borderRadius: 4,
    border: `1px solid ${COLORS.border}`,
  },
  kpiLabel: {
    fontSize: 8,
    color: COLORS.muted,
    marginBottom: 4,
  },
  kpiValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 15,
    marginBottom: 8,
    paddingBottom: 4,
    borderBottom: `1px solid ${COLORS.border}`,
  },
});

// Helper for column widths
function colWidths(columns: number[], pageWidth: number = 515): Record<string, { width: number }> {
  const result: Record<string, { width: number }> = {};
  columns.forEach((pct, i) => {
    result[`col${i}`] = { width: (pct / 100) * pageWidth };
  });
  return result;
}

// ==================== Inventory Report PDF ====================
export interface InventoryReportData {
  totalCargo: number;
  totalWeight: number;
  totalVolume: number;
  items: Array<{
    cargoCode: string;
    description: string;
    status: string;
    location: string;
    weight: number;
    liftCategory: string;
    commodityType: string;
    customsStatus: string;
  }>;
}

export function InventoryReportPDF({ data }: { data: InventoryReportData }) {
  const cols = colWidths([12, 22, 12, 12, 10, 12, 10, 10]);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.company}>CL WMS — Combi Lift</Text>
            <Text style={styles.subtitle}>Heavy Lift Warehouse Management System</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.reportTitle}>Inventory Report</Text>
            <Text style={styles.date}>{new Date().toISOString().split('T')[0]}</Text>
          </View>
        </View>

        {/* KPIs */}
        <View style={styles.kpiGrid}>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>TOTAL CARGO</Text>
            <Text style={styles.kpiValue}>{data.totalCargo}</Text>
          </View>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>TOTAL WEIGHT</Text>
            <Text style={styles.kpiValue}>{data.totalWeight.toLocaleString()} kg</Text>
          </View>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>TOTAL VOLUME</Text>
            <Text style={styles.kpiValue}>{data.totalVolume.toLocaleString()} CBM</Text>
          </View>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>LOCATIONS</Text>
            <Text style={styles.kpiValue}>{new Set(data.items.map(i => i.location)).size}</Text>
          </View>
        </View>

        {/* Table */}
        <Text style={styles.sectionTitle}>Cargo Inventory Details</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, cols.col0]}>Code</Text>
            <Text style={[styles.tableHeaderCell, cols.col1]}>Description</Text>
            <Text style={[styles.tableHeaderCell, cols.col2]}>Status</Text>
            <Text style={[styles.tableHeaderCell, cols.col3]}>Location</Text>
            <Text style={[styles.tableHeaderCell, cols.col4]}>Weight</Text>
            <Text style={[styles.tableHeaderCell, cols.col5]}>Category</Text>
            <Text style={[styles.tableHeaderCell, cols.col6]}>Type</Text>
            <Text style={[styles.tableHeaderCell, cols.col7]}>Customs</Text>
          </View>
          {data.items.map((item, idx) => (
            <View style={idx % 2 === 1 ? styles.tableRowAlt : styles.tableRow} key={idx}>
              <Text style={[styles.tableCell, cols.col0]}>{item.cargoCode}</Text>
              <Text style={[styles.tableCell, cols.col1]}>{item.description.substring(0, 30)}</Text>
              <Text style={[styles.tableCell, cols.col2]}>{item.status}</Text>
              <Text style={[styles.tableCell, cols.col3]}>{item.location}</Text>
              <Text style={[styles.tableCell, cols.col4]}>{item.weight.toLocaleString()}</Text>
              <Text style={[styles.tableCell, cols.col5]}>{item.liftCategory}</Text>
              <Text style={[styles.tableCell, cols.col6]}>{item.commodityType}</Text>
              <Text style={[styles.tableCell, cols.col7]}>{item.customsStatus}</Text>
            </View>
          ))}
        </View>

        <ReportFooter />
      </Page>
    </Document>
  );
}

// ==================== Movements Report PDF ====================
export interface MovementsReportData {
  totalMovements: number;
  movements: Array<{
    movementRef: string;
    cargoCode: string;
    type: string;
    fromLocation: string;
    toLocation: string;
    equipment: string;
    operator: string;
    date: string;
  }>;
}

export function MovementsReportPDF({ data }: { data: MovementsReportData }) {
  const cols = colWidths([14, 14, 10, 12, 12, 14, 12, 12]);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.company}>CL WMS — Combi Lift</Text>
            <Text style={styles.subtitle}>Heavy Lift Warehouse Management System</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.reportTitle}>Movements Log</Text>
            <Text style={styles.date}>{new Date().toISOString().split('T')[0]}</Text>
          </View>
        </View>

        <View style={styles.kpiGrid}>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>TOTAL MOVEMENTS</Text>
            <Text style={styles.kpiValue}>{data.totalMovements}</Text>
          </View>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>RECEIVES</Text>
            <Text style={styles.kpiValue}>{data.movements.filter(m => m.type === 'RECEIVE').length}</Text>
          </View>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>MOVES</Text>
            <Text style={styles.kpiValue}>{data.movements.filter(m => m.type === 'MOVE').length}</Text>
          </View>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>DISPATCHES</Text>
            <Text style={styles.kpiValue}>{data.movements.filter(m => m.type === 'DISPATCH').length}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Movement Records</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, cols.col0]}>Reference</Text>
            <Text style={[styles.tableHeaderCell, cols.col1]}>Cargo</Text>
            <Text style={[styles.tableHeaderCell, cols.col2]}>Type</Text>
            <Text style={[styles.tableHeaderCell, cols.col3]}>From</Text>
            <Text style={[styles.tableHeaderCell, cols.col4]}>To</Text>
            <Text style={[styles.tableHeaderCell, cols.col5]}>Equipment</Text>
            <Text style={[styles.tableHeaderCell, cols.col6]}>Operator</Text>
            <Text style={[styles.tableHeaderCell, cols.col7]}>Date</Text>
          </View>
          {data.movements.map((m, idx) => (
            <View style={idx % 2 === 1 ? styles.tableRowAlt : styles.tableRow} key={idx}>
              <Text style={[styles.tableCell, cols.col0]}>{m.movementRef}</Text>
              <Text style={[styles.tableCell, cols.col1]}>{m.cargoCode}</Text>
              <Text style={[styles.tableCell, cols.col2]}>{m.type}</Text>
              <Text style={[styles.tableCell, cols.col3]}>{m.fromLocation || '—'}</Text>
              <Text style={[styles.tableCell, cols.col4]}>{m.toLocation || '—'}</Text>
              <Text style={[styles.tableCell, cols.col5]}>{m.equipment || '—'}</Text>
              <Text style={[styles.tableCell, cols.col6]}>{m.operator || '—'}</Text>
              <Text style={[styles.tableCell, cols.col7]}>{m.date}</Text>
            </View>
          ))}
        </View>

        <ReportFooter />
      </Page>
    </Document>
  );
}

// ==================== Generic Single-Entity Report PDF ====================
export interface GenericReportData {
  title: string;
  subtitle: string;
  columns: string[];
  rows: string[][];
  summary?: Array<{ label: string; value: string }>;
}

export function GenericReportPDF({ data }: { data: GenericReportData }) {
  const colCount = data.columns.length;
  const evenWidth = Math.floor(100 / colCount);
  const widths = data.columns.map(() => evenWidth);
  const cols = colWidths(widths);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.company}>CL WMS — Combi Lift</Text>
            <Text style={styles.subtitle}>Heavy Lift Warehouse Management System</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.reportTitle}>{data.title}</Text>
            <Text style={styles.date}>{data.subtitle} | {new Date().toISOString().split('T')[0]}</Text>
          </View>
        </View>

        {data.summary && data.summary.length > 0 && (
          <View style={styles.kpiGrid}>
            {data.summary.map((s, i) => (
              <View style={styles.kpiCard} key={i}>
                <Text style={styles.kpiLabel}>{s.label.toUpperCase()}</Text>
                <Text style={styles.kpiValue}>{s.value}</Text>
              </View>
            ))}
          </View>
        )}

        <Text style={styles.sectionTitle}>{data.title}</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            {data.columns.map((col, i) => (
              <Text style={[styles.tableHeaderCell, cols[`col${i}`]]} key={i}>{col}</Text>
            ))}
          </View>
          {data.rows.map((row, idx) => (
            <View style={idx % 2 === 1 ? styles.tableRowAlt : styles.tableRow} key={idx}>
              {row.map((cell, i) => (
                <Text style={[styles.tableCell, cols[`col${i}`]]} key={i}>{cell}</Text>
              ))}
            </View>
          ))}
        </View>

        <ReportFooter />
      </Page>
    </Document>
  );
}
