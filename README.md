# Big Data Frameworks Courses

Projet Slidev organise en plusieurs modules dans un seul repo.

## Structure

```text
modules/
  from-batch-to-streaming/
    slides.md
  apache-kafka-for-real-time-data-streaming/
    slides.md
scripts/
  build-modules.mjs
  modules.mjs
```

## Developpement local

- `npm install`
- `npm run dev`
- `npm run dev:batch`
- `npm run dev:kafka`

Par defaut, `npm run dev` ouvre le module `from-batch-to-streaming`.

## Build

- `npm run build`

Cette commande :

- build chaque module dans `dist/<module>/`
- genere une page d'accueil `dist/index.html` avec les liens vers les modules

Builds individuels :

- `npm run build:batch`
- `npm run build:kafka`

## Deploiement Netlify

Le projet est configure pour Netlify via [netlify.toml](./netlify.toml).

Parametres utiles :

- Build command : `npm run build`
- Publish directory : `dist`
- Node version : `20`

Les redirects Netlify sont prevus pour :

- la page d'accueil du projet
- le module `from-batch-to-streaming`
- le module `apache-kafka-for-real-time-data-streaming`

Le build genere aussi `dist/_redirects`, utile pour un deploiement manuel de `dist/` sur Netlify.
