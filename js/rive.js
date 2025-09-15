const riveCanvas = document.getElementById("riveCanvas");
let r, reset, isReseting, activeATM, activeLocker;
let activeStory = 0; // default 0 shows map overview (no story active)
let activeStep = 1; // default 1 shows first step when a story is active

r = new rive.Rive({
  src: "assets/bpost_map_250915.riv",
  canvas: riveCanvas,
  layout: new rive.Layout({ fit: rive.Fit.Cover }),
  stateMachines: ["State Machine 1"],
  autoplay: true,
  fitCanvasToArtboardWidth: true,
  fitCanvasToArtboardHeight: true,
  onLoad: () => {
    r.resizeDrawingSurfaceToCanvas();
    window.riveInputs = r.stateMachineInputs("State Machine 1");
    isReseting = window.riveInputs.find((i) => i.name === "isReseting");
    story = window.riveInputs.find((i) => i.name === "activeStory");
    step = window.riveInputs.find((i) => i.name === "activeStep");
    activeATM = window.riveInputs.find((i) => i.name === "activeATM");
    activeLocker = window.riveInputs.find((i) => i.name === "activeLocker");
  },
});

// Listens to events from Rive when user clicks on map areas, or resets map
function onRiveEventReceived(riveEvent) {
  const eventData = riveEvent.data;
  const props = eventData.properties || {};

  if (eventData.type === rive.RiveEventType.General) {
    if (eventData.name === "reset") {
      console.log("Reset event triggered from Rive");
      resetValues();
    }
    if (eventData.name === "triggerATM") {
      console.log("ATM event triggered from Rive");
    }
    if (eventData.name === "triggerLocker") {
      console.log("Locker event triggered from Rive");
    }
  }
}

r.on(rive.EventType.RiveEvent, onRiveEventReceived);

window.addEventListener("resize", () => {
  r.resizeDrawingSurfaceToCanvas();
});

// Activate reseting state and reset all values
document.getElementById("resetMapBtn").addEventListener("click", () => {
  isReseting.value = true;
  story.value = 0;
  step.value = 1;
  activeATM.value = false;
  activeLocker.value = false;
});

// Deactivate reseting state after animation is done
resetValues = () => {
  isReseting.value = false;
};

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
