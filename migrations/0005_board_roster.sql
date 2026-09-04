-- Executive board roster (Sep 2026). Upsert by email so re-run is safe.

INSERT INTO members (id, email, name, role, status, created_at) VALUES
  ('mbr_hyman',    'ahyman2@yahoo.com',              'Antonio Hyman',           'president', 'active', strftime('%s','now')),
  ('mbr_wagner',   'matt@redleg.dev',                'Matt Wagner',             'member',    'active', strftime('%s','now')),
  ('mbr_mckean',   'ashleighmotte@gmail.com',        'Ashleigh McKean',         'officer',   'active', strftime('%s','now')),
  ('mbr_veguilla', 'julio.veguilla@gmail.com',       'Julio Veguilla-Garcia',   'officer',   'active', strftime('%s','now')),
  ('mbr_evarts',   'jason.r.evarts@gmail.com',       'Jason Evarts',            'member',    'active', strftime('%s','now')),
  ('mbr_eads',     'robert.j.eads4.mil@army.mil',    'Robert Eads',             'member',    'active', strftime('%s','now')),
  ('mbr_blume',    'ryan.c.blume0317@gmail.com',     'Ryan Blume',              'member',    'active', strftime('%s','now')),
  ('mbr_ducharme', 'caseyducharme6@gmail.com',       'Casey Ducharme',          'member',    'active', strftime('%s','now')),
  ('mbr_rock',     'ryandrock1@gmail.com',           'Ryan Rock',               'member',    'active', strftime('%s','now'))
ON CONFLICT(email) DO UPDATE SET
  name = excluded.name,
  role = excluded.role,
  status = excluded.status;
