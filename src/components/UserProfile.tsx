'use client'

import { useEffect, useState } from 'react';
import { fetchUser } from '../app/api';
import { UserTags } from './Tags';

export interface User {
  uuid: string;
  fullName: string;
  tags: string[];
}

interface UserProfileProps {
  userId: string;
}

export const UserProfile = ({ userId }: UserProfileProps) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await fetchUser(userId);
        setUser(user);
      } catch (e) {
        console.error(e);
        return;
      }
    };
    getUser();
  }, [userId]);

  if (!user) return null

  return (
    <div>
      <UserTags {...user} />
    </div>
  );
}