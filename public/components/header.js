export class Header extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(){
        this.render();
        let toggleBtn = this.shadowRoot.querySelector("#toggleBtn");
        let homeBtn = this.shadowRoot.querySelector("#homeBtn");

        toggleBtn.addEventListener("pointerup", this.changeColorTheme.bind(this));
        homeBtn.addEventListener("pointerup", this.goHome.bind(this));
    }

    get colorTheme(){
        return this.getAttribute("colorTheme");
    }

    set colorTheme(value){
        this.setAttribute("colorTheme", value);
    }

    get page(){
        return this.getAttribute("page");
    }

    set page(value){
        this.setAttribute("page", value);
    }

    static get observedAttributes(){
        return ["colorTheme", "page"];
    }

    attributeChangedCallback(name, oldValue, newValue){
        this.render();
    }

    changeColorTheme(e){
        let oldTheme = e.target.textContent;
        let newTheme = (oldTheme === "Light") ? "Dark" : "Light";

        this.setAttribute("colorTheme", newTheme);
        e.target.textContent = newTheme;
    }

    goHome(e){
        // this.setAttribute("page", "Home");
        console.log(e.target);
        let oldTheme = e.target.textContent;
        let newTheme = (oldTheme === "Home") ? "Other" : "Home";

        console.log(newTheme);
        console.log(this.getAttribute("page"));
        // this.setAttribute("page", newTheme);
        e.target.textContent = newTheme;
    }

    render(){
        this.shadowRoot.innerHTML = `
            <div id="help">
                <span id="btn">
                    <span class="btn" id="toggleBtn">${this.colorTheme}</span>
                    <span class="btn" id="homeBtn">Home</span>
                    <span class="btn" id="highlightBtn">Highlight</span>
                </span>
                <style>
                    span{
                        white-space: nowrap;
                        position: relative;
                        top: 3px;
                        left: 5px;
                        font-size: 15px; 
                        color: white;
                        z-index: 100000000;
                    }
                    .btn{
                        text-decoration: underline;
                    }
                    .btn:hover{
                        color: rgb(47, 139, 62);
                        cursor: pointer;
                    }
                </style>
            </div>
            <style>
                #help{
                    position: absolute;
                    height: 35.67px;
                    width: 100vw;
                    background-color: rgb(46, 46, 46);
                    z-index: 0;
                    top: 0%;
                    left: 0%;
                    z-index: 100000000;
                }
            </style>
        `;
    }
}

customElements.define('custom-header', Header);