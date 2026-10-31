# E-portfolio de Thomas Felmy

Élève ingénieur en 1re année Sciences du Numérique à l'ENSEEIHT (Toulouse INP).

Site statique (HTML, CSS, JavaScript sans dépendance) prévu pour GitHub Pages.

## Mettre le site en ligne

1. Sur GitHub, crée un dépôt public nommé exactement **`FouSpeed.github.io`**.
2. Mets à la racine du dépôt tous les fichiers : `index.html`, `style.css`, `script.js`, `photo.jpg`, `cv-fr.pdf`, `cv-en.pdf` et `README.md`
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

## Ajouter la vidéo de présentation

1. Mets la vidéo sur YouTube en visibilité **Non répertoriée** (seules les personnes qui ont le lien la voient).
2. Copie son identifiant : dans `https://www.youtube.com/watch?v=AbCdEf123`, c'est `AbCdEf123`.
3. Dans `index.html`, section `#video`, remplace la ligne `<p>La vidéo sera publiée ici prochainement.</p>` par le bloc `<iframe>` donné en commentaire juste en dessous, en mettant ton identifiant à la place de `IDENTIFIANT_DE_LA_VIDEO`.

## Mettre à jour un CV

Remplace `cv-fr.pdf` ou `cv-en.pdf` par ta nouvelle version, en gardant exactement le même nom de fichier : les liens du site continueront de marcher.

## Ajouter un projet

Copie un bloc `<li class="project">…</li>` dans la sous-rubrique `#projets` : la date et le langage vont dans `margin-note` (ils s'affichent dans la marge rouge), le reste dans le corps.
