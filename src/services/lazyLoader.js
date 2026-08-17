/**
 * LazyLoader — Dynamic Script Loader on Demand
 */
window.LazyLoader = {
  jsPdfLoaded: false,
  vimeoLoaded: false,

  loadJsPDF() {
    return new Promise((resolve, reject) => {
      if (window.jspdf || this.jsPdfLoaded) {
        return resolve(window.jspdf);
      }
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      script.async = true;
      script.onload = () => {
        this.jsPdfLoaded = true;
        resolve(window.jspdf);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  },

  loadVimeoSDK() {
    return new Promise((resolve, reject) => {
      if (window.Vimeo || this.vimeoLoaded) {
        return resolve(window.Vimeo);
      }
      const script = document.createElement('script');
      script.src = 'https://player.vimeo.com/api/player.js';
      script.async = true;
      script.onload = () => {
        this.vimeoLoaded = true;
        resolve(window.Vimeo);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
};
