
export type View = 
  | 'dashboard' | 'grades' | 'leaderboard' | 'homework' | 'calendar' | 'learning' | 'goals' | 'portfolio' | 'psychologist'
  | 'teacher-profile' | 'teacher-leaderboard' | 'teacher-grades' | 'teacher-classes' | 'teacher-generator' | 'teacher-feedback' | 'teacher-homework'
  | 'feedback-form';

export type Role = 'student' | 'teacher';

export interface User {
  id: string;
  email: string;
  password?: string;
  role: Role;
  name: string;
  class?: string;
  subjects?: string[];
  avatar?: string;
  classes?: string[];
}

export interface StudentData {
  id: string;
  gpa: number;
  score: number;
  streak: number;
  goals_completed: number;
  goals_total: number;
  progress_data: { month: string; overall: number }[];
}

export interface TeacherData {
  id: string;
  name: string;
  subject: string;
  classes: string[];
  score: number;
  total_students: number;
  recent_feedback: FeedbackResponse[];
}

export interface ClassList {
  [className: string]: {
    students: {
      id: string;
      name: string;
      activity_score: number;
      streak: number;
      avatar?: string;
    }[];
  }
}

export interface GradeEntry {
  type: string;
  name: string;
  score: number;
  date: string;
}

export interface StudentGradeRecord {
  subject: string;
  grades: GradeEntry[];
  current_percentage: number;
  trend: 'up' | 'down' | 'stable';
}

export interface ClassGrades {
  class_id: string;
  students: {
    student_id: string;
    student_name: string;
    subjects: StudentGradeRecord[];
  }[];
}

export interface Assignment {
  id: string;
  class_id: string;
  teacher_id: string;
  teacher_name: string;
  subject: string;
  title: string;
  description: string;
  deadline: string;
  type: 'homework' | 'exam' | 'project';
  status?: 'not_started' | 'in_progress' | 'completed';
  completed_by?: string[];
}

export interface CalendarEvent {
  id: string | number;
  title: string;
  date: string;
  type: 'academic' | 'social' | 'holiday';
  description?: string;
}

export type Event = CalendarEvent;

export interface Goal {
  id: string | number;
  title: string;
  description?: string;
  progress: number;
  deadline?: string;
  completed: boolean;
}

export interface FeedbackFormConfig {
  id: string;
  teacher_id: string;
  class_id: string;
  lesson_topic: string;
  date: string;
  url: string;
  status: 'active' | 'closed';
}

export interface FeedbackResponse {
  id: string;
  form_id: string;
  ratings: {
    interest: number;
    clarity: number;
    productivity: number;
    efficiency: number;
  };
  comments: {
    improve: string;
    liked: string;
  };
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

export interface StudentProfile {
  name: string;
  gpa: number;
  activityScore: number;
  streak: number;
  goalsCompleted: number;
  totalGoals: number;
  avatar: string;
}

export interface Grade {
  subject: string;
  percentage: number;
  grade: string;
}

export interface Flashcard {
  front: string;
  back: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Honor {
  id: number;
  title: string;
  date: string;
}

export interface TeacherProfileData {
  name: string;
  subject: string;
  avatar: string;
  lessonQualityScore: number;
  totalStudents: number;
  recentFeedback: {
    id: number;
    text: string;
    rating: number;
    date: string;
  }[];
}

export interface TeacherLeaderboardItem {
  id: number;
  name: string;
  subject: string;
  score: number;
  rating: number;
  feedbackCount: number;
  avatar: string;
  isCurrent: boolean;
}

export interface ClassStudent {
  id: number;
  name: string;
  activityScore: number;
  streak: number;
  averageGrade: number;
  avatar: string;
  grades: { name: string; score: number }[];
}
