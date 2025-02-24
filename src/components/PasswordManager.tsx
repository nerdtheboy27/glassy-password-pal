
import React, { useState } from 'react';
import { Eye, EyeOff, Edit, Trash, Copy, Shield } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface PasswordEntry {
  id: string;
  name: string;
  password: string;
  strength: number;
  pwnedCount: number;
}

const PasswordManager = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [entries, setEntries] = useState<PasswordEntry[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<{[key: string]: boolean}>({});

  const calculateStrength = (pwd: string): number => {
    let strength = 0;
    if (pwd.length >= 8) strength += 25;
    if (pwd.match(/[A-Z]/)) strength += 25;
    if (pwd.match(/[0-9]/)) strength += 25;
    if (pwd.match(/[^A-Za-z0-9]/)) strength += 25;
    return strength;
  };

  const getStrengthColor = (strength: number): string => {
    if (strength <= 25) return 'text-red-500';
    if (strength <= 50) return 'text-orange-500';
    if (strength <= 75) return 'text-yellow-500';
    return 'text-green-500';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    const newEntry: PasswordEntry = {
      id: editingId || Date.now().toString(),
      name,
      password,
      strength: calculateStrength(password),
      pwnedCount: Math.floor(Math.random() * 5), // Simulated pwned count
    };

    if (editingId) {
      setEntries(entries.map(entry => 
        entry.id === editingId ? newEntry : entry
      ));
      setEditingId(null);
      toast.success('Password updated successfully');
    } else {
      setEntries([...entries, newEntry]);
      toast.success('Password added successfully');
    }

    setName('');
    setPassword('');
  };

  const handleEdit = (entry: PasswordEntry) => {
    setName(entry.name);
    setPassword(entry.password);
    setEditingId(entry.id);
  };

  const handleDelete = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
    toast.success('Password deleted successfully');
  };

  const togglePasswordVisibility = (id: string) => {
    setShowPassword(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  return (
    <div className="container max-w-4xl mx-auto p-6 space-y-8 animate-fade-up">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-gradient tracking-tight">
          Password Manager
        </h1>
        <p className="text-lg text-white/60">
          Securely store and manage your passwords
        </p>
      </div>

      <form onSubmit={handleSubmit} className="glass card-3d p-6 rounded-xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            placeholder="Account Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-glass"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-glass"
          />
        </div>
        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary-darker transition-all duration-300 transform hover:scale-[1.02]"
        >
          {editingId ? 'Update Password' : 'Add Password'}
        </Button>
      </form>

      <div className="table-glass card-3d">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-left text-white/70">Name</th>
                <th className="px-6 py-4 text-left text-white/70">Password</th>
                <th className="px-6 py-4 text-center text-white/70">Strength</th>
                <th className="px-6 py-4 text-center text-white/70">Pwned</th>
                <th className="px-6 py-4 text-right text-white/70">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {entries.map((entry) => (
                <tr key={entry.id} className="hover:bg-white/5 transition-all duration-300">
                  <td className="px-6 py-4 font-medium">{entry.name}</td>
                  <td className="px-6 py-4 flex items-center space-x-2">
                    <span className="font-mono text-white/90">
                      {showPassword[entry.id] ? entry.password : '••••••••'}
                    </span>
                    <button
                      onClick={() => togglePasswordVisibility(entry.id)}
                      className="text-white/60 hover:text-primary transition-colors"
                    >
                      {showPassword[entry.id] ? 
                        <EyeOff size={18} /> : 
                        <Eye size={18} />
                      }
                    </button>
                    <button
                      onClick={() => copyToClipboard(entry.password)}
                      className="text-white/60 hover:text-primary transition-colors"
                    >
                      <Copy size={18} />
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <Shield size={18} className={getStrengthColor(entry.strength)} />
                      <span className={getStrengthColor(entry.strength)}>
                        {entry.strength}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {entry.pwnedCount > 0 ? (
                      <span className="text-red-400">{entry.pwnedCount} times</span>
                    ) : (
                      <span className="text-green-400">Safe</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(entry)}
                        className="text-white/60 hover:text-primary transition-colors transform hover:scale-110"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="text-red-400/60 hover:text-red-400 transition-colors transform hover:scale-110"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PasswordManager;
