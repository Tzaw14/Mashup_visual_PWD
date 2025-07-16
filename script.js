let dibujoActivo = false;
let processingInstance = null;

function setup() {
  const canvas = createCanvas(400, 400);
  canvas.parent('p5-container');
  background(10);
  noLoop(); // no dibuja hasta que se active
}

function draw() {
  if (dibujoActivo) {
    fill(random(200, 255), random(200, 255), 100);
    noStroke();
    ellipse(mouseX, mouseY, random(10, 60), random(10, 60));
  }
}

// Sketch de Processing.js como función para poder reiniciarlo
function iniciarProcessing() {
  let sketchProc = function (processing) {
    processing.size(400, 400);
    processing.background(30);

    processing.draw = function () {
      if (dibujoActivo) {
        let t = processing.frameCount;
        processing.fill(255, 255, 102, 90);
        processing.stroke(255, 255, 102);
        let x = 200 + 100 * processing.cos(t * 0.05);
        let y = 200 + 100 * processing.sin(t * 0.05);
        processing.ellipse(x, y, 60, 60);
      }
    };
  };

  // Destruir instancia anterior si existe
  if (processingInstance && typeof processingInstance.exit === "function") {
    processingInstance.exit();
  }

  let canvas = document.getElementById("p5-container");
  processingInstance = new Processing(canvas, sketchProc);
}

// Botón de inicio/parada
document.getElementById("start-button").addEventListener("click", function () {
  dibujoActivo = !dibujoActivo;

  if (dibujoActivo) {
    this.textContent = "Detener el Coloreado";
    loop();
    iniciarProcessing();
  } else {
    this.textContent = "Iniciar el Coloreado";
    noLoop();
    if (processingInstance && processingInstance.noLoop) {
      processingInstance.noLoop();
    }
  }
});
