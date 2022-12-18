export class Header extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(){
        console.log(this.myProgress);
        this.render();
        let toggleBtn = this.shadowRoot.querySelector("#toggleBtn");
        let homeBtn = this.shadowRoot.querySelector("#homeBtn");

        homeBtn.addEventListener("pointerup", this.goHome.bind(this));
        toggleBtn.addEventListener("pointerup", this.changeColorTheme.bind(this));

        const mutationCallback = async (mutationsList) =>{
            for (const mutation of mutationsList) {                
                this.shadowRoot.querySelector("#progress").textContent = mutation.target.myProgress;
            }
            
        };

        const observer = new MutationObserver(mutationCallback);
        observer.observe(this, {attributes: true, attributeOldValue: true});
    }

    get colorTheme(){
        return this.getAttribute("colorTheme");
    }

    set colorTheme(value){
        this.setAttribute("colorTheme", value);
    }

    get pageInfo(){
        return this.getAttribute("pageInfo");
    }

    set pageInfo(value){
        this.setAttribute("pageInfo", value);
    }

    get myProgress(){
        return this.getAttribute("myProgress");
    }

    set myProgress(value){
        this.setAttribute("myProgress", value);
    }

    get mySpotlight(){
        return this.getAttribute("mySpotlight");
    }

    set mySpotlight(value){
        this.setAttribute("mySpotlight", value);
    }

    static get observedAttributes(){
        return ["colorTheme", "pageInfo", "myProgress", "mySpotlight"];
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

    goHome(){
        this.setAttribute("pageInfo", "Home");
    }

    async highlight(){
        this.setAttribute("mySpotlight", 1);
        await this.sleep(500);
        this.setAttribute("mySpotlight", 0);
    }

    sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms)); 
    }


    render(){
        this.shadowRoot.innerHTML = `
            <div id="help">
                <span id="btn">
                    <span class="btn" id="toggleBtn">${this.colorTheme}</span>
                    <span class="btn" id="homeBtn">${this.pageInfo}</span>
                    
                    <span id="progress">${this.myProgress}</span>
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