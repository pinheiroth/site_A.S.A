window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Função para mostrar o serviço selecionado
function showService(serviceId) {
    // Esconde todos os conteúdos
    document.querySelectorAll('.service-content').forEach(content => {
        content.style.display = 'none';
    });

    // Remove a classe active de todos os botões
    document.querySelectorAll('.service-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Mostra o conteúdo selecionado
    const selectedContent = document.getElementById(serviceId);
    if (selectedContent) {
        selectedContent.style.display = 'block';
    }

    // Adiciona a classe active ao botão clicado
    const selectedButton = document.querySelector(`[onclick="showService('${serviceId}')"]`);
    if (selectedButton) {
        selectedButton.classList.add('active');
    }
}

// Quando a página carregar, mostra o primeiro serviço
document.addEventListener('DOMContentLoaded', function() {
    showService('analise');
});

// Menu Mobile
const menuBtn = document.querySelector('.menu-mobile-btn');
const navMenu = document.querySelector('.nav-menu');

menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Fecha o menu ao clicar em um link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Fecha o menu ao rolar a página
window.addEventListener('scroll', () => {
    navMenu.classList.remove('active');
});

document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Fecha todas as outras respostas
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Alterna a resposta atual
            item.classList.toggle('active');
        });
    });
}); 


const SUPABASE_URL = "https://ybfkqmejybzfqbkagkvi.supabase.co"; // Substitua pela URL real do Supabase
const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliZmtxbWVqeWJ6ZnFia2Fna3ZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MzE1OTcsImV4cCI6MjA1NzIwNzU5N30.qgD3PKCWT_VOEkjRA9U_EDnSlKokQGrdWUFLtqWTvws"; // Substitua pela API Key real



document.getElementById("contactForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    const response = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "apikey": SUPABASE_API_KEY,
            "Authorization": `Bearer ${SUPABASE_API_KEY}`
        },
        body: JSON.stringify({
            nome: name,
            email: email,
            telefone: phone,
            mensagem: message
        })
    });

    if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        document.getElementById("contactForm").reset();
    } else {
        alert("Erro ao enviar cadastro. Tente novamente.");
    }
});