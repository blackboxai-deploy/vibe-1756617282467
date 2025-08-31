'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SuratPage() {
  const suratTemplates = [
    {
      id: 'domisili',
      nama: 'Surat Keterangan Domisili',
      deskripsi: 'Surat keterangan tempat tinggal warga',
      icon: '🏠',
      color: 'bg-blue-50 text-blue-700'
    },
    {
      id: 'tidak-mampu',
      nama: 'Surat Keterangan Tidak Mampu',
      deskripsi: 'Surat keterangan kondisi ekonomi keluarga',
      icon: '💰',
      color: 'bg-green-50 text-green-700'
    },
    {
      id: 'belum-menikah',
      nama: 'Surat Keterangan Belum Menikah',
      deskripsi: 'Surat keterangan status pernikahan',
      icon: '💍',
      color: 'bg-purple-50 text-purple-700'
    },
    {
      id: 'usaha',
      nama: 'Surat Keterangan Usaha',
      deskripsi: 'Surat pengantar untuk perizinan usaha',
      icon: '🏪',
      color: 'bg-orange-50 text-orange-700'
    },
    {
      id: 'kelahiran',
      nama: 'Surat Keterangan Kelahiran',
      deskripsi: 'Surat pengantar untuk akta kelahiran',
      icon: '👶',
      color: 'bg-pink-50 text-pink-700'
    },
    {
      id: 'kematian',
      nama: 'Surat Keterangan Kematian',
      deskripsi: 'Surat pengantar untuk akta kematian',
      icon: '🕊️',
      color: 'bg-gray-50 text-gray-700'
    }
  ];

  const recentSurat = [
    {
      id: '1',
      jenis: 'Surat Keterangan Domisili',
      nama: 'Budi Santoso',
      tanggal: '2024-01-28',
      status: 'Selesai'
    },
    {
      id: '2',
      jenis: 'Surat Keterangan Tidak Mampu',
      nama: 'Siti Rahayu',
      tanggal: '2024-01-27',
      status: 'Selesai'
    },
    {
      id: '3',
      jenis: 'Surat Keterangan Usaha',
      nama: 'Agus Wijaya',
      tanggal: '2024-01-26',
      status: 'Proses'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Administrasi Surat</h1>
          <p className="text-gray-600">Kelola pembuatan surat keterangan RT/RW</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <span className="mr-2">📋</span>
          Riwayat Surat
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Surat Bulan Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">12</div>
            <p className="text-xs text-gray-500">Dokumen</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Selesai</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">10</div>
            <p className="text-xs text-gray-500">Surat</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Dalam Proses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">2</div>
            <p className="text-xs text-gray-500">Surat</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Template</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">6</div>
            <p className="text-xs text-gray-500">Jenis</p>
          </CardContent>
        </Card>
      </div>

      {/* Template Surat */}
      <Card>
        <CardHeader>
          <CardTitle>Template Surat</CardTitle>
          <p className="text-sm text-gray-600">Pilih jenis surat yang akan dibuat</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {suratTemplates.map((template) => (
              <Link key={template.id} href={`/surat/generate?type=${template.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${template.color}`}>
                      <span className="text-xl">{template.icon}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                      {template.nama}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {template.deskripsi}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Surat */}
      <Card>
        <CardHeader>
          <CardTitle>Surat Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentSurat.map((surat) => (
              <div 
                key={surat.id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{surat.jenis}</h4>
                  <p className="text-sm text-gray-600">Untuk: {surat.nama}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(surat.tanggal).toLocaleDateString('id-ID')}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    surat.status === 'Selesai' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {surat.status}
                  </span>
                  <Button size="sm" variant="outline">
                    📄 Lihat
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Help Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Panduan Pembuatan Surat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Langkah Pembuatan:</h4>
              <ol className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  Pilih template surat yang sesuai
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  Isi form dengan data warga
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  Preview surat sebelum cetak
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                  Download atau print surat
                </li>
              </ol>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Tips:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  Pastikan data warga sudah tercatat dalam sistem
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  Gunakan kop surat resmi RT/RW
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  Periksa kembali data sebelum mencetak
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  Simpan riwayat surat untuk arsip
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}