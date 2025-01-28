// Données simulées (stockées dans localStorage)
let vendeurs = JSON.parse(localStorage.getItem('vendeurs')) || [];
let produits = JSON.parse(localStorage.getItem('produits')) || [];

// Fonctions pour les modales
function showLogin(userType) {
    document.getElementById('loginModal').style.display = 'block';
    document.getElementById('loginForm').setAttribute('data-user-type', userType);
}

function showRegister(userType) {
    document.getElementById('registerModal').style.display = 'block';
    document.getElementById('registerForm').setAttribute('data-user-type', userType);
}

function closeModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('registerModal').style.display = 'none';
}

// Gestion de l'inscription
document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    // Vérifier si l'email existe déjà
    const existe = vendeurs.some(v => v.email === email);
    if (existe) {
        alert('Cet email est déjà utilisé.');
        return;
    }

    // Ajouter le vendeur
    const vendeur = { name, email, password };
    vendeurs.push(vendeur);
    localStorage.setItem('vendeurs', JSON.stringify(vendeurs));

    alert('Inscription réussie !');
    closeModal();
});

// Gestion de la connexion
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Vérifier les informations de connexion
    const vendeur = vendeurs.find(v => v.email === email && v.password === password);
    if (vendeur) {
        alert('Connexion réussie !');
        closeModal();
        showDashboard(vendeur.email);
    } else {
        alert('Email ou mot de passe incorrect.');
    }
});

// Afficher le tableau de bord
function showDashboard(email) {
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('acheteur').style.display = 'none';
    document.getElementById('vendeur').style.display = 'none';

    // Afficher les produits du vendeur
    const produitsVendeur = produits.filter(p => p.vendeurEmail === email);
    produitsVendeur.forEach(produit => displayProduct(produit));
}

// Gestion des produits
document.getElementById('productForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDescription').value;
    const price = document.getElementById('productPrice').value;

    // Ajouter le produit
    const produit = { vendeurEmail: 'vendeur@example.com', name, description, price };
    produits.push(produit);
    localStorage.setItem('produits', JSON.stringify(produits));

    displayProduct(produit);
    document.getElementById('productForm').reset();
});

// Afficher un produit
function displayProduct(produit) {
    const productList = document.getElementById('productList');
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.innerHTML = `
        <h3>${produit.name}</h3>
        <p>${produit.description}</p>
        <p>Prix: ${produit.price} €</p>
    `;
    productList.appendChild(productDiv);
}
