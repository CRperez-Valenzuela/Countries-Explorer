import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCountries } from '../hooks/useCountries';
import { ArrowLeft, Globe, MapPin, Users, Building, Map, Calendar, Clock, Star } from 'lucide-react';
import { useActivities } from '../hooks/useActivities';

export function CountryDetail() {
  const { id } = useParams<{ id: string }>();
  const { countries, loading: countriesLoading, error: countriesError } = useCountries();
  const { activities, loading: activitiesLoading, error: activitiesError } = useActivities();
  const country = countries.find((c) => c.id === id);

  // Filter activities for this country
  const countryActivities = activities.filter(activity => {
    const activityCountries = activity.countries || [];
    return activityCountries.some(ac => ac.country_id === id);
  });

  if (countriesLoading || activitiesLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin text-blue-500">
          <Globe className="w-8 h-8" />
        </div>
      </div>
    );
  }

  if (countriesError || activitiesError || !country) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="bg-red-900/50 text-red-200 p-4 rounded-lg">
          {countriesError || activitiesError || 'Country not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/home"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Countries
        </Link>

        <div className="bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-slate-700">
          <div className="relative h-96">
            <img
              src={country.flag_image}
              alt={`${country.name} flag`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h1 className="text-4xl font-bold mb-2">{country.name}</h1>
              <div className="flex items-center text-slate-200">
                <Globe className="w-5 h-5 mr-2" />
                {country.continent}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-900/30 rounded-lg">
                  <MapPin className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-200">Capital</h3>
                  <p className="text-slate-300">{country.capital || 'Not available'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-900/30 rounded-lg">
                  <Users className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-200">Population</h3>
                  <p className="text-slate-300">{country.population.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-900/30 rounded-lg">
                  <Building className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-200">ID Code</h3>
                  <p className="text-slate-300">{country.id}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="flex items-center gap-2 mb-6">
                <Map className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-slate-200">Tourist Activities</h3>
              </div>
              
              {countryActivities.length > 0 ? (
                <div className="space-y-4">
                  {countryActivities.map((activity) => (
                    <div key={activity.id} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                      <h4 className="text-lg font-medium text-slate-200 mb-2">{activity.name}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-slate-300">
                          <Star className="w-4 h-4 text-amber-400" />
                          Difficulty: {activity.difficulty}/5
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <Clock className="w-4 h-4 text-blue-400" />
                          {activity.duration}
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <Calendar className="w-4 h-4 text-emerald-400" />
                          {activity.season}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400">
                  No tourist activities available yet. Create one to get started!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}