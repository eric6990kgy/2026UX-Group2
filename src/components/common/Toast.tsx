import { useToast } from '../../hooks/useToast';

export function Toast() {
  const { message, visible } = useToast();

  if (!visible) return null;

  return (
    <div
      id="toast-overlay"
      className="fixed inset-x-0 top-1/2 -translate-y-1/2 flex justify-center items-center z-50 pointer-events-none px-6"
    >
      <div
        id="toast-content"
        className="bg-black/90 text-white text-xl font-bold py-4 px-8 rounded-2xl shadow-xl border-2 border-primary/40 flex items-center gap-2 max-w-[320px] text-center animate-bounce"
      >
        <span>{message}</span>
      </div>
    </div>
  );
}

export default Toast;
