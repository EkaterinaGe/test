import React, { useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { loadMoreCompanies, toggleSelectAll, toggleSelectCompany, removeCompany, updateCompany } from './CompanySlice';
import { Company } from './data';
import { CompanyForm } from './Form';

export const CompanyTable: React.FC = () => {
  const dispatch = useDispatch();
  const { displayedCompanies, hasMore } = useSelector((state: RootState) => state.company);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastCompanyRef = useCallback((node: HTMLTableRowElement | null) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        dispatch(loadMoreCompanies());
      }
    });
    if (node) observer.current.observe(node);
  }, [dispatch, hasMore]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleSelectAll(e.target.checked));
  };

  const handleSelectCompany = (id: number) => {
    dispatch(toggleSelectCompany(id));
  };

  const handleRemoveCompany = () => {
    const selectedIds = displayedCompanies.filter(company => company.selected).map(company => company.id);
    dispatch(removeCompany(selectedIds));
  };

  const handleUpdateCompany = (id: number) => {
    const name = prompt('Enter new company name:');
    const address = prompt('Enter new company address:');
    if (name && address) {
      dispatch(updateCompany({ id, name, address }));
    }
  };

  return (
    <div>
      <CompanyForm/>
      <button onClick={handleRemoveCompany}>Удалить выбранные</button>
      <div style={{ height: '600px', overflowY: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th><input type="checkbox" onChange={handleSelectAll} /></th>
              <th className='head'>Название компании</th>
              <th className='head'>Адрес</th>
            </tr>
          </thead>
          <tbody>
            {displayedCompanies.map((company: Company, index) => {
              if (displayedCompanies.length === index + 1) {
                return (
                  <tr ref={lastCompanyRef} key={company.id} style={{ background: company.selected ? 'rgb(27, 62, 27)' : 'rgb(228, 255, 228)' }}>
                    <td><input type="checkbox" checked={company.selected} onChange={() => handleSelectCompany(company.id)} /></td>
                    <td onClick={() => handleUpdateCompany(company.id)} style={{ color: company.selected ? 'rgb(228, 255, 228)' : 'rgb(27, 62, 27)' }} >{company.name}</td>
                    <td onClick={() => handleUpdateCompany(company.id)} style={{ color: company.selected ? 'rgb(228, 255, 228)' : 'rgb(27, 62, 27)' }} >{company.address}</td>
                  </tr>
                );
              } else {
                return (
                  <tr key={company.id} style={{ background: company.selected ? 'rgb(27, 62, 27)' : 'rgb(228, 255, 228)' }}>
                    <td><input type="checkbox" checked={company.selected} onChange={() => handleSelectCompany(company.id)} /></td>
                    <td onClick={() => handleUpdateCompany(company.id)} style={{ color: company.selected ? 'rgb(228, 255, 228)' : 'rgb(27, 62, 27)' }}>{company.name}</td>
                    <td onClick={() => handleUpdateCompany(company.id)} style={{ color: company.selected ? 'rgb(228, 255, 228)' : 'rgb(27, 62, 27)' }}>{company.address}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};