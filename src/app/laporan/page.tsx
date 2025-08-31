'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { sampleWarga, sampleKeuangan } from '@/lib/data/sampleData';

export default function LaporanPage() {
  // Calculate statistics
  const totalWarga = sampleWarga.length;
  const totalKK = new Set(sampleWarga.map(w => w.keluarga.noKK)).size;
  const lakiLaki = sampleWarga.filter(w => w.jenisKelamin === 'L').length;
  const perempuan = sampleWarga.filter(w => w.jenisKelamin === 'P').length;

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

  // Demographics by age
  const currentYear = new Date().getFullYear();
  const demografiUsia = {
    anak: sampleWarga.filter(w => {
      const birthYear = new Date(w.tanggalLahir).getFullYear();
      const age = currentYear - birthYear;
      return age < 17;
    }).length,
    dewasa: sampleWarga.filter(w => {
      const birthYear = new Date(w.tanggalLahir).getFullYear();
      const age = currentYear - birthYear;
      return age >= 17 && age < 60;
    }).length,
    lansia: sampleWarga.filter(w => {
      const birthYear = new Date(w.tanggalLahir).getFullYear();
      const age = currentYear - birthYear;
      return age >= 60;
    }).length
  };

  // Demographics by education
  const demografiPendidikan = sampleWarga.reduce((acc, warga) => {
    acc[warga.pendidikan] = (acc[warga.pendidikan] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Demographics by job
  const demografiPekerjaan = sampleWarga.reduce((acc, warga) => {
    acc[warga.pekerjaan] = (acc[warga.pekerjaan] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const reportTypes = [
    {
      title: 'Laporan Demografi',
      description: 'Data statistik penduduk berdasarkan usia, pendidikan, pekerjaan',
      icon: '👥',
      color: 'bg-blue-50 text-blue-700',
      action: 'Download PDF'
    },
    {
      title: 'Laporan Keuangan',
      description: 'Ringkasan pemasukan, pengeluaran, dan saldo kas RT/RW',
      icon: '💰',
      color: 'bg-green-50 text-green-700',
      action: 'Download PDF'
    },
    {
      title: 'Laporan Kegiatan',
      description: 'Daftar kegiatan dan tingkat partisipasi warga',
      icon: '📅',
      color: 'bg-orange-50 text-orange-700',
      action: 'Download PDF'
    },
    {
      title: 'Data Warga Lengkap',
      description: 'Export seluruh data warga dalam format Excel',
      icon: '📊',
      color: 'bg-purple-50 text-purple-700',
      action: 'Download Excel'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Laporan & Statistik</h1>
          <p className="text-gray-600">Analisis data dan generate laporan RT/RW</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <span className="mr-2">📈</span>
            Laporan Bulanan
          </Button>
          <Button variant="outline">
            <span className="mr-2">📅</span>
            Pilih Periode
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
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
            <p className="text-xs text-gray-500">Keluarga</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Saldo Kas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-lg font-bold ${
              saldoKas >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {formatCurrency(saldoKas)}
            </div>
            <p className="text-xs text-gray-500">RT/RW</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Rasio L/P</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-purple-600">
              {lakiLaki}:{perempuan}
            </div>
            <p className="text-xs text-gray-500">Laki-laki : Perempuan</p>
          </CardContent>
        </Card>
      </div>

      {/* Demographics Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Age Demographics */}
        <Card>
          <CardHeader>
            <CardTitle>Demografi Berdasarkan Usia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Anak (0-16 tahun)</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-gray-200 rounded">
                    <div 
                      className="h-full bg-blue-500 rounded"
                      style={{ width: `${(demografiUsia.anak / totalWarga) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">{demografiUsia.anak}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Dewasa (17-59 tahun)</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-gray-200 rounded">
                    <div 
                      className="h-full bg-green-500 rounded"
                      style={{ width: `${(demografiUsia.dewasa / totalWarga) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">{demografiUsia.dewasa}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Lansia (60+ tahun)</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-gray-200 rounded">
                    <div 
                      className="h-full bg-orange-500 rounded"
                      style={{ width: `${(demografiUsia.lansia / totalWarga) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">{demografiUsia.lansia}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Education Demographics */}
        <Card>
          <CardHeader>
            <CardTitle>Demografi Berdasarkan Pendidikan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(demografiPendidikan).map(([pendidikan, jumlah]) => (
                <div key={pendidikan} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{pendidikan}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-200 rounded">
                      <div 
                        className="h-full bg-purple-500 rounded"
                        style={{ width: `${(jumlah / totalWarga) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">{jumlah}</span>
                  </div>
                </div>
              ))}
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
                <span className="text-sm font-medium text-green-600">Total Pemasukan</span>
                <span className="text-sm font-semibold text-green-600">
                  {formatCurrency(totalPemasukan)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-red-600">Total Pengeluaran</span>
                <span className="text-sm font-semibold text-red-600">
                  {formatCurrency(totalPengeluaran)}
                </span>
              </div>
              <hr />
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">Saldo Kas</span>
                <span className={`text-sm font-bold ${
                  saldoKas >= 0 ? 'text-blue-600' : 'text-red-600'
                }`}>
                  {formatCurrency(saldoKas)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Demographics */}
        <Card>
          <CardHeader>
            <CardTitle>Demografi Berdasarkan Pekerjaan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(demografiPekerjaan).slice(0, 5).map(([pekerjaan, jumlah]) => (
                <div key={pekerjaan} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{pekerjaan}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-200 rounded">
                      <div 
                        className="h-full bg-indigo-500 rounded"
                        style={{ width: `${(jumlah / totalWarga) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">{jumlah}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Laporan</CardTitle>
          <p className="text-sm text-gray-600">Pilih jenis laporan yang ingin diunduh</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTypes.map((report, index) => (
              <div 
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${report.color}`}>
                    <span className="text-lg">{report.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{report.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                    <Button size="sm" variant="outline">
                      📥 {report.action}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Opsi Export Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              📊 Export ke Excel
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              📄 Export ke PDF
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              📝 Export ke CSV
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              📧 Kirim via Email
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}