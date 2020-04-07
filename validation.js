/* Password validation rules:
    * Letters & numbers & only these symbols !@#$&*
    * Must have at least 1 letter, 1 number and 1 of the above symbols
    * Can't have 3 consecutive numbers in accending order, example 123 or 890
*/
var MyInput = class extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById('my-input');
    const templateContent = template.content;

    this.el = this.attachShadow({mode: 'open'});
    this.el.appendChild(templateContent.cloneNode(true));
    
    for (const property in this.dataset) {
      if(this.dataset[property] === "hide") {
        this.el.getElementById(property).setAttribute('hidden','true');
      }
    }

    this.inputEl = this.el.querySelector('#input');
  }

  connectedCallback() {
    this.el.querySelector('#input').addEventListener('keyup', this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    const isValid = this.validate();
    if (!isValid) {
      if (this.el.querySelector('[name=validation-type]:checked').value === 'number') {
        this.inputEl.setCustomValidity('Only numbers');
      } else if (this.el.querySelector('[name=validation-type]:checked').value === 'letter') {
        this.inputEl.setCustomValidity('Only letters');
      } else {
        this.inputEl.setCustomValidity('letters, numbers and at least 1 of the following symbols (!@#&*) and no consecutive numbers more than 2');
      }
      this.inputEl.reportValidity();
    } else {
      this.inputEl.setCustomValidity('');
      this.inputEl.reportValidity();
    }
  }

  validate() {
    if (this.el.querySelector('[name=validation-type]:checked').value === 'number') {
      if (/[^0-9]/.test(this.inputEl.value)) return false;
    } else if (this.el.querySelector('[name=validation-type]:checked').value === 'letter') {
      if (/[^a-zA-Z]/.test(this.inputEl.value)) return false;
    } else if (this.el.querySelector('[name=validation-type]:checked').value === 'password') {
      if (this.inputEl.value === '') return true;
      else if (/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#&*])[a-zA-Z0-9!@#&*]{3,10}$/.test(this.inputEl.value)) {
        var seqPresent = 0;
        this.inputEl.value.match(/\d+/g).forEach( function(value) {
          if (value.length > 2 && '0123456789'.indexOf(value) > -1) seqPresent++;
        });
        return (seqPresent > 0 ? false : true);
      } else return false;
    }
    return true;
  }
}
customElements.define('my-input', MyInput);