# Graph Report - SAH  (2026-08-17)

## Corpus Check
- 7 files · ~11,578 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 58 nodes · 65 edges · 9 communities (7 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- package.json
- manifest.json
- SAHStoreClass
- driveImporter.js
- categories
- sw.js
- Protocolo Maestro de Verificación Basada en Evidencia (Evidence-First Protocol)

## God Nodes (most connected - your core abstractions)
1. `SAHStoreClass` - 15 edges
2. `Protocolo Maestro de Verificación Basada en Evidencia (Evidence-First Protocol)` - 5 edges
3. `categories` - 4 edges
4. `scripts` - 4 edges
5. `parseCSV()` - 4 edges
6. `fetchFromGoogleSheetsUrl()` - 3 edges
7. `importAndPublish()` - 3 edges
8. `vite` - 2 edges
9. `extractVimeoId()` - 2 edges
10. `short_name` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (9 total, 2 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.17
Nodes (11): devDependencies, vite, name, private, scripts, build, dev, preview (+3 more)

### Community 1 - "manifest.json"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 4 - "driveImporter.js"
Cohesion: 0.80
Nodes (4): extractVimeoId(), fetchFromGoogleSheetsUrl(), importAndPublish(), parseCSV()

### Community 5 - "categories"
Cohesion: 0.50
Nodes (4): categories, education, health, medical

### Community 8 - "Protocolo Maestro de Verificación Basada en Evidencia (Evidence-First Protocol)"
Cohesion: 0.33
Nodes (5): 1. Prohibición Absoluta de Confirmación Prematura, 2. Verificación Cuantitativa en Tiempo Real, 3. Inspección Focalizada en los Puntos Críticos del Usuario, 4. Respuestas con Evidencia Técnica Verificable, Protocolo Maestro de Verificación Basada en Evidencia (Evidence-First Protocol)

## Knowledge Gaps
- **25 isolated node(s):** `name`, `short_name`, `description`, `start_url`, `display` (+20 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `SAHStoreClass` connect `SAHStoreClass` to `.notify`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **Why does `categories` connect `categories` to `manifest.json`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **What connects `name`, `short_name`, `description` to the rest of the system?**
  _25 weakly-connected nodes found - possible documentation gaps or missing edges._