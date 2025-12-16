import {TERMS_SECTIONS} from '../model/constants';

export function TermsPanel() {
  return (
    <div className='font-caption font-regular max-h-[110px] max-w-[420px] overflow-y-auto rounded-sm bg-gray-50 px-4 py-3 text-gray-600'>
      {TERMS_SECTIONS.map((section, index) => (
        <div key={index}>
          <div className='font-bold'>{section.title}</div>
          <p>{section.content}</p>
        </div>
      ))}
    </div>
  );
}
