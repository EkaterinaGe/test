import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCompany } from './CompanySlice';

export const CompanyForm: React.FC = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [isAdd, setIsAdd] = useState(false);

  const handleAddCompany = () => {
    dispatch(addCompany({ name, address }));
    setName('');
    setAddress('');
    setIsAdd(false)
  };

  return (
    <div>
      {isAdd ? (
        <div>
          <input
            type="text"
            placeholder="Название компании"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Адрес"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button onClick={handleAddCompany}>Добавить компанию</button>
        </div>
      ) : (
        <button onClick={() => setIsAdd(true)}>Добавить компанию</button>
      )}
    </div>
  );
};