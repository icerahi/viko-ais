import api from '@/lib/api';

export interface Subject {
  id: number;
  name: string;
  teacher?: {
      user: {
          firstName: string;
          lastName: string;
      }
  };
}

export interface Grade {
  id: number;
  value: number;
  subjectId: number;
  subject: Subject;
}

export const StudentService = {
  getMySubjects: async () => {
    const response = await api.get('/subject/my-subjects');
    return response.data;
  },

  getMyGrades: async () => {
    const response = await api.get('/grade/my-grades');
    return response.data;
  }
};
