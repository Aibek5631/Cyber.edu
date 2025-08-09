import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const { sendPasswordReset } = useAuth();
  const toast = useToast();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await sendPasswordReset(email);
      toast.success('Ссылка для сброса пароля отправлена');
    } catch (err) {
      toast.error('Не удалось отправить письмо');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4">
      <h2 className="text-xl mb-4">Сброс пароля</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="w-full p-2 border mb-4"
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        Отправить
      </button>
    </form>
  );
}