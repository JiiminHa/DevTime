import {Button} from '../button';

interface ModalProps {
  title?: string;
  body: string;
  onCancel?: () => void;
  onClose: () => void;
}

export const Modal = ({title, body, onCancel, onClose}: ModalProps) => {
  return (
    <div className='bg-dim-light fixed inset-0 z-50 flex items-center justify-center'>
      <div className='flex w-full max-w-[280px] flex-col gap-6 rounded-xl bg-white p-6 shadow-xl'>
        {title && <p className='font-heading-small'>{title}</p>}
        <p className='font-body-medium text-gray-700'>{body}</p>
        <div className='flex gap-3'>
          {onCancel && (
            <Button onClick={onCancel} variant='tertiary' className='flex-1'>
              취소
            </Button>
          )}
          <Button onClick={onClose} variant='primary' className='flex-1'>
            확인
          </Button>
        </div>
      </div>
    </div>
  );
};
