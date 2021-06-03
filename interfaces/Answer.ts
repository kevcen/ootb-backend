export interface Answer {
  type: string;
}

export interface SingleAnswer {
  answer: string;
}

export interface MultipleAnswer extends Answer {
  answers: string[];
}

export interface RangeAnswer extends Answer {
  start: number;
  end: number;
}

export default Answer;
