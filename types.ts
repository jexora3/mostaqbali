
export enum Level {
  PRIMARY = 'Ibtidai',
  MIDDLE = 'I3dadi',
  HIGH = 'Tanawi'
}

export interface Grade {
  id: string;
  name: string;
  level: Level;
  icon: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface Lesson {
  id: string;
  title: string;
  subject: string;
  content: string;
}
