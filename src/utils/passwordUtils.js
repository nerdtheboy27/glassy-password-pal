
export const calculateStrength = (pwd) => {
  let strength = 0;
  if (pwd.length >= 8) strength += 25;
  if (pwd.match(/[A-Z]/)) strength += 25;
  if (pwd.match(/[0-9]/)) strength += 25;
  if (pwd.match(/[^A-Za-z0-9]/)) strength += 25;
  return strength;
};

export const getStrengthColor = (strength) => {
  if (strength <= 25) return 'text-red-500';
  if (strength <= 50) return 'text-orange-500';
  if (strength <= 75) return 'text-yellow-500';
  return 'text-green-500';
};
