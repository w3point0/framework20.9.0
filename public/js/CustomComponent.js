
  /* eslint-disable no-unused-vars */
class CustomComponent {
  constructor(text) {
    this.text = text;
  }

  render() {
    // eslint-disable-next-line no-undef
    const div = document.createElement('div');
    div.className = 'custom-component';
    div.textContent = this.text;
    return div;
  }
}