export class Description extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(){
        this.render();
    }

    // get color(){
    //     return this.getAttribute("color");
    // }

    // set color(value){
    //     this.setAttribute("color", value);
    // }

    get colorTheme(){
        return this.getAttribute("colorTheme");
    }

    set colorTheme(value){
        this.setAttribute("colorTheme", value);
        let color = (this.colorTheme === "Light") ? "black" : "#bfc2c7";
        this.shadowRoot.getElementById("howTo").style.color = color;
    }

    static get observedAttributes(){
        return ["colorTheme"];
    }


    attributeChangedCallback(name, oldValue, newValue){
        this.render();
    }

    render(){
        this.shadowRoot.innerHTML = `
            <main>
                <div id="block">
                    <div id="howTo">
                        左圖為該網頁的可見範圍，右圖為網頁中有文字重疊的部分。請依照你的感受來決定，右圖的文字重疊是正常現象還是有問題。
                        <br>
                        覺得是正常現象請按
                        "<span class="tag" style="color: #00a000">O</span>"
                        <br>
                        覺得有問題，看起來怪怪的請按
                        "<span class="tag" style="color: red">X</span>"
                    </div>
                    
                </div>
            </main>
            <style>
                *{
                    margin: 0;
                    z-index: 100000000;
                }
            
                main{
                    font-family: "Segoe UI", Arial, "Microsoft Jhenghei", sans-serif;
                    font-size: 18px;
                }
            
                #howTo{
                    position: absolute;
                    width: 500px;
                    height: 150px;
                    left: calc(50vw - 250px);
                    top: 35.67px;
                    text-align: center;
                    overflow: auto;
                    background-color: rgba(0, 0, 0, 0);
                }
            
                .tag{
                    font-weight: 700;
                    font-size: 25px;
                }
            </style>
        `;
    }
}

customElements.define('custom-description', Description);