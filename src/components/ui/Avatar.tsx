'use client';

import React from 'react';

interface AvatarProps {
  name: string;
  // Anda bisa menambahkan prop `imageUrl` di sini nanti
}

/**
 * Komponen Avatar untuk menampilkan inisial pengguna.
 */
export default function Avatar({ name }: AvatarProps) {
  const getInitials = (name: string) => {
    if (!name) return '?';
    const words = name.split(' ');
    if (words.length > 1) {
      return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm cursor-pointer">
      {getInitials(name)}
    </div>
  );
}