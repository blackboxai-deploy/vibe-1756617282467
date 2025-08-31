// TypeScript interfaces untuk sistem informasi RT/RW

export interface Warga {
  id: string;
  nik: string;
  nama: string;
  tempatLahir: string;
  tanggalLahir: string;
  jenisKelamin: 'L' | 'P';
  alamat: string;
  rt: string;
  rw: string;
  agama: string;
  statusPerkawinan: string;
  pekerjaan: string;
  pendidikan: string;
  noTelepon?: string;
  keluarga: {
    statusKeluarga: 'Kepala Keluarga' | 'Istri' | 'Anak' | 'Lainnya';
    noKK: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Keuangan {
  id: string;
  jenis: 'pemasukan' | 'pengeluaran';
  kategori: string;
  jumlah: number;
  keterangan: string;
  tanggal: string;
  bukti?: string;
}

export interface Kegiatan {
  id: string;
  nama: string;
  tanggal: string;
  waktu: string;
  tempat: string;
  deskripsi: string;
  status: 'aktif' | 'selesai' | 'batal';
  peserta?: number;
}

export interface Pengumuman {
  id: string;
  judul: string;
  isi: string;
  tanggal: string;
  penting: boolean;
  penulis: string;
}

export interface Surat {
  id: string;
  jenis: string;
  nomorSurat: string;
  tanggal: string;
  kepada: string;
  perihal: string;
  isiSurat: string;
  penandatangan: string;
}

export interface DashboardStats {
  totalWarga: number;
  totalKK: number;
  lakiLaki: number;
  perempuan: number;
  anak: number;
  dewasa: number;
  lansia: number;
  kasRT: number;
  totalIuran: number;
  tunggakanIuran: number;
}