'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { sampleWarga } from '@/lib/data/sampleData';
import { Warga } from '@/lib/types';
import Link from 'next/link';

interface EditWargaProps {
  params: {
    id: string;
  };
}

export default function EditWargaPage({ params }: EditWargaProps) {
  const router = useRouter();
  const [warga, setWarga] = useState<Warga | null>(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Options for dropdowns
  const agamaOptions = ['Islam', 'Kristen', 'Katholik', 'Hindu', 'Buddha', 'Khong Hu Cu', 'Lainnya'];
  const pendidikanOptions = ['SD', 'SMP', 'SMA', 'D1', 'D2', 'D3', 'S1', 'S2', 'S3', 'Lainnya'];
  const pekerjaanOptions = ['PNS', 'TNI/POLRI', 'Pegawai Swasta', 'Wiraswasta', 'Petani', 'Buruh', 'Ibu Rumah Tangga', 'Pelajar', 'Mahasiswa', 'Pensiunan', 'Lainnya'];
  const statusPerkawinanOptions = ['Belum Kawin', 'Kawin', 'Cerai Hidup', 'Cerai Mati'];
  const statusKeluargaOptions = ['Kepala Keluarga', 'Istri', 'Anak', 'Orang Tua', 'Mertua', 'Menantu', 'Cucu', 'Famili Lain', 'Lainnya'];

  useEffect(() => {
    // Find warga by ID
    const foundWarga = sampleWarga.find(w => w.id === params.id);
    if (foundWarga) {
      setWarga(foundWarga);
    }
    setLoading(false);
  }, [params.id]);

  const handleInputChange = (field: keyof Warga | string, value: string) => {
    if (!warga) return;

    setWarga(prev => {
      if (!prev) return prev;
      
      // Handle nested keluarga fields
      if (field.startsWith('keluarga.')) {
        const keluargaField = field.split('.')[1] as keyof typeof prev.keluarga;
        return {
          ...prev,
          keluarga: {
            ...prev.keluarga,
            [keluargaField]: value
          }
        };
      }
      
      return {
        ...prev,
        [field]: value
      };
    });
  };

  const validateForm = () => {
    if (!warga) return false;
    
    const newErrors: {[key: string]: string} = {};

    if (!warga.nik) newErrors.nik = 'NIK wajib diisi';
    if (!warga.nama) newErrors.nama = 'Nama wajib diisi';
    if (!warga.jenisKelamin) newErrors.jenisKelamin = 'Jenis kelamin wajib dipilih';
    if (!warga.tempatLahir) newErrors.tempatLahir = 'Tempat lahir wajib diisi';
    if (!warga.tanggalLahir) newErrors.tanggalLahir = 'Tanggal lahir wajib diisi';
    if (!warga.alamat) newErrors.alamat = 'Alamat wajib diisi';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically send data to API
      console.log('Updated Warga:', warga);
      alert('Data berhasil diperbarui!');
      router.push('/warga');
    }
  };

  const handleDelete = () => {
    if (confirm('Apakah Anda yakin ingin menghapus data warga ini?')) {
      // Here you would typically send delete request to API
      alert('Data berhasil dihapus!');
      router.push('/warga');
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (!warga) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl text-gray-400 mb-4">👤</div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Data Warga Tidak Ditemukan</h2>
        <p className="text-gray-600 mb-4">Warga dengan ID "{params.id}" tidak ditemukan dalam database.</p>
        <Link href="/warga">
          <Button>← Kembali ke Daftar Warga</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Data Warga</h1>
          <p className="text-gray-600">Perbarui informasi data penduduk</p>
        </div>
        <div className="flex gap-2">
          <Link href="/warga">
            <Button variant="outline">
              ← Kembali
            </Button>
          </Link>
          <Button 
            variant="outline" 
            onClick={handleDelete}
            className="text-red-600 hover:bg-red-50 border-red-200"
          >
            🗑️ Hapus
          </Button>
        </div>
      </div>

      {/* Current Info Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">📋 Informasi Saat Ini</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium text-blue-700">Nama:</span>
              <p className="text-blue-900">{warga.nama}</p>
            </div>
            <div>
              <span className="font-medium text-blue-700">Usia:</span>
              <p className="text-blue-900">{getAge(warga.tanggalLahir)} tahun</p>
            </div>
            <div>
              <span className="font-medium text-blue-700">Status:</span>
              <Badge className={getStatusColor(warga.keluarga.statusKeluarga)}>
                {warga.keluarga.statusKeluarga}
              </Badge>
            </div>
            <div>
              <span className="font-medium text-blue-700">RT/RW:</span>
              <p className="text-blue-900">{warga.rt}/{warga.rw}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit}>
        {/* Data Pribadi */}
        <Card>
          <CardHeader>
            <CardTitle>👤 Data Pribadi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="nama">Nama Lengkap *</Label>
                <Input
                  id="nama"
                  type="text"
                  value={warga.nama}
                  onChange={(e) => handleInputChange('nama', e.target.value)}
                  className={errors.nama ? 'border-red-500' : ''}
                />
                {errors.nama && <p className="text-red-500 text-sm">{errors.nama}</p>}
              </div>

              <div>
                <Label htmlFor="nik">NIK *</Label>
                <Input
                  id="nik"
                  type="text"
                  maxLength={16}
                  value={warga.nik}
                  onChange={(e) => handleInputChange('nik', e.target.value)}
                  className={errors.nik ? 'border-red-500' : ''}
                />
                {errors.nik && <p className="text-red-500 text-sm">{errors.nik}</p>}
              </div>

              <div>
                <Label htmlFor="jenisKelamin">Jenis Kelamin *</Label>
                <select
                  id="jenisKelamin"
                  value={warga.jenisKelamin}
                  onChange={(e) => handleInputChange('jenisKelamin', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md ${errors.jenisKelamin ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Pilih</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
                {errors.jenisKelamin && <p className="text-red-500 text-sm">{errors.jenisKelamin}</p>}
              </div>

              <div>
                <Label htmlFor="tempatLahir">Tempat Lahir *</Label>
                <Input
                  id="tempatLahir"
                  type="text"
                  value={warga.tempatLahir}
                  onChange={(e) => handleInputChange('tempatLahir', e.target.value)}
                  className={errors.tempatLahir ? 'border-red-500' : ''}
                />
                {errors.tempatLahir && <p className="text-red-500 text-sm">{errors.tempatLahir}</p>}
              </div>

              <div>
                <Label htmlFor="tanggalLahir">Tanggal Lahir *</Label>
                <Input
                  id="tanggalLahir"
                  type="date"
                  value={warga.tanggalLahir}
                  onChange={(e) => handleInputChange('tanggalLahir', e.target.value)}
                  className={errors.tanggalLahir ? 'border-red-500' : ''}
                />
                {errors.tanggalLahir && <p className="text-red-500 text-sm">{errors.tanggalLahir}</p>}
              </div>

              <div>
                <Label htmlFor="agama">Agama</Label>
                <select
                  id="agama"
                  value={warga.agama}
                  onChange={(e) => handleInputChange('agama', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Pilih Agama</option>
                  {agamaOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="statusPerkawinan">Status Perkawinan</Label>
                <select
                  id="statusPerkawinan"
                  value={warga.statusPerkawinan}
                  onChange={(e) => handleInputChange('statusPerkawinan', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Pilih Status</option>
                  {statusPerkawinanOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="noTelepon">No. Telepon</Label>
                <Input
                  id="noTelepon"
                  type="tel"
                  value={warga.noTelepon || ''}
                  onChange={(e) => handleInputChange('noTelepon', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Alamat */}
        <Card>
          <CardHeader>
            <CardTitle>🏠 Data Alamat</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="alamat">Alamat Lengkap *</Label>
              <Input
                id="alamat"
                type="text"
                value={warga.alamat}
                onChange={(e) => handleInputChange('alamat', e.target.value)}
                className={errors.alamat ? 'border-red-500' : ''}
              />
              {errors.alamat && <p className="text-red-500 text-sm">{errors.alamat}</p>}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="rt">RT</Label>
                <Input
                  id="rt"
                  type="text"
                  maxLength={3}
                  value={warga.rt}
                  onChange={(e) => handleInputChange('rt', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="rw">RW</Label>
                <Input
                  id="rw"
                  type="text"
                  maxLength={3}
                  value={warga.rw}
                  onChange={(e) => handleInputChange('rw', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Pendidikan & Pekerjaan */}
        <Card>
          <CardHeader>
            <CardTitle>🎓 Data Pendidikan & Pekerjaan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pendidikan">Pendidikan Terakhir</Label>
                <select
                  id="pendidikan"
                  value={warga.pendidikan}
                  onChange={(e) => handleInputChange('pendidikan', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Pilih Pendidikan</option>
                  {pendidikanOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="pekerjaan">Pekerjaan</Label>
                <select
                  id="pekerjaan"
                  value={warga.pekerjaan}
                  onChange={(e) => handleInputChange('pekerjaan', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Pilih Pekerjaan</option>
                  {pekerjaanOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Keluarga */}
        <Card>
          <CardHeader>
            <CardTitle>👨‍👩‍👧‍👦 Data Keluarga</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="statusKeluarga">Status dalam Keluarga</Label>
                <select
                  id="statusKeluarga"
                  value={warga.keluarga.statusKeluarga}
                  onChange={(e) => handleInputChange('keluarga.statusKeluarga', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Pilih Status</option>
                  {statusKeluargaOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="noKK">No. Kartu Keluarga</Label>
                <Input
                  id="noKK"
                  type="text"
                  maxLength={16}
                  value={warga.keluarga.noKK}
                  onChange={(e) => handleInputChange('keluarga.noKK', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 justify-end">
              <Button 
                type="button"
                variant="outline"
                onClick={() => router.push('/warga')}
              >
                ❌ Batal
              </Button>
              <Button 
                type="submit"
                className="bg-green-600 hover:bg-green-700"
              >
                💾 Simpan Perubahan
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>

      {/* Activity Log */}
      <Card>
        <CardHeader>
          <CardTitle>📝 Riwayat Perubahan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Data dibuat</p>
                <p className="text-xs text-gray-500">
                  {new Date(warga.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Terakhir diperbarui</p>
                <p className="text-xs text-gray-500">
                  {new Date(warga.updatedAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}