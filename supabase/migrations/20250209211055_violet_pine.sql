/*
  # Countries and Activities Schema

  1. New Tables
    - `countries`
      - `id` (text, 3 letter code, primary key)
      - `name` (text)
      - `flag_image` (text)
      - `continent` (text)
      - `capital` (text)
      - `population` (integer)
    - `activities`
      - `id` (uuid, primary key)
      - `name` (text)
      - `difficulty` (integer, 1-5)
      - `duration` (text)
      - `season` (enum: Verano, Otoño, Invierno, Primavera)
    - `activities_countries` (junction table)
      - `activity_id` (uuid, foreign key)
      - `country_id` (text, foreign key)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read all data
    - Add policies for authenticated users to create/update their own activities
*/

-- Create enum for seasons
CREATE TYPE season_type AS ENUM ('Verano', 'Otoño', 'Invierno', 'Primavera');

-- Create countries table
CREATE TABLE IF NOT EXISTS countries (
  id text PRIMARY KEY CHECK (length(id) = 3),
  name text NOT NULL,
  flag_image text NOT NULL,
  continent text NOT NULL,
  capital text,
  population integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  difficulty integer NOT NULL CHECK (difficulty BETWEEN 1 AND 5),
  duration text NOT NULL,
  season season_type NOT NULL,
  user_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Create junction table for many-to-many relationship
CREATE TABLE IF NOT EXISTS activities_countries (
  activity_id uuid REFERENCES activities(id) ON DELETE CASCADE,
  country_id text REFERENCES countries(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (activity_id, country_id)
);

-- Enable RLS
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities_countries ENABLE ROW LEVEL SECURITY;

-- Policies for countries
CREATE POLICY "Countries are viewable by everyone"
  ON countries
  FOR SELECT
  TO authenticated
  USING (true);

-- Policies for activities
CREATE POLICY "Activities are viewable by everyone"
  ON activities
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create their own activities"
  ON activities
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own activities"
  ON activities
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies for activities_countries
CREATE POLICY "Activities-countries relations are viewable by everyone"
  ON activities_countries
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create relations for their activities"
  ON activities_countries
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM activities
      WHERE id = activity_id
      AND user_id = auth.uid()
    )
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_countries_continent ON countries(continent);
CREATE INDEX IF NOT EXISTS idx_activities_user_id ON activities(user_id);
CREATE INDEX IF NOT EXISTS idx_activities_season ON activities(season);