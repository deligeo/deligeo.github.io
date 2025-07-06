// Toggle menu
function toggleMenu() {
  document.getElementById('menu').classList.toggle('show');
}
document.querySelectorAll('.menu li a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('menu').classList.remove('show');
  });
});

// Typed animation
const roles = ["Web Developer", "UI/UX Developer", "DevOps Engineer"];
let currentRoleIndex = 0;
let index = 0;
let typing = true;
const typedText = document.getElementById("typed-text");

function updateText() {
  typedText.innerHTML = "";
  const text = roles[currentRoleIndex];
  for (let i = 0; i < text.length; i++) {
    const span = document.createElement("span");
    span.textContent = text[i] === " " ? "\u00A0" : text[i];
    span.className = 'letter' + (i < index ? ' filled' : '');
    typedText.appendChild(span);
  }
}

function typeLoop() {
  updateText();
  if (typing && index < roles[currentRoleIndex].length) {
    index++;
    setTimeout(typeLoop, 150);
  } else if (!typing && index > 0) {
    index--;
    setTimeout(typeLoop, 50);
  } else {
    typing = !typing;
    if (typing) {
      currentRoleIndex = (currentRoleIndex + 1) % roles.length;
      setTimeout(typeLoop, 600);
    } else {
      setTimeout(typeLoop, 1200);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  typeLoop();

  const paragraphText = `I’m Delna George, a front-end developer with a background in DevOps and a passion for creating clean, responsive web interfaces. I have experience working with HTML, CSS, JavaScript, and PHP, always focusing on building intuitive and seamless user experiences. With a strong foundation in UI/UX design and tools like Adobe Photoshop and XD, I aim to bridge the gap between design and development to deliver well-crafted, functional websites.`;

  const aboutParagraph = document.getElementById('about-paragraph');
  let animated = false;

  const animateParagraph = () => {
    aboutParagraph.innerHTML = '';
    const words = paragraphText.split(' ');
    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.textContent = word;
      span.className = 'about-word';
      span.style.animationDelay = `${i * 0.08}s`;
      aboutParagraph.appendChild(span);
      aboutParagraph.appendChild(document.createTextNode(' '));
    });
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        animateParagraph();
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(document.getElementById('about'));
});





// Tab switching logic for Skills
document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', () => {
    const tab = button.getAttribute('data-tab');

    // Toggle buttons
    document.querySelectorAll('.tab-button').forEach(btn =>
      btn.classList.remove('active')
    );
    button.classList.add('active');

    // Toggle content
    document.querySelectorAll('.skills-tab-content').forEach(content =>
      content.classList.remove('active')
    );
    document.getElementById(tab).classList.add('active');
  });
});
