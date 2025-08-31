'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const router = useRouter();

  // Auto redirect to dashboard after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  const handleGoDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardContent className="p-8 text-center">
          {/* Logo */}
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-2xl font-bold">RT</span>
          </div>
          
          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Sistem Informasi RT/RW
          </h1>
          
          {/* Subtitle */}
          <p className="text-gray-600 mb-6">
            Aplikasi manajemen database RT/RW yang dapat diakses via HP dan komputer
          </p>
          
          {/* RT/RW Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700">
              <strong>RT 001 RW 005</strong><br />
              Kelurahan Contoh<br />
              Kecamatan Contoh
            </p>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-2 gap-3 mb-6 text-xs">
            <div className="text-center p-2 bg-blue-50 rounded">
              <span className="block text-lg mb-1">👥</span>
              <span className="text-gray-700">Data Warga</span>
            </div>
            <div className="text-center p-2 bg-green-50 rounded">
              <span className="block text-lg mb-1">💰</span>
              <span className="text-gray-700">Keuangan</span>
            </div>
            <div className="text-center p-2 bg-orange-50 rounded">
              <span className="block text-lg mb-1">📄</span>
              <span className="text-gray-700">Surat</span>
            </div>
            <div className="text-center p-2 bg-purple-50 rounded">
              <span className="block text-lg mb-1">📊</span>
              <span className="text-gray-700">Laporan</span>
            </div>
          </div>
          
          {/* Action Button */}
          <Button 
            onClick={handleGoDashboard}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Masuk ke Dashboard
          </Button>
          
          {/* Auto redirect notice */}
          <p className="text-xs text-gray-500 mt-4">
            Otomatis masuk ke dashboard dalam 3 detik...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}