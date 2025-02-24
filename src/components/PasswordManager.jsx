
import React, { useState } from 'react';
import { toast } from 'sonner';
import { HeroGeometric } from '@/components/ui/shape-landing-hero';
import PasswordForm from './password/PasswordForm';
import PasswordTable from './password/PasswordTable';
import { calculateStrength } from '@/utils/passwordUtils';

const PasswordManager = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [entries, setEntries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showPassword, setShowPassword] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password.length > 20) {
      toast.error('Password must be 20 characters or less');
      return;
    }

    const newEntry = {
      id: editingId || Date.now().toString(),
      name,
      password,
      strength: calculateStrength(password),
      pwnedCount: Math.floor(Math.random() * 5),
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

  const handleEdit = (entry) => {
    setName(entry.name);
    setPassword(entry.password);
    setEditingId(entry.id);
  };

  const handleDelete = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
    toast.success('Password deleted successfully');
  };

  const togglePasswordVisibility = (id) => {
    setShowPassword(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  return (
    <div className="relative min-h-screen">
      <HeroGeometric 
        badge="Password Manager"
        title1="Secure Your"
        title2="Digital Life"
      />
      
      <div className="absolute inset-0 z-10 overflow-auto">
        <div className="container max-w-4xl mx-auto p-6 space-y-8 animate-fade-up">
          <PasswordForm
            name={name}
            password={password}
            onNameChange={(e) => setName(e.target.value)}
            onPasswordChange={(e) => setPassword(e.target.value)}
            onSubmit={handleSubmit}
            isEditing={!!editingId}
          />

          <PasswordTable
            entries={entries}
            onEdit={handleEdit}
            onDelete={handleDelete}
            showPasswordState={showPassword}
            onToggleVisibility={togglePasswordVisibility}
            onCopy={copyToClipboard}
          />
        </div>
      </div>
    </div>
  );
};

export default PasswordManager;
