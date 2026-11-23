-- Run against an EMPTY throwaway PostgreSQL test database after migration 001.
\set ON_ERROR_STOP on
BEGIN;
INSERT INTO editorial_private.content_records
  (id,slug,kind,genre,primary_language,author_id,last_editor_id,rights_status)
VALUES
  ('b2c611df-f4f2-4e18-9c66-24320d8fcbf7','itan-ile-ife','story','original-fiction','yo',
   '248dce42-71f2-4504-a9a2-713cc3e86c86','248dce42-71f2-4504-a9a2-713cc3e86c86','pending');

INSERT INTO editorial_private.content_editions(record_id,language,title,summary,body_markdown)
VALUES ('b2c611df-f4f2-4e18-9c66-24320d8fcbf7','yo',
  'Ìtàn Ilé-Ifẹ̀','Àwọn ìtàn Yorùbá ni a ń pín.',
  'Ìtàn àti àṣà Yorùbá wà lára ohun tí a fẹ́ pa mọ́.');

INSERT INTO editorial_private.provenance(record_id,source_category,description)
VALUES ('b2c611df-f4f2-4e18-9c66-24320d8fcbf7','original-author',
  'Original fictional test fixture; no real elder testimony');

INSERT INTO editorial_private.content_revisions
 (record_id,revision,snapshot,actor_id)
VALUES ('b2c611df-f4f2-4e18-9c66-24320d8fcbf7',1,
  '{"title":"Ìtàn Ilé-Ifẹ̀","language":"yo"}'::jsonb,
  '248dce42-71f2-4504-a9a2-713cc3e86c86');

INSERT INTO editorial_private.audit_events
 (record_id,action,from_revision,to_revision,from_state,to_state,actor_id)
VALUES ('b2c611df-f4f2-4e18-9c66-24320d8fcbf7','create_draft',0,1,NULL,'draft',
  '248dce42-71f2-4504-a9a2-713cc3e86c86');

DO $$
BEGIN
 IF (SELECT title FROM editorial_private.content_editions WHERE language='yo')
      <> 'Ìtàn Ilé-Ifẹ̀' THEN RAISE EXCEPTION 'Unicode was lost'; END IF;
 IF (SELECT count(*) FROM editorial_private.audit_events)<>1 THEN
   RAISE EXCEPTION 'Missing audit event'; END IF;
 IF (SELECT nspacl IS NULL OR NOT (nspacl @> ARRAY['=U/postgres']::aclitem[])
     FROM pg_namespace WHERE nspname='editorial_private') IS NOT TRUE THEN
   RAISE EXCEPTION 'Unexpected permissions check'; END IF;
END $$;
ROLLBACK;
