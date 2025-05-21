import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6" style={{ background: '#F5F5DC' }}>
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-8 text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-800">진술서 자동 생성 서비스</h1>
          <p className="text-gray-600 text-sm">
            간단한 질문에 답변하시면 GPT가 자동으로 진술서를 작성해드립니다.
          </p>
        </div>
        <div className="pt-4">
          <Link
            href="/chat"
            className="inline-block w-full px-8 py-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
          >
            시작하기
          </Link>
        </div>
      </div>
    </main>
  );
}
