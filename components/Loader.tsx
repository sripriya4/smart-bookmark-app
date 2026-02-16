export default function Loader() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="space-y-4 w-full max-w-2xl">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white/70 backdrop-blur-md rounded-2xl p-4 h-32 animate-pulse border border-white/20"
          />
        ))}
      </div>
    </div>
  );
}
