
// hamburger menu toggling

function toggleMenu() {
  const menu = document.getElementById('menu');
  const hamburger = document.getElementById('hamburger');

  menu.classList.toggle('show');
  hamburger.classList.toggle('open');
}

document.querySelectorAll('.menu li a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('menu').classList.remove('show');
    document.getElementById('hamburger').classList.remove('open');
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

typeLoop();


// Skills tab switching

document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', () => {
    const tab = button.getAttribute('data-tab');

    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    document.querySelectorAll('.skills-tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById(tab).classList.add('active');
  });
});


// Projects Carousel

document.addEventListener("DOMContentLoaded", () => {
  const projects = ["projectA", "projectB", "projectC", "projectD", "projectE", "projectF"];
  let currentIndex = 0;

  const leftArrows = [document.getElementById("left-arrow"), document.getElementById("left-arrow-mobile")];
  const rightArrows = [document.getElementById("right-arrow"), document.getElementById("right-arrow-mobile")];

  function getVisibleCount() {
    return window.matchMedia("(max-width: 1220px)").matches ? 1 : 2;
  }

  function updateProjects() {
    const visibleCount = getVisibleCount();

    projects.forEach((id, idx) => {
      const el = document.getElementById(id);
      if (!el) return;

      if (idx >= currentIndex && idx < currentIndex + visibleCount) {
        el.style.display = "flex";
        el.style.opacity = 1;
      } else {
        el.style.display = "none";
        el.style.opacity = 0;
      }
    });

    leftArrows.forEach(btn => btn.disabled = currentIndex === 0);
    rightArrows.forEach(btn => btn.disabled = currentIndex >= projects.length - visibleCount);
  }

  function navigate(direction) {
    const visibleCount = getVisibleCount();
    if (direction === "left" && currentIndex - visibleCount >= 0) {
      currentIndex -= visibleCount;
    } else if (direction === "right" && currentIndex + visibleCount < projects.length) {
      currentIndex += visibleCount;
    }
    updateProjects();
  }

  leftArrows.forEach(btn => btn.addEventListener("click", () => navigate("left")));
  rightArrows.forEach(btn => btn.addEventListener("click", () => navigate("right")));

  window.addEventListener("resize", () => {
    const visibleCount = getVisibleCount();
    if (currentIndex > projects.length - visibleCount) {
      currentIndex = Math.max(0, projects.length - visibleCount);
    }
    updateProjects();
  });

  updateProjects();
});


// Project LightBox

let currentGallery = [];
let currentIndex = 0;

function openLightbox(button) {
  const data = button.getAttribute('data-images');
  if (!data) return;

  currentGallery = JSON.parse(data);
  currentIndex = 0;

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  lightboxImg.src = currentGallery[currentIndex];
  lightbox.style.display = "flex";

  updateArrowStates();
}

function showPrevImage() {
  if (currentIndex > 0) {
    currentIndex--;
    document.getElementById("lightbox-img").src = currentGallery[currentIndex];
    updateArrowStates();
  }
}

function showNextImage() {
  if (currentIndex < currentGallery.length - 1) {
    currentIndex++;
    document.getElementById("lightbox-img").src = currentGallery[currentIndex];
    updateArrowStates();
  }
}

function updateArrowStates() {
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === currentGallery.length - 1;

  // Optional: hide arrows entirely if only one image
  if (currentGallery.length <= 1) {
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
  } else {
    prevBtn.style.display = "block";
    nextBtn.style.display = "block";
  }
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}


// Contact Section to send Email

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const subject = encodeURIComponent("New message from " + name);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    window.location.href = `mailto:delnageorge@gmail.com?subject=${subject}&body=${body}`;
  });
});