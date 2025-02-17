import React, { useState, useMemo } from 'react';
import { useCountries } from '../hooks/useCountries';
import { Globe, LogOut, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { SearchBar } from '../components/SearchBar';
import { Filters } from '../components/Filters';
import { CountryCard } from '../components/CountryCard';
import { Pagination } from '../components/Pagination';
import { ActivityForm } from '../components/ActivityForm';
import type { Country } from '../types';

const ITEMS_PER_PAGE = 10;

export function Home() {
  const { countries, loading: countriesLoading, error } = useCountries();
  const { signOut } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showActivityForm, setShowActivityForm] = useState(false);

  const continents = useMemo(() => {
    return Array.from(new Set(countries.map(country => country.continent))).sort();
  }, [countries]);

  const filteredAndSortedCountries = useMemo(() => {
    let result = [...countries];

    if (searchTerm) {
      result = result.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedContinent) {
      result = result.filter(country => country.continent === selectedContinent);
    }

    switch (sortBy) {
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'population-asc':
        result.sort((a, b) => a.population - b.population);
        break;
      case 'population-desc':
        result.sort((a, b) => b.population - a.population);
        break;
    }

    return result;
  }, [countries, searchTerm, selectedContinent, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedCountries.length / ITEMS_PER_PAGE);
  const paginatedCountries = filteredAndSortedCountries.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (countriesLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin text-blue-500">
          <Globe className="w-8 h-8" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="bg-red-900/50 text-red-200 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Globe className="w-8 h-8 text-blue-500" />
            Countries Explorer
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowActivityForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Activity
            </button>
            <button
              onClick={() => signOut()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <Filters
              selectedContinent={selectedContinent}
              onContinentChange={setSelectedContinent}
              continents={continents}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedCountries.map((country) => (
              <CountryCard key={country.id} country={country} />
            ))}
          </div>

          {filteredAndSortedCountries.length > ITEMS_PER_PAGE && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}

          {filteredAndSortedCountries.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No countries found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </main>

      {showActivityForm && (
        <ActivityForm
          countries={countries}
          onClose={() => setShowActivityForm(false)}
        />
      )}
    </div>
  );
}