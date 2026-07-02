# Marine & Arnaud · Lune de miel au Japon 🌸

Carte interactive (Leaflet) présentant l'itinéraire et les lieux à visiter au Japon.
Application 100% statique : un seul fichier `index.html`, aucun serveur ni build nécessaire.

## Déploiement (GitHub Pages)

1. Sur [github.com](https://github.com), créer un nouveau dépôt **public** (bouton vert "New").
2. Sur la page du dépôt, cliquer sur **"Add file" → "Upload files"**, puis glisser-déposer `index.html`.
3. Valider ("Commit changes").
4. Aller dans **Settings → Pages**.
5. Sous "Build and deployment" → Source : choisir **"Deploy from a branch"**, branche **main**, dossier **/ (root)**, puis **Save**.
6. Après 1–2 minutes, le site est en ligne à l'adresse :
   `https://<votre-nom-utilisateur>.github.io/<nom-du-depot>/`

Aucune ligne de commande n'est nécessaire — tout se fait depuis l'interface web de GitHub.

## Notes techniques

- Cartographie : Leaflet 1.9.4 + Leaflet.markercluster (chargés depuis cdnjs).
- Fond de carte : tuiles CARTO Voyager (OpenStreetMap).
- Les favoris/itinéraire de l'utilisateur sont sauvegardés dans le `localStorage` du navigateur (rien n'est envoyé à un serveur).
- Les lieux sont embarqués directement dans le fichier (`SPOTS_DATA`), donc le site fonctionne de façon totalement autonome une fois hébergé.
