'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { sampleKeuangan } from '@/lib/data/sampleData';

export default function KeuanganPage() {
  const [filter, setFilter] = useState<'semua' | 'pemasukan' | 'pengeluaran'>('semua');

  // Filter data based on jenis
  const filteredKeuangan = filter === 'semua' 
    ? sampleKeuangan 
    : sampleKeuangan.filter(k => k.jenis === filter);

  // Calculate totals
  const totalPemasukan = sampleKeuangan
    .filter(k => k.jenis === 'pemasukan')
    .reduce((sum, k) => sum + k.jumlah, 0);
    
  const totalPengeluaran = sampleKeuangan
    .filter(k => k.jenis === 'pengeluaran')
    .reduce((sum, k) => sum + k.jumlah, 0);
    
  const saldoKas = totalPemasukan - totalPengeluaran;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Keuangan</h1>
          <p className="text-gray-600">Kelola pemasukan dan pengeluaran RT/RW</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-green-600 hover:bg-green-700">
            <span className="mr-2">➕</span>
            Tambah Pemasukan
          </Button>
          <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
            <span className="mr-2">➖</span>
            Tambah Pengeluaran
          </Button>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Pemasukan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(totalPemasukan)}
            </div>
            <p className="text-xs text-gray-500">
              {sampleKeuangan.filter(k => k.jenis === 'pemasukan').length} transaksi
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Pengeluaran</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(totalPengeluaran)}
            </div>
            <p className="text-xs text-gray-500">
              {sampleKeuangan.filter(k => k.jenis === 'pengeluaran').length} transaksi
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Saldo Kas RT</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              saldoKas >= 0 ? 'text-blue-600' : 'text-red-600'
            }`}>
              {formatCurrency(saldoKas)}
            </div>
            <p className="text-xs text-gray-500">Saldo saat ini</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Transaksi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Button
              variant={filter === 'semua' ? 'default' : 'outline'}
              onClick={() => setFilter('semua')}
              size="sm"
            >
              Semua ({sampleKeuangan.length})
            </Button>
            <Button
              variant={filter === 'pemasukan' ? 'default' : 'outline'}
              onClick={() => setFilter('pemasukan')}
              size="sm"
              className={filter === 'pemasukan' ? 'bg-green-600 hover:bg-green-700' : ''}
            >
              Pemasukan ({sampleKeuangan.filter(k => k.jenis === 'pemasukan').length})
            </Button>
            <Button
              variant={filter === 'pengeluaran' ? 'default' : 'outline'}
              onClick={() => setFilter('pengeluaran')}
              size="sm"
              className={filter === 'pengeluaran' ? 'bg-red-600 hover:bg-red-700' : ''}
            >
              Pengeluaran ({sampleKeuangan.filter(k => k.jenis === 'pengeluaran').length})
            </Button>
          </div>

          {/* Transaction List */}
          <div className="space-y-4">
            {filteredKeuangan.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Tidak ada transaksi yang ditemukan.</p>
              </div>
            ) : (
              filteredKeuangan.map((transaksi) => (
                <div 
                  key={transaksi.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{transaksi.kategori}</h3>
                          <p className="text-sm text-gray-600">{transaksi.keterangan}</p>
                        </div>
                        <Badge 
                          className={
                            transaksi.jenis === 'pemasukan' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }
                        >
                          {transaksi.jenis === 'pemasukan' ? '⬆️ Masuk' : '⬇️ Keluar'}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-col md:flex-row gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Tanggal:</span> {formatDate(transaksi.tanggal)}
                        </div>
                        {transaksi.bukti && (
                          <div>
                            <span className="font-medium">Bukti:</span> 
                            <span className="ml-1 text-blue-600 underline cursor-pointer">
                              {transaksi.bukti}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                      <div className={`text-lg font-bold ${
                        transaksi.jenis === 'pemasukan' 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {transaksi.jenis === 'pemasukan' ? '+' : '-'}
                        {formatCurrency(transaksi.jumlah)}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          ✏️ Edit
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                          🗑️ Hapus
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Report */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ringkasan Kategori Pemasukan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Array.from(new Set(sampleKeuangan.filter(k => k.jenis === 'pemasukan').map(k => k.kategori)))
                .map(kategori => {
                  const total = sampleKeuangan
                    .filter(k => k.jenis === 'pemasukan' && k.kategori === kategori)
                    .reduce((sum, k) => sum + k.jumlah, 0);
                  
                  return (
                    <div key={kategori} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{kategori}</span>
                      <span className="text-sm text-green-600 font-semibold">
                        {formatCurrency(total)}
                      </span>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ringkasan Kategori Pengeluaran</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Array.from(new Set(sampleKeuangan.filter(k => k.jenis === 'pengeluaran').map(k => k.kategori)))
                .map(kategori => {
                  const total = sampleKeuangan
                    .filter(k => k.jenis === 'pengeluaran' && k.kategori === kategori)
                    .reduce((sum, k) => sum + k.jumlah, 0);
                  
                  return (
                    <div key={kategori} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{kategori}</span>
                      <span className="text-sm text-red-600 font-semibold">
                        {formatCurrency(total)}
                      </span>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}