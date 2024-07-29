const places = {
    south: {Articles: [{no: '01',  name: 'Lorem ipsum dolor sit amet consectetur', para: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas', link: 'Read more'}, {no: '02',  name: 'Lorem ipsum dolor sit amet consectetur', para: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas', link: 'Read more'}, {no: '03',  name: 'Lorem ipsum dolor sit amet consectetur', para: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas', link: 'Read more'}, {no: '04',  name: 'Lorem ipsum dolor sit amet consectetur', para: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas', link: 'Read more'}, ], Media: [{name: 'Lorem', para: 'Lorem ipsum dolor sit'}, {name: 'Lorem', para: 'Lorem ipsum sip'}, {name: 'Lorem', para: 'Lorem ipsum sig'}, {name: 'Lorem', para: 'Lorem ipsum sim'}], Impacts: [{no: '01',  name: 'Lorem ipsum dolor sit amet consectetur', para: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas', link: 'Read more'}, {no: '01',  name: 'Lorem ipsum dolor sit amet consectetur', para: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas', link: 'Read more'}, {no: '01',  name: 'Lorem ipsum dolor sit amet consectetur', para: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas', link: 'Read more'}, {no: '01',  name: 'Lorem ipsum dolor sit amet consectetur', para: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas', link: 'Read more'}, ]},
    guarani: {Articles: [{no: '01',  name: 'Lorem ipsum dolor sit amet consectetur', para: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas', link: 'Read more'}, {no: '01',  name: 'Lorem ipsum dolor sit amet consectetur', para: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas', link: 'Read more'}, {no: '01',  name: 'Lorem ipsum dolor sit amet consectetur', para: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas', link: 'Read more'}, {no: '01',  name: 'Lorem ipsum dolor sit amet consectetur', para: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas', link: 'Read more'}, ], Media: [{name: 'Lorem', para: 'Lorem ipsum dolor sit'}, {name: 'Lorem', para: 'Lorem ipsum sip'}, {name: 'Lorem', para: 'Lorem ipsum sig'}, {name: 'Lorem', para: 'Lorem ipsum sim'}], Impacts: [{no: '01',  name: 'Lorem ipsum dolor sit amet consectetur', para: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas', link: 'Read more'}, {no: '01',  name: 'Lorem ipsum dolor sit amet consectetur', para: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas', link: 'Read more'}, {no: '01',  name: 'Lorem ipsum dolor sit amet consectetur', para: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas', link: 'Read more'}, {no: '01',  name: 'Lorem ipsum dolor sit amet consectetur', para: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas', link: 'Read more'}, ]},
    guyana: {Articles: [{no: '01',  name: 'Lorem ipsum dolor sit amet consectetur', para: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas', link: 'Read more'}, {no: '01',  name: 'Lorem ipsum dolor sit amet consectetur', para: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas', link: 'Read more'}, {no: '01',  name: 'Lorem ipsum dolor sit amet consectetur', para: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas', link: 'Read more'}, {no: '01',  name: 'Lorem ipsum dolor sit amet consectetur', para: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas', link: 'Read more'}, ], Media: [{name: 'Lorem', para: 'Lorem ipsum dolor sit'}, {name: 'Lorem', para: 'Lorem ipsum sip'}, {name: 'Lorem', para: 'Lorem ipsum sig'}, {name: 'Lorem', para: 'Lorem ipsum sim'}], Impacts: [{no: '01',  name: 'Lorem ipsum dolor sit amet consectetur', para: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas', link: 'Read more'}, {no: '01',  name: 'Lorem ipsum dolor sit amet consectetur', para: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas', link: 'Read more'}, {no: '01',  name: 'Lorem ipsum dolor sit amet consectetur', para: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas', link: 'Read more'}, {no: '01',  name: 'Lorem ipsum dolor sit amet consectetur', para: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas', link: 'Read more'}, ]},
   
}

const swich = document.querySelector('.switch');
const subNxt = document.querySelector('.subNext');
const heade = document.querySelector('.popup-header');
const dshCtn =  document.querySelector('.dashboardCtn');
const dshsubCtn =  document.querySelector('.dashboardsubCtn');
//places
const southAmericaHumboldt = document.querySelector('.SouthAmericaHumboldt');
const guaraniAquiferSystem = document.querySelector('.GuaraniAquiferSystem');
const guyanaBrazilBorderAmazonBasin = document.querySelector('.Guyana-BrazilBorderAmazonBasin');



const loops = ['slide1', 'slide2', 'slide3', 'slide4'];
const panel = ['Articles', 'Media', 'Impacts'];
const prop = ['no', 'name', 'para', 'link'];
const content = [
    {emt: 'p', sty: 'font-size: 2vw; color: #fdd835; text-align: left;'},
    {emt: 'p', sty: 'font-size: 1vw; color: #fff; text-align: left;'},
    {emt: 'p', sty: 'font-size: 1vw; color: #fff; text-align: left;'},
    {emt: 'a', sty: 'font-size: 1vw; color: #fff; text-align: left;'}
]

var heading = 0;

southAmericaHumboldt.addEventListener('click', () => {
    (dshCtn.childElementCount === 2) ? dshCtn.removeChild(dshCtn.firstElementChild) : '';
    swich.replaceChildren();
    setTimeout(()=>{
        heading = dshCtn.insertAdjacentElement('afterbegin', document.createElement('p'));
        heading.textContent = "Articles";
        heading.classList.add('heading');
        panel.forEach((section)=>{
            const board = swich.appendChild(document.createElement('div'));
            board.classList.add('dashboard');
            loops.forEach((element, index) => {
                const temp = board.appendChild(document.createElement('div'));
                temp.classList.add('slide');
                if (section === 'Articles' || section === 'Impacts') {
                    content.forEach((cnt, idx) => {
                        const para = temp.appendChild(document.createElement(cnt.emt));
                        para.textContent = `${places.south[section][index][prop[idx]]}`
                        para.style.cssText = cnt.sty;
                        if (para.nodeName === 'A') {
                            para.id = 'south-text';
                            para.href = `content.html?id=${para.id}`;
                            para.target = '_blank';
                        }
                    });
                } else {
                    temp.style.cssText = 'justify-content: flex-end; align-items: flex-end; padding-left: 0%; padding-right: 0%; height: 70%;';
                    const divpara = temp.appendChild(document.createElement('a')); /*this*/
                    if (divpara.nodeName === 'A') {
                        divpara.id = 'south-image';
                        divpara.href = `content.html?id=${divpara.id}`;
                        divpara.target = '_blank';
                    }
                    divpara.style.cssText = 'display: flex; flex-direction: column; justify-content: center; padding-left: 5%; width: 50%; background: red; height: 30%;';
                    divpara.appendChild(document.createElement('p'));
                    divpara.appendChild(document.createElement('p'));
                    divpara.firstElementChild.textContent = `${places.south.Media[index].name}`;
                    divpara.firstElementChild.style.cssText = 'font-size: 1vw; color: #fff; text-align: left; margin-bottom: -0.6%;';
                    divpara.lastElementChild.textContent = `${places.south.Media[index].para}`;
                    divpara.lastElementChild.style.cssText = 'font-size: 0.7vw; color: #fff; text-align: left; margin-top: -0.6%;';
                }    
            });
        });
    }, 5000);
});

guyanaBrazilBorderAmazonBasin.addEventListener('click', () => {
    (dshCtn.childElementCount === 2) ? dshCtn.removeChild(dshCtn.firstElementChild) : '';
    swich.replaceChildren();
    setTimeout(()=>{
        heading = dshCtn.insertAdjacentElement('afterbegin', document.createElement('p'));
        heading.textContent = "Articles";
        heading.classList.add('heading');
        panel.forEach((section)=>{
            const board = swich.appendChild(document.createElement('div'));
            board.classList.add('dashboard');
            loops.forEach((element, index) => {
                const temp = board.appendChild(document.createElement('div'));
                temp.classList.add('slide');
                if (section === 'Articles' || section === 'Impacts') {
                    content.forEach((cnt, idx) => {
                        const para = temp.appendChild(document.createElement(cnt.emt));
                        para.textContent = `${places.guyana[section][index][prop[idx]]}`
                        para.style.cssText = cnt.sty;
                        if (para.nodeName === 'A') {
                            para.id = 'guyana-text';
                            para.href = `content.html?id=${para.id}`;
                            para.target = '_blank';
                        }
                    });
                } else {
                    temp.style.cssText = 'justify-content: flex-end; align-items: flex-end; padding-left: 0%; padding-right: 0%; height: 70%;';
                    const divpara = temp.appendChild(document.createElement('a')); /*this*/
                    if (divpara.nodeName === 'A') {
                        divpara.id = 'guyana-image';
                        divpara.href = `content.html?id=${divpara.id}`;
                        divpara.target = '_blank';
                    }
                    divpara.style.cssText = 'display: flex; flex-direction: column; justify-content: center; padding-left: 5%; width: 50%; background: red; height: 30%;';
                    divpara.appendChild(document.createElement('p'));
                    divpara.appendChild(document.createElement('p'));
                    divpara.firstElementChild.textContent = `${places.guyana.Media[index].name}`;
                    divpara.firstElementChild.style.cssText = 'font-size: 1vw; color: #fff; text-align: left; margin-bottom: -0.6%;';
                    divpara.lastElementChild.textContent = `${places.guyana.Media[index].para}`;
                    divpara.lastElementChild.style.cssText = 'font-size: 0.7vw; color: #fff; text-align: left; margin-top: -0.6%;';
                }    
            });
        });
    }, 2000);
});



guaraniAquiferSystem.addEventListener('click', () => {
    (dshCtn.childElementCount === 2) ? dshCtn.removeChild(dshCtn.firstElementChild) : '';
    swich.replaceChildren();
    setTimeout(()=>{
        heading = dshCtn.insertAdjacentElement('afterbegin', document.createElement('p'));
        heading.textContent = "Articles";
        heading.classList.add('heading');
        panel.forEach((section)=>{
            const board = swich.appendChild(document.createElement('div'));
            board.classList.add('dashboard');
            loops.forEach((element, index) => {
                const temp = board.appendChild(document.createElement('div'));
                temp.classList.add('slide');
                if (section === 'Articles' || section === 'Impacts') {
                    content.forEach((cnt, idx) => {
                        const para = temp.appendChild(document.createElement(cnt.emt));
                        para.textContent = `${places.guarani[section][index][prop[idx]]}`
                        para.style.cssText = cnt.sty;
                        if (para.nodeName === 'A') {
                            para.id = 'guarani-text';
                            para.href = `content.html?id=${para.id}`;
                            para.target = '_blank';
                        }
                    });
                } else {
                    temp.style.cssText = 'justify-content: flex-end; align-items: flex-end; padding-left: 0%; padding-right: 0%; height: 70%;';
                    const divpara = temp.appendChild(document.createElement('a'));
                    if (divpara.nodeName === 'A') {
                        divpara.id = 'guarani-image';
                        divpara.href = `content.html?id=${divpara.id}`;
                        divpara.target = '_blank';
                   }
                    divpara.style.cssText = 'display: flex; flex-direction: column; justify-content: center; padding-left: 5%; width: 50%; background: red; height: 30%;';
                    divpara.appendChild(document.createElement('p'));
                    divpara.appendChild(document.createElement('p'));
                    divpara.firstElementChild.textContent = `${places.guarani.Media[index].name}`;
                    divpara.firstElementChild.style.cssText = 'font-size: 1vw; color: #fff; text-align: left; margin-bottom: -0.6%;';
                    divpara.lastElementChild.textContent = `${places.guarani.Media[index].para}`;
                    divpara.lastElementChild.style.cssText = 'font-size: 0.7vw; color: #fff; text-align: left; margin-top: -0.6%;';
                }
            });
        });
    }, 2000);
});
const subNext = document.querySelector('.subNext');
subNext.addEventListener('click', ()=>{
    const animate = swich.firstElementChild.firstElementChild;
    console.log(animate);
    animate.classList.add('animes');
    setTimeout(()=>{
        swich.firstElementChild.appendChild(animate);
        swich.firstElementChild.lastElementChild.classList.remove('animes');
        swich.firstElementChild.lastElementChild.classList.add('animesB');
    }, 200);
    setTimeout(()=>{
        swich.firstElementChild.removeChild();
    }, 200);
});


const nxt = document.querySelector('.next');
nxt.addEventListener('click', ()=>{
    setTimeout(()=>{
        heading.textContent = (heading.textContent === 'Articles') ? 'Media' : (heading.textContent === 'Media') ? 'Impacts' : 'Articles';
    }, 300);
    heading.style.cssText = 'font-size: 2vw; color: #fff; text-align: left; opacity: 1; margin-left: 0%; animation: hda 100ms ease-in-out 200ms 1 normal forwards;';
    setTimeout(()=> {
        heading.classList.remove('heading');
        heading.classList.remove('heading1');
        heading.style.cssText = '';
        heading.classList.add('heading1');
    }, 100);
    dshsubCtn.style.cssText = 'display: flex; flex-direction: row; width: 100%; height: 93%; opacity: 1; margin-left: 0%; justify-content: space-between; align-items: center; animation: dssa 500ms ease-in-out 200ms 1 normal forwards;';
    setTimeout(()=> {
        dshsubCtn.classList.remove('dashboardsubCtn');
        dshsubCtn.classList.remove('dashboardCtnsub');
        dshsubCtn.style.cssText = '';
        dshsubCtn.classList.add('dashboardCtnsub');
    }, 1000);
    setTimeout(()=>{
        const animate = swich.firstElementChild;
        console.log(animate);
        animate.classList.remove('dashboard');
        animate.classList.add('animeSnr');
        swich.appendChild(animate);
        swich.lastElementChild.classList.remove('animeSnr');
        swich.lastElementChild.classList.add('dashboard');
        swich.removeChild();
    }, 1000);
});

const bck = document.querySelector('.back');
bck.addEventListener('click', () => {
    setTimeout(() => {
        heading.textContent = (heading.textContent === 'Impacts') ? 'Media' : (heading.textContent === 'Media') ? 'Articles' : 'Impacts';
    }, 300);
    heading.style.cssText = 'font-size: 2vw; color: #fff; text-align: left; opacity: 1; margin-left: 0%; animation: hda 100ms ease-in-out 200ms 1 normal forwards;';
    setTimeout(() => {
        heading.classList.remove('heading');
        heading.classList.remove('heading1');
        heading.style.cssText = '';
        heading.classList.add('heading1');
    }, 100);
    dshsubCtn.style.cssText = 'display: flex; flex-direction: row; width: 100%; height: 93%; opacity: 1; margin-left: 0%; justify-content: space-between; align-items: center; animation: dssa 500ms ease-in-out 200ms 1 normal forwards;';
    setTimeout(() => {
        dshsubCtn.classList.remove('dashboardsubCtn');
        dshsubCtn.classList.remove('dashboardCtnsub');
        dshsubCtn.style.cssText = '';
        dshsubCtn.classList.add('dashboardCtnsub');
    }, 1000);
    setTimeout(() => {
        const animate = swich.lastElementChild;
        console.log(animate);
        animate.classList.remove('dashboard');
        animate.classList.add('animeSnr');
        swich.insertBefore(animate, swich.firstElementChild);
        swich.firstElementChild.classList.remove('animeSnr');
        swich.firstElementChild.classList.add('dashboard');
        swich.removeChild;
    }, 1000);
});
