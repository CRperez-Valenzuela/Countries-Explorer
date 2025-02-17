import React from 'react';
import { Filter } from 'lucide-react';

type FiltersProps = {
  selectedContinent: string;
  onContinentChange: (continent: string) => void;
  continents: string[];
  sortBy: string;
  onSortChange: (sort: string) => void;
};

export function Filters({
  selectedContinent,
  onContinentChange,
  continents,
  sortBy,
  onSortChange,
}: FiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-blue-400" />
        <select
          value={selectedContinent}
          onChange={(e) => onContinentChange(e.target.value)}
          className="block w-full rounded-md border-slate-600 bg-slate-800 text-slate-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          <option value="" className="bg-slate-800 text-slate-100">All Continents</option>
          {continents.map((continent) => (
            <option key={continent} value={continent} className="bg-slate-800 text-slate-100">
              {continent}
            </option>
          ))}
        </select>
      </div>

      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="block w-full sm:w-auto rounded-md border-slate-600 bg-slate-800 text-slate-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      >
        <option value="" className="bg-slate-800 text-slate-100">Sort by...</option>
        <option value="name-asc" className="bg-slate-800 text-slate-100">Name (A-Z)</option>
        <option value="name-desc" className="bg-slate-800 text-slate-100">Name (Z-A)</option>
        <option value="population-asc" className="bg-slate-800 text-slate-100">Population (Low to High)</option>
        <option value="population-desc" className="bg-slate-800 text-slate-100">Population (High to Low)</option>
      </select>
    </div>
  );
}