import {Header} from "../header";
import {Description} from "../description";
import {StartButton} from "../startBtn";
import {Images} from "../images";
import {Tagbutton} from "../tagBtn";
import {Done} from "../done";



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

    async connectedCallback(){
        let dict = await this.getDict();
        this.render();

        const answerMutation = async (mutationList) => {
            for(const mutation of mutationList){
                if(mutation.target.myAnswer != -1){
                    let dict = await this.getDict();
                    let idx = dict.cases[`${dict.current + 1}`];
                    let ansIdx = `${idx[0]}_${idx[1]}`;

                    let ansRes = await fetch(`/answer/${ansIdx}/${mutation.target.myAnswer}`);
                    dict = await this.getDict();

                    this.shadowRoot.querySelector("#myHeader").myProgress = this.getAttribute("myProgress");

                    idx = dict.cases[`${dict.current + 1}`];
                    console.log(dict.current+1, idx);
                    let left = idx[0];
                    let right = idx[1];


                    let myImages = this.shadowRoot.querySelector("#myImages");
                    myImages.left = `/${left}_${right}/h`;
                    myImages.right = `/${left}_${right}`;

                }
            }
        };
        
        const answerObserver = new MutationObserver(answerMutation);
        const mutationCallback = async (mutationsList) =>{
            for (const mutation of mutationsList) {                
                this.setAttribute("colorTheme", mutation.target.getAttribute("colorTheme"));
                this.setAttribute("pageInfo", mutation.target.pageInfo);
                this.setAttribute("mySpotlight", mutation.target.mySpotlight);
                this.shadowRoot.querySelector("#myDescription").colorTheme = mutation.target.getAttribute("colorTheme");
                if(this.shadowRoot.querySelector("#myDone")){
                    this.shadowRoot.querySelector("#myDone").colorTheme = mutation.target.getAttribute("colorTheme");
                }
            }
            const bgc = (this.colorTheme === "Light") ? "white" : "#1d3040";
            document.body.style.background = bgc;
            let images = this.shadowRoot.querySelector("#myImages");
            let tagBtn = this.shadowRoot.querySelector("#myTagBtn");
            if(this.getAttribute("pageInfo") === "Done"){

            }
            if(this.getAttribute("pageInfo") === "Tag"){
                answerObserver.observe(this.shadowRoot.querySelector("#myTagBtn"), {attributes: true});
                let dict = await this.getDict();
            }
            if(this.pageInfo === "Home" && this.shadowRoot.querySelector("#myStartBtn") === null){
                answerObserver.disconnect();
                let startBtn = document.createElement("custom-startBtn");
                startBtn.id = "myStartBtn";
                startBtn.addEventListener("pointerup", this.start.bind(this));
                this.shadowRoot.appendChild(startBtn);
                if(images){
                    this.shadowRoot.removeChild(images);
                }
                if(tagBtn){
                    this.shadowRoot.removeChild(tagBtn);
                }
            }
            if(images != undefined && this.mySpotlight == 1){
                images.left = `/image${images.right}/h`;
            }
            if(images != undefined && this.mySpotlight == 0){
                images.left = images.right.split("/")[1];
            }
            if(this.getAttribute("pageInfo") !== "Done"){
                this.shadowRoot.querySelector("#myDescription").style.visibility = "visible";
                if(this.shadowRoot.querySelector("#myDone") != null){
                    this.shadowRoot.removeChild(this.shadowRoot.querySelector("#myDone"));
                }
            }

        };

        



        const observer = new MutationObserver(mutationCallback);
        observer.observe(this.shadowRoot.querySelector("#myHeader"), {attributes: true, attributeOldValue: true});


        
        let startBtn = this.shadowRoot.querySelector("custom-startbtn#myStartBtn");
        startBtn.addEventListener("pointerup", this.start.bind(this));

    }


    attributeChangedCallback(name, oldValue, newValue){
        this.render();        
    }


    async getDict(){
        let jsonFile = await fetch("dict");
        let dict = await jsonFile.json();
        

        this.setAttribute("myProgress", `${dict.current + 1}/${dict.total}`);

        if(dict.current >= dict.total){
            this.setAttribute("myProgress", `${dict.current}/${dict.total}`);
        }

        return dict;
    }

    async start(e){
        this.shadowRoot.removeChild(this.shadowRoot.querySelector("#myStartBtn"));
        let dict = await this.getDict();

        console.log(dict);

        if(dict.current === dict.total){
            this.setAttribute("pageInfo", "Done");
            let myDone = document.createElement("custom-done");
            myDone.id = "myDone";
            myDone.colorTheme = this.getAttribute("colorTheme") === null ? "Light" : this.getAttribute("colorTheme");
            this.shadowRoot.appendChild(myDone);
            this.shadowRoot.querySelector("#myDescription").style.visibility = "hidden";
            this.shadowRoot.querySelector("#myHeader").pageInfo = "Done";
        }
        else{
            let idx = dict.cases[`${dict.current + 1}`];
            let left = idx[0];
            let right = idx[1];
            
            let myImages = document.createElement("custom-images");
            
            myImages.id = "myImages";
            myImages.left = `/${left}_${right}/h`;
            myImages.right = `/${left}_${right}`;
            console.log(myImages.left, myImages.right);
    
            this.shadowRoot.appendChild(myImages);
            this.setAttribute("pageInfo", "Tag");
            this.shadowRoot.querySelector("#myHeader").pageInfo = "Tag";
            console.log(this.shadowRoot, e.target);
    
            let tagBtn = document.createElement("custom-tagbtn");
            tagBtn.id = "myTagBtn";
            this.shadowRoot.appendChild(tagBtn);
        }

    }

    render(){
        this.shadowRoot.innerHTML = `
            <custom-header id="myHeader" colorTheme=${this.colorTheme} pageInfo="Home" myProgress=${this.myProgress}></custom-header>
            <custom-description id="myDescription" colorTheme=${this.colorTheme}></custom-description>
            <custom-startbtn id="myStartBtn"></custom-startbtn>
        `;
    }
}

customElements.define("custom-main", Mainpage);