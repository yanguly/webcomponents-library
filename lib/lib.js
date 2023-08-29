// Observers Map to keep track of properties to observe
const observers = new WeakMap();

function observe(target, property, shouldRerender = false) {
  if (!observers.has(target)) {
    observers.set(target, {});
  }
  observers.get(target)[property] = shouldRerender;
}

export function State() {
  return function (target, property) {
    observe(target, property, true);

    let value = target[property];

    // Create a getter and setter to observe changes
    Object.defineProperty(target, property, {
      get() {
        return value;
      },
      set(newValue) {
        if (newValue !== value) {
          value = newValue;
          if (observers.get(target)[property]) {
            this.update();
          }
        }
      },
    });
  };
}

export function Input() {
  return function (target, property) {
    observe(target, property);

    let value = target[property];

    // Create a getter and setter to observe changes
    Object.defineProperty(target, property, {
      get() {
        return value;
      },
      set(newValue) {
        if (newValue !== value) {
          value = newValue;
          if (observers.get(target)[property]) {
            this.update();
          }
        }
      },
    });

    // Reflect property to attribute
    const attributeName = property.toLowerCase();
    Object.defineProperty(target, attributeName, {
      get() {
        return this.getAttribute(attributeName);
      },
      set(newValue) {
        this.setAttribute(attributeName, newValue);
      },
    });
  };
}

export function Component(config) {
  console.log('Component');
  return function (constructor) {
    console.log(constructor, config);
    customElements.define(config.selector, constructor);

    constructor.prototype.update = function () {
      // Re-render the component using the render method
      // Super simple, just updating inner HTML
      this.innerHTML = this.render();
    };
  };
}

// Base class for components
export class BaseComponent extends HTMLElement {
  update() {
    if (this.render) {
      this.innerHTML = this.render();
    }
  }
}