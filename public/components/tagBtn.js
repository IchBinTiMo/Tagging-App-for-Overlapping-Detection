export class Tagbutton extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(){
        this.render();
        let passBtn = this.shadowRoot.querySelector("#passBtn");
        let failBtn = this.shadowRoot.querySelector("#failBtn");

        passBtn.addEventListener("pointerup", this.answerPass.bind(this));
        failBtn.addEventListener("pointerup", this.answerFail.bind(this));
    }

    get myAnswer(){
        return this.getAttribute("myAnswer");
    }

    set myAnswer(value){
        this.setAttribute("myAnswer", value);
    }

    static get observedAttributes(){
        return ["myAnswer"];
    }

    // get color(){
    //     return this.getAttribute("color");
    // }

    // set color(value){
    //     this.setAttribute("color", value);
    // }

    // get colorTheme(){
    //     return this.getAttribute("colorTheme");
    // }

    // set colorTheme(value){
    //     this.setAttribute("colorTheme", value);
    //     let color = (this.colorTheme === "Light") ? "black" : "#bfc2c7";
    //     this.shadowRoot.getElementById("howTo").style.color = color;
    // }

    // static get observedAttributes(){
    //     return ["colorTheme"];
    // }


    attributeChangedCallback(name, oldValue, newValue){
        this.render();
    }

    async answerPass(e){
        this.shadowRoot.querySelector("#passBtn").disabled = true;
        this.shadowRoot.querySelector("#failBtn").disabled = true;
        // console.log(e.target);
        this.setAttribute("myAnswer", 1);
        // console.log(this.myAnswer);
        await this.sleep(500);
        this.shadowRoot.querySelector("#passBtn").disabled = false;
        this.shadowRoot.querySelector("#failBtn").disabled = false;
        this.setAttribute("myAnswer", -1);
        // console.log(this.myAnswer);
    }

    async answerFail(e){
        this.shadowRoot.querySelector("#passBtn").disabled = true;
        this.shadowRoot.querySelector("#failBtn").disabled = true;
        // console.log(e.target);
        this.setAttribute("myAnswer", 0);
        await this.sleep(500);
        this.shadowRoot.querySelector("#passBtn").disabled = false;
        this.shadowRoot.querySelector("#failBtn").disabled = false;
        this.setAttribute("myAnswer", -1);
        // console.log(this.myAnswer);
    }

    sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms)); 
    }


    render(){
        this.shadowRoot.innerHTML = `
            <div id="tags">
                <button class="tag" style="color: #00a000;" id="passBtn">O</button>
                <button class="tag" style="color: red" id="failBtn">X</button>            
            </div>
            <style>
        
                *{
                    font-family: "Segoe UI", Arial, "Microsoft Jhenghei", sans-serif;
                    font-size: 18px;
                    margin: 0;
                    z-index: 100000000;
                }
            
                button.tag{
                    font-family: "Segoe UI", Arial, "Microsoft Jhenghei", sans-serif;
                    font-size: 21px;
                    font-weight: 700;
                    margin: 0;
                    position: absolute;
                    height: 35px;
                    width: 54px;
                    left: calc(50vw - 27px);
                    top: 185.67px;
                    text-align: center;
                    overflow: auto;
                }
            
                #passBtn{
                    --width: max(3.4vw, 54px);
                    left: calc(50vw - var(--width) * 1.5);
                }
            
                #failBtn{
                    --width: max(3.4vw, 54px);
                    left: calc(50vw + var(--width) * 0.5);
                }
            
                button:hover{
                    cursor: pointer;
                }
            </style>
        `;
    }
}

customElements.define('custom-tagbtn', Tagbutton);