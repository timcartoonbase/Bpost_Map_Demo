const riveCanvas = document.getElementById("riveCanvas");
let r,
  reset,
  isReseting,
  isActive,
  activeATM,
  activeLocker,
  activeEntrance,
  activeArea2,
  activeStorage,
  activeArea1,
  activeOpenDesk,
  activeGlassOffice,
  activeBoxing,
  activeSofa,
  activeLeaflet,
  activeScreen;
let activeStory = 0; // default 0 shows map overview (no story active)
let activeStep = 1; // default 1 shows first step when a story is active

r = new rive.Rive({
  src: "assets/bpost_map_250922.riv",
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
    isActive = window.riveInputs.find((i) => i.name === "isActive");
    story = window.riveInputs.find((i) => i.name === "activeStory");
    step = window.riveInputs.find((i) => i.name === "activeStep");
    activeATM = window.riveInputs.find((i) => i.name === "activeATM");
    activeLocker = window.riveInputs.find((i) => i.name === "activeLocker");
    activeEntrance = window.riveInputs.find((i) => i.name === "activeEntrance");
    activeArea2 = window.riveInputs.find((i) => i.name === "activeArea2");
    activeStorage = window.riveInputs.find((i) => i.name === "activeStorage");
    activeArea1 = window.riveInputs.find((i) => i.name === "activeArea1");
    activeOpenDesk = window.riveInputs.find((i) => i.name === "activeOpenDesk");
    activeGlassOffice = window.riveInputs.find(
      (i) => i.name === "activeGlassOffice"
    );
    activeBoxing = window.riveInputs.find((i) => i.name === "activeBoxing");
    activeSofa = window.riveInputs.find((i) => i.name === "activeSofa");
    activeLeaflet = window.riveInputs.find((i) => i.name === "activeLeaflet");
    activeScreen = window.riveInputs.find((i) => i.name === "activeScreen");
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
    if (eventData.name === "triggerEntrance") {
      console.log("Entrance event triggered from Rive");
    }
    if (eventData.name === "triggerArea2") {
      console.log("Area2 event triggered from Rive");
    }
    if (eventData.name === "triggerStorage") {
      console.log("Storage event triggered from Rive");
    }
    if (eventData.name === "triggerArea1") {
      console.log("Area1 event triggered from Rive");
    }
    if (eventData.name === "triggerOpenDesk") {
      console.log("OpenDesk event triggered from Rive");
    }
    if (eventData.name === "triggerGlassOffice") {
      console.log("GlassOffice event triggered from Rive");
    }
    if (eventData.name === "triggerBoxing") {
      console.log("Boxing event triggered from Rive");
    }
    if (eventData.name === "triggerSofa") {
      console.log("Sofa event triggered from Rive");
    }
    if (eventData.name === "triggerLeaflet") {
      console.log("Leaflet event triggered from Rive");
    }
    if (eventData.name === "triggerScreen") {
      console.log("Screen event triggered from Rive");
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
  activeEntrance.value = false;
  activeArea2.value = false;
  activeStorage.value = false;
  activeArea1.value = false;
  activeOpenDesk.value = false;
  activeGlassOffice.value = false;
  activeBoxing.value = false;
  activeSofa.value = false;
  activeLeaflet.value = false;
  activeScreen.value = false;
  isActive.value = false;
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
