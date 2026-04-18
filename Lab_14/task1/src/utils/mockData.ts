import { Contact } from '../types';

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];

export const generateContacts = (count: number): Contact[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `contact_${i}_${Date.now()}`,
    firstName: 'User',
    lastName: `Number ${i + 1}`,
    email: `student${i}@almau.edu.kz`,
    avatarColor: COLORS[i % COLORS.length],
  }));
};
