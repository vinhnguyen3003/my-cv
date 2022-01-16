
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const experienceContentEl = $(".experience-content");
const skillContentEl = $(".skill-content");
const btnOpenMenu = $(".page-right__open-btn");
const btnCloseMenu = $(".page-left__close");
const toggleMenu = $(".page-left");
const menuItems = $$(".menu-item");
const elToShow = $$(".play-on-scroll");
const box = document.documentElement;
const targetElms = $$(".section-wrapper");


let  scroll = window.requestAnimationFrame || function(callback) {window.setTimeout(callback, 1000/60)};

const app = {
	experiencesData: [],

	fetchExperienceFromJson: function(){
		fetch('../json-data/experience.json')
		.then(response => response.json())
		.then(result => {
            const experiences = result.map((exp, index) => {
                return `
                    <div class="experience-content__group">
                        <div class="group-inner">
                            <div class="group-inner__left ${exp.color}">
                                <i class="fas fa-pencil-alt"></i>
                            </div>
                            <div class="group-inner__right play-on-scroll left-to-right">
                                <div class="right-title">
                                    <h3>${exp.name}</h3>
                                    <span>${exp.time}</span>
                                </div>
                                <div class="right-content">
                                    <ul class="right-content__list">
                                        <li class="right-content-item">
                                            <strong>Project Description</strong>: ${exp.description}
                                        </li>
                                        <li class="right-content-item">
                                            <strong>Team</strong>
                                            : ${exp.team}
                                        </li>
                                        <li class="right-content-item">
                                            <strong>Language and Technology</strong>: ${exp.language_technology}
                                        </li>
                                        <li class="right-content-item">
                                            <strong>Link Demo</strong>: <a href="${exp.link}" target="_blank">${exp.link}
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
    
                `
            })
            experienceContentEl.innerHTML = experiences.join("");
        })
	},
    fetchSkillFromJson: function(){
        fetch('../json-data/skill.json')
        .then(response => response.json())
        .then(result => {
            const skills = result.map((skill, index) => {
                return `
                <div class="skill-content__group ${skill.color} bottom-up play-on-scroll">
                    <div class="group-wrapper">
                        <span class="group-icon">
                            <i class="${skill.icon}"></i>
                        </span>
                        <div class="group-desc">
                            <h3>${skill.title}</h3>
                            <ul class="group-desc__list">
                                ${
                                    skill.content.map((co, index) => {
                                        return `<li class="group-desc-item">
                                                ${co}
                                            </li>`
                                    }).join("")
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                `
            })
            skillContentEl.innerHTML = skills.join("");
        })
    },
	render: function() {
        this.fetchExperienceFromJson();
        this.fetchSkillFromJson();
        this.handleEvents();
	},
    handleEvents: function() {//console.log(2)
        //Open menu
        btnOpenMenu.addEventListener("click", function(){
            toggleMenu.classList.add("--show");
            btnOpenMenu.classList.add("--hidden");
        })
        //Close menu
        btnCloseMenu.addEventListener("click", function(){
            toggleMenu.classList.remove("--show");
            btnOpenMenu.classList.remove("--hidden");
        })
        //Scroll Animation
        this.loop();

        //Click on menu to scroll
        window.onscroll = () =>{
            for( let i = 0; i < targetElms.length; i++){
                if(box.scrollTop > this.getRelativePos(targetElms[i]).top - 5 && box.scrollTop < this.getRelativePos(targetElms[i+1]).top - 5){
                    let activeItem = document.querySelector('.menu-item.--active');
                    activeItem.classList.remove("--active");
                    menuItems[i].classList.add("--active");
                }
            }
        }
        Array.from(menuItems).forEach((menuItem, index)=>{
            menuItem.onclick = () => {
                toggleMenu.classList.remove("--show");
                btnOpenMenu.classList.remove("--hidden");
                //handle last menuItem when click 
                let activeItem = document.querySelector('.menu-item.--active');
                activeItem.classList.remove("--active");
                menuItem.classList.add("--active");
                this.scrollToElm(box, targetElms[index], 600);
            }
        })
    },
    isElInViewPort: function(el){
        let rect = el.getBoundingClientRect();
        return (
            (rect.top <= 0 && rect.bottom >= 0)
            ||
            (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) && rect.top <= (window.innerHeight || document.documentElement.clientHeight))
            ||
            (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
        )
    },
    loop: function(){
        const _this = app;
        $$(".play-on-scroll").forEach((item, index) => {//console.log(item)
            if (_this.isElInViewPort(item)) {//console.log('vv')
                item.classList.add('start')
            } else {
                item.classList.remove('start')
            }
        })
        scroll(_this.loop)
    },
	start: function() {
		this.render();
	},
    scrollToElm: function(container, elm, duration) {
        var pos = this.getRelativePos(elm);
        this.scrollTo(container, pos.top, 1.5);  // duration in seconds
    },
    getRelativePos: function(elm) {
        var pPos = elm.parentNode.getBoundingClientRect(), // parent pos
            cPos = elm.getBoundingClientRect(), // target pos
            pos = {};
    
            pos.top = cPos.top - pPos.top + elm.parentNode.scrollTop,
            pos.right = cPos.right - pPos.right,
            pos.bottom = cPos.bottom - pPos.bottom,
            pos.left = cPos.left - pPos.left;
        return pos;
    },
    
    scrollTo: function(element, to, duration, onDone) {
        var start = element.scrollTop,
            change = to - start,
            startTime = performance.now(),
            val, now, elapsed, t;
        function animateScroll() {
            now = performance.now();
            elapsed = (now - startTime) / 1000;
            t = (elapsed / duration);
    
            const _this = app;
            element.scrollTop = start + change * _this.easeInOutQuad(t);
    
            if (t < 1)
                window.requestAnimationFrame(animateScroll);
            else
                onDone && onDone();
        };
    
        animateScroll();
    },
    
    easeInOutQuad: function(t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t }
}
app.start();