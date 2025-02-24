
import { Input } from '@/components/ui/input';
import { RainbowButton } from '@/components/ui/rainbow-button';

const PasswordForm = ({ name, password, onNameChange, onPasswordChange, onSubmit, isEditing }) => {
  return (
    <form onSubmit={onSubmit} className="glass card-3d p-6 rounded-xl space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="text"
          placeholder="Account Name"
          value={name}
          onChange={onNameChange}
          className="input-glass"
          maxLength={50}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
          className="input-glass"
          maxLength={20}
        />
      </div>
      <RainbowButton type="submit" className="w-full">
        {isEditing ? 'Update Password' : 'Add Password'}
      </RainbowButton>
    </form>
  );
};

export default PasswordForm;
