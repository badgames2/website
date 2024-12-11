// Get the canvas element
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define the shape class
class Shape {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speedX = 0;
    this.speedY = 0;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Collision with borders
    if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
      this.speedX *= -1;
    }
    if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
      this.speedY *= -1;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  collide(other) {
    const distanceX = this.x - other.x;
    const distanceY = this.y - other.y;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    if (distance < this.radius + other.radius) {
      this.speedX *= -1;
      this.speedY *= -1;
      other.speedX *= -1;
      other.speedY *= -1;
    }
  }
}

// Create an array of shapes
const shapes = [];
for (let i = 0; i < 20; i++) {
  shapes.push(new Shape(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 20 + 10, `hsl(${Math.random() * 360}, 100%, 50%)`));
}

// Add event listener for mouse movement
let lastMouseX = 0;
let lastMouseY = 0;
canvas.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  // Update shapes
  shapes.forEach((shape) => {
    shape.speedX += (mouseX - lastMouseX) / 10;
    shape.speedY += (mouseY - lastMouseY) / 10;
    shape.update();
  });

  // Check for collisions
  for (let i = 0; i < shapes.length; i++) {
    for (let j = i + 1; j < shapes.length; j++) {
      shapes[i].collide(shapes[j]);
    }
  }

  // Draw shapes
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  shapes.forEach((shape) => {
    shape.draw();
  });

  lastMouseX = mouseX;
  lastMouseY = mouseY;
});

// Initial draw
ctx.clearRect(0, 0, canvas.width, canvas.height);
shapes.forEach((shape) => {
  shape.draw();
});
