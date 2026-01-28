'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteUrlButton({ slug }: { slug: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this URL?')) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/v1/url/${slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.refresh();
      } else {
        alert('Failed to delete URL');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete URL');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-600 hover:text-red-800 disabled:opacity-50"
    >
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  );
}
