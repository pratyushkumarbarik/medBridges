import { User, UserProfile, LoginCredentials, RegisterData, ForgotPasswordData } from '../types/UserTypes';

export const mockCurrentUser: User = {
  id: 'usr_001',
  email: 'demo@medibridges.com',
  firstName: 'John',
  lastName: 'Doe',
  phone: '+1 555-123-4567',
  dateOfBirth: '1985-06-15',
  gender: 'male',
  role: 'patient',
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2025-09-01T10:00:00Z',
};

export const mockUserProfile: UserProfile = {
  ...mockCurrentUser,
  emergencyContactName: 'Jane Doe',
  emergencyContactPhone: '+1 555-987-6543',
  bloodType: 'O+',
  allergies: ['Penicillin', 'Shellfish'],
  insuranceProvider: 'BlueCross Health',
  insurancePolicyNumber: 'BC-123456789',
  notificationPreferences: {
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: false,
    appointmentReminders: true,
    treatmentUpdates: true,
    promotions: false,
  },
};

let currentSessionUser: User | null = mockCurrentUser;

export function mockUserByEmail(email: string): User | undefined {
  return mockCurrentUser.email === email ? mockCurrentUser : undefined;
}

export function mockUserById(id: string): User | undefined {
  return mockCurrentUser.id === id ? mockCurrentUser : undefined;
}

export function loginUser(user: User): void {
  currentSessionUser = user;
  sessionStorage.setItem('medibridges_user', JSON.stringify(user));
}

export function registerUser(data: RegisterData): User {
  const newUser: User = {
    id: `usr_${Date.now()}`,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    dateOfBirth: data.dateOfBirth,
    gender: data.gender,
    role: 'patient',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  currentSessionUser = newUser;
  sessionStorage.setItem('medibridges_user', JSON.stringify(newUser));
  return newUser;
}

export function getCurrentSessionUser(): User | null {
  const stored = sessionStorage.getItem('medibridges_user');
  if (stored) {
    try {
      return JSON.parse(stored) as User;
    } catch {
      return currentSessionUser;
    }
  }
  return currentSessionUser;
}

export function logoutUser(): void {
  currentSessionUser = null;
  sessionStorage.removeItem('medibridges_user');
}

export function findUserByEmail(email: string): User | undefined {
  return mockCurrentUser.email === email ? mockCurrentUser : undefined;
}

export function findUserById(id: string): User | undefined {
  return mockCurrentUser.id === id ? mockCurrentUser : undefined;
}

export { currentSessionUser };
