const riveCanvas = document.getElementById("riveCanvas");
let r;
let activeStory = 0; // default 0 shows map overview (no story active)
let activeStep = 1; // default 1 shows first step when a story is active

r = new rive.Rive({
  src: "assets/bpost_map_250912.riv",
  canvas: riveCanvas,
  layout: new rive.Layout({ fit: rive.Fit.Cover }),
  stateMachines: ["State Machine 1"],
  autoplay: true,
  fitCanvasToArtboardWidth: true,
  fitCanvasToArtboardHeight: true,
  onLoad: () => {
    r.resizeDrawingSurfaceToCanvas();
    window.riveInputs = r.stateMachineInputs("State Machine 1");
    story = window.riveInputs.find((i) => i.name === "activeStory");
    step = window.riveInputs.find((i) => i.name === "activeStep");
  },
});

window.addEventListener("resize", () => {
  r.resizeDrawingSurfaceToCanvas();
});

// HTML selects to Rive inputs
document.getElementById("activeStory").addEventListener("change", (e) => {
  if (story) {
    story.value = parseInt(e.target.value, 10);
  }
});

document.getElementById("activeStep").addEventListener("change", (e) => {
  if (step) {
    step.value = parseInt(e.target.value, 10);
  }
});
