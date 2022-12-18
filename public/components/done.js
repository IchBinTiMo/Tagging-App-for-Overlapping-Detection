export class Done extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(){
        this.render();
    }

    get colorTheme(){
        return this.getAttribute("colorTheme");
    }

    set colorTheme(value){
        this.setAttribute("colorTheme", value);
        let color = (this.colorTheme === "Light") ? "black" : "#bfc2c7";
        if(this.shadowRoot.getElementById("howTo")){
            this.shadowRoot.getElementById("howTo").style.color = color;
        }
    }

    static get observedAttributes(){
        return ["colorTheme"];
    }


    attributeChangedCallback(name, oldValue, newValue){
        this.render();
    }

    render(){
        this.shadowRoot.innerHTML = `
            <main id="howTo">
                CONGRATULATIONS!!! <br>
                你按完了
            </main>
            <style>
                *{
                    margin: 0;
                    z-index: 100000000;
                }
            
                main{
                    font-family: "Segoe UI", Arial, "Microsoft Jhenghei", sans-serif;
                    font-size: 50px;
                    font-weight: 700;
                }
            
                #howTo{
                    position: absolute;
                    width: 700px;
                    height: 200px;
                    left: calc(50vw - 350px);
                    top: 300px;
                    text-align: center;
                    overflow: auto;
                    background-color: rgba(0, 0, 0, 0);
                }
            </style>
        `;
    }
}

customElements.define('custom-done', Done);