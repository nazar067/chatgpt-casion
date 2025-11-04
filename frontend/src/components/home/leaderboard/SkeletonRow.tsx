export default function SkeletonRow({ colsClass }: { colsClass: string }) {
  return (
    <div className={`grid ${colsClass} items-center px-4 py-3 animate-pulse`}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-4 w-24 bg-white/10 rounded" />
      ))}
    </div>
  );
}
