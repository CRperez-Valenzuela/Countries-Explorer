import React, { useState } from 'react';
import { X, Plus, Trash2, CheckCircle, AlertTriangle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { Country } from '../types';

type ActivityFormProps = {
  countries: Country[];
  onClose: () => void;
  onSuccess?: () => void;
};

type SelectedCountry = {
  id: string;
  name: string;
};

type ExistingActivity = {
  name: string;
  difficulty: number;
  duration: string;
};

export function ActivityForm({ countries, onClose, onSuccess }: ActivityFormProps) {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState('3');
  const [duration, setDuration] = useState('');
  const [season, setSeason] = useState('');
  const [selectedCountries, setSelectedCountries] = useState<SelectedCountry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const checkExistingActivities = async (activityName: string, countryIds: string[]) => {
    setIsChecking(true);
    setWarning(null);
    
    try {
      const { data: activities, error } = await supabase
        .from('activities')
        .select(`
          name,
          difficulty,
          duration,
          activities_countries!inner (
            country_id
          )
        `)
        .ilike('name', activityName)
        .in('activities_countries.country_id', countryIds);

      if (error) throw error;

      if (activities && activities.length > 0) {
        const existingActivities = activities.filter(activity => 
          activity.activities_countries.some(ac => 
            countryIds.includes(ac.country_id)
          )
        );

        if (existingActivities.length > 0) {
          const activity = existingActivities[0];
          setWarning(
            `"${activity.name}" already exists for selected countries (Difficulty: ${activity.difficulty}, Duration: ${activity.duration}). Consider modifying the activity name or choosing different countries.`
          );
          return true;
        }
      }
      
      return false;
    } catch (err) {
      console.error('Error checking existing activities:', err);
      return false;
    } finally {
      setIsChecking(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccess(false);
      setWarning(null);

      if (!name || !duration || !season || selectedCountries.length === 0) {
        throw new Error('Please fill in all required fields');
      }

      const durationNumber = parseInt(duration, 10);
      if (isNaN(durationNumber) || durationNumber <= 0) {
        throw new Error('Duration must be a positive number');
      }
      const formattedDuration = `${durationNumber} ${durationNumber === 1 ? 'hour' : 'hours'}`;

      // Check for existing activities before proceeding
      const exists = await checkExistingActivities(
        name,
        selectedCountries.map(c => c.id)
      );

      if (exists) {
        return; // Stop here if activity exists
      }

      const { data: activity, error: activityError } = await supabase
        .from('activities')
        .insert({
          name,
          difficulty: parseInt(difficulty, 10),
          duration: formattedDuration,
          season,
          user_id: user.id,
        })
        .select()
        .single();

      if (activityError) throw activityError;
      if (!activity) throw new Error('Failed to create activity');

      const { error: relationError } = await supabase
        .from('activities_countries')
        .insert(
          selectedCountries.map(country => ({
            activity_id: activity.id,
            country_id: country.id,
          }))
        );

      if (relationError) throw relationError;

      setSuccess(true);
      if (onSuccess) onSuccess();
      
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNameChange = async (newName: string) => {
    setName(newName);
    if (newName && selectedCountries.length > 0) {
      await checkExistingActivities(newName, selectedCountries.map(c => c.id));
    } else {
      setWarning(null);
    }
  };

  const handleCountrySelect = async (countryId: string) => {
    const country = countries.find(c => c.id === countryId);
    if (!country) return;

    if (!selectedCountries.some(c => c.id === country.id)) {
      const newSelectedCountries = [...selectedCountries, { id: country.id, name: country.name }];
      setSelectedCountries(newSelectedCountries);
      
      if (name) {
        await checkExistingActivities(
          name,
          newSelectedCountries.map(c => c.id)
        );
      }
    }
  };

  const removeCountry = async (countryId: string) => {
    const newSelectedCountries = selectedCountries.filter(c => c.id !== countryId);
    setSelectedCountries(newSelectedCountries);
    
    if (name && newSelectedCountries.length > 0) {
      await checkExistingActivities(
        name,
        newSelectedCountries.map(c => c.id)
      );
    } else {
      setWarning(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-700">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-100">Create Tourist Activity</h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-900/50 text-red-200 rounded-md text-sm">
              {error}
            </div>
          )}

          {warning && (
            <div className="p-4 bg-amber-900/50 text-amber-200 rounded-md text-sm flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{warning}</span>
            </div>
          )}

          {success && (
            <div className="p-4 bg-emerald-900/50 text-emerald-200 rounded-md text-sm flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Activity created successfully!
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-300">
              Activity Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="mt-1 block w-full rounded-md border-slate-600 bg-slate-800 text-slate-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm placeholder-slate-400"
              placeholder="e.g., Mountain Hiking"
            />
          </div>

          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-slate-300">
              Difficulty (1-5)
            </label>
            <div className="mt-1 flex items-center gap-4">
              {[1, 2, 3, 4, 5].map((value) => (
                <label key={value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="difficulty"
                    value={value}
                    checked={difficulty === value.toString()}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="text-blue-500 focus:ring-blue-500 bg-slate-800 border-slate-600"
                  />
                  <span className="text-sm text-slate-300">{value}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-slate-300">
              Duration (hours)
            </label>
            <input
              type="number"
              id="duration"
              min="1"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="mt-1 block w-full rounded-md border-slate-600 bg-slate-800 text-slate-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm placeholder-slate-400"
              placeholder="e.g., 2"
            />
          </div>

          <div>
            <label htmlFor="season" className="block text-sm font-medium text-slate-300">
              Season
            </label>
            <select
              id="season"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              className="mt-1 block w-full rounded-md border-slate-600 bg-slate-800 text-slate-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="" className="bg-slate-800">Select a season</option>
              <option value="Verano" className="bg-slate-800">Summer</option>
              <option value="Otoño" className="bg-slate-800">Fall</option>
              <option value="Invierno" className="bg-slate-800">Winter</option>
              <option value="Primavera" className="bg-slate-800">Spring</option>
            </select>
          </div>

          <div>
            <label htmlFor="countries" className="block text-sm font-medium text-slate-300">
              Countries
            </label>
            <div className="mt-1 space-y-4">
              <select
                id="countries"
                onChange={(e) => handleCountrySelect(e.target.value)}
                value=""
                className="block w-full rounded-md border-slate-600 bg-slate-800 text-slate-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="" className="bg-slate-800">Select countries</option>
                {countries
                  .filter(country => !selectedCountries.some(sc => sc.id === country.id))
                  .map(country => (
                    <option key={country.id} value={country.id} className="bg-slate-800">
                      {country.name}
                    </option>
                  ))
                }
              </select>

              {selectedCountries.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedCountries.map(country => (
                    <div
                      key={country.id}
                      className="inline-flex items-center gap-2 bg-blue-900/50 text-blue-100 px-3 py-1 rounded-full text-sm"
                    >
                      {country.name}
                      <button
                        type="button"
                        onClick={() => removeCountry(country.id)}
                        className="text-blue-200 hover:text-blue-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-700">
            <button
              type="submit"
              disabled={isSubmitting || success || isChecking || !!warning}
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-offset-slate-900"
            >
              {isSubmitting || isChecking ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  {isSubmitting ? 'Creating...' : 'Checking...'}
                </span>
              ) : success ? (
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Created Successfully
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Create Activity
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}