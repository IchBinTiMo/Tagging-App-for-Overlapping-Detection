export class StartButton extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback(){
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue){
        this.render();
    }

    render(){
        this.shadowRoot.innerHTML = `
            <button id="startBtn">
                Start
            </button>
            <style>
                button{
                    --height: max(3.7vh, 27px);
                    --width: max(3.4vw, 54px);
                    --top: max(calc(22vh + 35.67px), 200.67px);
                    font-family: "Segoe UI", Arial, "Microsoft Jhenghei", sans-serif;
                    font-size: 15px;
                    margin: 0;
                    position: absolute;
                    height: 27px;
                    width: 54px;
                    left: calc(50vw - 27px);
                    top: 210px;
                    overflow: auto;
                    z-index: 100000000;
                }
            
                button:hover{
                    cursor: pointer;
                }
            </style>
        `;
    }
}

customElements.define("custom-startbtn", StartButton);