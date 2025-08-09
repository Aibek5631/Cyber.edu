import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { sendEmailVerification } from 'firebase/auth';

export default function VerifyEmail() {
  const { user, reloadUser } = useAuth();
  const toast = useToast();

  const handleResend = async () => {
    try {
      await sendEmailVerification(user);
      toast.success('Письмо повторно отправлено');
    } catch {
      toast.error('Ошибка при отправке');
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 text-center">
      <h2 className="text-xl mb-2">Подтвердите Email</h2>
      <p className="mb-4">Проверьте {user.email}</p>
      <button
        onClick={handleResend}
        className="mr-2 bg-green-500 text-white p-2 rounded"
      >
        Отправить снова
      </button>
      <button
        onClick={reloadUser}
        className="bg-gray-500 text-white p-2 rounded"
      >
        Проверить статус
      </button>
    </div>
  );
}