# Graph Report - SAH  (2026-08-16)

## Corpus Check
- 6 files · ~7,838 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 52 nodes · 60 edges · 8 communities (6 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- package.json
- manifest.json
- SAHStoreClass
- driveImporter.js
- categories
- sw.js

## God Nodes (most connected - your core abstractions)
1. `SAHStoreClass` - 15 edges
2. `categories` - 4 edges
3. `scripts` - 4 edges
4. `parseCSV()` - 4 edges
5. `fetchFromGoogleSheetsUrl()` - 3 edges
6. `importAndPublish()` - 3 edges
7. `vite` - 2 edges
8. `extractVimeoId()` - 2 edges
9. `short_name` - 1 edges
10. `start_url` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (8 total, 2 thin omitted)

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

## Knowledge Gaps
- **21 isolated node(s):** `name`, `short_name`, `description`, `start_url`, `display` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `SAHStoreClass` connect `SAHStoreClass` to `.notify`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Why does `categories` connect `categories` to `manifest.json`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **What connects `name`, `short_name`, `description` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._