import {Header} from "../header";
import {Description} from "../description";
import {StartButton} from "../startBtn";
import {Images} from "../images";



class Mainpage extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
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

    connectedCallback(){
        this.render();
        
        const mutationCallback = (mutationsList) =>{
            for (const mutation of mutationsList) {                
                // console.log(this.getAttribute("page"));
                // console.log(this.shadowRoot.querySelector("#myHeader").page);
                this.setAttribute("colorTheme", mutation.target.getAttribute("colorTheme"));
                // this.setAttribute("page", mutation.target.getAttribute("page"));
                // console.log(mutation.target.getAttribute("page"));
                // console.log(mutation.target.getAttribute("colorTheme"));
                this.shadowRoot.querySelector("#myDescription").colorTheme = mutation.target.getAttribute("colorTheme");
                const bgc = (this.colorTheme === "Light") ? "white" : "#1d3040";
                document.body.style.background = bgc;
            }
        };

        const observer = new MutationObserver(mutationCallback);
        observer.observe(this.shadowRoot.querySelector("#myHeader"), {attributes: true, attributeOldValue: true});

        
        let startBtn = this.shadowRoot.querySelector("custom-startbtn#myStartBtn");
        startBtn.addEventListener("pointerup", this.start.bind(this));

        let myImages = this.shadowRoot.querySelector("#myImages");
    }


    attributeChangedCallback(name, oldValue, newValue){
        this.render();        
    }

    
    start(e){
        let myImages = document.createElement("custom-images");
        myImages.id = "myImages";
        this.shadowRoot.appendChild(myImages);
        this.setAttribute("page", "tag");
        this.shadowRoot.querySelector("#myHeader").page = "Home";
    }

    

    render(){
        this.shadowRoot.innerHTML = `
            <custom-header id="myHeader" colorTheme=${this.colorTheme} page="Home"></custom-header>
            <custom-description id="myDescription" colorTheme=${this.colorTheme}></custom-description>
            <custom-startbtn id="myStartBtn"></custom-startbtn>
        `;
    }
}

customElements.define("custom-main", Mainpage);