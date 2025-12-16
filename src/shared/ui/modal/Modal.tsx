'use client';
import {Button} from '../button';

interface ModalProps {
  title?: string;
  body: string;
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;
  onClose: () => void;
}

export const Modal = ({
  title,
  body,
  cancelText,
  confirmText,
  onCancel,
  onClose,
}: ModalProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCancel ? onCancel() : onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel ? onCancel() : onClose();
    }
  };

  return (
    <div
      className='bg-dim-light fixed inset-0 z-50 flex items-center justify-center'
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      role='dialog'
      aria-modal='true'
      aria-labelledby={title ? 'modal-title' : undefined}>
      <div className='flex w-full max-w-[280px] flex-col gap-6 rounded-xl bg-white p-6 shadow-xl'>
        {title && (
          <p id='modal-title' className='font-heading-small'>
            {title}
          </p>
        )}
        <p className='font-body-medium text-gray-700'>{body}</p>
        <div className='flex gap-3'>
          {onCancel && (
            <Button onClick={onCancel} variant='tertiary' className='flex-1'>
              <span className='whitespace-nowrap'>{cancelText}</span>
            </Button>
          )}
          <Button onClick={onClose} variant='primary' className='flex-1'>
            <span className='whitespace-nowrap'>{confirmText}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
