'use client';

import { useState } from 'react';
import { Plug, Zap, ArrowRightLeft, CheckCircle, XCircle, Clock, RefreshCw, Server, Settings, Activity, Globe, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { useTranslation, translateSyncStatus, translateSyncDirection } from '@/lib/translations';
import type { SyncDirection, SyncStatus } from '@/types/wms';

// Mock data for UI showcase
const mockEventMappings = [
  { eventType: 'RECEIVED', endpoint: '/api/sap/goods-receipt', method: 'POST', enabled: true },
  { eventType: 'DISPATCHED', endpoint: '/api/sap/goods-issue', method: 'POST', enabled: true },
  { eventType: 'MOVEMENT', endpoint: '/api/sap/transfer-posting', method: 'POST', enabled: true },
  { eventType: 'INVENTORY_UPDATE', endpoint: '/api/sap/inventory-update', method: 'PATCH', enabled: false },
];

const mockSyncLog = [
  { id: '1', eventType: 'RECEIVED', direction: 'OUTBOUND' as SyncDirection, status: 'SUCCESS' as SyncStatus, timestamp: '2025-01-15T14:32:00Z', retryCount: 0 },
  { id: '2', eventType: 'DISPATCHED', direction: 'OUTBOUND' as SyncDirection, status: 'SUCCESS' as SyncStatus, timestamp: '2025-01-15T13:21:00Z', retryCount: 0 },
  { id: '3', eventType: 'MOVEMENT', direction: 'OUTBOUND' as SyncDirection, status: 'FAILED' as SyncStatus, timestamp: '2025-01-15T12:15:00Z', retryCount: 3 },
  { id: '4', eventType: 'INVENTORY_UPDATE', direction: 'INBOUND' as SyncDirection, status: 'SUCCESS' as SyncStatus, timestamp: '2025-01-15T11:45:00Z', retryCount: 0 },
  { id: '5', eventType: 'RECEIVED', direction: 'INBOUND' as SyncDirection, status: 'RETRYING' as SyncStatus, timestamp: '2025-01-15T10:30:00Z', retryCount: 1 },
  { id: '6', eventType: 'DISPATCHED', direction: 'OUTBOUND' as SyncDirection, status: 'PENDING' as SyncStatus, timestamp: '2025-01-15T10:28:00Z', retryCount: 0 },
  { id: '7', eventType: 'MOVEMENT', direction: 'OUTBOUND' as SyncDirection, status: 'SUCCESS' as SyncStatus, timestamp: '2025-01-15T09:55:00Z', retryCount: 0 },
  { id: '8', eventType: 'RECEIVED', direction: 'INBOUND' as SyncDirection, status: 'FAILED' as SyncStatus, timestamp: '2025-01-15T09:12:00Z', retryCount: 5 },
];

const statusStyles: Record<SyncStatus, string> = {
  PENDING: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  SENT: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  SUCCESS: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  FAILED: 'bg-red-500/10 text-red-400 border-red-500/20',
  RETRYING: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
};

const directionStyles: Record<SyncDirection, string> = {
  OUTBOUND: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  INBOUND: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
};

export function IntegrationPage() {
  const [config, setConfig] = useState({
    endpoint: 'https://sap.combilift.com:44300',
    authMethod: 'API_KEY',
    apiKey: '••••••••••••••••xx7f3k',
    sapSystemId: 'CLP',
    client: '100',
    protocol: 'OData',
    enabled: true,
  });

  const [mappings, setMappings] = useState(mockEventMappings);
  const { t } = useTranslation();

  const handleSaveConfig = () => {
    toast.success(t('integration.toast.configSaved'));
  };

  const toggleMapping = (index: number) => {
    const updated = [...mappings];
    updated[index].enabled = !updated[index].enabled;
    setMappings(updated);
    toast.success(t('integration.toast.mappingToggled'));
  };

  const successCount = mockSyncLog.filter((l) => l.status === 'SUCCESS').length;
  const failedCount = mockSyncLog.filter((l) => l.status === 'FAILED').length;
  const healthPct = Math.round((successCount / mockSyncLog.length) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">{t('integration.title')}</h1>
          <p className="text-sm text-slate-500 mt-1">{t('integration.subtitle')}</p>
        </div>
        <Button onClick={handleSaveConfig}
          className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium">
          <Settings className="h-4 w-4 ml-2" /> {t('integration.saveConfiguration')}
        </Button>
      </div>

      {/* Info Banner */}
      <Card className="border-amber-500/20 bg-amber-500/5">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
              <Zap className="h-4 w-4 text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-amber-300">{t('integration.eventDrivenTitle')}</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {t('integration.eventDrivenDesc')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sync Health Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-slate-800 bg-slate-900/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{t('integration.syncHealth')}</p>
                <p className="text-2xl font-bold text-slate-100 mt-1">{healthPct}%</p>
              </div>
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${healthPct >= 80 ? 'bg-emerald-500/10' : healthPct >= 50 ? 'bg-amber-500/10' : 'bg-red-500/10'}`}>
                <Activity className={`h-5 w-5 ${healthPct >= 80 ? 'text-emerald-400' : healthPct >= 50 ? 'text-amber-400' : 'text-red-400'}`} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-800 bg-slate-900/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{t('integration.successful')}</p>
                <p className="text-2xl font-bold text-emerald-400 mt-1">{successCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-emerald-500/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-800 bg-slate-900/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{t('integration.failed')}</p>
                <p className="text-2xl font-bold text-red-400 mt-1">{failedCount}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500/30" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SAP Connection Configuration */}
      <Card className="border-slate-800 bg-slate-900/50">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Server className="h-5 w-5 text-amber-400" />
            <CardTitle className="text-sm font-medium text-slate-200">{t('integration.connectionConfig')}</CardTitle>
          </div>
          <CardDescription className="text-slate-500 text-xs">{t('integration.connectionConfigDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-slate-400">{t('integration.form.endpoint')}</Label>
              <Input value={config.endpoint} onChange={(e) => setConfig({ ...config, endpoint: e.target.value })}
                className="border-slate-700 bg-slate-800 text-slate-200 mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-400">{t('integration.form.authMethod')}</Label>
                <Select value={config.authMethod} onValueChange={(v) => setConfig({ ...config, authMethod: v })}>
                  <SelectTrigger className="border-slate-700 bg-slate-800 text-slate-200 mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent className="border-slate-700 bg-slate-800">
                    <SelectItem value="API_KEY" className="text-slate-200 focus:bg-slate-700">API Key</SelectItem>
                    <SelectItem value="BASIC" className="text-slate-200 focus:bg-slate-700">Basic Auth</SelectItem>
                    <SelectItem value="OAUTH" className="text-slate-200 focus:bg-slate-700">OAuth 2.0</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-slate-400">{t('integration.form.protocol')}</Label>
                <Select value={config.protocol} onValueChange={(v) => setConfig({ ...config, protocol: v })}>
                  <SelectTrigger className="border-slate-700 bg-slate-800 text-slate-200 mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent className="border-slate-700 bg-slate-800">
                    <SelectItem value="OData" className="text-slate-200 focus:bg-slate-700">OData</SelectItem>
                    <SelectItem value="RFC" className="text-slate-200 focus:bg-slate-700">RFC</SelectItem>
                    <SelectItem value="IDOC" className="text-slate-200 focus:bg-slate-700">IDOC</SelectItem>
                    <SelectItem value="REST" className="text-slate-200 focus:bg-slate-700">REST</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-slate-400">{t('integration.form.apiKey')}</Label>
              <Input type="password" value={config.apiKey} onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                className="border-slate-700 bg-slate-800 text-slate-200 mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-400">{t('integration.form.sapSystemId')}</Label>
                <Input value={config.sapSystemId} onChange={(e) => setConfig({ ...config, sapSystemId: e.target.value })}
                  className="border-slate-700 bg-slate-800 text-slate-200 mt-1" />
              </div>
              <div>
                <Label className="text-slate-400">{t('integration.form.client')}</Label>
                <Input value={config.client} onChange={(e) => setConfig({ ...config, client: e.target.value })}
                  className="border-slate-700 bg-slate-800 text-slate-200 mt-1" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <Switch checked={config.enabled} onCheckedChange={(v) => setConfig({ ...config, enabled: v })} />
            <Label className="text-slate-400">{t('integration.form.enableSync')}</Label>
          </div>
        </CardContent>
      </Card>

      {/* Event Mapping */}
      <Card className="border-slate-800 bg-slate-900/50">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="h-5 w-5 text-amber-400" />
            <CardTitle className="text-sm font-medium text-slate-200">{t('integration.eventMapping')}</CardTitle>
          </div>
          <CardDescription className="text-slate-500 text-xs">{t('integration.eventMappingDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800 hover:bg-transparent">
                <TableHead className="text-xs text-slate-500">{t('integration.table.eventType')}</TableHead>
                <TableHead className="text-xs text-slate-500">{t('integration.table.sapEndpoint')}</TableHead>
                <TableHead className="text-xs text-slate-500 hidden sm:table-cell">{t('integration.table.method')}</TableHead>
                <TableHead className="text-xs text-slate-500">{t('integration.table.enabled')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mappings.map((m, i) => (
                <TableRow key={m.eventType} className="border-slate-800 hover:bg-slate-800/50">
                  <TableCell className="py-3">
                    <Badge variant="outline" className="text-[10px] bg-amber-500/10 text-amber-400 border-amber-500/20">{m.eventType}</Badge>
                  </TableCell>
                  <TableCell className="py-3 text-xs font-mono text-slate-300">{m.endpoint}</TableCell>
                  <TableCell className="py-3 hidden sm:table-cell">
                    <Badge variant="outline" className="text-[10px] bg-slate-700/50 text-slate-300 border-slate-600">{m.method}</Badge>
                  </TableCell>
                  <TableCell className="py-3">
                    <Switch checked={m.enabled} onCheckedChange={() => toggleMapping(i)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Sync Log */}
      <Card className="border-slate-800 bg-slate-900/50">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-amber-400" />
              <CardTitle className="text-sm font-medium text-slate-200">{t('integration.syncLog')}</CardTitle>
            </div>
            <Button variant="outline" size="sm"
              className="border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-300 text-xs"
              onClick={() => toast.info(t('integration.toast.logRefreshed'))}>
              <RefreshCw className="h-3 w-3 ml-1" /> {t('common.refresh')}
            </Button>
          </div>
          <CardDescription className="text-slate-500 text-xs">{t('integration.syncLogDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-96 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-800 hover:bg-transparent">
                  <TableHead className="text-xs text-slate-500">{t('integration.table.event')}</TableHead>
                  <TableHead className="text-xs text-slate-500">{t('integration.table.direction')}</TableHead>
                  <TableHead className="text-xs text-slate-500">{t('common.status')}</TableHead>
                  <TableHead className="text-xs text-slate-500 hidden sm:table-cell">{t('integration.table.timestamp')}</TableHead>
                  <TableHead className="text-xs text-slate-500 hidden sm:table-cell">{t('integration.table.retries')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockSyncLog.map((log) => (
                  <TableRow key={log.id} className="border-slate-800 hover:bg-slate-800/50">
                    <TableCell className="py-3">
                      <Badge variant="outline" className="text-[10px] bg-amber-500/10 text-amber-400 border-amber-500/20">{log.eventType}</Badge>
                    </TableCell>
                    <TableCell className="py-3">
                      <Badge variant="outline" className={`text-[10px] ${directionStyles[log.direction]}`}>
                        {log.direction === 'OUTBOUND' ? t('integration.direction.outbound') : t('integration.direction.inbound')}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="flex items-center gap-1.5">
                        {log.status === 'SUCCESS' && <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />}
                        {log.status === 'FAILED' && <XCircle className="h-3.5 w-3.5 text-red-400" />}
                        {(log.status === 'PENDING' || log.status === 'RETRYING') && <Clock className="h-3.5 w-3.5 text-amber-400" />}
                        {log.status === 'SENT' && <Globe className="h-3.5 w-3.5 text-cyan-400" />}
                        <Badge variant="outline" className={`text-[10px] ${statusStyles[log.status]}`}>
                          {translateSyncStatus(log.status)}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 text-xs text-slate-400 hidden sm:table-cell">
                      {new Date(log.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell className="py-3 hidden sm:table-cell">
                      {log.retryCount > 0 ? (
                        <span className={`text-xs font-medium ${log.retryCount >= 3 ? 'text-red-400' : 'text-amber-400'}`}>
                          {log.retryCount}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-600">0</span>
                      )}
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
