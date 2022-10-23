export class Images extends HTMLElement{
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

    get webIdx(){
        return this.getAttribute("webIdx");
    }

    set webIdx(value){
        this.setAttribute("webIdx", value);
    }

    get caseIdx(){
        return this.getAttribute("caseIdx");
    }

    set caseIdx(value){
        this.setAttribute("caseIdx", value);
    }

    static get observedAttributes(){
        return ["webIdx", "caseIdx"];
    }


    render(){
        this.shadowRoot.innerHTML = `
            <div id="images">
                <div class="viewport">
                    <img src={fullViewportImg} alt="" id="viewport">
                </div>
                <div class="ovlp">
                    <img src={ovlpImg} alt="" id="ovlp">
                </div>
            </div>

            <style>
                div#images{
                    position: absolute;
                    background-color: rgba(0, 0, 0, 0);
                }

                div.viewport{
                    position: absolute;
                    top: 210px;
                    height: max(60vh, 500px);
                    width: max(45vw, 500px);
                    left: calc(46vw - max(45vw, 500px));
                }

                div.ovlp{
                    position: absolute;
                    top: 210px;
                    height: max(60vh, 500px);
                    width: max(45vw, 500px);
                    left: 50vw;
                }

                img#viewport{
                    height: 100%;
                    width: 100%;
                }
                img#ovlp{
                    position: relative;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%) scale(2);
                }
            </style>
        `;
    }
}

customElements.define("custom-images", Images);