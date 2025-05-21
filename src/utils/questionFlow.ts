export interface Question {
  id: string;
  text: string;
  type: 'text' | 'select';
  options?: string[];
  next: string | ((answer: string) => string);
}

export const questions: Question[] = [
  {
    id: 'q1',
    text: '채무는 언제 발생했나요?',
    type: 'text',
    next: 'q2'
  },
  {
    id: 'q2',
    text: '발생 사유는 무엇인가요?',
    type: 'select',
    options: ['사업 실패', '가족 질병', '기타'],
    next: (answer: string) => {
      if (answer === '사업 실패') return 'q3a';
      if (answer === '가족 질병') return 'q3b';
      return 'q4';
    }
  },
  {
    id: 'q3a',
    text: '실패한 업종은 무엇인가요?',
    type: 'text',
    next: 'q4'
  },
  {
    id: 'q3b',
    text: '가족의 질병이나 상황을 설명해주세요.',
    type: 'text',
    next: 'q4'
  },
  {
    id: 'q4',
    text: '현재 소득 상황은 어떤가요?',
    type: 'text',
    next: 'q5'
  },
  {
    id: 'q5',
    text: '채무 상환 계획이 있으신가요?',
    type: 'select',
    options: ['예', '아니오'],
    next: 'end'
  }
]; 