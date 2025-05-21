'use client';

import { QuestionFlow } from '@/components/QuestionFlow';

export default function ChatPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6" style={{ background: '#F5F5DC' }}>
      <QuestionFlow />
    </main>
  );
} 