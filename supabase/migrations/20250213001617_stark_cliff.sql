/*
  # Add more countries data

  1. Data Population
    - Adds additional countries to provide a comprehensive list
    - Each country includes:
      - ID (3-letter code)
      - Name
      - Flag image (from flagcdn.com)
      - Continent
      - Capital
      - Population
*/

INSERT INTO countries (id, name, flag_image, continent, capital, population)
VALUES
  ('USA', 'United States', 'https://flagcdn.com/us.svg', 'North America', 'Washington, D.C.', 331002651),
  ('RUS', 'Russia', 'https://flagcdn.com/ru.svg', 'Asia', 'Moscow', 145912025),
  ('NLD', 'Netherlands', 'https://flagcdn.com/nl.svg', 'Europe', 'Amsterdam', 17134872),
  ('PRT', 'Portugal', 'https://flagcdn.com/pt.svg', 'Europe', 'Lisbon', 10196709),
  ('SGP', 'Singapore', 'https://flagcdn.com/sg.svg', 'Asia', 'Singapore', 5850342),
  ('NZL', 'New Zealand', 'https://flagcdn.com/nz.svg', 'Oceania', 'Wellington', 5122600),
  ('CHL', 'Chile', 'https://flagcdn.com/cl.svg', 'South America', 'Santiago', 19458310),
  ('COL', 'Colombia', 'https://flagcdn.com/co.svg', 'South America', 'Bogotá', 50882891),
  ('PER', 'Peru', 'https://flagcdn.com/pe.svg', 'South America', 'Lima', 32971854),
  ('MAR', 'Morocco', 'https://flagcdn.com/ma.svg', 'Africa', 'Rabat', 36910560),
  ('KEN', 'Kenya', 'https://flagcdn.com/ke.svg', 'Africa', 'Nairobi', 53771296),
  ('NGA', 'Nigeria', 'https://flagcdn.com/ng.svg', 'Africa', 'Abuja', 206139589),
  ('THA', 'Thailand', 'https://flagcdn.com/th.svg', 'Asia', 'Bangkok', 69950850),
  ('VNM', 'Vietnam', 'https://flagcdn.com/vn.svg', 'Asia', 'Hanoi', 97338579),
  ('KOR', 'South Korea', 'https://flagcdn.com/kr.svg', 'Asia', 'Seoul', 51269185),
  ('SWE', 'Sweden', 'https://flagcdn.com/se.svg', 'Europe', 'Stockholm', 10099265),
  ('NOR', 'Norway', 'https://flagcdn.com/no.svg', 'Europe', 'Oslo', 5421241),
  ('DNK', 'Denmark', 'https://flagcdn.com/dk.svg', 'Europe', 'Copenhagen', 5831404),
  ('FIN', 'Finland', 'https://flagcdn.com/fi.svg', 'Europe', 'Helsinki', 5530719),
  ('ISL', 'Iceland', 'https://flagcdn.com/is.svg', 'Europe', 'Reykjavik', 364134),
  ('URY', 'Uruguay', 'https://flagcdn.com/uy.svg', 'South America', 'Montevideo', 3473730),
  ('PRY', 'Paraguay', 'https://flagcdn.com/py.svg', 'South America', 'Asunción', 7132538),
  ('BOL', 'Bolivia', 'https://flagcdn.com/bo.svg', 'South America', 'La Paz', 11673021),
  ('ECU', 'Ecuador', 'https://flagcdn.com/ec.svg', 'South America', 'Quito', 17643054),
  ('CRI', 'Costa Rica', 'https://flagcdn.com/cr.svg', 'North America', 'San José', 5094118)
ON CONFLICT (id) DO NOTHING;