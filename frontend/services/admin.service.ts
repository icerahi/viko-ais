import api from "@/lib/api";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  login: string;
  role: "ADMIN" | "TEACHER" | "STUDENT";
}

export interface Student extends User {
  student: {
    id: number;
    groupId: number | null;
    group?: Group;
  } | null;
}

export interface Group {
  id: number;
  name: string;
  subjectGroup?: {
    subject: Subject;
  }[];
}

export interface Subject {
  id: number;
  name: string;
  teacherId: number | null;
  teacher?: {
    user: {
      firstName: string;
      lastName: string;
    };
  };
}

export const AdminService = {
  // User Management
  getAllUsers: async () => {
    const response = await api.get("/user");
    return response.data; // Fetch client returns body, which is { success: true, data: [...] }
  },
  getDashboardInfo: async () => {
    const response = await api.get("/dashboard");
    return response.data; // Fetch client returns body, which is { success: true, data: [...] }
  },
  createUser: async (data: any) => {
    const response = await api.post("/user/create", data);
    return response;
  },
  deleteUser: async (id: number) => {
    const response = await api.delete(`/user/${id}`);
    return response;
  },

  // Student Management
  getAllStudents: async () => {
    const response = await api.get("/student");
    return response.data;
  },
  assignStudentToGroup: async (userId: number, groupId: number) => {
    const response = await api.patch(`/student/${userId}/assign-group`, {
      groupId,
    });
    return response;
  },

  // Group Management
  getAllGroups: async () => {
    const response = await api.get("/group");
    return response.data;
  },
  createGroup: async (name: string) => {
    const response = await api.post("/group/create", { name });
    return response;
  },
  deleteGroup: async (id: number) => {
    const response = await api.delete(`/group/${id}`);
    return response;
  },
  assignSubjectToGroup: async (groupId: number, subjectId: number) => {
    console.log({ groupId, subjectId });
    const response = await api.post(`/group/${groupId}/assign-subject`, {
      subjectId,
    });
    return response;
  },
  removeSubjectFromGroup: async (groupId: number, subjectId: number) => {
    const response = await api.delete(`/group/${groupId}/remove-subject`, {
      body: JSON.stringify({ subjectId }),
    });
    return response;
  },

  // Subject Management
  getAllSubjects: async () => {
    const response = await api.get("/subject");
    return response.data;
  },
  createSubject: async (data: { name: string; teacherId?: number }) => {
    const response = await api.post("/subject/create", data);
    return response;
  },
  deleteSubject: async (id: number) => {
    const response = await api.delete(`/subject/${id}`);
    return response;
  },
  updateSubject: async (id: number, data: any) => {
    const response = await api.patch(`/subject/${id}`, data);
    return response;
  },
};
