/* ============================
   MENU MOBILE
   ============================ */

// cria botao hamburguer dinamicamente
const header = document.querySelector('.site-header');
const nav = document.querySelector('.site-nav');

const hamburger = document.createElement('button');
hamburger.classList.add('hamburger-btn');
hamburger.innerHTML = '☰';
header.querySelector('.container').appendChild(hamburger);

hamburger.addEventListener('click', () => {
  nav.classList.toggle('nav-open');

  // altera icone
  if(nav.classList.contains('nav-open')) {
    hamburger.innerHTML = '✕';
  } else {
    hamburger.innerHTML = '☰';
  }
});

// fechar menu ao clicar em link
document.querySelectorAll('.site-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('nav-open');
    hamburger.innerHTML = '☰';
  });
});


/* ============================
   SCROLL SUAVE + OFFSET DO HEADER
   ============================ */

const headerOffset = 80;
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e){
    const targetID = this.getAttribute('href');

    if(targetID.length > 1){
      e.preventDefault();
      const target = document.querySelector(targetID);
      const y = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  });
});


/* ============================
   BOTÃO VOLTAR AO TOPO
   ============================ */

const backTop = document.createElement('button');
backTop.classList.add('back-to-top');
backTop.textContent = '↑';
document.body.appendChild(backTop);

window.addEventListener('scroll', () => {
  if(window.scrollY > 600){
    backTop.classList.add('show');
  } else {
    backTop.classList.remove('show');
  }
});

backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ============================
   ANIMAÇÕES AO ROLAR (Fade-in)
   ============================ */

const observers = document.querySelectorAll('.fade-in');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
    }
  })
},{
  threshold: 0.2
});

observers.forEach(el => io.observe(el));



// ============================
// CONFIGURAÇÕES
// ============================

// Troque pelos dados reais:
const WHATSAPP_NUMBER = '5588999271849'; // DDI + DDD + número, só dígitos. Ex: 55 11 912345678 -> '5511912345678'
const EMAIL_DESTINO   = 'miltonalmeidaadv@hotmail.com';

const formContato = document.querySelector('#contato-form');

if (formContato) {
  formContato.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome      = formContato.querySelector('#nome')?.value.trim()      || '';
    const email     = formContato.querySelector('#email')?.value.trim()     || '';
    const telefone  = formContato.querySelector('#telefone')?.value.trim()  || '';
    const assunto   = formContato.querySelector('#assunto')?.value.trim()   || 'Contato pelo site';
    const mensagem  = formContato.querySelector('#mensagem')?.value.trim()  || '';

    // validação
    let erro = '';

    if (nome.length < 3) {
      erro = 'Por favor, informe seu nome completo.';
    } else if (!email.includes('@') || !email.includes('.')) {
      erro = 'Por favor, informe um e-mail válido.';
    } else if (mensagem.length < 5) {
      erro = 'Descreva seu caso com um pouco mais de detalhes.';
    }

    if (erro) {
      alert(erro);
      return;
    }

    // mensagem final
    const corpoMensagem =
`Nome: ${nome}
E-mail: ${email}
Telefone: ${telefone || 'não informado'}
Assunto: ${assunto}

Resumo do caso:
${mensagem}

Enviado pelo site Milton Almeida Advocacia.`;

    if (EMAIL_DESTINO) {
      const subject   = `Contato pelo site - ${assunto}`;
      const mailtoUrl = `mailto:${EMAIL_DESTINO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(corpoMensagem)}`;
      window.location.href = mailtoUrl;
    }

    // abrir WhatsApp
    if (WHATSAPP_NUMBER) {
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(corpoMensagem)}`;
      setTimeout(() => {window.open(waUrl, '_blank');}, 800);
    }

    // abrir e-mail
    

    formContato.reset();
  });
}
