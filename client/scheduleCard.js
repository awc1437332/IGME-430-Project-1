import scheduleEvent from "./scheduleEvent.js";

const template = document.createElement("template");
template.innerHTML = `
<style>
  #container{
    border:1px solid black;
    display:inline-block;
    width:200px;
    height:300px;
    overflow:auto;
    padding:.5em;
  }
  h1{
    font-size:1.3em;
  }
</style>
<div id="container">
  <h1>???</h1>
  <p>Hair color: ???, eye color: ???</p>
</div>
`;

class ScheduleCard extends HTMLElement {
  constructor (){
    super();
    this.attachShadow({"mode": "open"});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.event = new scheduleEvent('Pie Shopping', '2023-03-14', '15:14');
    this.callback = (event) => console.log("Event clicked in scheduleCard.js=", event);
  }

  connectedCallback (){
    this.h1 = this.shadowRoot.querySelector("h1");
    this.p = this.shadowRoot.querySelector("p");
    this.render();
  }

  render(){
    this.h1.innerHTML = this.event.name;
    this.p.innerHTML = `<p>Date: ${this.event.date}, Time: ${this.event.time}</p>`;
  }
}

customElements.define("scheduleCard", scheduleCard);
