import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim() || !name.trim()) {
      setError('All fields are required');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    if (data.user) {
      // Auto-create public.users entry (forum profile)
      const { error: insertError } = await supabase.from('users').insert({
        id: data.user.id,
        email: data.user.email,
        name: name,
        role: 'user',
      });
      if (insertError) console.error('Failed to create user profile:', insertError);
    }

    // mailer_autoconfirm is enabled so the user gets a session immediately.
    // We route them to the forum with a reminder to verify their email later.
    navigate('/forum?welcome=1');
  };

  return (
    <div className="mx-auto max-w-sm px-6 py-20">
      <h1 className="text-2xl font-bold text-slate-900 text-center">Create Account</h1>
      <p className="mt-2 text-sm text-slate-500 text-center">Sign up to participate in the forum</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" />
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        <Button type="submit" className="w-full">Create Account</Button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link to="/admin/login" className="text-primary font-medium">Sign in</Link>
      </p>
    </div>
  );
}
