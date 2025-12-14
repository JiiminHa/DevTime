import {useState} from 'react';

export function useForm<T>(initialValues: T) {
  const [formData, setFormData] = useState(initialValues);

  const handleFieldChange = (name: keyof T, value: string) => {
    setFormData({...formData, [name]: value});
  };

  return {formData, handleFieldChange, setFormData};
}
