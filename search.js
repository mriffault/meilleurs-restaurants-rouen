/**
 * Script pour la fonctionnalité de recherche des restaurants
 */
document.addEventListener('DOMContentLoaded', function() {
    // Éléments du DOM
    const searchInput = document.getElementById('search-input');
    const clearButton = document.getElementById('clear-search');
    const restaurantCards = document.querySelectorAll('.restaurant-card');
    const noResultsMessage = document.getElementById('no-results-message');
    
    /**
     * Fonction pour normaliser le texte (suppression des accents et passage en minuscules)
     */
    function normalizeText(text) {
        return text.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, ""); // Suppression des accents
    }
    
    /**
     * Fonction pour filtrer les restaurants selon le terme de recherche
     */
    function filterRestaurants(searchTerm) {
        if (!searchTerm) {
            // Si la recherche est vide, afficher tous les restaurants
            restaurantCards.forEach(card => {
                card.classList.remove('filtered-out');
                card.style.display = '';
            });
            noResultsMessage.classList.add('hidden');
            return;
        }
        
        // Normaliser le terme de recherche
        const normalizedSearchTerm = normalizeText(searchTerm);
        
        // Compter les résultats pour savoir s'il faut afficher le message "Aucun résultat"
        let resultCount = 0;
        
        // Filtrer les cartes de restaurants
        restaurantCards.forEach(card => {
            // Obtenir les termes de recherche de la carte et le contenu textuel
            const searchTerms = card.getAttribute('data-search-terms') || '';
            const cardText = card.textContent;
            
            // Normaliser pour la recherche
            const normalizedSearchTerms = normalizeText(searchTerms);
            const normalizedCardText = normalizeText(cardText);
            
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
            noResultsMessage.classList.remove('hidden');
        } else {
            noResultsMessage.classList.add('hidden');
        }
    }
    
    // Événement sur saisie dans le champ de recherche
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim();
        filterRestaurants(searchTerm);
        
        // Afficher ou masquer le bouton d'effacement
        if (searchTerm) {
            clearButton.style.display = 'block';
        } else {
            clearButton.style.display = 'none';
        }
    });
    
    // Événement sur le bouton d'effacement
    clearButton.addEventListener('click', function() {
        searchInput.value = '';
        filterRestaurants('');
        this.style.display = 'none';
        searchInput.focus();
    });
    
    // Initialiser l'état du bouton d'effacement
    clearButton.style.display = 'none';
});
