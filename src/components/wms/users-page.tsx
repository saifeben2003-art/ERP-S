'use client';

import { useEffect, useState, useCallback } from 'react';
import { Plus, Search, Users, Shield, Pencil, UserX } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { languageList } from '@/lib/i18n';

interface Props {
  t: (key: string, params?: Record<string, string | number>) => string;
  language: string;
  formatNum: (v: number) => string;
}

interface UserRecord {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar: string | null;
  language: string;
  isActive: boolean;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
}

interface UserListResponse {
  items: UserRecord[];
  totalPages: number;
}

const ROLES = ['ADMIN', 'MANAGER', 'STAFF', 'VIEWER'] as const;

const roleStyles: Record<string, string> = {
  ADMIN: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  MANAGER: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
  STAFF: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  VIEWER: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
};

const emptyAddForm = { name: '', email: '', password: '', role: 'VIEWER', language: 'en' };
const emptyEditForm = { name: '', role: 'VIEWER', language: 'en', isActive: true };

export function UsersPage({ t, language }: Props) {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState(emptyAddForm);
  const [addSubmitting, setAddSubmitting] = useState(false);
  const [editUser, setEditUser] = useState<UserRecord | null>(null);
  const [editForm, setEditForm] = useState(emptyEditForm);
  const [editSubmitting, setEditSubmitting] = useState(false);
  const [deleteUser, setDeleteUser] = useState<UserRecord | null>(null);
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (roleFilter) params.set('role', roleFilter);
      const res = await fetch(`/api/users?${params}`);
      if (!res.ok) { setUsers([]); return; }
      const data: UserListResponse = await res.json();
      setUsers(data.items || []);
    } catch {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  }, [search, roleFilter]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleAdd = async () => {
    setAddSubmitting(true);
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addForm),
      });
      if (!res.ok) { const d = await res.json(); toast.error(d.error || 'Failed'); return; }
      toast.success('User created');
      setShowAdd(false);
      setAddForm(emptyAddForm);
      fetchUsers();
    } catch { toast.error('Failed to create user'); }
    finally { setAddSubmitting(false); }
  };

  const handleEdit = async () => {
    if (!editUser) return;
    setEditSubmitting(true);
    try {
      const res = await fetch(`/api/users/${editUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) { const d = await res.json(); toast.error(d.error || 'Failed'); return; }
      toast.success('User updated');
      setEditUser(null);
      setEditForm(emptyEditForm);
      fetchUsers();
    } catch { toast.error('Failed to update user'); }
    finally { setEditSubmitting(false); }
  };

  const handleDelete = async () => {
    if (!deleteUser) return;
    setDeleteSubmitting(true);
    try {
      const res = await fetch(`/api/users/${deleteUser.id}`, { method: 'DELETE' });
      if (!res.ok) { const d = await res.json(); toast.error(d.error || 'Failed'); return; }
      toast.success('User deleted');
      setDeleteUser(null);
      fetchUsers();
    } catch { toast.error('Failed to delete user'); }
    finally { setDeleteSubmitting(false); }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-100">{t('users.title')}</h2>
          <p className="text-sm text-slate-400">Manage system users and roles</p>
        </div>
        <Button onClick={() => setShowAdd(true)} className="bg-amber-600 hover:bg-amber-500 text-white">
          <Plus className="h-4 w-4 mr-2" /> {t('common.add')}
        </Button>
      </div>

      <Card className="bg-slate-900/50 border-slate-800/60">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('common.search')}
                className="pl-10 h-10 bg-slate-800/50 border-slate-700/50 text-white"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-40 h-10 bg-slate-800/50 border-slate-700/50 text-white">
                <SelectValue placeholder={t('common.allStatuses')} />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="">All Roles</SelectItem>
                {ROLES.map(r => (
                  <SelectItem key={r} value={r}>{t(`roles.${r}`)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="space-y-3">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-14 bg-slate-800/50" />)}</div>
      ) : users.length === 0 ? (
        <div className="text-center py-12"><Users className="h-10 w-10 text-slate-600 mx-auto mb-3" /><p className="text-sm text-slate-500">{t('common.noData')}</p></div>
      ) : (
        <Card className="bg-slate-900/50 border-slate-800/60 overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800/60">
                    <th className="text-left text-xs font-medium text-slate-400 px-4 py-3">Name</th>
                    <th className="text-left text-xs font-medium text-slate-400 px-4 py-3 hidden md:table-cell">Email</th>
                    <th className="text-left text-xs font-medium text-slate-400 px-4 py-3">Role</th>
                    <th className="text-left text-xs font-medium text-slate-400 px-4 py-3 hidden sm:table-cell">Status</th>
                    <th className="text-left text-xs font-medium text-slate-400 px-4 py-3 hidden sm:table-cell">Last Login</th>
                    <th className="text-right text-xs font-medium text-slate-400 px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-4 py-3 text-sm text-slate-200 font-medium">{u.name}</td>
                      <td className="px-4 py-3 text-sm text-slate-400 hidden md:table-cell">{u.email}</td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <Badge variant="outline" className={roleStyles[u.role] || ''}>
                          <Shield className="h-3 w-3 mr-1" />{t(`roles.${u.role}`)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className={`inline-flex h-2 w-2 rounded-full ${u.isActive ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-500">
                        {u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : '—'}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-amber-400" onClick={() => { setEditUser(u); setEditForm({ name: u.name, role: u.role, language: u.language, isActive: u.isActive }); }}>
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-400" onClick={() => setDeleteUser(u)}>
                            <UserX className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="bg-slate-900 border-slate-700">
          <DialogHeader><DialogTitle className="text-slate-100">Add User</DialogTitle><DialogDescription className="text-slate-400">Create a new system user</DialogDescription></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2"><Label className="text-slate-300">{t('auth.name')}</Label><Input value={addForm.name} onChange={e => setAddForm(p => ({ ...p, name: e.target.value }))} className="bg-slate-800/50 border-slate-700 text-white" /></div>
            <div className="space-y-2"><Label className="text-slate-300">{t('auth.email')}</Label><Input type="email" value={addForm.email} onChange={e => setAddForm(p => ({ ...p, email: e.target.value }))} className="bg-slate-800/50 border-slate-700 text-white" /></div>
            <div className="space-y-2"><Label className="text-slate-300">{t('auth.password')}</Label><Input type="password" value={addForm.password} onChange={e => setAddForm(p => ({ ...p, password: e.target.value }))} className="bg-slate-800/50 border-slate-700 text-white" /></div>
            <div className="space-y-2"><Label className="text-slate-300">Role</Label>
              <Select value={addForm.role} onValueChange={v => setAddForm(p => ({ ...p, role: v }))}>
                <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">{ROLES.map(r => <SelectItem key={r} value={r}>{t(`roles.${r}`)}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowAdd(false)} className="text-slate-400">{t('common.cancel')}</Button>
            <Button onClick={handleAdd} disabled={addSubmitting || !addForm.name || !addForm.email || !addForm.password} className="bg-amber-600 hover:bg-amber-500 text-white">
              {addSubmitting ? '...' : t('common.create')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editUser} onOpenChange={() => setEditUser(null)}>
        <DialogContent className="bg-slate-900 border-slate-700">
          <DialogHeader><DialogTitle className="text-slate-100">Edit User</DialogTitle><DialogDescription className="text-slate-400">Update user settings</DialogDescription></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2"><Label className="text-slate-300">{t('auth.name')}</Label><Input value={editForm.name} onChange={e => setEditForm(p => ({ ...p, name: e.target.value }))} className="bg-slate-800/50 border-slate-700 text-white" /></div>
            <div className="space-y-2"><Label className="text-slate-300">Role</Label>
              <Select value={editForm.role} onValueChange={v => setEditForm(p => ({ ...p, role: v }))}>
                <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">{ROLES.map(r => <SelectItem key={r} value={r}>{t(`roles.${r}`)}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditUser(null)} className="text-slate-400">{t('common.cancel')}</Button>
            <Button onClick={handleEdit} disabled={editSubmitting} className="bg-amber-600 hover:bg-amber-500 text-white">
              {editSubmitting ? '...' : t('common.save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={!!deleteUser} onOpenChange={() => setDeleteUser(null)}>
        <DialogContent className="bg-slate-900 border-slate-700">
          <DialogHeader><DialogTitle className="text-red-400">{t('common.confirmDelete')}</DialogTitle><DialogDescription className="text-slate-400">Delete {deleteUser?.name}? This cannot be undone.</DialogDescription></DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteUser(null)} className="text-slate-400">{t('common.cancel')}</Button>
            <Button onClick={handleDelete} disabled={deleteSubmitting} variant="destructive" className="bg-red-600 hover:bg-red-500">
              {deleteSubmitting ? '...' : t('common.delete')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
