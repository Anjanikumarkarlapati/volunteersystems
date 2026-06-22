import { useData } from '../context/DataContext';

export default function Toast() {
  const { toast } = useData();
  if (!toast) return null;
  return (
    <div className="fixed bottom-6 right-6 z-[100] bg-surface-container-lowest border border-outline-variant shadow-2xl rounded-2xl px-5 py-3.5 flex items-center gap-3 animate-slide-up shadow-black/5">
      <span className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
        <span className="material-symbols-outlined text-[18px]">check_circle</span>
      </span>
      <span className="font-body-md text-[14px] text-on-surface">{toast}</span>
    </div>
  );
}
