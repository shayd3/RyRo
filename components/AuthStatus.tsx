'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function AuthStatus() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="text-gray-500">Loading...</div>;
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-gray-600">
          {session.user.name || session.user.email}
        </span>
        <Link
          href="/dashboard"
          className="text-blue-600 hover:underline"
        >
          Dashboard
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="text-gray-600 hover:text-gray-800"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link
        href="/auth/signin"
        className="text-blue-600 hover:underline"
      >
        Sign in
      </Link>
      <Link
        href="/auth/signup"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Sign up
      </Link>
    </div>
  );
}
