'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface FormData {
  // Data KK
  noKK: string;
  alamat: string;
  rt: string;
  rw: string;
  kodePosRW: string;
  kelurahan: string;
  kecamatan: string;
  kabupatenKota: string;
  provinsi: string;
  
  // Data Anggota Keluarga
  anggotaKeluarga: {
    nama: string;
    nik: string;
    jenisKelamin: 'L' | 'P' | '';
    tempatLahir: string;
    tanggalLahir: string;
    agama: string;
    pendidikan: string;
    jenisEkerjaan: string;
    statusPerkawinan: string;
    statusHubunganKeluarga: string;
    kewarganegaraan: string;
    dokumenImigrasi: string;
    noPaspor: string;
    noKitap: string;
    ayah: string;
    ibu: string;
  }[];
}

export default function TambahWargaPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState<FormData>({
    noKK: '',
    alamat: '',
    rt: '001',
    rw: '005',
    kodePosRW: '',
    kelurahan: '',
    kecamatan: '',
    kabupatenKota: '',
    provinsi: 'DKI Jakarta',
    anggotaKeluarga: [{
      nama: '',
      nik: '',
      jenisKelamin: '',
      tempatLahir: '',
      tanggalLahir: '',
      agama: '',
      pendidikan: '',
      jenisEkerjaan: '',
      statusPerkawinan: '',
      statusHubunganKeluarga: 'Kepala Keluarga',
      kewarganegaraan: 'WNI',
      dokumenImigrasi: '',
      noPaspor: '',
      noKitap: '',
      ayah: '',
      ibu: ''
    }]
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [currentStep, setCurrentStep] = useState(1);

  // Options for dropdowns
  const agamaOptions = ['Islam', 'Kristen', 'Katholik', 'Hindu', 'Buddha', 'Khong Hu Cu', 'Lainnya'];
  const pendidikanOptions = ['Tidak/Belum Sekolah', 'Tidak Tamat SD/Sederajat', 'Sedang SD/Sederajat', 'Tamat SD/Sederajat', 'Sedang SLTP/Sederajat', 'Tamat SLTP/Sederajat', 'Sedang SLTA/Sederajat', 'Tamat SLTA/Sederajat', 'Sedang D-1/Sederajat', 'Tamat D-1/Sederajat', 'Sedang D-2/Sederajat', 'Tamat D-2/Sederajat', 'Sedang D-3/Sederajat', 'Tamat D-3/Sederajat', 'Sedang S-1/Sederajat', 'Tamat S-1/Sederajat', 'Sedang S-2/Sederajat', 'Tamat S-2/Sederajat', 'Sedang S-3/Sederajat', 'Tamat S-3/Sederajat'];
  const pekerjaanOptions = ['Belum/Tidak Bekerja', 'Mengurus Rumah Tangga', 'Pelajar/Mahasiswa', 'Pensiunan', 'Pegawai Negeri Sipil', 'TNI', 'POLRI', 'Perdagangan', 'Petani/Perkebunan', 'Peternak', 'Nelayan/Perikanan', 'Industri', 'Konstruksi', 'Transportasi', 'Karyawan Swasta', 'Karyawan BUMN', 'Karyawan BUMD', 'Karyawan Honorer', 'Buruh Harian Lepas', 'Buruh Tani/Perkebunan', 'Buruh Nelayan/Perikanan', 'Buruh Peternakan', 'Pembantu Rumah Tangga', 'Tukang Cukur', 'Tukang Listrik', 'Tukang Batu', 'Tukang Kayu', 'Tukang Sol Sepatu', 'Tukang Las/Pandai Besi', 'Tukang Jahit', 'Penata Rambut', 'Penata Rias', 'Penata Busana', 'Mekanik', 'Tukang Gigi', 'Seniman', 'Tabib', 'Paraji', 'Perancang Busana', 'Penterjemah', 'Imam Masjid', 'Pendeta', 'Pastor', 'Wartawan', 'Ustadz/Mubaligh', 'Juru Masak', 'Promotor Acara', 'Anggota DPR-RI', 'Anggota DPD', 'Anggota BPK', 'Presiden', 'Wakil Presiden', 'Anggota Mahkamah Konstitusi', 'Anggota Kabinet Kementerian', 'Duta Besar', 'Gubernur', 'Wakil Gubernur', 'Bupati', 'Wakil Bupati', 'Walikota', 'Wakil Walikota', 'Anggota DPRD Propinsi', 'Anggota DPRD Kabupaten/Kota', 'Dosen', 'Guru', 'Pilot', 'Pengacara', 'Notaris', 'Arsitek', 'Akuntan', 'Konsultan', 'Dokter', 'Bidan', 'Perawat', 'Apoteker', 'Psikiater/Psikolog', 'Penyiar Televisi', 'Penyiar Radio', 'Pelaut', 'Peneliti', 'Sopir', 'Pialang', 'Paranormal', 'Pedagang', 'Perangkat Desa', 'Kepala Desa', 'Biarawati', 'Wiraswasta', 'Lainnya'];
  const statusPerkawinanOptions = ['Belum Kawin', 'Kawin', 'Cerai Hidup', 'Cerai Mati'];
  const hubunganKeluargaOptions = ['Kepala Keluarga', 'Suami', 'Istri', 'Anak', 'Menantu', 'Cucu', 'Orang Tua', 'Mertua', 'Famili Lain', 'Pembantu', 'Lainnya'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAnggotaChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      anggotaKeluarga: prev.anggotaKeluarga.map((anggota, i) => 
        i === index ? { ...anggota, [field]: value } : anggota
      )
    }));
  };

  const addAnggotaKeluarga = () => {
    setFormData(prev => ({
      ...prev,
      anggotaKeluarga: [...prev.anggotaKeluarga, {
        nama: '',
        nik: '',
        jenisKelamin: '',
        tempatLahir: '',
        tanggalLahir: '',
        agama: '',
        pendidikan: '',
        jenisEkerjaan: '',
        statusPerkawinan: '',
        statusHubunganKeluarga: '',
        kewarganegaraan: 'WNI',
        dokumenImigrasi: '',
        noPaspor: '',
        noKitap: '',
        ayah: '',
        ibu: ''
      }]
    }));
  };

  const removeAnggotaKeluarga = (index: number) => {
    if (formData.anggotaKeluarga.length > 1) {
      setFormData(prev => ({
        ...prev,
        anggotaKeluarga: prev.anggotaKeluarga.filter((_, i) => i !== index)
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // Validate alamat KK
    if (!formData.noKK) newErrors.noKK = 'No. KK wajib diisi';
    if (!formData.alamat) newErrors.alamat = 'Alamat wajib diisi';
    if (!formData.kelurahan) newErrors.kelurahan = 'Kelurahan wajib diisi';
    if (!formData.kecamatan) newErrors.kecamatan = 'Kecamatan wajib diisi';

    // Validate anggota keluarga
    formData.anggotaKeluarga.forEach((anggota, index) => {
      if (!anggota.nama) newErrors[`nama_${index}`] = 'Nama wajib diisi';
      if (!anggota.nik) newErrors[`nik_${index}`] = 'NIK wajib diisi';
      if (!anggota.jenisKelamin) newErrors[`jenisKelamin_${index}`] = 'Jenis kelamin wajib dipilih';
      if (!anggota.tempatLahir) newErrors[`tempatLahir_${index}`] = 'Tempat lahir wajib diisi';
      if (!anggota.tanggalLahir) newErrors[`tanggalLahir_${index}`] = 'Tanggal lahir wajib diisi';
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically send data to API
      console.log('Form Data:', formData);
      alert('Data berhasil disimpan!');
      router.push('/warga');
    }
  };

  const renderStep1 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🏠 Data Alamat Kartu Keluarga
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="noKK">No. Kartu Keluarga *</Label>
            <Input
              id="noKK"
              type="text"
              placeholder="Contoh: 3201010101010001"
              maxLength={16}
              value={formData.noKK}
              onChange={(e) => handleInputChange('noKK', e.target.value)}
              className={errors.noKK ? 'border-red-500' : ''}
            />
            {errors.noKK && <p className="text-red-500 text-sm">{errors.noKK}</p>}
          </div>
          
          <div>
            <Label htmlFor="kodePosRW">Kode Pos RW</Label>
            <Input
              id="kodePosRW"
              type="text"
              placeholder="Contoh: 12345"
              maxLength={5}
              value={formData.kodePosRW}
              onChange={(e) => handleInputChange('kodePosRW', e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="alamat">Alamat *</Label>
          <Textarea
            id="alamat"
            placeholder="Contoh: Jl. Mawar No. 12, Perumahan Indah"
            value={formData.alamat}
            onChange={(e) => handleInputChange('alamat', e.target.value)}
            className={errors.alamat ? 'border-red-500' : ''}
          />
          {errors.alamat && <p className="text-red-500 text-sm">{errors.alamat}</p>}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="rt">RT *</Label>
            <Input
              id="rt"
              type="text"
              placeholder="001"
              maxLength={3}
              value={formData.rt}
              onChange={(e) => handleInputChange('rt', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="rw">RW *</Label>
            <Input
              id="rw"
              type="text"
              placeholder="005"
              maxLength={3}
              value={formData.rw}
              onChange={(e) => handleInputChange('rw', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="kelurahan">Kelurahan *</Label>
            <Input
              id="kelurahan"
              type="text"
              placeholder="Contoh: Menteng"
              value={formData.kelurahan}
              onChange={(e) => handleInputChange('kelurahan', e.target.value)}
              className={errors.kelurahan ? 'border-red-500' : ''}
            />
            {errors.kelurahan && <p className="text-red-500 text-sm">{errors.kelurahan}</p>}
          </div>
          
          <div>
            <Label htmlFor="kecamatan">Kecamatan *</Label>
            <Input
              id="kecamatan"
              type="text"
              placeholder="Contoh: Menteng"
              value={formData.kecamatan}
              onChange={(e) => handleInputChange('kecamatan', e.target.value)}
              className={errors.kecamatan ? 'border-red-500' : ''}
            />
            {errors.kecamatan && <p className="text-red-500 text-sm">{errors.kecamatan}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="kabupatenKota">Kabupaten/Kota</Label>
            <Input
              id="kabupatenKota"
              type="text"
              placeholder="Contoh: Jakarta Pusat"
              value={formData.kabupatenKota}
              onChange={(e) => handleInputChange('kabupatenKota', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="provinsi">Provinsi</Label>
            <Input
              id="provinsi"
              type="text"
              placeholder="DKI Jakarta"
              value={formData.provinsi}
              onChange={(e) => handleInputChange('provinsi', e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              👥 Data Anggota Keluarga
            </CardTitle>
            <Button 
              type="button" 
              onClick={addAnggotaKeluarga}
              className="bg-green-600 hover:bg-green-700"
              size="sm"
            >
              ➕ Tambah Anggota
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {formData.anggotaKeluarga.map((anggota, index) => (
              <div key={index} className="border rounded-lg p-4 relative">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline">
                    Anggota Keluarga #{index + 1}
                  </Badge>
                  {formData.anggotaKeluarga.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeAnggotaKeluarga(index)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:bg-red-50"
                    >
                      🗑️ Hapus
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Nama */}
                  <div className="md:col-span-2">
                    <Label htmlFor={`nama_${index}`}>Nama Lengkap *</Label>
                    <Input
                      id={`nama_${index}`}
                      type="text"
                      placeholder="Nama lengkap sesuai KTP"
                      value={anggota.nama}
                      onChange={(e) => handleAnggotaChange(index, 'nama', e.target.value)}
                      className={errors[`nama_${index}`] ? 'border-red-500' : ''}
                    />
                    {errors[`nama_${index}`] && <p className="text-red-500 text-sm">{errors[`nama_${index}`]}</p>}
                  </div>

                  {/* NIK */}
                  <div>
                    <Label htmlFor={`nik_${index}`}>NIK *</Label>
                    <Input
                      id={`nik_${index}`}
                      type="text"
                      placeholder="16 digit NIK"
                      maxLength={16}
                      value={anggota.nik}
                      onChange={(e) => handleAnggotaChange(index, 'nik', e.target.value)}
                      className={errors[`nik_${index}`] ? 'border-red-500' : ''}
                    />
                    {errors[`nik_${index}`] && <p className="text-red-500 text-sm">{errors[`nik_${index}`]}</p>}
                  </div>

                  {/* Jenis Kelamin */}
                  <div>
                    <Label htmlFor={`jenisKelamin_${index}`}>Jenis Kelamin *</Label>
                    <select
                      id={`jenisKelamin_${index}`}
                      value={anggota.jenisKelamin}
                      onChange={(e) => handleAnggotaChange(index, 'jenisKelamin', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md ${errors[`jenisKelamin_${index}`] ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Pilih</option>
                      <option value="L">Laki-laki</option>
                      <option value="P">Perempuan</option>
                    </select>
                    {errors[`jenisKelamin_${index}`] && <p className="text-red-500 text-sm">{errors[`jenisKelamin_${index}`]}</p>}
                  </div>

                  {/* Tempat Lahir */}
                  <div>
                    <Label htmlFor={`tempatLahir_${index}`}>Tempat Lahir *</Label>
                    <Input
                      id={`tempatLahir_${index}`}
                      type="text"
                      placeholder="Kota kelahiran"
                      value={anggota.tempatLahir}
                      onChange={(e) => handleAnggotaChange(index, 'tempatLahir', e.target.value)}
                      className={errors[`tempatLahir_${index}`] ? 'border-red-500' : ''}
                    />
                    {errors[`tempatLahir_${index}`] && <p className="text-red-500 text-sm">{errors[`tempatLahir_${index}`]}</p>}
                  </div>

                  {/* Tanggal Lahir */}
                  <div>
                    <Label htmlFor={`tanggalLahir_${index}`}>Tanggal Lahir *</Label>
                    <Input
                      id={`tanggalLahir_${index}`}
                      type="date"
                      value={anggota.tanggalLahir}
                      onChange={(e) => handleAnggotaChange(index, 'tanggalLahir', e.target.value)}
                      className={errors[`tanggalLahir_${index}`] ? 'border-red-500' : ''}
                    />
                    {errors[`tanggalLahir_${index}`] && <p className="text-red-500 text-sm">{errors[`tanggalLahir_${index}`]}</p>}
                  </div>

                  {/* Agama */}
                  <div>
                    <Label htmlFor={`agama_${index}`}>Agama</Label>
                    <select
                      id={`agama_${index}`}
                      value={anggota.agama}
                      onChange={(e) => handleAnggotaChange(index, 'agama', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Pilih Agama</option>
                      {agamaOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {/* Pendidikan */}
                  <div>
                    <Label htmlFor={`pendidikan_${index}`}>Pendidikan</Label>
                    <select
                      id={`pendidikan_${index}`}
                      value={anggota.pendidikan}
                      onChange={(e) => handleAnggotaChange(index, 'pendidikan', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Pilih Pendidikan</option>
                      {pendidikanOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {/* Jenis Pekerjaan */}
                  <div>
                    <Label htmlFor={`jenisEkerjaan_${index}`}>Jenis Pekerjaan</Label>
                    <select
                      id={`jenisEkerjaan_${index}`}
                      value={anggota.jenisEkerjaan}
                      onChange={(e) => handleAnggotaChange(index, 'jenisEkerjaan', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Pilih Pekerjaan</option>
                      {pekerjaanOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {/* Status Perkawinan */}
                  <div>
                    <Label htmlFor={`statusPerkawinan_${index}`}>Status Perkawinan</Label>
                    <select
                      id={`statusPerkawinan_${index}`}
                      value={anggota.statusPerkawinan}
                      onChange={(e) => handleAnggotaChange(index, 'statusPerkawinan', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Pilih Status</option>
                      {statusPerkawinanOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {/* Status Hubungan Keluarga */}
                  <div>
                    <Label htmlFor={`statusHubunganKeluarga_${index}`}>Status Hubungan Keluarga</Label>
                    <select
                      id={`statusHubunganKeluarga_${index}`}
                      value={anggota.statusHubunganKeluarga}
                      onChange={(e) => handleAnggotaChange(index, 'statusHubunganKeluarga', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Pilih Hubungan</option>
                      {hubunganKeluargaOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {/* Kewarganegaraan */}
                  <div>
                    <Label htmlFor={`kewarganegaraan_${index}`}>Kewarganegaraan</Label>
                    <select
                      id={`kewarganegaraan_${index}`}
                      value={anggota.kewarganegaraan}
                      onChange={(e) => handleAnggotaChange(index, 'kewarganegaraan', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="WNI">WNI</option>
                      <option value="WNA">WNA</option>
                    </select>
                  </div>

                  {/* Fields untuk WNA */}
                  {anggota.kewarganegaraan === 'WNA' && (
                    <>
                      <div>
                        <Label htmlFor={`noPaspor_${index}`}>No. Paspor</Label>
                        <Input
                          id={`noPaspor_${index}`}
                          type="text"
                          placeholder="Nomor paspor"
                          value={anggota.noPaspor}
                          onChange={(e) => handleAnggotaChange(index, 'noPaspor', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`noKitap_${index}`}>No. KITAP</Label>
                        <Input
                          id={`noKitap_${index}`}
                          type="text"
                          placeholder="Nomor KITAP"
                          value={anggota.noKitap}
                          onChange={(e) => handleAnggotaChange(index, 'noKitap', e.target.value)}
                        />
                      </div>
                    </>
                  )}

                  {/* Nama Ayah */}
                  <div>
                    <Label htmlFor={`ayah_${index}`}>Nama Ayah</Label>
                    <Input
                      id={`ayah_${index}`}
                      type="text"
                      placeholder="Nama ayah kandung"
                      value={anggota.ayah}
                      onChange={(e) => handleAnggotaChange(index, 'ayah', e.target.value)}
                    />
                  </div>

                  {/* Nama Ibu */}
                  <div>
                    <Label htmlFor={`ibu_${index}`}>Nama Ibu</Label>
                    <Input
                      id={`ibu_${index}`}
                      type="text"
                      placeholder="Nama ibu kandung"
                      value={anggota.ibu}
                      onChange={(e) => handleAnggotaChange(index, 'ibu', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tambah Data Warga Baru</h1>
          <p className="text-gray-600">Form entry data berdasarkan format Kartu Keluarga</p>
        </div>
        <Link href="/warga">
          <Button variant="outline">
            ← Kembali ke Daftar Warga
          </Button>
        </Link>
      </div>

      {/* Step Indicator */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-center space-x-8">
            <div className={`flex items-center space-x-2 ${currentStep === 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                1
              </div>
              <span className="hidden sm:inline font-medium">Data Alamat</span>
            </div>
            
            <div className="w-16 h-0.5 bg-gray-200"></div>
            
            <div className={`flex items-center space-x-2 ${currentStep === 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                2
              </div>
              <span className="hidden sm:inline font-medium">Data Anggota</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit}>
        {/* Step Content */}
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}

        {/* Navigation Buttons */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between">
              <div>
                {currentStep > 1 && (
                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={() => setCurrentStep(currentStep - 1)}
                  >
                    ← Sebelumnya
                  </Button>
                )}
              </div>
              
              <div className="flex gap-2">
                {currentStep < 2 ? (
                  <Button 
                    type="button"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Selanjutnya →
                  </Button>
                ) : (
                  <Button 
                    type="submit"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    💾 Simpan Data Keluarga
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </form>

      {/* Help Section */}
      <Card>
        <CardHeader>
          <CardTitle>💡 Petunjuk Pengisian</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Step 1 - Data Alamat:</h4>
              <ul className="space-y-1">
                <li>• Isi No. KK dengan 16 digit sesuai Kartu Keluarga</li>
                <li>• Alamat lengkap termasuk nama jalan dan nomor</li>
                <li>• RT/RW sesuai dengan wilayah tempat tinggal</li>
                <li>• Data kelurahan dan kecamatan wajib diisi</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Step 2 - Data Anggota:</h4>
              <ul className="space-y-1">
                <li>• Anggota pertama biasanya Kepala Keluarga</li>
                <li>• NIK harus 16 digit sesuai KTP</li>
                <li>• Isi data lengkap sesuai dokumen resmi</li>
                <li>• Gunakan tombol "Tambah Anggota" untuk keluarga besar</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}