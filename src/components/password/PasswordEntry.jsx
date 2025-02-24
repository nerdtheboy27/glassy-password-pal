
import { Eye, EyeOff, Edit, Trash, Copy, Shield } from 'lucide-react';
import { getStrengthColor } from '@/utils/passwordUtils';

const PasswordEntry = ({ entry, onEdit, onDelete, showPassword, onToggleVisibility, onCopy }) => {
  return (
    <tr className="hover:bg-white/5 transition-all duration-300">
      <td className="px-6 py-4 font-medium">{entry.name}</td>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2 w-[240px]">
          <span className="font-mono text-white/90 truncate">
            {showPassword ? entry.password : '••••••••'}
          </span>
          <div className="flex items-center space-x-1 flex-shrink-0">
            <button
              onClick={onToggleVisibility}
              className="text-white/60 hover:text-primary transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            <button
              onClick={onCopy}
              className="text-white/60 hover:text-primary transition-colors"
            >
              <Copy size={18} />
            </button>
          </div>
        </div>
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
            onClick={onEdit}
            className="text-white/60 hover:text-primary transition-colors transform hover:scale-110"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={onDelete}
            className="text-red-400/60 hover:text-red-400 transition-colors transform hover:scale-110"
          >
            <Trash size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default PasswordEntry;
