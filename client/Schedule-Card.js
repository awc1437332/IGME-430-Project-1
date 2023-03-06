const template = document.createElement("template");
template.innerHTML = `
<style>
  #container{
    background-color:yellow;
    border:2px solid black;
    display:inline-block;
    width:300px;
    height:300px;
    margin-right:20px;
    margin-bottom:20px;
    overflow:auto;
    padding:.5em;
  }
  h1{
    font-size:1.3em;
  }
</style>
<div id="container">
  <h1>???</h1>
  <p>Date: ???, Time: ???</p>
</div>
`;

class ScheduleCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ "mode": "open" });

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.event = new ScheduleEvent('Pie Shopping', '2023-03-14', '15:14');
    this.h1 = this.shadowRoot.querySelector("h1");
    this.p = this.shadowRoot.querySelector("p");
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(attributeName, oldVal, newVal) {
    console.log(attributeName, oldVal, newVal);
    this.render();
  }

  render() {
    this.h1.innerHTML = this.event.name;
    this.p.innerHTML = `<p>Date: ${this.event.date}, Time: ${this.event.time}</p>`;
  }
}

customElements.define("schedule-card", ScheduleCard);
