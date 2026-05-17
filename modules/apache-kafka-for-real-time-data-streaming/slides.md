---
theme: seriph
title: Apache Kafka for Real-Time Data Streaming
info: |
  ## Module 2

  Introduction a Kafka pour les pipelines temps reel.
class: text-left
transition: slide-left
mdc: true
colorSchema: light
duration: 35min
---

<div class="abs inset-0 hero-splash"></div>
<div class="relative z-10 pt-10">

<div class="pill">Module 2</div>
<div class="pill">Kafka essentials</div>

<h1>Apache Kafka</h1>
<h2>for Real-Time Data Streaming</h2>

<div class="hero-grid mt-10">
  <div class="hero-card">
    <div class="hero-kicker">Role</div>
    <div class="hero-text">Kafka sert a transporter, distribuer et rejouer des evenements a grande echelle.</div>
  </div>
  <div class="hero-card">
    <div class="hero-kicker">Promesse</div>
    <div class="hero-text">Decoupler producteurs et consommateurs sans perdre la logique du flux.</div>
  </div>
</div>

</div>

---

# 1. Kafka, en une phrase

<div class="statement">
Kafka est une plateforme d'evenements qui permet d'ecrire des messages dans des <strong>topics</strong> puis de les lire de maniere fiable et scalable.
</div>

<div class="grid grid-cols-3 gap-4 mt-8">
  <div class="mini-card">
    <div class="card-title">Producer</div>
    <p>L'application qui publie un evenement.</p>
  </div>
  <div class="mini-card">
    <div class="card-title">Topic</div>
    <p>Le canal logique dans lequel les evenements sont ranges.</p>
  </div>
  <div class="mini-card">
    <div class="card-title">Consumer</div>
    <p>Le service qui lit et utilise ces evenements.</p>
  </div>
</div>

---

# 2. Architecture de base

```mermaid
flowchart LR
  A[Producer A] --> T[(Topic orders)]
  B[Producer B] --> T
  T --> C[Consumer group analytics]
  T --> D[Consumer group fraud]
  T --> E[Consumer group billing]
```

<div class="quote-box mt-8">
  Kafka ne fait pas seulement circuler des donnees. Il permet a plusieurs systemes de consommer le meme flux pour des usages differents.
</div>

---

# 3. Topics et partitions

<div class="grid grid-cols-2 gap-6 mt-6">
  <div class="card">
    <div class="card-title">Topic</div>
    <p>Le nom logique du flux. Exemple : <strong>orders</strong>, <strong>payments</strong>, <strong>pageviews</strong>.</p>
  </div>
  <div class="card">
    <div class="card-title">Partition</div>
    <p>Le topic est decoupe en morceaux pour paralleliser l'ecriture et la lecture.</p>
  </div>
</div>

<div class="card mt-8">
  <div class="card-title">Image mentale</div>
  <p>Un topic est une bibliotheque. Les partitions sont les rayonnages qui permettent a plusieurs personnes de travailler en meme temps.</p>
</div>

---

# 4. Consumer groups et offsets

<div class="grid grid-cols-2 gap-6 mt-6">
  <div class="card">
    <div class="card-title">Consumer group</div>
    <p>Plusieurs consommateurs cooperent pour lire un topic en se partageant les partitions.</p>
  </div>
  <div class="card">
    <div class="card-title">Offset</div>
    <p>La position de lecture dans une partition. Il sert a savoir ou reprendre.</p>
  </div>
</div>

<div class="statement mt-8">
L'offset est le marque-page du consommateur.
</div>

---

# 5. Pourquoi Kafka est central en streaming

<div class="grid grid-cols-3 gap-4 mt-6">
  <div class="card">
    <div class="card-title">Decouplage</div>
    <p>Les producteurs n'ont pas besoin de connaitre tous les consommateurs.</p>
  </div>
  <div class="card">
    <div class="card-title">Scalabilite</div>
    <p>Les partitions permettent de monter en charge horizontalement.</p>
  </div>
  <div class="card">
    <div class="card-title">Relecture</div>
    <p>On peut relire l'historique pour recalculer ou reconstruire une vue.</p>
  </div>
</div>

---

# 6. Suite du module

<div class="grid grid-cols-2 gap-4 mt-6">
  <div class="mini-card">
    <div class="card-title">A approfondir ensuite</div>
    <p>replication, retention, ordering, keys, schema registry, Kafka Connect, Kafka Streams</p>
  </div>
  <div class="mini-card">
    <div class="card-title">Question de cours</div>
    <p>Quand choisir Kafka plutot qu'une base, une queue classique ou un appel API direct ?</p>
  </div>
</div>

<style>
:root {
  --deck-ink: #16324a;
  --deck-teal: #0f766e;
  --deck-amber: #d97706;
  --deck-paper: rgba(255, 255, 255, 0.84);
  --deck-line: rgba(22, 50, 74, 0.14);
}

.slidev-layout {
  background:
    radial-gradient(circle at top right, rgba(15, 118, 110, 0.16), transparent 25%),
    radial-gradient(circle at bottom left, rgba(217, 119, 6, 0.14), transparent 24%),
    linear-gradient(180deg, #fbf8f1 0%, #f4edde 100%);
  color: #243443;
}

.hero-splash {
  background:
    radial-gradient(circle at 16% 20%, rgba(217, 119, 6, 0.24), transparent 24%),
    radial-gradient(circle at 84% 16%, rgba(15, 118, 110, 0.22), transparent 24%),
    linear-gradient(135deg, #fffaf2 0%, #f5eddc 100%);
}

h1,
h2,
h3 {
  color: var(--deck-ink);
}

strong {
  color: var(--deck-teal);
}

.pill {
  display: inline-block;
  margin-right: 0.45rem;
  margin-bottom: 0.45rem;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(15, 118, 110, 0.18);
  color: var(--deck-teal);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.hero-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.hero-card,
.card,
.mini-card {
  background: var(--deck-paper);
  border: 1px solid var(--deck-line);
  border-radius: 20px;
  box-shadow: 0 14px 36px rgba(22, 50, 74, 0.08);
}

.hero-card {
  padding: 1.2rem 1.3rem;
}

.hero-kicker,
.card-title {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(22, 50, 74, 0.66);
  margin-bottom: 0.45rem;
  font-weight: 700;
}

.hero-text {
  font-size: 1.15rem;
  line-height: 1.45;
}

.card {
  padding: 1.1rem 1.15rem;
}

.mini-card {
  padding: 0.95rem 1rem;
}

.statement {
  border-radius: 22px;
  padding: 1rem 1.2rem;
  background: rgba(15, 118, 110, 0.1);
  border: 1px solid rgba(15, 118, 110, 0.16);
  font-size: 1.28rem;
  line-height: 1.5;
}

.quote-box {
  border-radius: 22px;
  padding: 1rem 1.2rem;
  background: rgba(22, 50, 74, 0.92);
  color: #f8fafc;
}
</style>
