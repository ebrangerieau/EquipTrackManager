import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
}

function ToastComponent({ message, type }: ToastProps) {
  const Icon = type === 'success' ? CheckCircle : XCircle;
  const bgColor = type === 'success' ? 'bg-green-50' : 'bg-red-50';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
  const iconColor = type === 'success' ? 'text-green-400' : 'text-red-400';

  return (
    <div className={`rounded-md p-4 ${bgColor}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${iconColor}`} aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className={`text-sm font-medium ${textColor}`}>{message}</p>
        </div>
      </div>
    </div>
  );
}

let toastContainer: HTMLDivElement | null = null;

function createToastContainer() {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'fixed top-4 right-4 z-50 space-y-4';
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

function showToast(message: string, type: 'success' | 'error') {
  const container = createToastContainer();
  const toastElement = document.createElement('div');
  container.appendChild(toastElement);

  const root = ReactDOM.createRoot(toastElement);
  root.render(<ToastComponent message={message} type={type} />);

  setTimeout(() => {
    toastElement.style.opacity = '0';
    setTimeout(() => {
      container.removeChild(toastElement);
      if (container.childNodes.length === 0) {
        document.body.removeChild(container);
        toastContainer = null;
      }
    }, 300);
  }, 3000);
}

export const toast = {
  success: (message: string) => showToast(message, 'success'),
  error: (message: string) => showToast(message, 'error'),
};