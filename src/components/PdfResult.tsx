import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import html2pdf from 'html2pdf.js';
import { useStore } from '@/lib/store';
import { buildPrompt } from '@/lib/promptBuilder';
import { generateStatement } from '@/lib/gptClient';

export const PdfResult: React.FC = () => {
  const router = useRouter();
  const { answers, reset } = useStore();
  const [statement, setStatement] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generate = async () => {
      try {
        const prompt = buildPrompt(answers);
        const result = await generateStatement(prompt);
        setStatement(result || '');
      } catch (error) {
        console.error('Error generating statement:', error);
      } finally {
        setLoading(false);
      }
    };

    generate();
  }, [answers]);

  const handleDownload = () => {
    const element = document.getElementById('pdf-content');
    if (element) {
      html2pdf().from(element).save('진술서.pdf');
    }
  };

  const handleRestart = () => {
    reset();
    router.push('/chat');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-beige-100 flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">진술서를 생성하고 있습니다...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige-100 flex flex-col items-center p-6">
      <div className="w-full max-w-md">
        <div id="pdf-content" className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">생성된 진술서</h2>
          <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">{statement}</div>
        </div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleDownload}
            className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
          >
            PDF 다운로드
          </button>
          <button
            onClick={handleRestart}
            className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
          >
            다시 시작
          </button>
        </div>
      </div>
    </div>
  );
}; 