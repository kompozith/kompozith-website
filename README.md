
# Kompozith Website – Version 2.0

Bienvenue dans la version 2.0 du site web **Kompozith**.  
Ce guide est destiné à toute l'équipe, y compris les intégrateurs, pour bien configurer l’environnement de développement, cloner le projet, installer les dépendances, et intégrer le prototype Angular dans les bons fichiers.

---

## 📦 Stack technique

| Outil / Technologie | Version         |
|---------------------|-----------------|
| Node.js             | v18.19.1        |
| Angular             | ^17.x.x         |

---

## 🧰 Prérequis

Avant de commencer, assurez-vous d’avoir :

- Node.js installé (v18.19.1)
- NPM installé (fourni avec Node)
- Angular CLI installé globalement

### 🔧 Installation des outils

#### Node.js & NPM

Téléchargez Node.js v18.19.1 ici :  
👉 https://nodejs.org/en/download

Puis vérifiez :

```bash
node -v   # v18.19.1
npm -v    # 9.x.x
```

#### Angular CLI

```bash
npm install -g @angular/cli
```

Vérifiez :

```bash
ng version
```

---

## 🔁 Cloner et démarrer le projet

### 1. Cloner le dépôt Git

```bash
git clone https://github.com/kompozith/kompozith-website.git
cd kompozith-website
```

### 2. Installer les dépendances

```bash
npm install
```

Cela installera toutes les bibliothèques nécessaires à l'exécution du projet.

### 3. Lancer le projet en développement

```bash
ng serve
```

Puis ouvrez votre navigateur à :  
👉 http://localhost:4200

---

## ✨ Intégration du prototype

L'intégration doit se faire dans le **composant racine de la landing page**, situé ici :

```
src/
├── app/
│   └── modules/
│       └── landing/
│           ├── landing.component.html     ← Ajouter le HTML ici
│           ├── landing.component.scss     ← Ajouter les styles ici
│           ├── landing.component.ts       ← Ajouter la logique Angular ici
│           └── landing.module.ts          ← (Aucun changement requis ici)
├── main.ts                                ← Ajouter du JS natif ici si nécessaire
```

### ✔️ Fichiers à modifier

| Fichier                                    | Description                        |
|--------------------------------------------|------------------------------------|
| `landing.component.html`                   | Contenu HTML de la landing page    |
| `landing.component.scss`                   | Styles CSS (SCSS) de la landing    |
| `landing.component.ts`                     | Code TypeScript Angular            |
| `main.ts`                                  | JS natif global (si besoin)        |

---

## 🧼 Bonnes pratiques

- Travaillez uniquement dans les fichiers du dossier `landing/`.
- Ne touchez pas aux composants globaux comme `app.component.*`.
- Les images, icônes, vidéos ou autres assets doivent être placés dans `src/assets/`.
- Pour tout code JavaScript non Angular, utilisez `main.ts`.

---

## 🛠️ Générer le build de production

Une fois l’intégration terminée et validée :

```bash
ng build --configuration production
```

Les fichiers finaux seront générés dans le dossier `dist/kompozith-website`.

---

Merci et bonne intégration à toute l’équipe 
