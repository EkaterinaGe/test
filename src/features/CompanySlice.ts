import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Company, companiesData } from './data';

interface CompanyState {
  companies: Company[];
  displayedCompanies: Company[];
  nextId: number;
  hasMore: boolean;
}

const PAGE_SIZE = 20;

const initialState: CompanyState = {
  companies: companiesData,
  displayedCompanies: companiesData.slice(0, PAGE_SIZE),
  nextId: companiesData.length + 1,
  hasMore: companiesData.length > PAGE_SIZE,
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    loadMoreCompanies: (state) => {
      const start = state.displayedCompanies.length;
      const end = start + PAGE_SIZE;
      const moreCompanies = state.companies.slice(start, end);
      state.displayedCompanies = state.displayedCompanies.concat(moreCompanies);
      state.hasMore = state.companies.length > end;
    },
    addCompany: (state, action: PayloadAction<{ name: string; address: string }>) => {
      const newCompany = {
        id: state.nextId,
        name: action.payload.name,
        address: action.payload.address,
        selected: false,
      };
      state.companies.push(newCompany);
      if (state.displayedCompanies.length < PAGE_SIZE) {
        state.displayedCompanies.push(newCompany);
      }
      state.nextId += 1;
      state.hasMore = state.companies.length > state.displayedCompanies.length;
    },
    removeCompany: (state, action: PayloadAction<number[]>) => {
      state.companies = state.companies.filter(company => !action.payload.includes(company.id));
      state.displayedCompanies = state.displayedCompanies.filter(company => !action.payload.includes(company.id));
      state.hasMore = state.companies.length > state.displayedCompanies.length;
    },
    updateCompany: (state, action: PayloadAction<{ id: number; name: string; address: string }>) => {
      const company = state.companies.find(company => company.id === action.payload.id);
      if (company) {
        company.name = action.payload.name;
        company.address = action.payload.address;
      }
      const displayedCompany = state.displayedCompanies.find(company => company.id === action.payload.id);
      if (displayedCompany) {
        displayedCompany.name = action.payload.name;
        displayedCompany.address = action.payload.address;
      }
    },
    toggleSelectCompany: (state, action: PayloadAction<number>) => {
      const company = state.companies.find(company => company.id === action.payload);
      if (company) {
        company.selected = !company.selected;
      }
      const displayedCompany = state.displayedCompanies.find(company => company.id === action.payload);
      if (displayedCompany) {
        displayedCompany.selected = !displayedCompany.selected;
      }
    },
    toggleSelectAll: (state, action: PayloadAction<boolean>) => {
      state.companies.forEach(company => {
        company.selected = action.payload;
      });
      state.displayedCompanies.forEach(company => {
        company.selected = action.payload;
      });
    },
  },
});

export const { loadMoreCompanies, addCompany, removeCompany, updateCompany, toggleSelectCompany, toggleSelectAll } = companySlice.actions;
export default companySlice.reducer;