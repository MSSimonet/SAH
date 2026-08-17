/**
 * SAHStore — Unidirectional Reactive Event Store for SAH TV
 */
class SAHStoreClass {
  constructor() {
    this.listeners = [];
    this.state = {
      theme: this.loadStorage('sah_theme') || 'night',
      user: this.loadStorage('sah_user_session') || null,
      watchlist: this.loadStorage('sah_watchlist') || [],
      notes: {}
    };
  }

  loadStorage(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  saveStorage(key, val) {
    try {
      if (val !== null && val !== undefined) {
        localStorage.setItem(key, JSON.stringify(val));
      } else {
        localStorage.removeItem(key);
      }
    } catch (e) {}
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify(event, payload) {
    this.listeners.forEach(fn => fn(event, payload, this.state));
  }

  // Theme State
  setTheme(theme) {
    this.state.theme = theme;
    this.saveStorage('sah_theme', theme);
    this.notify('THEME_CHANGED', theme);
  }

  getTheme() {
    return this.state.theme;
  }

  // User State
  setUser(user) {
    this.state.user = user;
    this.saveStorage('sah_user_session', user);
    this.notify('USER_CHANGED', user);
  }

  getUser() {
    return this.state.user;
  }

  // Watchlist State
  toggleWatchlist(id) {
    const idx = this.state.watchlist.indexOf(id);
    if (idx > -1) {
      this.state.watchlist.splice(idx, 1);
    } else {
      this.state.watchlist.push(id);
    }
    this.saveStorage('sah_watchlist', this.state.watchlist);
    this.notify('WATCHLIST_CHANGED', this.state.watchlist);
    return this.state.watchlist.includes(id);
  }

  isWatchlisted(id) {
    return this.state.watchlist.includes(id);
  }

  getWatchlist() {
    return this.state.watchlist;
  }

  // Video Notes State
  getNotes(vid) {
    if (!this.state.notes[vid]) {
      this.state.notes[vid] = this.loadStorage('sah_notes_' + vid) || [];
    }
    return this.state.notes[vid];
  }

  saveNotes(vid, notesList) {
    this.state.notes[vid] = notesList;
    this.saveStorage('sah_notes_' + vid, notesList);
    this.notify('NOTES_CHANGED', { vid, notes: notesList });
  }
}

window.SAHStore = new SAHStoreClass();
