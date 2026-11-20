
const textos = [
    "Interfaces Web Responsivas.",
    "Sistemas em Java.",
    "Soluções com Lógica Limpa.",
    "Projetos de Software."
];

let indiceTexto = 0;
let indiceLetra = 0;
let apagando = false;
const elementoDigitando = document.querySelector(".texto-digitando");

function animarTexto() {
    const palavraAtual = textos[indiceTexto];

    if (!apagando) {
        elementoDigitando.textContent = palavraAtual.substring(0, indiceLetra + 1);
        indiceLetra++;
        if (indiceLetra === palavraAtual.length) {
            apagando = true;
            setTimeout(animarTexto, 1800);
            return;
        }
    } else {
        elementoDigitando.textContent = palavraAtual.substring(0, indiceLetra - 1);
        indiceLetra--;
        if (indiceLetra === 0) {
            apagando = false;
            indiceTexto = (indiceTexto + 1) % textos.length;
        }
    }
    setTimeout(animarTexto, apagando ? 50 : 100);
}
animarTexto();


const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("rolagem");
    } else {
        navbar.classList.remove("rolagem");
    }
});


const secoes = document.querySelectorAll(".secao");

function verificarSecoes() {
    const triggerBottom = window.innerHeight * 0.85;

    secoes.forEach(secao => {
        const secaoTop = secao.getBoundingClientRect().top;
        if (secaoTop < triggerBottom) {
            secao.classList.add("visivel");
        }
    });
}

window.addEventListener("scroll", verificarSecoes);
verificarSecoes(); 


const botoesAba = document.querySelectorAll(".aba-btn");
const conteudosAba = document.querySelectorAll(".aba-conteudo");

botoesAba.forEach(botao => {
    botao.addEventListener("click", () => {
        botoesAba.forEach(b => b.classList.remove("active"));
        conteudosAba.forEach(c => c.classList.remove("active"));

        botao.classList.add("active");
        const alvo = botao.getAttribute("data-aba");
        document.getElementById(alvo).classList.add("active");
    });
});


const botoesFiltro = document.querySelectorAll(".filtro-btn");
const cardsProjeto = document.querySelectorAll(".projeto-card");

botoesFiltro.forEach(botao => {
    botao.addEventListener("click", () => {
        botoesFiltro.forEach(b => b.classList.remove("active"));
        botao.classList.add("active");

        const categoria = botao.getAttribute("data-filtro");

        cardsProjeto.forEach(card => {
            if (categoria === "todos" || card.getAttribute("data-categoria") === categoria) {
                card.classList.remove("escondido");
            } else {
                card.classList.add("escondido");
            }
        });
    });
});


const botoesAbrirModal = document.querySelectorAll(".btn-abrir-modal");
const botoesFecharModal = document.querySelectorAll(".modal-fechar");
const modais = document.querySelectorAll(".modal-fundo");

botoesAbrirModal.forEach(btn => {
    btn.addEventListener("click", () => {
        const idModal = btn.getAttribute("data-modal");
        document.getElementById(idModal).classList.add("aberto");
        document.body.style.overflow = "hidden"; 
    });
});

botoesFecharModal.forEach(btn => {
    btn.addEventListener("click", () => {
        const modal = btn.closest(".modal-fundo");
        modal.classList.remove("aberto");
        document.body.style.overflow = "auto";
    });
});

modais.forEach(modal => {
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("aberto");
            document.body.style.overflow = "auto";
        }
    });
});


document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        modais.forEach(modal => {
            modal.classList.remove("aberto");
        });
        document.body.style.overflow = "auto";
    }
});


const menuBtn = document.getElementById("menu-btn");
const menuNav = document.querySelector(".menu");
const linksMenu = document.querySelectorAll(".menu a");

menuBtn.addEventListener("click", () => {
    menuNav.classList.toggle("aberto");
});

linksMenu.forEach(link => {
    link.addEventListener("click", () => {
        menuNav.classList.remove("aberto");
    });
});
const canvas = document.getElementById("canvas-fundo");
const ctx = canvas.getContext("2d");

function redimensionarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
redimensionarCanvas();
window.addEventListener("resize", redimensionarCanvas);

const mouse = {
    x: null,
    y: null,
    raio: 150 
};

window.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

window.addEventListener("mouseout", () => {
    mouse.x = null;
    mouse.y = null;
});

let particulas = [];
const quantidadeParticulas = Math.floor(window.innerWidth / 30);

class Particula {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.6; 
        this.vy = (Math.random() - 0.5) * 0.6; 
        this.raio = Math.random() * 2.2 + 1.2;     
    }

    atualizar() {
        this.x += this.vx;
        this.y += this.vy;

        
        if (mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distancia = Math.sqrt(dx * dx + dy * dy);

            if (distancia < mouse.raio && distancia > 10) {
                const forca = (1 - distancia / mouse.raio) * 0.04;
                this.vx += dx * forca;
                this.vy += dy * forca;
            }
        }

        
        const velocidadeMax = 3;
        const velocidadeAtual = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (velocidadeAtual > velocidadeMax) {
            this.vx = (this.vx / velocidadeAtual) * velocidadeMax;
            this.vy = (this.vy / velocidadeAtual) * velocidadeMax;
        }

        
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }

    desenhar() {
        ctx.fillStyle = "rgba(232, 108, 154, 0.6)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.raio, 0, Math.PI * 2);
        ctx.fill();
    }
}

function iniciarParticulas() {
    particulas = [];
    for (let i = 0; i < quantidadeParticulas; i++) {
        particulas.push(new Particula());
    }
}
iniciarParticulas();

function animarFundo() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particulas.length; i++) {
        particulas[i].atualizar();
        particulas[i].desenhar();

        
        for (let j = i + 1; j < particulas.length; j++) {
            const dx = particulas[i].x - particulas[j].x;
            const dy = particulas[i].y - particulas[j].y;
            const distancia = Math.sqrt(dx * dx + dy * dy);

            if (distancia < 130) {
                ctx.strokeStyle = `rgba(232, 108, 154, ${0.25 * (1 - distancia / 130)})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particulas[i].x, particulas[i].y);
                ctx.lineTo(particulas[j].x, particulas[j].y);
                ctx.stroke();
            }
        }

        
        if (mouse.x !== null && mouse.y !== null) {
            const dxMouse = particulas[i].x - mouse.x;
            const dyMouse = particulas[i].y - mouse.y;
            const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

            if (distMouse < mouse.raio) {
                ctx.strokeStyle = `rgba(232, 108, 154, ${0.35 * (1 - distMouse / mouse.raio)})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particulas[i].x, particulas[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animarFundo);
}
animarFundo();