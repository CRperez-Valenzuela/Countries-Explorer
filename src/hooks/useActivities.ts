import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Activity = Database['public']['Tables']['activities']['Row'] & {
  countries?: {
    country_id: string;
  }[];
};

export function useActivities(userId?: string) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const query = supabase
          .from('activities')
          .select(`
            *,
            activities_countries (
              country_id
            )
          `)
          .order('created_at', { ascending: false });

        if (userId) {
          query.eq('user_id', userId);
        }

        const { data, error } = await query;

        if (error) throw error;
        
        // Transform the data to include countries array
        const activitiesWithCountries = data.map(activity => ({
          ...activity,
          countries: activity.activities_countries
        }));

        setActivities(activitiesWithCountries);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchActivities();
  }, [userId]);

  return { activities, loading, error };
}