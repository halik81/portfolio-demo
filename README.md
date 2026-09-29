# Portfolio développeur full-stack — démonstration

Portfolio de démonstration statique en HTML, CSS et JavaScript natifs, publié sur GitHub Pages à l’adresse <https://halik81.github.io/portfolio-demo/>.

## Aperçu en local

Depuis le dossier `portfolio/` :

```powershell
python -m http.server 8000
```

Ouvrez ensuite <http://localhost:8000>.

## Données de démonstration

Le nom, l’adresse, les projets et l’identité présentés sur le site sont **fictifs**. L’adresse `bonjour@example.invalid` est réservée à des exemples et ne peut pas recevoir de messages. Le formulaire valide les champs, puis prépare un message dans l’application e-mail ; il ne transmet aucune donnée à un serveur.

Pour personnaliser le site, remplacez ces informations dans `index.html` et l’adresse destinataire dans `index.html` et `js/main.js`. Mettez également à jour les liens canoniques et de partage dans les métadonnées de `index.html`, `404.html`, `robots.txt` et `sitemap.xml`.

## Déploiement GitHub Pages

Le workflow `.github/workflows/deploy.yml` publie le contenu de ce dossier sur GitHub Pages après chaque envoi sur la branche `main`. Pour l’activer, choisissez **Settings → Pages → GitHub Actions** dans les paramètres du dépôt.

Page `404.html`, `robots.txt`, `sitemap.xml`, métadonnées de partage et illustrations SVG locales inclus.
