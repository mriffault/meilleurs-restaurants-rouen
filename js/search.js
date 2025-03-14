/**
 * Module de recherche pour les restaurants
 * Fonction de filtrage des restaurants en fonction des termes de recherche
 */

const SearchModule = {
    // Éléments du DOM
    elements: {
        searchInput: null,
        clearButton: null,
        restaurantCards: null,
        noResultsMessage: null
    },
    
    /**
     * Initialisation du module de recherche
     */
    init: function() {
        // Récupérer les éléments du DOM
        this.elements.searchInput = document.getElementById('search-input');
        this.elements.clearButton = document.getElementById('clear-search');
        this.elements.restaurantCards = document.querySelectorAll('.restaurant-card');
        this.elements.noResultsMessage = document.getElementById('no-results-message');
        
        // Vérifier que tous les éléments nécessaires sont présents
        if (!this.elements.searchInput || !this.elements.clearButton || 
            !this.elements.noResultsMessage) {
            console.error('Éléments de recherche manquants dans le DOM');
            return;
        }
        
        // Initialiser les événements
        this.initEvents();
        
        // Initialiser l'état du bouton d'effacement
        this.elements.clearButton.style.display = 'none';
        
        console.log('Module de recherche initialisé');
    },
    
    /**
     * Initialisation des événements
     */
    initEvents: function() {
        // Événement de saisie dans le champ de recherche
        this.elements.searchInput.addEventListener('input', () => {
            const searchTerm = this.elements.searchInput.value.trim();
            this.filterRestaurants(searchTerm);
            
            // Afficher ou masquer le bouton d'effacement
            if (searchTerm) {
                this.elements.clearButton.style.display = 'block';
            } else {
                this.elements.clearButton.style.display = 'none';
            }
        });
        
        // Événement sur le bouton d'effacement
        this.elements.clearButton.addEventListener('click', () => {
            this.elements.searchInput.value = '';
            this.filterRestaurants('');
            this.elements.clearButton.style.display = 'none';
            this.elements.searchInput.focus();
        });
    },
    
    /**
     * Fonction pour normaliser le texte (suppression des accents et passage en minuscules)
     */
    normalizeText: function(text) {
        if (!text) return '';
        
        return text.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, ""); // Suppression des accents
    },
    
    /**
     * Fonction pour filtrer les restaurants selon le terme de recherche
     */
    filterRestaurants: function(searchTerm) {
        // Après le rendu dynamique, récupérer les cartes à jour
        this.elements.restaurantCards = document.querySelectorAll('.restaurant-card');
        
        if (!searchTerm) {
            // Si la recherche est vide, afficher tous les restaurants
            this.elements.restaurantCards.forEach(card => {
                card.classList.remove('filtered-out');
                card.style.display = '';
            });
            this.elements.noResultsMessage.classList.add('hidden');
            return;
        }
        
        // Normaliser le terme de recherche
        const normalizedSearchTerm = this.normalizeText(searchTerm);
        
        // Compter les résultats pour savoir s'il faut afficher le message "Aucun résultat"
        let resultCount = 0;
        
        // Filtrer les cartes de restaurants
        this.elements.restaurantCards.forEach(card => {
            // Obtenir les termes de recherche de la carte et le contenu textuel
            const searchTerms = card.getAttribute('data-search-terms') || '';
            const cardText = card.textContent;
            
            // Normaliser pour la recherche
            const normalizedSearchTerms = this.normalizeText(searchTerms);
            const normalizedCardText = this.normalizeText(cardText);
            
            // Vérifier si le terme de recherche est dans les termes de recherche ou le contenu de la carte
            const isMatch = normalizedSearchTerms.includes(normalizedSearchTerm) || 
                           normalizedCardText.includes(normalizedSearchTerm);
            
            // Appliquer les styles appropriés
            if (isMatch) {
                card.classList.remove('filtered-out');
                card.style.display = '';
                resultCount++;
            } else {
                card.classList.add('filtered-out');
                // Après l'animation, cacher complètement
                setTimeout(() => {
                    if (card.classList.contains('filtered-out')) {
                        card.style.display = 'none';
                    }
                }, 300);
            }
        });
        
        // Afficher ou masquer le message "Aucun résultat"
        if (resultCount === 0) {
            this.elements.noResultsMessage.classList.remove('hidden');
        } else {
            this.elements.noResultsMessage.classList.add('hidden');
        }
    }
};
