# E-portfolio de Thomas Felmy

Élève ingénieur en 1re année Sciences du Numérique à l'ENSEEIHT (Toulouse INP).

Site statique (HTML, CSS, JavaScript sans dépendance) prévu pour GitHub Pages.

## Mettre le site en ligne

1. Sur GitHub, crée un dépôt public nommé exactement **`FouSpeed.github.io`**.
2. Mets à la racine du dépôt les fichiers `index.html`, `style.css`, `script.js`, `README.md` et `.nojekyll`
   (bouton *Add file > Upload files*, ou en ligne de commande) :

   ```sh
   git init
   git add .
   git commit -m "Premier jet du portfolio"
   git branch -M main
   git remote add origin https://github.com/FouSpeed/FouSpeed.github.io.git
   git push -u origin main
   ```

3. Dans le dépôt : *Settings > Pages > Build and deployment*, choisis *Deploy from a branch*, branche `main`, dossier `/ (root)`.
4. Après une minute environ, le site est en ligne sur **https://fouspeed.github.io**.

## À compléter avant de rendre

- **Contact** (`index.html`, section `#contact`) : décommente les lignes e-mail, LinkedIn et CV, et remplace les adresses. Pour le CV, ajoute un fichier `cv.pdf` à la racine.
- **Recherche de stage** : vérifie la phrase sur le stage de 1re année (dates, durée) dans la section contact.
- **Projets** : chaque projet liste ce qu'il fait et ses points techniques. Pour un e-portfolio évalué, ajoute une phrase sur ce que tu en retiens (difficulté rencontrée, ce que tu ferais autrement) et le contexte (projet perso, projet de lycée, travail en binôme…). Le contexte du projet `labyrinthe` (lien avec le LaBRI) est à préciser.
- **Formation** : la liste des matières vient du programme publié par l'école ; adapte-la si ton année diffère.
- **Consignes de l'école** : si l'N7 impose des rubriques (tableau de compétences, projet professionnel, réflexion personnelle…), ajoute-les comme nouvelles sections `<section class="block wrap">`.

## Ajouter un projet

Copie un bloc `<li class="project">…</li>` dans la section `#projets` : la date et le langage vont dans `margin-note` (ils s'affichent dans la marge rouge), le reste dans le corps.
