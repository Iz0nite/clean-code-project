# PROJET CLEAN CODE

**Armand DE FARIA LEITE**

**Théo HERVÉ**

## 

Notre projet se divise en deux parties : une API REST développée en Node.js/Express (située dans le dossier backend) et une interface utilisateur développée en React/Typescript (située dans le dossier frontend).

L'application propose toutes les fonctionnalités présentes dans le sujet.

## BONUS :

1) Le premier bonus est intégré par défaut. Si nous avons bien compris son principe : si une question est de catégorie "THIRD" et que la dernière réponse date du 14/02/2024, elle sera posée 4 jours plus tard, soit le 18/02/2024.

2) Le deuxième bonus est également intégré. Les détails du test end-to-end peuvent être trouvés dans le dossier "e2e" du dossier "frontend".

## Initialisation du projet :

- Clonez le projet à partir du lien suivant :
  [https://github.com/Iz0nite/clean-code-project](https://github.com/Iz0nite/clean-code-project)

### Dans le dossier "backend" :

1. Lancez la commande :
   ```shell
   pnpm install
   ```
2. Lancez la commande :
   ```shell
   pnpm run dev
   ```
3. Copiez l'url du serveur (par défaut : http://localhost:3000)

### Dans le dossier "frontend" :

1. Lancez la commande 
   ```shell
   pnpm install
   ```

2. Lancez la commande 
   ```shell
   npx playwright install
   ```

3. Créez un fichier .env. Un exemple de son contenu peut être trouvé dans le fichier .env.example.
4. Copiez l'URL du serveur dans la variable d'environnement : VITE_API_URL

5. Lancez la commande :
   ```shell
   pnpm run dev
   ```

### Utilisation de l'interface :

. En cliquant sur le bouton "Card List" dans l'en-tête, une page apparaît avec la liste de toutes les fiches créées. En cliquant sur l'une d'elles, vous pouvez voir les détails. Un filtre sur les tags se trouve en haut à droite. En cliquant sur le formulaire en haut à gauche, une modale apparaît pour créer une nouvelle fiche.

. En cliquant sur le bouton "Quizz", une page apparaît avec un sélecteur de date. Sélectionnez la date d'un quizz, sinon la date d'aujourd'hui est prise par défaut. En cliquant sur le bouton "Start quizz !", un quizz est lancé pour les fiches prévues pour la date sélectionnée.

### Lancement des tests :

#### Backend:

. Les tests unitaires se lancent avec la commande :
  ```shell
   pnpm run test
   ```
(le flag --coverage peut être ajouté pour voir la couverture de test)

#### Frontend:

. Les tests unitaires se lancent avec la commande :
  ```shell
   pnpm run test
   ```

. Les tests e2e se lancent avec la commande e :
  ```shell
   npx playwright test
   ```