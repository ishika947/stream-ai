export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex min-h-11 items-center justify-center font-semibold rounded-xl transition-all';

  const variants = {
    primary: 'bg-primary hover:bg-primary-600 text-white px-4 py-2 shadow-md',
    secondary: 'bg-surface-2 border border-surface/30 text-text px-3 py-2',
    ghost: 'bg-transparent text-text px-3 py-2'
  };

  const classes = `${base} ${variants[variant] || variants.primary} ${className}`.trim();

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
