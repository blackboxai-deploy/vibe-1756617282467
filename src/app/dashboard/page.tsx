'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { sampleWarga, sampleKeuangan } from '@/lib/data/sampleData';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardPage() {
  // Calculate statistics
  const totalWarga = sampleWarga.length;
  const totalKK = new Set(sampleWarga.map(w => w.keluarga.noKK)).size;
  const lakiLaki = sampleWarga.filter(w => w.jenisKelamin === 'L').length;
  const perempuan = sampleWarga.filter(w => w.jenisKelamin === 'P').length;
  
  // Age categories
  const currentYear = new Date().getFullYear();
  const anak = sampleWarga.filter(w => {
    const birthYear = new Date(w.tanggalLahir).getFullYear();
    const age = currentYear - birthYear;
    return age < 17;
  }).length;
  
  const dewasa = sampleWarga.filter(w => {
    const birthYear = new Date(w.tanggalLahir).getFullYear();
    const age = currentYear - birthYear;
    return age >= 17 && age < 60;
  }).length;
  
  const lansia = sampleWarga.filter(w => {
    const birthYear = new Date(w.tanggalLahir).getFullYear();
    const age = currentYear - birthYear;
    return age >= 60;
  }).length;

  // Financial calculations
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

  const quickActions = [
    {
      title: 'Tambah Warga Baru',
      href: '/warga/tambah',
      icon: '👥',
      color: 'bg-blue-50 text-blue-700'
    },
    {
      title: 'Buat Surat',
      href: '/surat/generate',
      icon: '📄',
      color: 'bg-green-50 text-green-700'
    },
    {
      title: 'Input Keuangan',
      href: '/keuangan/tambah',
      icon: '💰',
      color: 'bg-orange-50 text-orange-700'
    },
    {
      title: 'Lihat Laporan',
      href: '/laporan',
      icon: '📊',
      color: 'bg-purple-50 text-purple-700'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Selamat Datang di Dashboard</h1>
            <p className="text-gray-600 mt-1">RT 001 RW 005 - Sistem Informasi Rukun Tetangga</p>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-gray-500">Hari ini: {new Date().toLocaleDateString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Warga</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalWarga}</div>
            <p className="text-xs text-gray-500">Jiwa</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total KK</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalKK}</div>
            <p className="text-xs text-gray-500">Kepala Keluarga</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Laki-laki</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{lakiLaki}</div>
            <p className="text-xs text-gray-500">Jiwa</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Perempuan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{perempuan}</div>
            <p className="text-xs text-gray-500">Jiwa</p>
          </CardContent>
        </Card>
      </div>

      {/* Demographics and Financial Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Demographics */}
        <Card>
          <CardHeader>
            <CardTitle>Demografi Berdasarkan Usia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Anak (0-16 tahun)</span>
                <span className="text-sm text-gray-600">{anak} jiwa</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Dewasa (17-59 tahun)</span>
                <span className="text-sm text-gray-600">{dewasa} jiwa</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Lansia (60+ tahun)</span>
                <span className="text-sm text-gray-600">{lansia} jiwa</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Ringkasan Keuangan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-600">Pemasukan</span>
                <span className="text-sm font-semibold text-green-600">
                  {formatCurrency(totalPemasukan)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-red-600">Pengeluaran</span>
                <span className="text-sm font-semibold text-red-600">
                  {formatCurrency(totalPengeluaran)}
                </span>
              </div>
              <hr />
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">Saldo Kas RT</span>
                <span className={`text-sm font-bold ${
                  saldoKas >= 0 ? 'text-blue-600' : 'text-red-600'
                }`}>
                  {formatCurrency(saldoKas)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Aksi Cepat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link key={action.href} href={action.href}>
                <Button 
                  variant="outline" 
                  className={`w-full h-auto p-4 flex flex-col items-center space-y-2 ${action.color} border-none hover:opacity-80`}
                >
                  <span className="text-2xl">{action.icon}</span>
                  <span className="text-xs text-center leading-tight">{action.title}</span>
                </Button>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Aktivitas Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
              <span className="text-lg">👥</span>
              <div className="flex-1">
                <p className="text-sm font-medium">Data warga baru ditambahkan</p>
                <p className="text-xs text-gray-500">2 jam yang lalu</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
              <span className="text-lg">💰</span>
              <div className="flex-1">
                <p className="text-sm font-medium">Pembayaran iuran masuk</p>
                <p className="text-xs text-gray-500">5 jam yang lalu</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
              <span className="text-lg">📄</span>
              <div className="flex-1">
                <p className="text-sm font-medium">Surat keterangan domisili dibuat</p>
                <p className="text-xs text-gray-500">1 hari yang lalu</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}