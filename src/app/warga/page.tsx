'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { sampleWarga } from '@/lib/data/sampleData';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function WargaPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRT, setFilterRT] = useState('');

  // Filter data based on search term and RT filter
  const filteredWarga = sampleWarga.filter(warga => {
    const matchesSearch = warga.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         warga.nik.includes(searchTerm) ||
                         warga.alamat.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRT = filterRT === '' || warga.rt === filterRT;
    
    return matchesSearch && matchesRT;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Kepala Keluarga':
        return 'bg-blue-100 text-blue-800';
      case 'Istri':
        return 'bg-pink-100 text-pink-800';
      case 'Anak':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      return age - 1;
    }
    return age;
  };

  // Get unique RT values for filter
  const uniqueRT = Array.from(new Set(sampleWarga.map(w => w.rt))).sort();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Warga</h1>
          <p className="text-gray-600">Kelola data penduduk RT/RW</p>
        </div>
        <Link href="/warga/tambah">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <span className="mr-2">➕</span>
            Tambah Warga
          </Button>
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Warga</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{sampleWarga.length}</div>
            <p className="text-xs text-gray-500">Jiwa</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Kepala Keluarga</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {sampleWarga.filter(w => w.keluarga.statusKeluarga === 'Kepala Keluarga').length}
            </div>
            <p className="text-xs text-gray-500">KK</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Laki-laki</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {sampleWarga.filter(w => w.jenisKelamin === 'L').length}
            </div>
            <p className="text-xs text-gray-500">Jiwa</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Perempuan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {sampleWarga.filter(w => w.jenisKelamin === 'P').length}
            </div>
            <p className="text-xs text-gray-500">Jiwa</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Pencarian dan Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Cari berdasarkan nama, NIK, atau alamat..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full md:w-48">
              <select
                value={filterRT}
                onChange={(e) => setFilterRT(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Semua RT</option>
                {uniqueRT.map(rt => (
                  <option key={rt} value={rt}>RT {rt}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Warga ({filteredWarga.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredWarga.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Tidak ada data warga yang ditemukan.</p>
              </div>
            ) : (
              filteredWarga.map((warga) => (
                <div 
                  key={warga.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{warga.nama}</h3>
                          <p className="text-sm text-gray-600">NIK: {warga.nik}</p>
                        </div>
                        <Badge className={getStatusColor(warga.keluarga.statusKeluarga)}>
                          {warga.keluarga.statusKeluarga}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Usia:</span> {getAge(warga.tanggalLahir)} tahun
                        </div>
                        <div>
                          <span className="font-medium">JK:</span> {warga.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
                        </div>
                        <div>
                          <span className="font-medium">RT:</span> {warga.rt}
                        </div>
                        <div>
                          <span className="font-medium">RW:</span> {warga.rw}
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Alamat:</span> {warga.alamat}
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Pekerjaan:</span> {warga.pekerjaan}
                        </div>
                        <div>
                          <span className="font-medium">Pendidikan:</span> {warga.pendidikan}
                        </div>
                        <div>
                          <span className="font-medium">No. KK:</span> {warga.keluarga.noKK}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4 md:mt-0">
                      <Button size="sm" variant="outline">
                        👁️ Detail
                      </Button>
                      <Button size="sm" variant="outline">
                        ✏️ Edit
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}