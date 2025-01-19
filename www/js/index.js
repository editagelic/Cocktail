$(document).ready(function(){
  // Dodajte funkciju koja će se izvršiti kada se pritisne dugme
  $("#exploreBtn").click(function(){
    // Ovde možete dodati željene akcije koje će se izvršiti kada se pritisne dugme
    // Opciono, redirektujte na drugu stranicu
    window.location.href = "search-page.html";
  });
});

function searchCoctail() {
  var name = $('#coctailInput').val();
  window.location.href = 'list-page.html?name=' + encodeURIComponent(name);
}

$(document).ready(function(){
  // Prikazi rezultate kada se stranica učita
  showResult();
});

// Funkcija za prikaz rezultata
function showResult() {
  // Uzmi parametar "name" iz URL-a
  var urlParams = new URLSearchParams(window.location.search);
  var name = urlParams.get('name');

  // Ako nema parametra "name", ne prikazuj ništa
  if (!name) {
    return;
  }

  // Pozovi API sa imenom koktela
  $.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/cocktail?name=' + name,
    headers: { 'X-Api-Key': 'd9rLLqtae8uLfBXogYJcJg==GU3hDuwHLeAnN1CK' },
    contentType: 'application/json',
    success: function(result) {
      // Prikaži rezultate na stranici
      displayResults(result);
    },
    error: function ajaxError(jqXHR) {
      console.error('Error: ', jqXHR.responseText);
      // Ako dođe do greške, prikaži poruku o grešci
      displayError('Error fetching cocktail data.');
    }
  });
}

function displayResults(cocktailData) {
  var resultContainer = $('#result-container');

  // Provjeravamo da li objekat cocktailData postoji
  if (!cocktailData || !Array.isArray(cocktailData)) {
    console.error('Invalid cocktail data:', cocktailData);
    return;
  }

  // Prazni kontejner prije nego što dodamo nove rezultate
  resultContainer.empty();

  // Prolazimo kroz sve koktele u podacima
  cocktailData.forEach(function(cocktail) {
    // provjeravamo je li svaki koktel ima potrebne informacije
    if (!cocktail || !cocktail.ingredients || !cocktail.name || !cocktail.instructions) {
      console.error('Invalid cocktail data:', cocktail);
      return;
    }

    // Kreiramo HTML za svaki koktel
    var html = '<div class="card border-success mb-3 mx-auto custom-card">';
    html += '<div class="card-body">';
    html += '<h5 class="title">' + cocktail.name + '</h5>';
    html += '<h6 class="ingredients">Ingredients:</h6>';

    // Prikazujemo sastojke
    cocktail.ingredients.forEach(function(ingredient) {
      html += '<p class="card-ingredients">' + ingredient + '</p>';
    });

    html += '</div>';
    html += '<div class="card-footer mt-2 bg-transparent border-success">';
    html += '<h5 class="ingredients">Instruction</h5>';
    html += '<p class="card-text">' + cocktail.instructions + '</p>';
    html += '</div>';
    html += '</div>';

    // Dodajemo HTML u kontejner
    resultContainer.append(html);
  });
}
