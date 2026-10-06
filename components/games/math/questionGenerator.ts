export interface QuestionData {
  question: string;
  choices: number[];
  answer: number;
}

/**
 * Generates a simple math question based on addition, subtraction, or multiplication
 * @returns A question object with the question text, choices, and correct answer
 */
export const generateQuestion = (): QuestionData => {
  const operations = ['+', '-', '*'];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  
  let num1: number, num2: number, answer: number;
  
  switch(operation) {
    case '+':
      num1 = Math.floor(Math.random() * 20) + 1;
      num2 = Math.floor(Math.random() * 20) + 1;
      answer = num1 + num2;
      break;
    case '-':
      num1 = Math.floor(Math.random() * 20) + 10;
      num2 = Math.floor(Math.random() * 10) + 1;
      answer = num1 - num2;
      break;
    case '*':
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      answer = num1 * num2;
      break;
    default:
      // Fallback to addition if something goes wrong
      num1 = Math.floor(Math.random() * 20) + 1;
      num2 = Math.floor(Math.random() * 20) + 1;
      answer = num1 + num2;
  }
  
  // Generate 4 choices including the correct answer
  const choices: number[] = [answer];
  while(choices.length < 4) {
    const randomChoice = answer + Math.floor(Math.random() * 10) - 5;
    if (!choices.includes(randomChoice) && randomChoice > 0) {
      choices.push(randomChoice);
    }
  }
  
  // Shuffle choices
  choices.sort(() => Math.random() - 0.5);
  
  return {
    question: `${num1} ${operation} ${num2} = ?`,
    choices,
    answer
  };
}; 