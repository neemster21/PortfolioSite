document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("particleCanvas");
  
    if (!canvas) {
      console.error("Canvas element with ID 'particleCanvas' not found.");
      return;
    }
  
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
  
    camera.position.z = 50;
  
    const particles = [];
    const particleCount = 500;
    const radius = 60;
  
    const particleGeometry = new THREE.SphereGeometry(0.2, 8, 8);
    
    for (let i = 0; i < particleCount; i++) {
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: Math.random() * 0.5 + 0.5 // Vary initial opacity for a twinkle effect
      });
      
      const particle = new THREE.Mesh(particleGeometry, material);
      
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      particle.position.x = radius * Math.sin(phi) * Math.cos(theta);
      particle.position.y = radius * Math.sin(phi) * Math.sin(theta);
      particle.position.z = radius * Math.cos(phi);
  
      particles.push(particle);
      scene.add(particle);
    }
  
    let mouseX = 0;
    let mouseY = 0;
  
    window.addEventListener("mousemove", (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
  
    function animate() {
      requestAnimationFrame(animate);
  
      // Camera movement for parallax effect
      camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
  
      // Twinkling effect for particles
      particles.forEach(particle => {
        particle.material.opacity = Math.abs(Math.sin(Date.now() * 0.001 + particle.position.x)); // Twinkle effect
      });
  
      renderer.render(scene, camera);
    }
  
    animate();
  
    window.addEventListener("resize", () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });
  });
  