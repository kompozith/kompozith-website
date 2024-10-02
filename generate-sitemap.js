const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

// Créer un flux de sitemap
const sitemap = new SitemapStream({ hostname: 'https://kompozith.com' });

// Écrire le sitemap dans un fichier sitemap.xml
const writeStream = createWriteStream('./sitemap.xml');

// Ajouter des URLs
sitemap.pipe(writeStream);

// Ajouter manuellement plusieurs URLs
sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
sitemap.write({ url: '/about-us', changefreq: 'monthly', priority: 0.8 });
sitemap.write({ url: '/services', changefreq: 'monthly', priority: 0.8 });
sitemap.write({ url: '/contact', changefreq: 'monthly', priority: 0.8 });
sitemap.write({ url: '/order/flex', changefreq: 'monthly', priority: 0.8 });

// Fin du flux d'écriture
sitemap.end();

// Écrire le sitemap dans un fichier
streamToPromise(sitemap)
  .then(() => {
    console.log('Sitemap généré avec succès!');
  })
  .catch((err) => {
    console.error(err);
  });
