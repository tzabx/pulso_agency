const columnClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4',
};

export default function CardGrid({ columns = 3, className = '', children }) {
  return <div className={`grid gap-6 ${columnClasses[columns]} ${className}`}>{children}</div>;
}
