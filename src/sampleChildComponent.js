import { Component, State, BaseComponent } from "../lib/lib.js";
import { html } from "../lib/lib-html.js";

@Component({
  selector: "sample-child-component",
})
export class SampleChildComponent extends BaseComponent {
  @State() childMessage = "Hello from SampleChildComponent";
  @Input() parentData = "";

  render() {
    return html`
      <div>${this.childMessage}</div>
      <div>Received from Parent: ${this.parentData}</div>
    `;
  }
}
