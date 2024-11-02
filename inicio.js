const mobileMenu = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');

mobileMenu.addEventListener('click', () => {
    navList.classList.toggle('show');
});


let cartCount = 0;
const productList = [
    { name: "Café Original", price: 65, img: "original.png" },
    { name: "Café Mixto", price: 65, img: "cafe6.png" },
    { name: "Café con Sandía", price: 65, img: "cafe5.png" },
    { name: "Café con Naranja", price: 65, img: "cafe6.png" },
    { name: "Café con Piña Hawaiana", price: 65, img: "cafe6.png" },
    { name: "Café con Maracuyá", price: 65, img: "cafe6.png" },
    { name: "Café con Melocoton", price: 65, img: "cafe6.png" },
 
];

let cart = [];
function addToCart(productName) {
    const product = productList.find(p => p.name === productName);
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    cartCount++;
    document.querySelector('.cart-count').textContent = cartCount;
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.img}" alt="${item.name}" class="cart-item-image">
            <span class="cart-item-name">${item.name} (x${item.quantity})</span>
            <span>${itemTotal} C$</span>
            <span class="remove-item" onclick="removeFromCart('${item.name}')">🗑️</span>
        `;
        cartItems.appendChild(cartItem);
    });

    document.getElementById('cart-total').textContent = total;
}

function toggleCart() {
    const cartModal = document.getElementById("cart-modal");
    cartModal.style.display = cartModal.style.display === "block" ? "none" : "block";
}

function removeFromCart(productName) {
    const productIndex = cart.findIndex(item => item.name === productName);

    if (productIndex !== -1) {
        cartCount -= cart[productIndex].quantity;
        cart.splice(productIndex, 1);
    }

    document.querySelector('.cart-count').textContent = cartCount;
    updateCart();
}









let currentIndex = 0; // Índice del producto actual
let productItems; // Para almacenar los elementos del producto

document.addEventListener('DOMContentLoaded', () => {
    productItems = document.querySelectorAll('.product-item'); // Guardar todos los productos

    // Mostrar el primer producto al cargar
    showProduct(currentIndex);

    document.querySelector('.prev-button').addEventListener('click', () => moveCarousel(-1));
    document.querySelector('.next-button').addEventListener('click', () => moveCarousel(1));

    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', searchProducts); // Escuchar cambios en la búsqueda
});

function showProduct(index) {
    productItems.forEach((product, i) => {
        product.classList.toggle('active', i === index);
    });
}

function moveCarousel(direction) {
    // Asegúrate de que currentIndex se actualiza correctamente
    currentIndex += direction;

    // Manejar el índice de forma circular
    if (currentIndex < 0) {
        currentIndex = productItems.length - 1;
    } else if (currentIndex >= productItems.length) {
        currentIndex = 0;
    }

    // Mostrar el producto actual
    showProduct(currentIndex);
}

function searchProducts() {
    const query = document.querySelector('.search-input').value.toLowerCase();
    const productItems = document.querySelectorAll('.product-item');
    
    let visibleCount = 0; // Contador de productos visibles

    productItems.forEach((item, index) => {
        const productName = item.querySelector('h3').textContent.toLowerCase();
        const isVisible = productName.includes(query);

        item.style.display = isVisible ? 'block' : 'none'; // Cambia la visibilidad según la búsqueda

        if (isVisible) {
            visibleCount++;
            // Ajustar el índice actual si es necesario
            if (index === currentIndex && !isVisible) {
                currentIndex = Math.max(0, currentIndex - 1); // Asegura que el índice se mantenga dentro de límites
            }
        }
    });

    // Si no hay productos visibles, reiniciar el índice
    if (visibleCount === 0) {
        currentIndex = 0;
    } else if (currentIndex >= productItems.length) {
        currentIndex = productItems.length - 1; // Asegúrate de no exceder el límite
    }

    // Mostrar el producto actual
    showProduct(currentIndex);

    // Si deseas ocultar los botones si no hay productos visibles
    const navigationButtons = document.querySelectorAll('.prev-button, .next-button');
    navigationButtons.forEach(button => {
        button.style.display = visibleCount > 0 ? 'block' : 'none';
    });
}






















document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0;
    const productItems = document.querySelectorAll('.product-item');

    function showProduct(index) {
        productItems.forEach((product, i) => {
            product.classList.toggle('active', i === index);
        });
        
    }

    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.style.width = '200px';
    }



    function moveCarousel(direction) {
        currentIndex += direction;
        if (currentIndex < 0) {
            currentIndex = productItems.length - 1;
        } else if (currentIndex >= productItems.length) {
            currentIndex = 0;
        }
        showProduct(currentIndex);
    }

    showProduct(currentIndex);

    
    document.querySelector('.prev-button').addEventListener('click', () => moveCarousel(-1));
    document.querySelector('.next-button').addEventListener('click', () => moveCarousel(1));
});




// Función para abrir el formulario de pago
function openPaymentForm() {
    const paymentFormModal = document.getElementById("payment-form-modal");
    paymentFormModal.style.display = "flex";
}

// Función para alternar la visibilidad del formulario de pago
function togglePaymentForm() {
    const paymentFormModal = document.getElementById("payment-form-modal");
    paymentFormModal.style.display = paymentFormModal.style.display === "flex" ? "none" : "flex";
}

// Función para procesar el pago al enviar el formulario
function processPayment(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Recolección de datos del formulario
    const cardName = document.getElementById('card-name').value;
    const cardNumber = document.getElementById('card-number').value;
    const cvv = document.getElementById('cvv').value;
    const email = document.getElementById('email').value;
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;
    const coupon = document.getElementById('coupon').value;
    const paymentMethod = document.getElementById('payment-method').value;

    // Obtenemos el total del carrito (puedes cambiar este valor según tus necesidades)
    const total = document.getElementById('cart-total') ? document.getElementById('cart-total').textContent : "0";

    // Formatear detalles adicionales para la factura
    const invoiceDetails = `
        <strong>Nombre en la tarjeta:</strong> ${cardName}<br>
        <strong>Número de tarjeta:</strong> ${cardNumber.replace(/\d{12}(\d{4})/, "**** **** **** $1")}<br>
        <strong>CVV:</strong> ${cvv}<br>
        <strong>Correo electrónico:</strong> ${email}<br>
        <strong>País:</strong> ${country}<br>
        <strong>Ciudad:</strong> ${city}<br>
        <strong>Método de Pago:</strong> ${paymentMethod}<br>
        ${coupon ? `<strong>Cupón aplicado:</strong> ${coupon}<br>` : ""}
    `;

    showInvoice(total, invoiceDetails); // Muestra la factura

    // Limpiar el carrito y cerrar el formulario de pago
    if (typeof cart !== 'undefined') {
        cart = [];
        cartCount = 0;
        document.querySelector('.cart-count').textContent = cartCount;
        document.getElementById('cart-items').innerHTML = '';
        document.getElementById('cart-total').textContent = '0';
    }
    togglePaymentForm();
    if (typeof toggleCart === 'function') toggleCart(); // Cierra el carrito si existe la función
}

// Función para mostrar el modal de la factura con los detalles del pago
function showInvoice(totalAmount, details) {
    const invoiceModal = document.getElementById("invoice-modal");
    document.getElementById("invoice-amount").textContent = `Monto pagado: ${totalAmount} C$`;
    document.getElementById("invoice-details").innerHTML = details;
    invoiceModal.style.display = "flex"; // Muestra el modal de la factura
}

// Función para cerrar el modal de la factura
function closeInvoiceModal() {
    const invoiceModal = document.getElementById("invoice-modal");
    invoiceModal.style.display = "none";
}







//nosotros

// JavaScript para activar la clase 'visible'
document.addEventListener('DOMContentLoaded', () => {
    const nosotrosContent = document.querySelector('.nosotros-content');
    
    // Observador de intersección para detectar cuando el contenido entra en la vista
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                nosotrosContent.classList.add('visible');
                observer.unobserve(entry.target); // Deja de observar después de hacer visible
            }
        });
    });

    observer.observe(nosotrosContent);
});












function addReview() {
    const reviewText = document.getElementById('review-text').value;
    const reviewAuthor = document.getElementById('review-author').value;

    if (reviewText && reviewAuthor) {
        const reviewContainer = document.createElement('div');
        reviewContainer.classList.add('review');

        reviewContainer.innerHTML = `
            <p class="review-text">"${reviewText}"</p>
            <p class="review-author">– ${reviewAuthor}</p>
            <button class="like-btn" onclick="likeReview(this)">👍 <span>0</span></button>
            <button class="reply-btn" onclick="toggleReplyForm(this)">Responder</button>
            <div class="replies"></div>
        `;

        document.getElementById('reviews').appendChild(reviewContainer);

        document.getElementById('review-text').value = '';
        document.getElementById('review-author').value = '';
    } else {
        alert('Por favor, completa los campos de texto y nombre.');
    }
}

function likeReview(button) {
    let likeCount = button.querySelector('span');
    likeCount.innerText = parseInt(likeCount.innerText) + 1;
}

function toggleReplyForm(button) {
    let replyContainer = button.nextElementSibling;
    if (!replyContainer.querySelector('.reply-form')) {
        const replyForm = document.createElement('div');
        replyForm.classList.add('reply-form');
        replyForm.innerHTML = `
            <textarea class="reply-text" placeholder="Escribe tu respuesta"></textarea>
            <button onclick="addReply(this)">Responder</button>
        `;
        replyContainer.appendChild(replyForm);
    } else {
        replyContainer.querySelector('.reply-form').remove();
    }
}

function addReply(button) {
    const replyText = button.previousElementSibling.value;
    if (replyText) {
        const replyContainer = button.closest('.replies');
        const newReply = document.createElement('div');
        newReply.classList.add('reply');
        newReply.innerText = replyText;

        replyContainer.appendChild(newReply);
        button.closest('.reply-form').remove();
    } else {
        alert('Por favor, escribe una respuesta antes de enviar.');
    }
}


function toggleAnswer(element) {
    const answer = element.nextElementSibling;
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
}









let currentUtterancea = null; // Variable para almacenar la utterance actual

// Función para leer el contenido de cada post del blog
function speakBlogPost(postType) {
    // Detener la utterance anterior si está en curso
    if (currentUtterance) {
        window.speechSynthesis.cancel(); // Cancela la lectura anterior
    }

    let speechText = '';

    switch (postType) {
        case 'benefits':
            speechText = `Beneficios del Café Energizante. El café energizante te proporciona energía sostenida sin el nerviosismo asociado a otros cafés. Es ideal para quienes buscan un impulso durante el día. Además, este tipo de café es rico en antioxidantes, que ayudan a combatir los radicales libres en el cuerpo y a reducir el riesgo de enfermedades crónicas. Su consumo puede mejorar el estado de alerta y la concentración. También se ha asociado con un aumento en el rendimiento físico, lo que lo hace ideal antes de hacer ejercicio. Otro beneficio importante es su capacidad para mejorar el estado de ánimo. La cafeína puede liberar neurotransmisores como la dopamina y la serotonina, que están relacionados con la felicidad. Finalmente, gracias a su bajo contenido de acidez, es más suave para el estómago.`;
            break;
        case 'characteristics':
            speechText = `Características del Café Energizante. Nuestro café se elabora con granos de alta calidad, seleccionados a mano. El proceso de cold brew resalta los sabores suaves, creando una bebida más rica y menos ácida. Además, es versátil, permitiendo disfrutarlo tanto frío como caliente, y se puede personalizar a tus preferencias.`;
            break;
        case 'recipes':
            speechText = `Metodo Cold Brew. Prueba un smoothie energizante combinando nuestro café con plátano y espinacas. Otra receta fácil es el café helado con chocolate. También puedes experimentar con un café con especias, añadiendo canela o vainilla. ¡Las posibilidades son infinitas!`;
            break;
    }

    currentUtterance = new SpeechSynthesisUtterance(speechText);
    window.speechSynthesis.speak(currentUtterance);
}

// Modificación de la función showPost para incluir la lectura
function showPost(postType) {
    let content = '';
    
    switch (postType) {
        case 'benefits':
            content = `<h2>Beneficios del Café Energizante</h2>
                       <p>El café energizante te proporciona energía sostenida sin el nerviosismo asociado a otros cafés. Es ideal para quienes buscan un impulso durante el día.</p>
                       <p>Además, este tipo de café es rico en antioxidantes, que ayudan a combatir los radicales libres en el cuerpo y a reducir el riesgo de enfermedades crónicas.</p>
                       <p>Su consumo puede mejorar el estado de alerta y la concentración, lo que lo convierte en una excelente opción para estudiar o trabajar. También se ha asociado con un aumento en el rendimiento físico, lo que lo hace ideal antes de hacer ejercicio.</p>
                       <p>Otro beneficio importante del café energizante es su capacidad para mejorar el estado de ánimo. La cafeína puede liberar neurotransmisores como la dopamina y la serotonina, que están relacionados con la felicidad y la sensación de bienestar.</p>
                       <p>Finalmente, gracias a su bajo contenido de acidez, es más suave para el estómago que otras bebidas con cafeína, lo que permite disfrutarlo sin molestias digestivas.</p>
                       <img src="bene1.webp" alt="Beneficio 1" style="max-width: 100%; height: auto; margin: 10px 0;">`;
            break;
        case 'characteristics':
            content = `<h2>Características del Café Energizante</h2>
                       <p>Nuestro café se elabora con granos de alta calidad, seleccionados a mano para garantizar el mejor sabor y aroma.</p>
                       <p>El proceso de cold brew resalta los sabores suaves, creando una bebida más rica y menos ácida que los cafés tradicionales, lo que la hace más fácil de digerir.</p>
                       <p>Además, nuestro café energizante es versátil, lo que permite disfrutarlo tanto frío como caliente, y se puede personalizar con leche, edulcorantes o sabores adicionales para adaptarse a tus preferencias.</p>`;
            break;
        case 'recipes':
            content = `<h2>Metodo Cold Brew</h2>
                       <p>Prueba un smoothie energizante combinando nuestro café con plátano y espinacas para un desayuno delicioso y nutritivo. Simplemente mezcla 1 taza de café frío, 1 plátano, 1 taza de espinacas y un poco de yogur.</p>
                       <p>Otra receta fácil es el café helado con chocolate: mezcla 1 taza de café frío con 1 cucharada de cacao en polvo y hielo. Agrega un poco de leche para un toque cremoso y disfruta de un refresco energético.</p>
                       <p>También puedes experimentar con un café con especias, añadiendo canela o vainilla para un sabor diferente. ¡Las posibilidades son infinitas!</p>`;
            break;
    }

    document.getElementById('blog-detail').innerHTML = content;
    document.getElementById('blog-content').style.display = 'block';

    // Llama a la función para leer el contenido del post
    speakBlogPost(postType);
}

function stopReading() {
    if (currentUtterance) {
        window.speechSynthesis.cancel(); // Detiene la síntesis de voz
        currentUtterance = null; // Resetea la utterance actual
    }
}

function hidePost() {
    document.getElementById('blog-content').style.display = 'none';
    // Opcional: Detener la lectura al cerrar el post
    if (currentUtterance) {
        window.speechSynthesis.cancel();
    }
}









document.getElementById('tutorial-button').addEventListener('click', function() {
    var videoContainer = document.getElementById('video-container');
    var videoPlayer = document.getElementById('myVideo');

    videoContainer.style.display = 'flex'; // Muestra el contenedor a pantalla completa
    videoPlayer.play(); // Reproduce el video
});

document.getElementById('close-button').addEventListener('click', function() {
    var videoContainer = document.getElementById('video-container');
    var videoPlayer = document.getElementById('myVideo');

    videoPlayer.pause(); // Pausa el video
    videoPlayer.currentTime = 0; // Reinicia el video al principio
    videoContainer.style.display = 'none'; // Oculta el contenedor a pantalla completa
});














function leerSeccion(idSeccion) {
    const synth = window.speechSynthesis;
    const seccion = document.getElementById(idSeccion);
    
    // Captura el texto del contenido de la sección
    const texto = document.querySelector('.specialties-section').innerText;

    // Crea un objeto para la síntesis de voz
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'es-ES';

    // Cancela cualquier síntesis en curso antes de comenzar una nueva
    synth.cancel(); 
    synth.speak(utterance);
}

function detenerLectura() {
    const synth = window.speechSynthesis;
    synth.cancel(); // Cancela cualquier síntesis en curso
}











// Función para leer el producto actual
function leerProductoActual() {
    const synth = window.speechSynthesis;
    const product = products[currentIndex];
    const title = product.querySelector('h3').innerText; // Título del producto
    const description = product.querySelector('p').innerText; // Descripción del producto
    const price = product.querySelector('.product-price').innerText; // Precio del producto

    const texto = `${title}. ${description}. Precio: ${price}`;
    
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'es-ES';

    synth.cancel(); // Cancela cualquier síntesis en curso
    synth.speak(utterance); // Lee el texto
}






let currentIndexa = 0; // Asegúrate de tener esta variable definida
const products = document.querySelectorAll('.product-item'); // Asegúrate de que esta selección sea correcta

// Función para leer el producto actual
function leerProductoActual() {
    const synth = window.speechSynthesis;
    const product = products[currentIndex];
    const title = product.querySelector('h3').innerText; // Título del producto
    const description = product.querySelector('p').innerText; // Descripción del producto
    const price = product.querySelector('.product-price').innerText; // Precio del producto

    const texto = `${title}. ${description}. Precio: ${price}`;
    
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'es-ES';

    synth.cancel(); // Cancela cualquier síntesis en curso
    synth.speak(utterance); // Lee el texto
}

// Variable para almacenar la utterance actual
let currentUtterance = null; 

function speakProductInfo(index) {
    // Detener la utterance anterior si está en curso
    if (currentUtterance) {
        window.speechSynthesis.cancel(); // Cancela la lectura anterior
    }

    const productItems = document.querySelectorAll('.product-item');
    const product = productItems[index];
    const productName = product.querySelector('h3').textContent;
    const productDescription = product.querySelector('p').textContent;
    const productPrice = product.querySelector('.product-price').textContent;

    const speechText = `Producto: ${productName}. Descripción: ${productDescription}. Precio: ${productPrice}.`;

    currentUtterance = new SpeechSynthesisUtterance(speechText);
    window.speechSynthesis.speak(currentUtterance);
}

// Al mover el carrusel, llama a speakProductInfo con el índice actual
function moveCarousel(direction) {
    currentIndex += direction;

    // Manejar el índice de forma circular
    if (currentIndex < 0) {
        currentIndex = products.length - 1;
    } else if (currentIndex >= products.length) {
        currentIndex = 0;
    }

    // Mostrar el producto actual
    showProduct(currentIndex);

    // Llama a la función para leer el producto actual
    speakProductInfo(currentIndex);
}

// Función para mostrar el producto en el carrusel
function showProduct(index) {
    const productItems = document.querySelectorAll('.product-item');
    
    // Oculta todos los productos
    productItems.forEach((item, i) => {
        item.style.display = i === index ? 'block' : 'none';
    });
}

function stopSpeech() {
    window.speechSynthesis.cancel(); // Detiene cualquier lectura en curso
}




function speakAboutUs() {
    // Detener la utterance anterior si está en curso
    if (currentUtterance) {
        window.speechSynthesis.cancel(); // Cancela la lectura anterior
    }

    const nosotrosText = document.getElementById('nosotros-text');
    const h2 = nosotrosText.querySelector('h2').textContent;
    const paragraphs = Array.from(nosotrosText.querySelectorAll('p')).map(p => p.textContent).join(' ');
 

    const speechText = `${h2}. ${paragraphs} ${h3s}.`;

    currentUtterance = new SpeechSynthesisUtterance(speechText);
    window.speechSynthesis.speak(currentUtterance);
}

// Llama a esta función cuando la sección "Nosotros" sea visible
function showNosotrosSection() {
    const nosotrosSection = document.getElementById('nosotros');
    nosotrosSection.scrollIntoView({ behavior: 'smooth' }); // Desplaza hacia la sección "Nosotros"
    speakAboutUs(); // Llama a la función para leer la sección "Nosotros"
}

function stopSpeecha() {
    window.speechSynthesis.cancel(); // Detiene cualquier lectura en curso
    currentUtterance = null; // Restablece la variable de utterance
}




function speakColdBrewProcess() {
    // Detener la utterance anterior si está en curso
    if (currentUtterance) {
        window.speechSynthesis.cancel(); // Cancela la lectura anterior
    }

    const procesoSection = document.querySelector('.fashion-section');
    const h2 = procesoSection.querySelector('.section-title h2').textContent;
    const items = Array.from(procesoSection.querySelectorAll('.item'));
    
    // Reúne el texto de cada item
    const itemTexts = items.map(item => {
        const title = item.querySelector('.description .section-title h3').textContent;
        const description = item.querySelector('p').textContent;
        return `${title}. ${description}`;
    }).join(' ');

    const speechText = `${h2}. ${itemTexts}`;

    currentUtterance = new SpeechSynthesisUtterance(speechText);
    window.speechSynthesis.speak(currentUtterance);
}

// Llama a esta función cuando la sección "Proceso" sea visible
function showProcesoSection() {
    const procesoSection = document.getElementById('proceso');
    procesoSection.scrollIntoView({ behavior: 'smooth' }); // Desplaza hacia la sección "Proceso"
    speakColdBrewProcess(); // Llama a la función para leer la sección "Proceso"
}

function stopProcesoSpeech() {
    if (procesoUtterance) {
        window.speechSynthesis.cancel(); // Detiene la lectura de la sección "Proceso"
        procesoUtterance = null; // Restablece la variable de utterance específica
    }
}