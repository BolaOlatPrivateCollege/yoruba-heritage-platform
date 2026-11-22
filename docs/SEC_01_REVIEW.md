# SEC-01 — local pilot file-serving security review

Issue #2. Branch: `codex/security-pilot-fileserving`.
Foundation/main inspected at `aefae5e9995ee2288688606ea7d877e03cf55caf`, after
the approved audit and preservation foundation merges. Main CI run 44998199448
was successful. No production connection, public listener, deployment or merge
is part of this change. This is a proposed patch for technical review.

## Threat model and implementation

The attacker controls an unauthenticated HTTP request, including target spelling
and request method. They must never obtain files merely because the Python
process can read them. The filesystem and trusted application code are not an
untrusted contributor sandbox. Administrative/local-process ability to rewrite
trusted code, install hard links or replace trusted deployment directories is
outside this HTTP boundary. Do not run the pilot as a privileged public service.

The handler now derives from BaseHTTPRequestHandler, removing inherited static
translation, directory listing, GET and HEAD fallback behavior. An explicit map
permits only the root/index alias, styles.css, the 11 original JavaScript files
and assets/favicon.svg. All original shell asset references resolve in that map.
No extension glob, directory scan, documentation, generated artifact, Python,
database, configuration, environment file or VCS metadata is eligible.

The original request target is validated before dispatch. Percent-encoded paths
(including mixed-case and double escapes), dot segments, duplicate separators,
backslashes, controls/NUL, absolute/protocol-relative targets, fragments, ADS
syntax and other noncanonical spellings are rejected, not decoded into a valid
resource. Queries remain separate and can use ordinary parameter encoding; they
never become filesystem paths. Unknown resources return generic 404 responses.

GET and HEAD use the same dispatcher for static files and dynamic health/admin/
API routes. HEAD retains authorization, status and representation headers but
sends no body. POST also applies the same request-path gate. Existing pending
moderation and public-approved-only selection logic is unchanged.

Only fixed mapped filenames reach file opening. POSIX opens ROOT and parent
directories via no-follow directory descriptors, opens the leaf with O_NOFOLLOW
and O_NONBLOCK, and requires a regular file. It therefore does not follow an
allowed-name symlink or block on a FIFO. Windows rejects reparse points at the
candidate/components, then validates the final opened handle's canonical path
against the exact allowed filename before reading any bytes. Unknown platforms
fail closed. No filesystem path or private file content is returned in errors.
Raw target/query access logging is suppressed. main rejects non-loopback binding
before database initialization or listener creation.

The original root website is not moved or duplicated. Its allowlist is the logical
public asset boundary; private_data's default path is unchanged. No existing
database is read or relocated. Removing broad filesystem serving is the scoped
fix; future managed hosting must use a separately reviewed public build/storage
design.

## Immutable original manifest plus explicit security revision

`preservation/baseline.json` is unchanged. Its exact SHA-256 is:

`80dd12a96f7ed804bb2602f85edbaef5c3371fa9799dc97633d8349297571a33`

The complete archive canonical SHA-256 remains:

`89f33fa4699955155ad42d16159999b74d74e9b5c1119bd976e81b634c6212c2`

| Protected file | SHA-256 |
| --- | --- |
| Original server.py | `0d19f5daa71916d77fe7a9cc2a7eead3e5a0edc26bdf831ed06cc558fa30b5ba` |
| SEC-01-v1 server.py | `6bcaa826444a7ab81b141636510f5fb94487ca79d9cc7e3f579f2b7ad142ad10` |

`preservation/security-revisions/sec-01-v1.json` is a separate versioned proposed
security-code revision, not a replacement content baseline. It records foundation
commit, original manifest and archive hashes, exact old/new server hashes and
the issue/reason. Verification pins the original manifest bytes and exact SEC-01-v1
server hash; only server.py can differ. Unknown revisions, extra/content-file
exceptions, changed archive/parent hashes, arbitrary new hashes and vulnerable
original server bytes are rejected. All other protected file hashes are retained.
Future server edits require a new reviewed version; never rewrite v1 silently.

Original manifest generation now explicitly refuses to absorb revised server.py.
Normal verification/import never writes either manifest. The archive importer
still returns the same historical data, evidence notes, rights defaults and
source links; code revision is not scholarly approval. All 113 chapters, 128
sources, six community leads, 24 sacred profiles and supplemental collections
retain their original full-content hashes, IDs, ordering and Yoruba Unicode.

## Reproducible commands and test evidence

```sh
npm ci --ignore-scripts
npm run verify
npm run verify:preservation
npm run test:security-revision
npm run test:security
python -m py_compile server.py tests/test_fileserving.py
```

`npm test` runs all four gates. GitHub Actions adds both new suites to the existing
least-privilege Linux workflow, with pinned Node 22.23.1 and Python 3.12.10.
The PR description provides the exact final-head workflow run and job/log links;
completion requires that real GitHub run, not a local diagnostic substitute.

Local results:
- Existing 12 legacy tests and 11 JS syntax checks pass.
- Existing 24 exact preservation/import tests pass; generated JSON is unchanged.
- Nine versioned-revision tests pass, including baseline/content exception denial.
- Python compilation passes.
- Real loopback HTTP suite attempted on Windows: client connections are blocked
  by WinError 10013. No permission/security setting was changed to bypass it.
- Explicit in-memory HTTP diagnostic: 13 test methods, ten pass and three skip
  (POSIX FIFO plus two Windows symlink-creation cases unavailable locally).
  This uses the same parser/handler/response assertions and synthetic fixtures;
  it is not claimed as a network integration pass.

The default security suite starts only 127.0.0.1 on an ephemeral OS-selected port,
with a temporary synthetic public tree and private sentinel files. It never calls
main/init or opens a database; connect is mocked to fail any accidental access.
Positive tests exercise every allowlisted resource with GET/HEAD and exact MIME,
length and safety-header parity. Negative subtests cover source/environment/VCS/
database/WAL/backup/generated/docs paths, directories, encoded/malformed/traversal
targets, missing files, mapped directories, file/directory symlinks and FIFO.
No private sentinel may appear in a response. HEAD responses are checked at the
raw HTTP byte level for absence of bodies. Health and unauthorized admin dispatch
are tested; public bind attempts are denied before init. No real identities,
testimony or production records are used.

The diagnostic mode is explicit via SEC01_TEST_TRANSPORT=memory and is forbidden
when CI is set. CI uses real loopback TCP; symlink-creation errors in CI fail the
suite rather than skip. Linux must pass all 13 methods including FIFO/symlinks.
Local Windows symlink integration remains an explicitly unexecuted case.

## Remaining limitations and release decision

SEC-01 covers file disclosure, not public-service readiness. Basic Auth/shared
editor credentials, CSRF/trusted-host controls, consent typing/scope, login/abuse
throttles, request resource limits, immutable moderation history, privacy retention,
backup restoration, TLS and incident response still require separate work.
Disabling raw request logging also means monitoring needs a separate safe design.
Source independence, community permissions, sacred restrictions and media rights
are not upgraded by these tests. Samuel Johnson's books remain excluded as factual
authorities. No new content/audio is introduced.

Public deployment remains prohibited. Do not close broader readiness blockers
because this PR passes. Only owner review can authorize merging this version;
merging is not deployment approval. No permission model or production service is
weakened to obtain passing tests.

## Rollback

Keep the pilot stopped. Revert the complete SEC-01 commit series together:
server.py, preservation verifier/revision, tests, package/CI additions and docs.
That restores the original server hash and original preservation verifier while
leaving all archive data untouched. Never restore the vulnerable server while a
listener is exposed. No SQL rollback, content import, domain change or data
migration is needed. Existing local drafts and databases are not touched.
