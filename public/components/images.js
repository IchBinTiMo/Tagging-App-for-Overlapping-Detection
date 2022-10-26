export class Images extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback(){
        this.render();
        console.log(this.left, this.right);

        const mutationCallback = async (mutationsList) =>{
            for (const mutation of mutationsList) {                
                // console.log(mutation.target);
                this.shadowRoot.querySelector("#viewport").src = mutation.target.left;
                this.shadowRoot.querySelector("#ovlp").src = mutation.target.right;
            }
            
        };

        const observer = new MutationObserver(mutationCallback);
        observer.observe(this, {attributes: true, attributeOldValue: true});
    }

    attributeChangedCallback(name, oldValue, newValue){
        this.render();
    }

    get left(){
        return this.getAttribute("left");
    }

    set left(value){
        this.setAttribute("left", value);
    }

    get right(){
        return this.getAttribute("right");
    }

    set right(value){
        this.setAttribute("right", value);
    }

    static get observedAttributes(){
        return ["left", "right"];
    }


    render(){
        this.shadowRoot.innerHTML = `
            <div id="images">
                <div class="viewport">
                    <img src="${this.left}" alt="" id="viewport">
                </div>
                <div class="ovlp">
                    <img src="${this.right}" alt="" id="ovlp">
                </div>
            </div>

            <style>
                div#images{
                    position: absolute;
                    background-color: rgba(0, 0, 0, 0);
                }

                div.viewport{
                    position: absolute;
                    top: 230px;
                    height: max(60vh, 500px);
                    width: max(45vw, 500px);
                    left: calc(46vw - max(45vw, 500px));
                }

                div.ovlp{
                    position: absolute;
                    top: 230px;
                    height: max(60vh, 500px);
                    width: max(45vw, 500px);
                    left: 50vw;
                    border: 1px black solid;
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