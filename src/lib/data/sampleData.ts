import { Warga, Keuangan, Kegiatan, Pengumuman } from '../types';

// Sample data warga
export const sampleWarga: Warga[] = [
  {
    id: '1',
    nik: '3201010101850001',
    nama: 'Budi Santoso',
    tempatLahir: 'Jakarta',
    tanggalLahir: '1985-01-01',
    jenisKelamin: 'L',
    alamat: 'Jl. Mawar No. 12',
    rt: '001',
    rw: '005',
    agama: 'Islam',
    statusPerkawinan: 'Kawin',
    pekerjaan: 'Pegawai Swasta',
    pendidikan: 'S1',
    noTelepon: '081234567890',
    keluarga: {
      statusKeluarga: 'Kepala Keluarga',
      noKK: '3201010101010001'
    },
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '2',
    nik: '3201010101860002',
    nama: 'Siti Rahayu',
    tempatLahir: 'Bandung',
    tanggalLahir: '1986-05-15',
    jenisKelamin: 'P',
    alamat: 'Jl. Mawar No. 12',
    rt: '001',
    rw: '005',
    agama: 'Islam',
    statusPerkawinan: 'Kawin',
    pekerjaan: 'Ibu Rumah Tangga',
    pendidikan: 'SMA',
    noTelepon: '081234567891',
    keluarga: {
      statusKeluarga: 'Istri',
      noKK: '3201010101010001'
    },
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '3',
    nik: '3201010101100003',
    nama: 'Ahmad Santoso',
    tempatLahir: 'Jakarta',
    tanggalLahir: '2010-03-20',
    jenisKelamin: 'L',
    alamat: 'Jl. Mawar No. 12',
    rt: '001',
    rw: '005',
    agama: 'Islam',
    statusPerkawinan: 'Belum Kawin',
    pekerjaan: 'Pelajar',
    pendidikan: 'SMP',
    keluarga: {
      statusKeluarga: 'Anak',
      noKK: '3201010101010001'
    },
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '4',
    nik: '3201010101700004',
    nama: 'Agus Wijaya',
    tempatLahir: 'Surabaya',
    tanggalLahir: '1970-08-12',
    jenisKelamin: 'L',
    alamat: 'Jl. Melati No. 25',
    rt: '002',
    rw: '005',
    agama: 'Kristen',
    statusPerkawinan: 'Kawin',
    pekerjaan: 'Wiraswasta',
    pendidikan: 'S1',
    noTelepon: '081234567892',
    keluarga: {
      statusKeluarga: 'Kepala Keluarga',
      noKK: '3201010101010002'
    },
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '5',
    nik: '3201010101750005',
    nama: 'Maria Wijaya',
    tempatLahir: 'Medan',
    tanggalLahir: '1975-12-05',
    jenisKelamin: 'P',
    alamat: 'Jl. Melati No. 25',
    rt: '002',
    rw: '005',
    agama: 'Kristen',
    statusPerkawinan: 'Kawin',
    pekerjaan: 'Guru',
    pendidikan: 'S1',
    noTelepon: '081234567893',
    keluarga: {
      statusKeluarga: 'Istri',
      noKK: '3201010101010002'
    },
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  }
];

// Sample data keuangan
export const sampleKeuangan: Keuangan[] = [
  {
    id: '1',
    jenis: 'pemasukan',
    kategori: 'Iuran Bulanan',
    jumlah: 2500000,
    keterangan: 'Iuran bulanan Januari 2024',
    tanggal: '2024-01-31',
    bukti: 'bukti-iuran-jan-2024.pdf'
  },
  {
    id: '2',
    jenis: 'pengeluaran',
    kategori: 'Kebersihan',
    jumlah: 800000,
    keterangan: 'Gaji petugas kebersihan bulan Januari',
    tanggal: '2024-01-15',
    bukti: 'struk-gaji-kebersihan.pdf'
  },
  {
    id: '3',
    jenis: 'pengeluaran',
    kategori: 'Keamanan',
    jumlah: 1000000,
    keterangan: 'Gaji satpam bulan Januari',
    tanggal: '2024-01-15',
    bukti: 'struk-gaji-satpam.pdf'
  },
  {
    id: '4',
    jenis: 'pemasukan',
    kategori: 'Sumbangan',
    jumlah: 500000,
    keterangan: 'Sumbangan dari warga untuk kegiatan 17 Agustus',
    tanggal: '2024-01-20'
  },
  {
    id: '5',
    jenis: 'pengeluaran',
    kategori: 'Pemeliharaan',
    jumlah: 300000,
    keterangan: 'Perbaikan lampu jalan RT 001',
    tanggal: '2024-01-25',
    bukti: 'nota-lampu-jalan.pdf'
  }
];

// Sample data kegiatan
export const sampleKegiatan: Kegiatan[] = [
  {
    id: '1',
    nama: 'Kerja Bakti Mingguan',
    tanggal: '2024-02-04',
    waktu: '07:00',
    tempat: 'Area RT 001 & 002',
    deskripsi: 'Kerja bakti membersihkan lingkungan RT bersama-sama',
    status: 'aktif',
    peserta: 25
  },
  {
    id: '2',
    nama: 'Arisan RT',
    tanggal: '2024-02-10',
    waktu: '19:00',
    tempat: 'Balai RT',
    deskripsi: 'Arisan bulanan RT dengan doorprize menarik',
    status: 'aktif',
    peserta: 35
  },
  {
    id: '3',
    nama: 'Posyandu Balita',
    tanggal: '2024-02-15',
    waktu: '08:00',
    tempat: 'Balai RT',
    deskripsi: 'Pemeriksaan kesehatan balita dan pemberian imunisasi',
    status: 'aktif',
    peserta: 15
  }
];

// Sample data pengumuman
export const samplePengumuman: Pengumuman[] = [
  {
    id: '1',
    judul: 'Jadwal Pembayaran Iuran Februari 2024',
    isi: 'Diinformasikan kepada seluruh warga bahwa pembayaran iuran bulan Februari 2024 dapat dilakukan mulai tanggal 1-10 Februari 2024. Pembayaran dapat dilakukan kepada Bendahara RT atau transfer ke rekening yang telah ditentukan.',
    tanggal: '2024-01-28',
    penting: true,
    penulis: 'Ketua RT 001'
  },
  {
    id: '2',
    judul: 'Jadwal Pemadaman Listrik PLN',
    isi: 'PLN akan melakukan pemadaman listrik pada hari Sabtu, 3 Februari 2024 pukul 08:00-12:00 WIB untuk pemeliharaan jaringan. Harap persiapkan diri dengan baik.',
    tanggal: '2024-01-30',
    penting: true,
    penulis: 'Ketua RW 005'
  },
  {
    id: '3',
    judul: 'Lomba 17 Agustus 2024',
    isi: 'Dalam rangka memperingati HUT RI ke-79, akan diadakan berbagai lomba untuk anak-anak dan dewasa. Pendaftaran dibuka mulai 1 Juli 2024. Info lebih lanjut hubungi panitia.',
    tanggal: '2024-01-25',
    penting: false,
    penulis: 'Panitia HUT RI'
  }
];