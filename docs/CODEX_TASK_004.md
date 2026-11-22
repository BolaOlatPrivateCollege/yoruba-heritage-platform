# Codex Task 004 — Author, Edition and Claim Provenance

## Goal
Migrate the three verified introductory author dossiers and fifteen research-reference records from `research-authors.js` into typed content collections. Preserve the 110-chapter baseline and existing moderation logic. Do not alter production infrastructure or deploy.

## Proposed content types
- `Person`: canonical display name, alternates, roles, externally sourced biography, evidence level.
- `Work`: title, author/editor, verified abstract, bibliography IDs, publication chronology.
- `Edition`: year, imprint, ISBN/OCLC, language, catalogue locator, inspected/full-text status.
- `Claim`: wording, claimed author, evidence class, source edition and locator, independent verification, review date, excluded-source-dependency flag.
- `CommunityTestimony`: local speaker, consent, original Yoruba transcript, dialect, translation reviewer, restrictions.

## Acceptance
1. Preserve 113 current chapters, 128 sources, six community records, 24 Sacred World profiles, 16 deep research articles and two name-origin studies.
2. Preserve the three new route IDs: `author-sophie-oluwole`, `author-ifayemi-elebuibon`, `author-wande-abimbola` and bibliography links. Every visible section cites a valid source ID.
3. Represent original 2014 and third 2017 editions of Oluwole's work distinctly. Do not state historic Orunmila birth dates as proven.
4. Mark full-text access status per book; **never** infer a page quote from a library catalogue or publisher blurb.
5. Flag any indirect reliance on Samuel Johnson as unresolved until independently checked; do not use Johnson’s books to substantiate facts.
6. Review Yoruba orthography, community permission, and spellings with named reviewers before external publication.
7. Tests, responsive behaviour, keyboard navigation and accessible source labels must pass before merging.
