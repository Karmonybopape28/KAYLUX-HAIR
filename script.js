// =========================================
// KAYLUX HAIR - JAVASCRIPT INTERACTIVITY
// =========================================

// 1. FAQ ACCORDION FUNCTIONALITY
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            question.classList.toggle('active');
            answer.classList.toggle('active');
        });
    });
});

// 2. SHOP PAGE SEARCH FILTER
function filterProducts() {
    let input = document.getElementById('productSearch');
    let filter = input.value.toUpperCase();
    let products = document.getElementsByClassName('product-card');
    
    for (let i = 0; i < products.length; i++) {
        let h3 = products[i].getElementsByTagName('h3')[0];
        let txtValue = h3.textContent || h3.innerText;
        
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            products[i].style.display = "";
        } else {
            products[i].style.display = "none";
        }
    }
}

// =========================================
// 3. DYNAMIC PRODUCT PAGE LOADER & PRICE CALCULATOR
// =========================================

const wigs = {
    classic: { name: 'KAYLUX CLASSIC', img: 'Images/Wig 1.jpeg', desc: 'Premium Luxury Body Wave made from 100% virgin human hair.', basePrice: 4500, upgrades: { inch24: 500, inch26: 1000, inch28: 2000, inch30: 3000, density200: 500, lace13x4: 800, lace13x6: 1800 }, isBob: false },
    copper: { name: 'KAYLUX COPPER', img: 'Images/Wig 2.jpeg', desc: 'Premium Luxury Body Wave in a stunning copper tone.', basePrice: 2500, upgrades: { inch24: 400, inch26: 900, inch28: 1800, inch30: 2800, density200: 500, lace13x4: 800, lace13x6: 1700 }, isBob: false },
    balyage: { name: 'KAYLUX BALYAGE', img: 'Images/Wig 3.jpeg', desc: 'Premium Luxury Body Wave featuring a beautiful balyage gradient.', basePrice: 4500, upgrades: { inch24: 300, inch26: 700, inch28: 1400, inch30: 2200, density200: 400, lace13x4: 700, lace13x6: 1400 }, isBob: false },
    cherry: { name: 'KAYLUX CHERRY', img: 'Images/Wig 4.jpeg', desc: 'Premium Luxury Body Wave in a bold cherry red.', basePrice: 4800, upgrades: { inch24: 200, inch26: 400, inch28: 800, inch30: 1200, density200: 300, lace13x4: 400, lace13x6: 700 }, isBob: false },
    bob: { name: 'KAYLUX BOB', img: 'Images/Wig 5.jpeg', desc: 'Chic Precision Blunt Bob. A timeless, elegant cut.', basePrice: 2500, upgrades: { density200: 400, lace13x4: 600, lace13x6: 1300 }, isBob: true }
};

let currentWig;

function loadProduct() {
    const params = new URLSearchParams(window.location.search);
    const wigId = params.get('wig');
    
    if (wigId && wigs[wigId]) {
        currentWig = wigs[wigId];
        
        document.getElementById("p-title").innerText = currentWig.name;
        document.getElementById("p-img").src = currentWig.img;
        document.getElementById("p-desc").innerText = currentWig.desc;
        document.title = currentWig.name + " | KAYLUX Hair";
        
        if(currentWig.isBob) {
            document.getElementById("inches-group").style.display = 'none';
        } else {
            document.getElementById("inches-group").style.display = 'block';
        }
        
        // ADVANCED DOM MANIPULATION: Dynamically rewrite dropdown prices and text based on the wig!
        if (!currentWig.isBob) {
            let inchSelect = document.getElementById("inches");
            inchSelect.options[1].value = currentWig.upgrades.inch24;
            inchSelect.options[1].text = "24 Inches (+R" + currentWig.upgrades.inch24 + ")";
            inchSelect.options[2].value = currentWig.upgrades.inch26;
            inchSelect.options[2].text = "26 Inches (+R" + currentWig.upgrades.inch26 + ")";
            inchSelect.options[3].value = currentWig.upgrades.inch28;
            inchSelect.options[3].text = "28 Inches (+R" + currentWig.upgrades.inch28 + ")";
            inchSelect.options[4].value = currentWig.upgrades.inch30;
            inchSelect.options[4].text = "30 Inches (+R" + currentWig.upgrades.inch30 + ")";
            inchSelect.selectedIndex = 0; // Reset to 20 inches
        }

        let densitySelect = document.getElementById("density");
        densitySelect.options[1].value = currentWig.upgrades.density200;
        densitySelect.options[1].text = "200% (Thick) (+R" + currentWig.upgrades.density200 + ")";
        densitySelect.selectedIndex = 0;

        let laceSelect = document.getElementById("lace");
        laceSelect.options[1].value = currentWig.upgrades.lace13x4;
        laceSelect.options[1].text = "13x4 Frontal Lace (+R" + currentWig.upgrades.lace13x4 + ")";
        laceSelect.options[2].value = currentWig.upgrades.lace13x6;
        laceSelect.options[2].text = "13x6 Frontal Lace (+R" + currentWig.upgrades.lace13x6 + ")";
        laceSelect.selectedIndex = 0;
        
        updatePrice();
    } else {
        document.getElementById("p-title").innerText = "Product Not Found";
        document.getElementById("p-desc").innerText = "Please return to the shop and select a wig.";
    }
}

function updatePrice() {
    if (!currentWig) return;
    
    let total = currentWig.basePrice;
    
    let inchesSelect = document.getElementById("inches");
    if (inchesSelect && inchesSelect.style.display !== 'none') {
        total += parseInt(inchesSelect.value) || 0;
    }
    
    let densitySelect = document.getElementById("density");
    if (densitySelect) {
        total += parseInt(densitySelect.value) || 0;
    }
    
    let laceSelect = document.getElementById("lace");
    if (laceSelect) {
        total += parseInt(laceSelect.value) || 0;
    }
    
    document.getElementById("p-price").innerText = 'R' + total.toLocaleString() + '.00';
}

window.onload = loadProduct;
// =========================================
// 4. QUANTITY BUTTONS & ADD TO CART
// =========================================

let currentQty = 1;

function changeQty(amount) {
    currentQty += amount;
    if (currentQty < 1) {
        currentQty = 1;
    }
    document.getElementById('qty').value = currentQty;
}

let cartCount = 0;
function addToCart() {
    cartCount += currentQty;
    let cartLink = document.getElementById('cart-link');
    if (cartLink) {
        cartLink.innerText = "[ Bag (" + cartCount + ") ]";
    }
    
    // Show success message with the total price
    let finalPrice = document.getElementById('p-price').innerText;
    document.getElementById('cart-feedback').style.display = 'block';
    document.getElementById('cart-feedback').innerText = currentQty + " item(s) added to your bag for " + finalPrice + " each!";
}