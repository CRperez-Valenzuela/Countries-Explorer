/*
  # Add initial countries data

  1. Data Population
    - Adds initial set of countries with their basic information
    - Each country includes:
      - ID (3-letter code)
      - Name
      - Flag image (from flagcdn.com)
      - Continent
      - Capital
      - Population

  2. Notes
    - Uses high-quality flag images from flagcdn.com
    - Population data is from recent estimates
    - All countries include basic required information
*/

INSERT INTO countries (id, name, flag_image, continent, capital, population)
VALUES
  ('ARG', 'Argentina', 'https://flagcdn.com/ar.svg', 'South America', 'Buenos Aires', 45808747),
  ('BRA', 'Brazil', 'https://flagcdn.com/br.svg', 'South America', 'Brasília', 214326223),
  ('CAN', 'Canada', 'https://flagcdn.com/ca.svg', 'North America', 'Ottawa', 38250000),
  ('DEU', 'Germany', 'https://flagcdn.com/de.svg', 'Europe', 'Berlin', 83200000),
  ('ESP', 'Spain', 'https://flagcdn.com/es.svg', 'Europe', 'Madrid', 47420000),
  ('FRA', 'France', 'https://flagcdn.com/fr.svg', 'Europe', 'Paris', 67390000),
  ('GBR', 'United Kingdom', 'https://flagcdn.com/gb.svg', 'Europe', 'London', 67220000),
  ('ITA', 'Italy', 'https://flagcdn.com/it.svg', 'Europe', 'Rome', 60360000),
  ('JPN', 'Japan', 'https://flagcdn.com/jp.svg', 'Asia', 'Tokyo', 125700000),
  ('MEX', 'Mexico', 'https://flagcdn.com/mx.svg', 'North America', 'Mexico City', 128900000),
  ('AUS', 'Australia', 'https://flagcdn.com/au.svg', 'Oceania', 'Canberra', 25690000),
  ('CHN', 'China', 'https://flagcdn.com/cn.svg', 'Asia', 'Beijing', 1402000000),
  ('IND', 'India', 'https://flagcdn.com/in.svg', 'Asia', 'New Delhi', 1380000000),
  ('ZAF', 'South Africa', 'https://flagcdn.com/za.svg', 'Africa', 'Pretoria', 60000000),
  ('EGY', 'Egypt', 'https://flagcdn.com/eg.svg', 'Africa', 'Cairo', 104000000)
ON CONFLICT (id) DO NOTHING;