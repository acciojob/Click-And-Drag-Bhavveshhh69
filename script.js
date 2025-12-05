const container = document.querySelector(".container");
const cubes = document.querySelectorAll(".cube");

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

// Make cubes appear in grid initially
function placeCubesInGrid() {
  const gap = 20;
  let index = 0;
  cubes.forEach(cube => {
    let col = index % 2;
    let row = Math.floor(index / 2);
    cube.style.left = col * (100 + gap) + "px";
    cube.style.top = row * (100 + gap) + "px";
    index++;
  });
}

placeCubesInGrid();

// Mouse Down → Pick cube
cubes.forEach(cube => {
  cube.addEventListener("mousedown", e => {
    selectedCube = cube;

    selectedCube.style.cursor = "grabbing";

    // Calculate offset so cube follows cursor naturally
    offsetX = e.clientX - selectedCube.offsetLeft;
    offsetY = e.clientY - selectedCube.offsetTop;

    // Bring to front
    selectedCube.style.zIndex = 1000;
  });
});

// Mouse Move → Drag cube
document.addEventListener("mousemove", e => {
  if (!selectedCube) return;

  const containerRect = container.getBoundingClientRect();

  let newX = e.clientX - offsetX;
  let newY = e.clientY - offsetY;

  // Boundaries (prevent cube from leaving container)
  const minX = 0;
  const minY = 0;
  const maxX = containerRect.width - selectedCube.offsetWidth;
  const maxY = containerRect.height - selectedCube.offsetHeight;

  // Clamp values
  newX = Math.max(minX, Math.min(newX, maxX));
  newY = Math.max(minY, Math.min(newY, maxY));

  selectedCube.style.left = newX + "px";
  selectedCube.style.top = newY + "px";
});

// Mouse Up → Drop cube
document.addEventListener("mouseup", () => {
  if (selectedCube) {
    selectedCube.style.cursor = "grab";
    selectedCube.style.zIndex = 1;
  }
  selectedCube = null;
});
