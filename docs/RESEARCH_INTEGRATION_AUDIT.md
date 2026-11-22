# Research integration audit — 22 November 2026

## Scope

This audit checks **site integration**, not peer review or scientific verification of every claim. All 18 new studies appear in the master articles array, the search and learning library, and dedicated research navigation. All source identifiers resolve in the in-site source catalogue.

| User-requested area | Primary article | Integration | Limits before authoritative public launch |
|---|---|---|---|
| Yoruba myths and mythological narratives | `deep-myths-origins`, `deep-myths-storytelling` | Integrated | Obtain named community versions; no fabricated verses |
| Yoruba voice pronunciation | `deep-pronunciation`, listening-lab UI | Text/tone explorer integrated; actual audio pending | Consent-cleared native-speaker recordings required |
| Spirituality vs Christianity and Islam | `deep-faith-connections`, `deep-modern-spiritual-world` | Integrated | Distinguish comparative scholarship from local theology |
| Yoruba ghost DNA | `deep-ghost-dna` | Integrated | Population-genetic model, not a supernatural claim |
| Ifá and odù | `deep-ifa-tradition`, `deep-ifa-odu-binary` | Introductory study + interactive mathematical grid | 256 complete odù/ẹsẹ̀ interpretations **not** supplied; requires authorised custodians and verified editions |
| Gəʿəz/Ge'ez | `deep-geez` | Integrated | No evidence of Yoruba descent from Gəʿəz claimed |
| Yoruba political systems | `deep-political-system` | Integrated | Town-by-town case studies needed |
| Yoruba names, morphological formation | `deep-names-morphology` | Integrated | Personal-name interpretations require family context |
| Yoruba religious histories | `deep-islam-history`, `deep-christianity-history` | Integrated | Broaden with mosque and church records by town |
| Cave of Ashes (Ihò Eléérú) | `deep-cave-ashes` | Integrated | No direct claim of prehistoric Yoruba ethnogenesis |
| Ẹlẹ́yẹ / Àjẹ́ / Ìyámi | `deep-eleye-mothers` | Integrated | “How created” belongs to attributed regional traditions, not an observed event |
| Ọbàtálá | `deep-obatala-deep`, `sac-obatala` | Integrated | Regional narratives should remain distinct |
| Olódùmarè: the name and its origin | `deep-name-olodumare` | **New 9-section study integrated** | Etymology contested; original Bamgbose work still needs full reading |
| Òrìṣà: the name and its origin | `deep-name-orisa` | **New 9-section study integrated** | `orí + ṣà` explicitly labelled folk analysis, not proven etymology |

## Verification and runtime checks

- `npm run verify`: 11 tests pass, including all-source identifiers, archive counts, exclusion policy and navigation wiring.
- 110 total chapters: prior 68 + 24 sacred profiles + 16 deep studies + 2 etymology studies.
- 113 reference records: prior 92 + 15 interdisciplinary references + 6 name-etymology records.
- 16 principal Odù teaching labels; 256 illustrative pair cells (16×16). Neither their display mapping nor the order is certified as a liturgical tradition.
- 15 pronunciation entries. No recording published without provenance or rights.
- Automated browser screenshot/interaction attempts were blocked by the testing environment, so **visual and end-to-end browser verification remains outstanding**.
- The moderation service remains a local demonstration. Neither hosting nor a production community database is configured.

## Editorial policy

Books by Samuel Johnson may not be used as factual authorities. The website preserves native accounts when genuinely documented and attributed, and does not pretend that unsupported etymologies, mystical claims or moral narratives are proven archaeological or medical facts. The source labels distinguish full-text papers from abstract/catalogue/lexical leads.
