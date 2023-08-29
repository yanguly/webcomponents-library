import { Component, State, BaseComponent } from "../lib/lib.js";
import { html } from "../lib/lib-html.js";

@Component({
  selector: "sample-component",
})
export class SampleComponent extends BaseComponent {
  @State() message = "Hello from SampleComponent";

  async connectedCallback() {
    super.connectedCallback();
    console.log('connected');

    // Dynamically import the child component when the parent component is connected
    await import("./sampleChildComponent.js");
  }

  render() {
    return html`
      <div>${this.message}</div>
      <sample-child-component
        data-parent="Data from Parent"
      ></sample-child-component>
    `;
  }
}
