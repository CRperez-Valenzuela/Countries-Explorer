import React from 'react';
import { Link } from 'react-router-dom';
import type { Country } from '../types';

type CountryCardProps = {
  country: Country;
};

export function CountryCard({ country }: CountryCardProps) {
  return (
    <Link 
      to={`/country/${country.id}`}
      className="block transform transition duration-200 hover:scale-105"
    >
      <div className="bg-slate-800 rounded-lg shadow-md overflow-hidden border border-slate-700">
        <div className="relative pb-[56.25%]">
          <img
            src={country.flag_image}
            alt={`${country.name} flag`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold text-slate-100 mb-2">{country.name}</h2>
          <p className="text-slate-300">{country.continent}</p>
          <div className="mt-2 text-sm text-slate-400">
            <p>Population: {country.population.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}