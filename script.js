document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".navbar a");
  
  navLinks.forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Hover effect for bulletin-style sections
  const sectionCards = document.querySelectorAll(".section-card");
  
  sectionCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px)";
      card.style.boxShadow = "0px 10px 20px rgba(255, 215, 0, 0.5)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "0px 5px 15px rgba(0, 0, 0, 0.2)";
    });
  });

  // Responsive navbar toggle (for mobile screens)
  const menuIcon = document.getElementById("menu-icon");
  const navbar = document.querySelector(".navbar");

  if (menuIcon) {
    menuIcon.addEventListener("click", () => {
      navbar.classList.toggle("active");
    });
  }

  // Resize and adapt background canvas on window resize
  window.addEventListener("resize", () => {
    const canvas = document.getElementById("particleCanvas");
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  // Intersection Observer for fading and sliding in elements
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  });

  // Target elements with fade-in and slide-in animations
  document.querySelectorAll(".fade-in, .slide-in").forEach(element => {
    observer.observe(element);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll(".fade-element");

  const observerOptions = {
    threshold: 0.1 // Trigger when 10% of the element is in view
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  }, observerOptions);

  fadeElements.forEach(element => {
    observer.observe(element);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  // Set up scene, camera, and renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 600, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("planetCanvas"), alpha: true });
  renderer.setSize(window.innerWidth, 600);

  // Adjust camera position
  camera.position.z = 3;

  // Create sphere geometry for the planet
  const geometry = new THREE.SphereGeometry(1, 32, 32);

  // Load planet texture
  const textureLoader = new THREE.TextureLoader();
  const planetTexture = textureLoader.load('path/to/planet_texture.jpg'); // Replace with a texture image URL

  // Create material with texture
  const material = new THREE.MeshStandardMaterial({
    map: planetTexture,
  });

  // Create the mesh with geometry and material
  const planet = new THREE.Mesh(geometry, material);
  scene.add(planet);

  // Add lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  // Handle rotation with mouse interaction
  let isDragging = false;
  let previousMousePosition = {
    x: 0,
    y: 0
  };

  renderer.domElement.addEventListener('mousedown', (event) => {
    isDragging = true;
  });

  renderer.domElement.addEventListener('mouseup', (event) => {
    isDragging = false;
  });

  renderer.domElement.addEventListener('mousemove', (event) => {
    if (isDragging) {
      const deltaMove = {
        x: event.movementX,
        y: event.movementY
      };

      planet.rotation.y += deltaMove.x * 0.005;
      planet.rotation.x += deltaMove.y * 0.005;
    }
  });

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();

  // Handle window resizing
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, 600);
    camera.aspect = window.innerWidth / 600;
    camera.updateProjectionMatrix();
  });
});
