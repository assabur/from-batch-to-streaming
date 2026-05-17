# From Batch to Streaming

Slides de cours construites avec [Slidev](https://github.com/slidevjs/slidev).

## Developpement local

- `npm install`
- `npm run dev`
- ouvrir <http://localhost:3030>

Le contenu principal du deck se trouve dans [slides.md](./slides.md).

## Build

- `npm run build`

Le site statique genere est produit dans `dist/`.

## Deploiement Netlify

Le projet est deja configure pour Netlify via [netlify.toml](./netlify.toml).

Parametres utilises :

- Build command : `npm run build`
- Publish directory : `dist`
- Node version : `20`

### Option 1. Deploiement via l'interface Netlify

1. Creer un nouveau site dans Netlify.
2. Choisir `Import an existing project` si le projet est sur GitHub, ou `Deploy manually` si tu veux envoyer le dossier `dist`.
3. Si tu importes le projet :
   - Build command : `npm run build`
   - Publish directory : `dist`
4. Lancer le deploy.

### Option 2. Deploiement manuel

1. Executer `npm run build`
2. Dans Netlify, choisir `Add new site` puis `Deploy manually`
3. Glisser-deposer le dossier `dist`

## Notes

- Le fichier `netlify.toml` gere deja la redirection SPA vers `index.html`.
- Le build de production a ete verifie localement avec `npm run build`.
