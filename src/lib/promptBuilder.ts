export const buildPrompt = (answers: Record<string, string>) => `
다음 정보를 바탕으로 진술서를 작성해주세요. 500~700자 분량으로 정중하고 공식적인 어투로 작성해주세요.

1. 채무 발생 시점: ${answers.q1}
2. 발생 사유: ${answers.q2}
3. 상세 내용: ${answers.q3a || answers.q3b || '없음'}
4. 현재 소득 상황: ${answers.q4}
5. 채무 상환 계획: ${answers.q5}

→ 제출용 진술서 형식으로 작성해주세요.
`; 