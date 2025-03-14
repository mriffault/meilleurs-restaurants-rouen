/**
 * Application principale pour la gestion des restaurants
 * Chargement des données, génération du HTML, et initialisation des fonctionnalités
 */

// Namespace de l'application pour éviter les conflits globaux
const RestaurantsApp = {
    // Stockage des données
    data: null,
    
    /**
     * Initialisation de l'application
     */
    init: async function() {
        try {
            // Charger les données
            await this.loadData();
            
            // Générer le contenu HTML
            this.renderRestaurants();
            this.renderRecommendations();
            
            // Initialiser la fonctionnalité de recherche
            SearchModule.init();
            
            console.log('Application initialisée avec succès');
        } catch (error) {
            console.error('Erreur lors de l\'initialisation de l\'application:', error);
            this.displayError('Une erreur est survenue lors du chargement des données. Veuillez réessayer plus tard.');
        }
    },
    
    /**
     * Chargement des données depuis le fichier JSON
     */
    loadData: async function() {
        try {
            const response = await fetch('data/restaurants.json');
            
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            
            this.data = await response.json();
            console.log('Données chargées:', this.data);
            return this.data;
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
            throw error;
        }
    },
    
    /**
     * Génération du HTML pour les restaurants
     */
    renderRestaurants: function() {
        if (!this.data || !this.data.restaurants) {
            console.error('Aucune donnée de restaurant disponible');
            return;
        }
        
        const restaurantsContainer = document.getElementById('restaurants-container');
        
        if (!restaurantsContainer) {
            console.error('Conteneur de restaurants non trouvé');
            return;
        }
        
        // Vider le conteneur avant d'ajouter les nouveaux éléments
        restaurantsContainer.innerHTML = '';
        
        // Générer le HTML pour chaque restaurant
        this.data.restaurants.forEach(restaurant => {
            const restaurantCard = this.createRestaurantCard(restaurant);
            restaurantsContainer.appendChild(restaurantCard);
        });
    },
    
    /**
     * Création d'une carte de restaurant
     */
    createRestaurantCard: function(restaurant) {
        const card = document.createElement('div');
        card.className = 'restaurant-card';
        card.setAttribute('data-search-terms', restaurant.searchTerms);
        card.setAttribute('data-id', restaurant.id);
        
        // Création du titre avec éventuelle étoile Michelin
        let titleContent = restaurant.name;
        if (restaurant.michelin) {
            titleContent += ' ⭐';
        }
        
        // Construire le HTML de la carte
        card.innerHTML = `
            <h3>${titleContent}</h3>
            <div class="rating">Note: ${restaurant.rating}/5</div>
            <p>${restaurant.description}</p>
            <ul>
                <li><i class="fas fa-euro-sign"></i> ${restaurant.price}</li>
                <li><i class="fas fa-map-marker-alt"></i> ${restaurant.address}</li>
                <li><i class="fas fa-phone"></i> ${restaurant.phone}</li>
                <li><i class="fas fa-globe"></i> <a href="${restaurant.website}">${restaurant.websiteLabel}</a></li>
            </ul>
            <div class="avis">
                <h4>Avis clients</h4>
                <p>${this.formatReviews(restaurant.reviews)}</p>
            </div>
            <div class="tip">
                <p><strong>${this.getTipLabel(restaurant)}:</strong> ${restaurant.tip}</p>
            </div>
        `;
        
        return card;
    },
    
    /**
     * Formatage des avis clients
     */
    formatReviews: function(reviews) {
        if (!reviews || reviews.length === 0) {
            return 'Aucun avis disponible';
        }
        
        return reviews.map(review => `"${review}"`).join(', ');
    },
    
    /**
     * Détermination du libellé du conseil en fonction du restaurant
     */
    getTipLabel: function(restaurant) {
        if (restaurant.historical) {
            return 'Expérience';
        } else if (restaurant.cuisineType && restaurant.cuisineType.includes('Fusion')) {
            return 'À essayer';
        } else if (restaurant.michelin) {
            return 'Astuce';
        } else if (restaurant.bestRated) {
            return 'Bon à savoir';
        } else {
            return 'Recommandation';
        }
    },
    
    /**
     * Génération du HTML pour les recommandations
     */
    renderRecommendations: function() {
        if (!this.data || !this.data.recommendations) {
            console.error('Aucune donnée de recommandation disponible');
            return;
        }
        
        const recommendationsContainer = document.getElementById('recommendations-list');
        
        if (!recommendationsContainer) {
            console.error('Conteneur de recommandations non trouvé');
            return;
        }
        
        // Vider le conteneur avant d'ajouter les nouveaux éléments
        recommendationsContainer.innerHTML = '';
        
        // Générer le HTML pour chaque recommandation
        this.data.recommendations.forEach(recommendation => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${recommendation.category}:</strong> ${recommendation.restaurant} ${recommendation.description}`;
            recommendationsContainer.appendChild(listItem);
        });
    },
    
    /**
     * Affichage d'un message d'erreur à l'utilisateur
     */
    displayError: function(message) {
        const container = document.querySelector('.intro') || document.body;
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <p><i class="fas fa-exclamation-triangle"></i> ${message}</p>
        `;
        
        container.appendChild(errorDiv);
    }
};

// Exécuter l'initialisation lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', () => RestaurantsApp.init());
