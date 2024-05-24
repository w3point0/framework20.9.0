/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const customComponent = new CustomComponent('Node Framework 20.9.0');
    app.appendChild(customComponent.render());
  });
  