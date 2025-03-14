# Meilleurs Restaurants Gastronomiques de Rouen

Une application web présentant une sélection des meilleurs restaurants gastronomiques de Rouen avec un budget maximal de 60€ par personne.

## Caractéristiques

- Présentation des meilleurs restaurants gastronomiques de Rouen
- Informations détaillées sur chaque restaurant (prix, adresse, avis, etc.)
- Recherche en temps réel parmi les restaurants
- Architecture MVC avec séparation des données et de la présentation
- Interface responsive adaptée à tous les appareils

## Architecture technique

L'application est construite selon une architecture modulaire avec séparation des préoccupations :

### Structure des dossiers

```
├── css/                  # Styles CSS
│   └── styles.css        # Fichier principal des styles
├── data/                 # Données de l'application
│   └── restaurants.json  # Données des restaurants au format JSON
├── js/                   # Scripts JavaScript
│   ├── app.js            # Application principale et chargement des données
│   └── search.js         # Module de recherche
├── index.html            # Page HTML principale
└── README.md             # Documentation du projet
```

### Flux de données

1. Les données des restaurants sont stockées dans un fichier JSON séparé
2. Le fichier `app.js` charge les données au démarrage de l'application
3. Le HTML est généré dynamiquement à partir des données JSON
4. Le module de recherche (`search.js`) permet de filtrer les restaurants en temps réel

## Utilisation

### Installation locale

1. Clonez ce dépôt : `git clone https://github.com/mriffault/meilleurs-restaurants-rouen.git`
2. Ouvrez le fichier `index.html` dans un navigateur web moderne

> **Note :** En raison des restrictions CORS, l'application doit être servie via un serveur web pour fonctionner correctement lors du chargement des données JSON. Vous pouvez utiliser une extension comme Live Server pour VS Code ou un serveur HTTP simple.

### Exécution avec un serveur HTTP simple

Si vous avez Python installé :

```bash
# Python 3.x
python -m http.server

# Puis ouvrez http://localhost:8000 dans votre navigateur
```

## Développement

### Ajout de nouveaux restaurants

Pour ajouter un nouveau restaurant, modifiez simplement le fichier `data/restaurants.json` en suivant le format existant. L'application chargera automatiquement les nouveaux restaurants sans avoir à modifier le code HTML.

Exemple de format pour ajouter un nouveau restaurant :

```json
{
  "id": "nouveau-restaurant",
  "name": "Nom du Restaurant",
  "rating": 4.5,
  "description": "Description du restaurant...",
  "price": "Information sur les prix",
  "address": "Adresse complète",
  "phone": "Numéro de téléphone",
  "website": "https://site-web-du-restaurant.fr/",
  "websiteLabel": "site-web-du-restaurant.fr",
  "reviews": ["Avis client 1", "Avis client 2"],
  "tip": "Conseil ou astuce pour ce restaurant",
  "searchTerms": "termes de recherche pertinents"
}
```

### Modification du design

Les styles sont centralisés dans le fichier `css/styles.css` et utilisent des variables CSS pour faciliter les changements globaux :

```css
:root {
    --primary-color: #8B2635;
    --secondary-color: #D9A566;
    /* Autres variables... */
}
```

Pour modifier le thème de couleur ou l'apparence générale, il suffit de modifier ces variables.

## Fonctionnalités de recherche

La fonctionnalité de recherche permet aux utilisateurs de filtrer rapidement les restaurants en fonction de divers critères :

- Recherche par nom de restaurant
- Recherche par type de cuisine
- Recherche par éléments de description
- Recherche insensible à la casse et aux accents

La recherche s'effectue en temps réel à mesure que l'utilisateur tape dans le champ de recherche.

## Performances et optimisations

- Séparation des données et de la présentation pour améliorer la maintenabilité
- Chargement asynchrone des données
- Génération dynamique du HTML pour réduire la taille du code initial
- Utilisation des attributs data-* pour stocker les informations de recherche
- Animation CSS pour des transitions fluides

## Licence

Ce projet est disponible sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## Contact

Pour toute question ou suggestion, veuillez ouvrir une issue sur ce dépôt GitHub.

---

Dernière mise à jour : Mars 2025
