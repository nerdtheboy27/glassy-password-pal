
import PasswordEntry from './PasswordEntry';

const PasswordTable = ({ entries, onEdit, onDelete, showPasswordState, onToggleVisibility, onCopy }) => {
  return (
    <div className="table-glass card-3d">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-6 py-4 text-left text-white/70">Name</th>
              <th className="px-6 py-4 text-left text-white/70 w-[240px]">Password</th>
              <th className="px-6 py-4 text-center text-white/70">Strength</th>
              <th className="px-6 py-4 text-center text-white/70">Pwned</th>
              <th className="px-6 py-4 text-right text-white/70">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {entries.map((entry) => (
              <PasswordEntry
                key={entry.id}
                entry={entry}
                onEdit={() => onEdit(entry)}
                onDelete={() => onDelete(entry.id)}
                showPassword={showPasswordState[entry.id]}
                onToggleVisibility={() => onToggleVisibility(entry.id)}
                onCopy={() => onCopy(entry.password)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PasswordTable;
