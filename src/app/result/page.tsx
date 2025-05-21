'use client';

import { PdfResult } from '@/components/PdfResult';

export default function ResultPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6" style={{ background: '#F5F5DC' }}>
      <PdfResult />
    </main>
  );
} 