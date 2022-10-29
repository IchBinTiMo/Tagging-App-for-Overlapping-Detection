export class Description extends HTMLElement{
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
                        左圖為文字重疊部分在網頁中的位置，右圖為網頁中有文字重疊的部分。
                        <br>
                        請依照你的感受來決定，右圖的文字重疊是正常現象還是有問題。
                        <br>
                        看起來根本沒有文字重疊請按
                        "<span class="tag" style="color: #00a000">O</span>"
                        <br>
                        看起來有文字重疊，但看了覺得沒問題的請按
                        "<span class="tag" style="color: #000fff;">▲</span>"
                        <br>
                        看起來有文字重疊，而且看了覺得有問題的請按
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
                    width: 750px;
                    height: 150px;
                    left: calc(50vw - 375px);
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