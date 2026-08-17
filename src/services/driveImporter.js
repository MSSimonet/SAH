/**
 * GoogleDriveImporter — Módulo de Ingesta y Parseo de Planillas de Google Sheets / Google Drive
 * Parsea automáticamente enlaces de Google Sheets exportados en CSV o JSON y mapea los videos a SAH TV.
 */

window.GoogleDriveImporter = {
  /**
   * Extrae el ID del video de Vimeo desde una URL o ID crudo
   */
  extractVimeoId(urlOrId) {
    if (!urlOrId) return '1034619595';
    const str = String(urlOrId).trim();
    const match = str.match(/vimeo\.com\/(?:video\/)?(\d+)/) || str.match(/^(\d+)$/);
    return match ? match[1] : '1034619595';
  },

  /**
   * Parsea contenido CSV a un array de objetos con columnas mapeadas dinámicamente
   */
  parseCSV(csvText) {
    const lines = csvText.split(/\r?\n/).map(l => l.trim()).filter(line => line.length > 0);
    if (lines.length < 2) return [];

    // Normalizar encabezados (quitar acentos, espacios y convertir a minúsculas)
    const headers = lines[0].split(',').map(h => 
      h.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    );

    const results = [];
    const categoryGradients = {
      'leucemias': ['#2e0a12', '#0f0407'],
      'linfomas': ['#2c0d15', '#0e0508'],
      'mieloma': ['#341017', '#100509'],
      'hemostasia': ['#330f17', '#0f0508'],
      'trasplante': ['#3a0b13', '#120307'],
      'default': ['#331018', '#10060a']
    };

    for (let i = 1; i < lines.length; i++) {
      const rawCells = lines[i].split(',');
      if (!rawCells || rawCells.length === 0) continue;

      const row = rawCells.map(c => c.trim().replace(/^"|"$/g, ''));

      const getVal = (possibleHeaders) => {
        for (const key of possibleHeaders) {
          const idx = headers.indexOf(key);
          if (idx !== -1 && row[idx]) {
            return row[idx];
          }
        }
        return '';
      };

      const title = getVal(['titulo', 'title', 'nombre', 'webinar']) || `Conferencia SAH #${i}`;
      const speaker = getVal(['exponente', 'ponente', 'autor', 'doctor', 'speaker']) || 'Especialista SAH';
      const category = getVal(['especialidad', 'categoria', 'category', 'area']) || 'Hematología';
      const year = getVal(['ano', 'year', 'fecha']) || '2026';
      const rawUrl = getVal(['url', 'link', 'vimeo', 'video']);
      const duration = getVal(['duracion', 'dur', 'length']) || '45:00';
      const cmeVal = getVal(['cme', 'acreditado', 'creditos']);

      const catKey = category.toLowerCase();
      const grad = categoryGradients[catKey] || categoryGradients['default'];
      const vimeoId = this.extractVimeoId(rawUrl);

      results.push({
        id: `drive-${Date.now()}-${i}`,
        vimeoId: vimeoId,
        cat: category.charAt(0).toUpperCase() + category.slice(1),
        title: title,
        author: speaker,
        role: `${category} · ${year}`,
        dur: duration,
        sec: 2700,
        g: grad,
        cme: cmeVal ? (cmeVal.toLowerCase().includes('si') || cmeVal.toLowerCase().includes('true') || cmeVal === '1') : true,
        year: year,
        source: 'Google Drive'
      });
    }

    return results;
  },

  /**
   * Obtiene y parsea una planilla pública de Google Sheets desde su URL de Drive
   */
  async fetchFromGoogleSheetsUrl(driveUrl) {
    const sheetIdMatch = driveUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (!sheetIdMatch) {
      throw new Error('URL de Google Sheets no válida. Formato esperado: https://docs.google.com/spreadsheets/d/ID_PLANILLA/edit');
    }

    const sheetId = sheetIdMatch[1];
    const csvExportUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

    const response = await fetch(csvExportUrl);
    if (!response.ok) {
      throw new Error('No se pudo acceder a la planilla de Google Sheets. Asegurate de que el archivo tenga acceso de lectura público o enlace compartido.');
    }

    const csvText = await response.text();
    return this.parseCSV(csvText);
  },

  /**
   * Importa videos y los agrega en vivo al catálogo de SAH TV
   */
  async importAndPublish(driveUrlOrCSV) {
    let newVideos = [];
    if (driveUrlOrCSV.includes('docs.google.com') || driveUrlOrCSV.includes('drive.google.com')) {
      newVideos = await this.fetchFromGoogleSheetsUrl(driveUrlOrCSV);
    } else {
      newVideos = this.parseCSV(driveUrlOrCSV);
    }

    if (!newVideos || newVideos.length === 0) {
      throw new Error('No se encontraron registros de videos válidos en el archivo proporcionado.');
    }

    if (window.VIDEOS) {
      newVideos.forEach(v => {
        if (!window.VIDEOS.some(x => x.id === v.id)) {
          window.VIDEOS.unshift(v);
        }
      });
    }

    if (window.SAHStore) {
      window.SAHStore.notify('CATALOG_UPDATED', newVideos);
    }

    return newVideos;
  }
};

window.importFromGoogleDrive = (url) => window.GoogleDriveImporter.importAndPublish(url);
