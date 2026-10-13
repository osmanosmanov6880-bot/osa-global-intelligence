# OSA Interactive Cinema — Runway Asset Inventory
**Checked:** 2026-10-13  
**Workspace:** Runway personal workspace “Осман”  
**Purpose:** reconcile generated media with the GitHub project and prevent duplicate generation.

## Important status
- Runway connection is authenticated.
- 31 recent assets were returned by the Runway gallery.
- Current remaining Runway balance at the time of audit: **7 credits** (0 plan credits + 7 purchased credits).
- The GitHub project contains the interactive player and a static preview, but the generated MP4/MP3 binaries are **not yet committed to this repository**. The Runway gallery URLs are signed and temporary; do not commit them as permanent production URLs.
- No new generation was started during this upload reconciliation.

## Existing assets to reuse
| Asset ID | Kind | Working title / intended use |
|---|---|---|
| 15590a37-f024-477f-998d-5fde5da1b44f | video | Wide aerial of modern city — opening / AI systems at scale |
| 0e3d62ee-04fd-4f8a-979d-2f4898f35932 | video | Person at desk facing screen — personal AI encounter |
| 54fade71-a159-4e09-81ba-30eb1a7791da | video | Lone figure in observatory — reflection / transition |
| ae6c3ed6-010a-487d-b52d-867793229af2 | video | Wide modern city — establishing shot |
| 5902bfab-7c2f-4752-ae92-7fbb4e57c10f | video | Person at desk before sunrise — agency / action |
| dd30ba82-45ae-4bc9-b3d8-ee6c1f053f58 | video | Historical library at night — knowledge and access |
| c6639cfd-51e4-4cea-963e-0ba9ace3b442 | video | Night-time global city — technology and power |
| 67ee3e6f-8d56-4873-9bb6-96a0dbeb02c6 | video | Human silhouette at horizon — series bridge / final |
| 7ca621e7-9215-453d-afa2-b2afaf9e379b | video | Cinematic opening, 16:9, 24fps |
| 0857c276-202d-4414-a25b-b6cec24e5b0d | video | Solitary human figure — opening alternate |
| 6104b990-ee3b-441b-ba33-cca71f2bb685 | video | Macro eye reflection — hook / human perception |
| 56262182-2df6-4f78-82bf-7356cea837d0 | video | Human silhouette in monumental space — scale |
| 3af96f23-5eaf-4a99-87a1-981515a54b88 | video | Designer-engineer at work — practical AI use |
| fa0e7864-2a52-4a47-aab4-ec2314e9ba56 | video | Historical reenactment — knowledge access over time |
| c5434d77-09af-4294-9d3a-2221793d00a4 | video | Macro human eye — alternate visual |
| 6cc2162c-c468-472c-b4a4-2f85779e2f51 | video | Continuous overhead move across research table |
| 94287192-1795-4f25-a5b8-4c0ef4dd0d4a | video | Archival reading room — history of knowledge |
| 817bc2fc-23c7-41cd-b25b-6d8ed632fc4f | video | Human eye / city reflection — alternate opening |
| a0d3d701-8893-40a5-a064-71c934e73a8d | video | Human eye / city reflection — alternate take |
| db58afba-0d6d-4ca4-946d-90fb819c14ec | audio | Russian trailer voiceover |
| dab2973c-fd32-4e5e-b82c-c7d593b28b27 | audio | Russian opening narration |
| 6be66c9c-16ac-4980-8cac-d1c6716d4d91 | audio | Russian opening teaser |
| 4021f6f1-fb5a-455a-9da2-b44d3a699878 | audio | “Knowledge Horizon” cinematic bed |
| 0d7362d2-20d1-4ef8-85f8-e8b854efc4e9 | audio | “Beyond the Model” cinematic underscore |
| b85171e3-8d86-47de-b65a-7f955a25dd9a | audio | Russian trailer voiceover alternate |
| 3ad80295-eec3-4f08-9f70-04cb7101dc15 | audio | Part III opening narration |
| c960375e-9fa8-419b-afab-fb18c5dee4a0 | audio | Part II opening narration |
| 122f3399-d755-40ff-9a46-b2cc6768d9fe | audio | Part I opening narration |
| 7acbad60-27d5-4c9d-9d2f-75ebd6746e61 | image | Premium cinematic key visual — current |
| ae3a26f8-6d73-4c9c-bed9-43dfb41b52ec | image | Documentary key art frame |
| c9fbea0c-e548-403c-aa06-a3ac4c523241 | image | Premium cinematic key art alternate |

## Required next step for permanent hosting
1. Download the selected originals from the Runway gallery while signed links are valid.
2. Rename to stable descriptive filenames; do not use generic `untitled.mp4`.
3. Add compressed web delivery copies to object storage/CDN (recommended), and keep originals in a media archive.
4. Put only durable HTTPS URLs in the runtime manifest.
5. Commit lightweight metadata and captions to Git; avoid large binaries in normal Git history. If binary hosting in GitHub is required, use Git LFS or release assets after verifying repository and quota limits.
6. Record consent/licensing and whether generated visuals are illustrative rather than documentary footage.

## Selection recommendation
Use one strongest take per beat. The asset list includes alternate takes; do not concatenate every clip blindly. Start with:
- Part I: macro eye, desk interaction, city-scale establishing shot.
- Part II: historical library, research table overhead, global city.
- Part III: designer-engineer, sunrise desk, human horizon.
Use the Russian narration tracks only after listening to them and checking pronunciation, timing, and factual wording. Music should be ducked under narration and never obscure speech.
