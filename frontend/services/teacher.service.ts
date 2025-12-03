import api from '@/lib/api';

export interface Subject {
  id: number;
  name: string;
}

export interface Student {
  userId: number;
  user: {
    firstName: string;
    lastName: string;
    login: string;
  };
  grades: Grade[];
}

export interface Grade {
  id: number;
  value: number;
  studentId: number;
  subjectId: number;
  subject: Subject;
}

export const TeacherService = {
  getMySubjects: async () => {
    const response = await api.get('/subject/teacher-subjects');
    return response.data;
  },

  getStudentsBySubject: async (subjectId: number) => {
    const response = await api.get(`/student/${subjectId}/my-students`);
    return response.data;
  },

  getGradesBySubject: async (subjectId: number) => {
    const response = await api.get(`/grade/${subjectId}`);
    return response.data;
  },

  createGrade: async (data: { studentId: number; subjectId: number; value: number }) => {
    const response = await api.post('/grade/create', data);
    return response;
  },

  updateGrade: async (id: number, value: number) => {
    const response = await api.patch(`/grade/${id}`, { value });
    return response;
  }
};
