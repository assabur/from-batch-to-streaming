---
theme: seriph
title: From Batch to Streaming
info: |
  ## Foundations of Real-Time Data Processing

  Une introduction au passage du batch vers le streaming.
class: text-left
drawings:
  persist: false
transition: slide-left
mdc: true
colorSchema: light
duration: 35min
---

<div class="abs inset-0 hero-splash"></div>
<div class="relative z-10 pt-10">


<h1>From Batch to Streaming</h1>

<h2>Foundations of Real-Time Data Processing</h2>

<div class="hero-grid mt-10">
  <div class="hero-card">
    <div class="hero-kicker">Question centrale</div>
    <div class="hero-text">Pourquoi attendre la nuit pour traiter une information qui a de la valeur maintenant ?</div>
  </div>
  <div class="hero-card">
    <div class="hero-kicker">Objectif</div>
    <div class="hero-text">Comprendre les concepts avant de parler d'outils.</div>
  </div>
</div>

<div class="mt-10 tiny">
Batch, streaming, event time, watermarks, state et garanties de livraison.
</div>

</div>

---
layout: two-cols
layoutClass: gap-10
---

# 1. Le batch, c'est quoi ?

Le **batch processing** traite des donnees **par paquets**.

Points clefs :

- on collecte pendant un certain temps
- on lance un job a heure fixe
- on produit un resultat apres coup

Exemples classiques :

- facturation a la fin de la journee
- reporting quotidien
- consolidation comptable la nuit

::right::

<div class="card">
  <div class="card-title">Illustration</div>
</div>

```mermaid
flowchart LR
  A[Evenements de la journee] --> B[(Stockage)]
  B --> C[Job batch a 02:00]
  C --> D[Rapport disponible a 08:00]
```

<div class="mini-card mt-3">
  <div class="tiny">
    Analogie : on remplit un camion toute la journee, puis on le fait partir une seule fois.
  </div>
</div>

---

# 2. Pourquoi le batch ne suffit plus ?

<div class="grid grid-cols-3 gap-4 mt-6">
  <div class="card">
    <div class="big-number">1</div>
    <div class="card-title">Latence</div>
    <p>Le systeme reagit trop tard pour les usages temps reel.</p>
  </div>
  <div class="card">
    <div class="big-number">2</div>
    <div class="card-title">Vision figee</div>
    <p>Le tableau de bord ressemble a une photo prise plus tot, pas a la situation actuelle.</p>
  </div>
  <div class="card">
    <div class="big-number">3</div>
    <div class="card-title">Pic de charge</div>
    <p>On concentre le traitement sur quelques gros jobs plutot que de lisser l'effort.</p>
  </div>
</div>

<div class="quote-box mt-8">
  <strong>Image mentale :</strong> le batch est une photo. Le streaming ressemble davantage a une video en direct.
</div>

<div class="grid grid-cols-2 gap-4 mt-6">
  <div class="mini-card">
    <div class="card-title">Le batch reste excellent pour</div>
    <p>l'historique, la comptabilite, les recalculs massifs, les pipelines peu urgents.</p>
  </div>
  <div class="mini-card">
    <div class="card-title">Il devient limitant pour</div>
    <p>la fraude, les recommandations, l'IoT, les alertes, la logistique, le suivi applicatif.</p>
  </div>
</div>

---

# 3. Le streaming, en une phrase

<div class="statement">
Traiter les evenements <strong>au fil de l'eau</strong>, des qu'ils arrivent, pour produire une reponse utile rapidement.
</div>

```mermaid
flowchart LR
  A[Application / capteur / clic] --> B[Flux d'evenements]
  B --> C[Traitement continu]
  C --> D[Dashboard temps reel]
  C --> E[Alerte immediate]
  C --> F[Action automatique]
```

<div class="grid grid-cols-3 gap-4 mt-6">
  <div class="mini-card">
    <div class="card-title">Observer</div>
    <p>Voir ce qui se passe maintenant.</p>
  </div>
  <div class="mini-card">
    <div class="card-title">Decider</div>
    <p>Declencher une regle ou une alerte.</p>
  </div>
  <div class="mini-card">
    <div class="card-title">Agir</div>
    <p>Mettre a jour un systeme en quasi temps reel.</p>
  </div>
</div>

---
layout: two-cols
layoutClass: gap-10
---

# 4. Deux paradigmes de stream processing

<div class="card">
  <div class="card-title">Micro-batch</div>
  <p>On groupe les evenements pendant une tres petite fenetre, par exemple toutes les 1 a 5 secondes, puis on traite le mini-lot.</p>

  <div class="timeline-strip mt-4">
    <span>events</span>
    <span>events</span>
    <span>events</span>
    <span class="accent">lot</span>
    <span>events</span>
    <span>events</span>
    <span class="accent">lot</span>
  </div>

  <div class="tiny mt-4">
    Analogie : un bus part toutes les 5 minutes, meme s'il n'est pas plein.
  </div>
</div>

<div class="card mt-5">
  <div class="card-title">A retenir</div>
  <p>Simple a raisonner, souvent suffisant pour beaucoup de cas metier.</p>
</div>

::right::

<div class="card">
  <div class="card-title">True streaming</div>
  <p>Chaque evenement est traite des sa reception, sans attendre la fin d'un mini-lot.</p>

  <div class="timeline-strip mt-4">
    <span>event</span>
    <span class="teal">action</span>
    <span>event</span>
    <span class="teal">action</span>
    <span>event</span>
    <span class="teal">action</span>
  </div>

  <div class="tiny mt-4">
    Analogie : un peage ouvre la barriere voiture par voiture.
  </div>
</div>

<div class="card mt-5">
  <div class="card-title">A retenir</div>
  <p>Plus fin, plus reactif, mais souvent un peu plus exigeant sur l'architecture et l'operabilite.</p>
</div>

---

# 5. Micro-batch vs true streaming

<table class="deck-table mt-6">
  <thead>
    <tr>
      <th>Question</th>
      <th>Micro-batch</th>
      <th>True streaming</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Quand traite-t-on ?</td>
      <td>Toutes les n secondes</td>
      <td>Evenement par evenement</td>
    </tr>
    <tr>
      <td>Latence typique</td>
      <td>Faible, mais non nulle</td>
      <td>Tres faible</td>
    </tr>
    <tr>
      <td>Complexite</td>
      <td>Souvent plus simple</td>
      <td>Souvent plus fine a regler</td>
    </tr>
    <tr>
      <td>Exemple</td>
      <td>Dashboard actualise toutes les 2 s</td>
      <td>Detection de fraude a la transaction</td>
    </tr>
  </tbody>
</table>

<div class="quote-box mt-8">
  Le bon choix n'est pas ideologique : il depend de la <strong>latence acceptable</strong> pour le metier.
</div>

---

# 6. Event time vs processing time

<div class="grid grid-cols-2 gap-6 mt-6">
  <div class="card">
    <div class="card-title">Event time</div>
    <p>Le moment ou l'evenement <strong>s'est vraiment produit</strong>.</p>
    <p class="tiny mt-3">Exemple : un paiement effectue a 10:01 sur le telephone de l'utilisateur.</p>
  </div>
  <div class="card">
    <div class="card-title">Processing time</div>
    <p>Le moment ou le systeme <strong>voit et traite</strong> cet evenement.</p>
    <p class="tiny mt-3">Exemple : ce meme paiement arrive au systeme a 10:04 apres un probleme reseau.</p>
  </div>
</div>

<div class="card mt-8">
  <div class="card-title">Illustration : le desordre arrive vite</div>
  <div class="grid grid-cols-3 gap-3 mt-4">
    <div class="event-box">
      <strong>A</strong><br>
      se produit a 10:00<br>
      arrive a 10:00
    </div>
    <div class="event-box">
      <strong>B</strong><br>
      se produit a 10:01<br>
      arrive a 10:04
    </div>
    <div class="event-box">
      <strong>C</strong><br>
      se produit a 10:02<br>
      arrive a 10:02
    </div>
  </div>
  <div class="tiny mt-4">
    Si on raisonne seulement avec l'heure de traitement, on risque de raconter une histoire fausse.
  </div>
</div>

---

# 7. Watermarks et donnees en retard

<div class="card">
  <div class="card-title">Idee simple</div>
  <p>Une <strong>watermark</strong> dit : "on pense avoir recu presque tout ce qui s'est passe avant un certain instant".</p>
</div>

<div class="card mt-6">
  <div class="card-title">Image mentale</div>
  <p>On prepare le classement d'une course. On attend encore un peu les derniers coureurs, mais on ne peut pas attendre indefiniment.</p>

  <div class="watermark-row mt-4">
    <span>10:00</span>
    <span>10:01</span>
    <span>10:02</span>
    <span class="wm">watermark</span>
    <span>10:03</span>
    <span class="late">evenement arrive tard</span>
  </div>
</div>

<div class="grid grid-cols-3 gap-4 mt-6">
  <div class="mini-card">
    <div class="card-title">1. Mettre a jour</div>
    <p>On corrige le resultat deja emis.</p>
  </div>
  <div class="mini-card">
    <div class="card-title">2. Isoler</div>
    <p>On envoie les retards dans un flux a part pour analyse.</p>
  </div>
  <div class="mini-card">
    <div class="card-title">3. Ignorer</div>
    <p>On les jette si le metier prefere la simplicite a la precision.</p>
  </div>
</div>

<div class="quote-box mt-6">
  Le vrai sujet n'est pas seulement "combien de retard ?", mais "combien de retard le metier accepte-t-il ?"
</div>

---
layout: two-cols
layoutClass: gap-10
---

# 8. Stateless vs stateful

<div class="card">
  <div class="card-title">Stateless</div>
  <p>Chaque evenement est traite <strong>sans memoire</strong> du passe.</p>

  <ul class="mt-4">
    <li>filtrer les evenements d'erreur</li>
    <li>transformer un format JSON en CSV</li>
    <li>masquer un email ou un numero de carte</li>
  </ul>

  <div class="tiny mt-4">
    Question posee au systeme : "que faire avec cet evenement, tout seul ?"
  </div>
</div>

::right::

<div class="card">
  <div class="card-title">Stateful</div>
  <p>Le systeme garde une <strong>memoire</strong> entre les evenements.</p>

  <ul class="mt-4">
    <li>compter les clics par utilisateur</li>
    <li>faire une moyenne glissante</li>
    <li>detecter des doublons</li>
    <li>reconstituer une session</li>
  </ul>

  <div class="tiny mt-4">
    Question posee au systeme : "que signifie cet evenement par rapport aux precedents ?"
  </div>
</div>

---

# 9. Pourquoi le state change tout

<div class="grid grid-cols-3 gap-4 mt-6">
  <div class="card">
    <div class="card-title">Puissance</div>
    <p>Le state permet de calculer des agregats, de suivre des sessions et de detecter des anomalies.</p>
  </div>
  <div class="card">
    <div class="card-title">Complexite</div>
    <p>Il faut sauvegarder cette memoire, la restaurer en cas de panne et la garder coherente.</p>
  </div>
  <div class="card">
    <div class="card-title">Consequences</div>
    <p>C'est souvent la frontiere entre une demo simple et un vrai systeme de production.</p>
  </div>
</div>

<div class="statement mt-8">
En streaming, le state est la memoire du film. Sans lui, on ne voit que des photos isolees.
</div>

---

# 10. Delivery semantics

<div class="grid grid-cols-3 gap-4 mt-6">
  <div class="card">
    <div class="card-title">At-most-once</div>
    <p><strong>0 ou 1 fois</strong></p>
    <p>On accepte de perdre certains messages, mais on evite les doublons.</p>
    <div class="tiny mt-4">Analogie : une lettre simple peut se perdre, mais elle n'est normalement pas livree deux fois.</div>
  </div>
  <div class="card">
    <div class="card-title">At-least-once</div>
    <p><strong>1 fois ou plus</strong></p>
    <p>On prefere recevoir en double plutot que perdre l'information.</p>
    <div class="tiny mt-4">Analogie : le transporteur repasse si besoin, au risque de sonner deux fois.</div>
  </div>
  <div class="card">
    <div class="card-title">Exactly-once</div>
    <p><strong>1 fois exactement</strong></p>
    <p>Objectif ideal, mais plus difficile : il faut coordonner lecture, calcul et ecriture.</p>
    <div class="tiny mt-4">Analogie : la signature de reception garantit une seule livraison utile.</div>
  </div>
</div>

<div class="quote-box mt-8">
  En pratique, "exactly-once" est souvent une propriete <strong>end-to-end</strong>, pas juste une case cochee sur un outil.
</div>

---

# 11. Comment choisir la bonne garantie ?

<table class="deck-table mt-6">
  <thead>
    <tr>
      <th>Cas d'usage</th>
      <th>Ce qu'on craint le plus</th>
      <th>Semantique souvent choisie</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Logs d'observabilite</td>
      <td>Perdre un peu de detail</td>
      <td>At-least-once</td>
    </tr>
    <tr>
      <td>Alerte de fraude</td>
      <td>Rater un vrai signal</td>
      <td>At-least-once + deduplication</td>
    </tr>
    <tr>
      <td>Facturation</td>
      <td>Compter deux fois</td>
      <td>Exactly-once ou ecritures idempotentes</td>
    </tr>
    <tr>
      <td>Metrique temps reel</td>
      <td>Trop de complexite pour peu de gain</td>
      <td>Micro-batch ou at-least-once</td>
    </tr>
  </tbody>
</table>

<div class="tiny mt-6">
  Regle simple : le bon niveau de garantie est celui qui minimise le risque metier, pas celui qui sonne le mieux sur une slide.
</div>

---

# 12. Synthese visuelle

```mermaid
flowchart LR
  A[Evenement produit] --> B{Quand s'est-il produit ?}
  B -->|Event time| C[Remettre de l'ordre]
  C --> D[Watermarks et retard]
  D --> E{Faut-il memoriser ?}
  E -->|Non| F[Stateless]
  E -->|Oui| G[Stateful]
  F --> H[Publier un resultat]
  G --> H
  H --> I{Quelle garantie ?}
  I --> J[At-most-once]
  I --> K[At-least-once]
  I --> L[Exactly-once]
```

<div class="grid grid-cols-2 gap-4 mt-6">
  <div class="mini-card">
    <div class="card-title">Message cle</div>
    <p>Le streaming ne consiste pas juste a aller plus vite. Il faut aussi raisonner sur le temps, le desordre et la fiabilite.</p>
  </div>
  <div class="mini-card">
    <div class="card-title">Suite logique du cours</div>
    <p>Kafka, Spark Structured Streaming, Flink, fenetres temporelles, checkpoints, state stores.</p>
  </div>
</div>

---

# 13. Ce qu'il faut retenir

<div class="grid grid-cols-2 gap-4 mt-6">
  <div class="card">
    <div class="card-title">Batch</div>
    <p>Traiter plus tard, par paquets.</p>
  </div>
  <div class="card">
    <div class="card-title">Streaming</div>
    <p>Traiter en continu, au fil des evenements.</p>
  </div>
  <div class="card">
    <div class="card-title">Event time</div>
    <p>L'heure du fait metier, pas l'heure d'arrivee au systeme.</p>
  </div>
  <div class="card">
    <div class="card-title">Watermark</div>
    <p>Le compromis pratique pour ne pas attendre indefiniment.</p>
  </div>
  <div class="card">
    <div class="card-title">State</div>
    <p>La memoire qui rend les calculs continus vraiment utiles.</p>
  </div>
  <div class="card">
    <div class="card-title">Semantics</div>
    <p>Le choix entre perte, doublon et coordination forte.</p>
  </div>
</div>

<div class="statement mt-8">
Question finale : dans votre metier, qu'est-ce qui coute le plus cher entre attendre, perdre, dupliquer ou corriger ?
</div>

<style>
:root {
  --deck-ink: #15324b;
  --deck-teal: #0f766e;
  --deck-amber: #d97706;
  --deck-cream: #f8f3e8;
  --deck-paper: rgba(255, 255, 255, 0.82);
  --deck-line: rgba(21, 50, 75, 0.14);
}

.slidev-layout {
  background:
    radial-gradient(circle at top right, rgba(15, 118, 110, 0.16), transparent 26%),
    radial-gradient(circle at bottom left, rgba(217, 119, 6, 0.14), transparent 24%),
    linear-gradient(180deg, #fcf8f1 0%, #f6efe2 100%);
  color: #243443;
}

.hero-splash {
  background:
    radial-gradient(circle at 18% 20%, rgba(217, 119, 6, 0.26), transparent 24%),
    radial-gradient(circle at 82% 16%, rgba(15, 118, 110, 0.24), transparent 22%),
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
  box-shadow: 0 14px 36px rgba(21, 50, 75, 0.08);
}

.hero-card {
  padding: 1.2rem 1.3rem;
}

.hero-kicker,
.card-title {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(21, 50, 75, 0.66);
  margin-bottom: 0.45rem;
  font-weight: 700;
}

.hero-text {
  font-size: 1.15rem;
  line-height: 1.45;
  color: #213547;
}

.card {
  padding: 1.1rem 1.15rem;
}

.mini-card {
  padding: 0.95rem 1rem;
}

.quote-box,
.statement {
  border-radius: 22px;
  padding: 1rem 1.2rem;
}

.quote-box {
  background: rgba(21, 50, 75, 0.92);
  color: #f8fafc;
}

.quote-box strong {
  color: #ffd7a0;
}

.statement {
  background: rgba(15, 118, 110, 0.1);
  border: 1px solid rgba(15, 118, 110, 0.16);
  font-size: 1.35rem;
  line-height: 1.5;
}

.big-number {
  font-size: 2.25rem;
  line-height: 1;
  font-weight: 700;
  color: var(--deck-amber);
  margin-bottom: 0.55rem;
}

.tiny {
  font-size: 0.9rem;
  color: rgba(36, 52, 67, 0.8);
}

.timeline-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.timeline-strip span {
  border-radius: 999px;
  padding: 0.3rem 0.7rem;
  background: rgba(21, 50, 75, 0.08);
  border: 1px solid rgba(21, 50, 75, 0.08);
  font-size: 0.84rem;
}

.timeline-strip .accent {
  background: rgba(217, 119, 6, 0.15);
  border-color: rgba(217, 119, 6, 0.24);
  color: #9a3412;
}

.timeline-strip .teal {
  background: rgba(15, 118, 110, 0.12);
  border-color: rgba(15, 118, 110, 0.2);
  color: #115e59;
}

.event-box {
  border-radius: 16px;
  padding: 0.9rem;
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(21, 50, 75, 0.1);
  min-height: 6.5rem;
}

.watermark-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  align-items: center;
}

.watermark-row span {
  border-radius: 999px;
  padding: 0.32rem 0.78rem;
  background: rgba(21, 50, 75, 0.08);
  border: 1px solid rgba(21, 50, 75, 0.08);
  font-size: 0.84rem;
}

.watermark-row .wm {
  background: rgba(15, 118, 110, 0.14);
  border-color: rgba(15, 118, 110, 0.24);
  color: #115e59;
  font-weight: 700;
}

.watermark-row .late {
  background: rgba(217, 119, 6, 0.14);
  border-color: rgba(217, 119, 6, 0.26);
  color: #9a3412;
}

.deck-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  overflow: hidden;
  border-radius: 18px;
}

.deck-table th {
  background: rgba(21, 50, 75, 0.95);
  color: #f8fafc;
  text-align: left;
  padding: 0.7rem 0.8rem;
  font-size: 0.9rem;
}

.deck-table td {
  background: rgba(255, 255, 255, 0.74);
  padding: 0.72rem 0.8rem;
  border-bottom: 1px solid rgba(21, 50, 75, 0.08);
  font-size: 0.92rem;
}

.deck-table tr:last-child td {
  border-bottom: none;
}
</style>
