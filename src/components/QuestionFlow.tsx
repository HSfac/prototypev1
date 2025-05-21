import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { questions } from '@/utils/questionFlow';
import { useStore } from '@/lib/store';
import { TextInput } from './TextInput';
import { SelectInput } from './SelectInput';

export const QuestionFlow: React.FC = () => {
  const router = useRouter();
  const { answers, currentQuestionId, setAnswer, setCurrentQuestionId } = useStore();
  const [inputValue, setInputValue] = useState('');

  const currentQuestion = questions.find((q) => q.id === currentQuestionId);

  // 선택형 질문인 경우 선택시 자동 제출되도록 처리
  const handleSelectChange = (value: string) => {
    setInputValue(value);
    if (value && currentQuestion?.type === 'select') {
      // 선택 즉시 답변 제출 (자동)
      submitAnswer(value);
    }
  };

  // 텍스트 입력 처리
  const handleTextChange = (value: string) => {
    setInputValue(value);
  };

  // 답변 제출 및 다음 질문으로 이동
  const submitAnswer = (value: string) => {
    if (!value) return;
    
    console.log(`제출된 답변: ${value}`);
    console.log(`현재 질문 ID: ${currentQuestionId}`);
    
    // 답변 저장
    setAnswer(currentQuestionId, value);
    
    // 다음 질문 계산
    let nextQuestionId;
    if (typeof currentQuestion?.next === 'function') {
      nextQuestionId = currentQuestion.next(value);
      console.log(`분기 함수 실행 결과: ${nextQuestionId}`);
    } else {
      nextQuestionId = currentQuestion?.next;
      console.log(`고정 다음 질문: ${nextQuestionId}`);
    }
    
    // 입력값 초기화
    setInputValue('');
    
    // 페이지 이동 또는 다음 질문으로
    if (nextQuestionId === 'end') {
      console.log('마지막 질문 완료, 결과 페이지로 이동');
      router.push('/result');
    } else if (nextQuestionId) {
      console.log(`다음 질문으로 이동: ${nextQuestionId}`);
      setCurrentQuestionId(nextQuestionId);
    }
  };

  // 버튼 클릭 처리
  const handleSubmit = () => {
    submitAnswer(inputValue);
  };

  if (!currentQuestion) return null;

  return (
    <div className="w-full max-w-md mx-auto p-4 min-h-screen flex flex-col" style={{ background: '#F5F5DC' }}>
      <div className="flex-1 flex flex-col justify-end space-y-4 mb-4">
        {/* 이전 질문들과 답변들 */}
        {questions
          .filter(q => q.id !== currentQuestionId && answers[q.id])
          .map(q => (
            <div key={q.id} className="space-y-2">
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none px-4 py-2 max-w-[80%]">
                  {q.text}
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-blue-100 text-blue-900 rounded-2xl rounded-tr-none px-4 py-2 max-w-[80%]">
                  {answers[q.id]}
                </div>
              </div>
            </div>
          ))}
        
        {/* 현재 질문 */}
        <div className="flex justify-start">
          <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none px-4 py-2 max-w-[80%]">
            {currentQuestion.text}
          </div>
        </div>
      </div>

      {/* 입력 영역 */}
      <div className="sticky bottom-0 pt-4 pb-6" style={{ background: '#F5F5DC' }}>
        <div className="bg-white rounded-full shadow-lg p-2 flex">
          {currentQuestion.type === 'text' ? (
            <>
              <TextInput
                value={inputValue}
                onChange={handleTextChange}
              />
              <button 
                onClick={handleSubmit}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              >
                전송
              </button>
            </>
          ) : (
            <>
              <SelectInput
                value={inputValue}
                onChange={handleSelectChange}
                options={currentQuestion.options || []}
              />
              {/* 선택형은 옵션 선택 시 자동 제출됨 */}
            </>
          )}
        </div>
        
        {/* 디버그 정보 (개발용) */}
        <div className="mt-2 text-xs text-gray-500">
          현재 질문 ID: {currentQuestionId}
        </div>
      </div>
    </div>
  );
}; 