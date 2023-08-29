// Dynamically import components as needed
export async function loadSampleComponent() {
  const { SampleComponent } = await import('./src/sampleComponent.js');
  console.log(SampleComponent);
  return SampleComponent;
}

loadSampleComponent();

// You can add more dynamic imports for other components as your library grows