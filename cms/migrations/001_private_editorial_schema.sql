-- Àṣà & Ìtàn Yorùbá: PRIVATE editorial CMS schema candidate.
-- NOT APPLIED, CONNECTED OR DEPLOYED. Requires security and DBA review.
-- Apply only inside a dedicated private PostgreSQL database with NO public role grants.
-- Identity, sessions, permissions, rights review and publication are enforced by
-- a separate authenticated application, never by trusting browser-supplied metadata.
BEGIN;

CREATE SCHEMA IF NOT EXISTS editorial_private;
REVOKE ALL ON SCHEMA editorial_private FROM PUBLIC;

CREATE TABLE editorial_private.content_records (
  id uuid PRIMARY KEY,
  slug text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' AND length(slug) BETWEEN 2 AND 100),
  kind text NOT NULL CHECK (kind IN ('story','belief','figure','place','research','learning','editorial-page')),
  genre text NOT NULL CHECK (genre IN ('original-fiction','imaginative-retelling','folktale','community-telling','firsthand-memory','family-memory','sacred-belief','historical-account','research')),
  primary_language text NOT NULL CHECK (primary_language ~ '^[a-z]{2,3}(-[A-Za-z0-9]{2,8})*$'),
  state text NOT NULL DEFAULT 'draft' CHECK (state IN ('draft','in_review','approved','published','withdrawn')),
  revision integer NOT NULL DEFAULT 1 CHECK (revision >= 1),
  author_id uuid NOT NULL,
  last_editor_id uuid NOT NULL,
  rights_status text NOT NULL DEFAULT 'pending' CHECK (rights_status IN ('not-required','pending','cleared','restricted')),
  independent_review_required boolean NOT NULL DEFAULT false,
  approved_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT independent_approval CHECK (
    NOT independent_review_required OR approved_by IS NULL
    OR (approved_by <> author_id AND approved_by <> last_editor_id)
  )
);

CREATE TABLE editorial_private.content_editions (
  record_id uuid NOT NULL REFERENCES editorial_private.content_records(id) ON DELETE RESTRICT,
  language text NOT NULL CHECK (language ~ '^[a-z]{2,3}(-[A-Za-z0-9]{2,8})*$'),
  title text NOT NULL CHECK (length(trim(title)) BETWEEN 3 AND 180),
  summary text NOT NULL CHECK (length(trim(summary)) BETWEEN 10 AND 800),
  body_markdown text NOT NULL CHECK (length(trim(body_markdown)) BETWEEN 30 AND 120000),
  PRIMARY KEY (record_id, language)
);

CREATE TABLE editorial_private.provenance (
  record_id uuid PRIMARY KEY REFERENCES editorial_private.content_records(id) ON DELETE RESTRICT,
  source_category text NOT NULL CHECK (source_category IN ('original-author','community-oral-account','firsthand-account','permissioned-family-account','public-research','unknown')),
  description text NOT NULL CHECK (length(trim(description)) BETWEEN 12 AND 2000),
  broad_community text,
  attributed_teller text,
  -- No community oral or first-hand account can be released solely by this record;
  -- separate verified permissions are required in a later restricted table.
  CHECK (broad_community IS NULL OR length(broad_community) <= 150),
  CHECK (attributed_teller IS NULL OR length(attributed_teller) <= 160)
);

CREATE TABLE editorial_private.media_assets (
  id uuid PRIMARY KEY,
  kind text NOT NULL CHECK (kind IN ('image','audio')),
  private_storage_key text NOT NULL UNIQUE,
  sha256 char(64) NOT NULL CHECK (sha256 ~ '^[0-9a-f]{64}$'),
  rights_status text NOT NULL DEFAULT 'unreviewed' CHECK (rights_status IN ('unreviewed','cleared','restricted')),
  alt_or_transcript text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (length(private_storage_key) BETWEEN 1 AND 500 AND private_storage_key !~ '(^/|\\.\\.)'),
  CHECK (length(alt_or_transcript) <= 5000)
);

CREATE TABLE editorial_private.content_media (
  record_id uuid NOT NULL REFERENCES editorial_private.content_records(id) ON DELETE RESTRICT,
  asset_id uuid NOT NULL REFERENCES editorial_private.media_assets(id) ON DELETE RESTRICT,
  position integer NOT NULL CHECK (position BETWEEN 0 AND 29),
  PRIMARY KEY (record_id, asset_id),
  UNIQUE (record_id, position)
);

CREATE TABLE editorial_private.content_revisions (
  record_id uuid NOT NULL REFERENCES editorial_private.content_records(id) ON DELETE RESTRICT,
  revision integer NOT NULL CHECK (revision >= 1),
  snapshot jsonb NOT NULL CHECK (jsonb_typeof(snapshot)='object'),
  actor_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (record_id, revision)
);

CREATE TABLE editorial_private.audit_events (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  record_id uuid NOT NULL REFERENCES editorial_private.content_records(id) ON DELETE RESTRICT,
  action text NOT NULL,
  from_revision integer NOT NULL CHECK (from_revision >= 0),
  to_revision integer NOT NULL CHECK (to_revision > from_revision),
  from_state text,
  to_state text NOT NULL,
  actor_id uuid NOT NULL,
  happened_at timestamptz NOT NULL DEFAULT now(),
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(metadata)='object'),
  UNIQUE (record_id, to_revision)
);
CREATE INDEX audit_events_record_time ON editorial_private.audit_events(record_id,happened_at DESC);
CREATE INDEX content_records_review_queue ON editorial_private.content_records(state,updated_at DESC);

-- Deliberately absent: login/session tables, public INSERT/UPDATE grants,
-- publishing trigger, consent evidence, public search/export and archive import.
-- Never grant this schema to an anonymous/public web role.
COMMIT;
