'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { sampleKegiatan, samplePengumuman } from '@/lib/data/sampleData';

export default function KegiatanPage() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aktif':
        return 'bg-green-100 text-green-800';
      case 'selesai':
        return 'bg-blue-100 text-blue-800';
      case 'batal':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kegiatan & Pengumuman</h1>
          <p className="text-gray-600">Kelola kegiatan RT/RW dan informasi warga</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <span className="mr-2">📅</span>
            Tambah Kegiatan
          </Button>
          <Button variant="outline">
            <span className="mr-2">📢</span>
            Buat Pengumuman
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Kegiatan Aktif</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {sampleKegiatan.filter(k => k.status === 'aktif').length}
            </div>
            <p className="text-xs text-gray-500">Kegiatan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Peserta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {sampleKegiatan.reduce((sum, k) => sum + (k.peserta || 0), 0)}
            </div>
            <p className="text-xs text-gray-500">Orang</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pengumuman</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {samplePengumuman.length}
            </div>
            <p className="text-xs text-gray-500">Aktif</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pengumuman Penting</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {samplePengumuman.filter(p => p.penting).length}
            </div>
            <p className="text-xs text-gray-500">Info</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Kegiatan Mendatang</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sampleKegiatan.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Belum ada kegiatan yang dijadwalkan.</p>
              </div>
            ) : (
              sampleKegiatan.map((kegiatan) => (
                <div 
                  key={kegiatan.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{kegiatan.nama}</h3>
                          <p className="text-sm text-gray-600">{kegiatan.deskripsi}</p>
                        </div>
                        <Badge className={getStatusColor(kegiatan.status)}>
                          {kegiatan.status.charAt(0).toUpperCase() + kegiatan.status.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">📅 Tanggal:</span> {formatDate(kegiatan.tanggal)}
                        </div>
                        <div>
                          <span className="font-medium">⏰ Waktu:</span> {kegiatan.waktu} WIB
                        </div>
                        <div>
                          <span className="font-medium">📍 Tempat:</span> {kegiatan.tempat}
                        </div>
                        <div>
                          <span className="font-medium">👥 Peserta:</span> {kegiatan.peserta || 0} orang
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4 md:mt-0">
                      <Button size="sm" variant="outline">
                        ✏️ Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        👁️ Detail
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Announcements */}
      <Card>
        <CardHeader>
          <CardTitle>Pengumuman Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {samplePengumuman.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Belum ada pengumuman.</p>
              </div>
            ) : (
              samplePengumuman.map((pengumuman) => (
                <div 
                  key={pengumuman.id}
                  className={`border rounded-lg p-4 ${
                    pengumuman.penting 
                      ? 'border-red-200 bg-red-50' 
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-start gap-2 mb-2">
                        {pengumuman.penting && (
                          <span className="text-red-500 text-lg">⚠️</span>
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{pengumuman.judul}</h3>
                          {pengumuman.penting && (
                            <Badge className="bg-red-100 text-red-800 text-xs">
                              PENTING
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                        {pengumuman.isi}
                      </p>
                      
                      <div className="flex flex-col md:flex-row gap-2 text-xs text-gray-500">
                        <span>📅 {formatDate(pengumuman.tanggal)}</span>
                        <span>✍️ {pengumuman.penulis}</span>
                      </div>
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
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Calendar View */}
      <Card>
        <CardHeader>
          <CardTitle>Kalender Kegiatan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <div className="text-4xl text-gray-400 mb-4">📅</div>
            <p className="text-gray-600 mb-4">Tampilan kalender akan tersedia dalam versi lengkap</p>
            <Button variant="outline">
              Lihat Kalender Lengkap
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}