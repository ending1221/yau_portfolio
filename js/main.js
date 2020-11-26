function changeLangEvent() {
    $('.navbar_nav .nav_language li').on('click', function() {
        const lang = $(this).data('language');
        console.log(window.I18n[lang])
        modal.lang = lang;
        changeNavText(lang);
        changeIndexText(lang);
        changeHiText(lang);
        getWorkData(lang);
        toggleThemeEvent(lang);
        const text = lang === 'en' ? ' ENGLISH' : ' 繁體中文';
        $('.nav_language .nav_link_text').text(text)
    })
}

function changeHiText(lang) {
    const I18n = window.I18n[lang]
    const html = `
        <h2>${I18n['HI_TITLE']}</h2>
        <p>${I18n['HI_P_1']}</p>
        <p>${I18n['HI_P_2']}</p>
        <p>${I18n['HI_P_3']}</p>`;
    $('section#hi').html(html);
}

function changeIndexText(lang) {
    $('section#index .text').text(window.I18n[lang]['INDEX_TITLE']);
}

function changeNavText(lang) {
    const I18n = window.I18n[lang];
    const links = $('.navbar').find('.nav_link');
    for (let i = 0; i < links.length; i++) {
        const $link = $(links[i])
        if ($link.data('link')==='works') $link.text(I18n['NAV_ITEM_WORK'])
        if ($link.data('link')==='about') $link.text(I18n['NAV_ITEM_ABOUT'])
    }
}

function scrollEvent() {
    $("a").on('click', function (event) {
        if (this.hash !== '') {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 500, function () {
                window.location.hash = hash;
            });
        }
    });
}

function getWorkData(lang) {
    $.ajax({
        url: 'data/works.json',
        dataType: 'json',
        success: function(r) {
            $('section#works').hide()
            getWork(r, lang)
            modal.datas = r
            worksLoadEvent(r.length)
        }
    })
}

function getWork(data, lang='en') {
    let html = '';
    data.map((work, i) => {
        html += `
        <div class="work" data-index=${i}>
            <a class="workbox" target="_blank"></a>
            <img src=${work.img} alt=${work[lang].name} />
            <span class="text">${work[lang].name}</span>
        </div>`
    })
    $('section#works').html(html)
}


function detect(name, x) {
    var place = $(name).offset().left + $(name).width() / 2;
    if (Math.abs(x - place) < 40) {
        $(name).css("bottom", "30px");
    } else {
        $(name).css("bottom", "0px");
    }
}

//滑鼠移動事件
$('#index').mousemove(function (evt) {
    var x = evt.pageX;

    for (let i = 1; i < 6; i++) {
        detect(".key_"+i, x);
    }
});

class Modal {
    constructor($outer) {
        this.datas = null;
        this.workIndex = null;
        this.$outer = $outer;
        this.lang = 'en';
        this.getHtml()
        this.closeOnclick()
    }
    getHtml() {
        const html = `
            <div class="modal_main">
                <div class="modal_main_header">
                    <button class="close" aria-hidden="true">x</button>
                    <div class="modal_main_title"></div>
                </div>
                <div class="modal_main_body">
                    <div class="modal_main_body_img"></div>
                    <div class="modal_main_body_texts"></div>
                </div>
                <div class="modal_main_footer"></div>
            </div>` 
        this.$outer.html(html)
        this.$title = $('.modal_main .modal_main_title');
        this.$body = $('.modal_main .modal_main_body');
    }
    showSouce() {
        if (this.workIndex === null) return
        this.$outer.addClass('show');
        const data = this.datas[this.workIndex]
        const I18n = window.I18n[this.lang]
        const html = `
            <div class="modal_main_body_texts">
                <h2>${data[this.lang].name}</h2><hr /><p>${I18n['MODAL_TEXTS']} : <br>${data.language}</p><p>${data[this.lang].text}</p>
            </div>
            <div class="modal_main_body_img">
                <div class="modal_main_body_loading">
                    <div class="loading"></div>
                    <p class="loadingText">Loading...</p>
                </div>
                <img src="${data.img.slice(0,data.img.length-4)+'_1.jpg'}" alt=${data[this.lang].name} />
            </div>`;
        this.$title.text(data.name);
        this.$body.html(html)
        this.$texts = $('.modal_main .modal_main_body_texts');
        if (data.url) {
            // 有連結才顯示按紐
            const btn = `
                <a href=${data.url} target="_blank" class="modal_btn">
                    <span>${I18n['MODAL_BTN']}</span>
                    <div class="arrow">
                        <img src="img/arrow.png" />
                        <img src="img/arrow_1.png" />
                    </div>
                </a>`
            this.$texts.append(btn)
        }
        this.imgLoadEvent();
    }

    imgLoadEvent() {
        const $img = $('.modal_main_body img');
        const $loading = $('.modal_main_body_loading');
        $loading.show();
        $img.hide();
        $img.on('load', function(){
            $loading.hide();
            $img.fadeIn();
        });
    }
    emptySouce() {
        this.$outer.removeClass('show about')
        this.workIndex = null;
        this.$title.empty()
        this.$body.empty();
    }
    closeOnclick() {
        $('.modal_main button.close').click(() => {
            this.emptySouce()
        })
    }
    showAbout() {
        const html = `
            <div class="resume">
                <div class="information">
                    <div class="icon"><img src="https://bit.ly/2L055qq"/></div>
                    <div class="texts">
                        <h1>徐維欣 <span>Wei-Hsin Hsu</span></h1>
                        <h3>努力打怪的新手前端</h3>
                        <ul class="contact">
                            <li><i class="fas fa-home"> </i><span>新北市 新莊</span></li>
                            <li><i class="fas fa-envelope-open-text"></i><span>ending1221@gmail.com</span></li>
                            <li><i class="fas fa-mobile-alt"> </i><span>+886 988816884</span></li>
                        </ul>
                    </div>
                </div>

                <div class="main">
                    <div class="skill">
                        <div class="block blocktop"> 
                        <h4>Skills</h4>
                        <h2>專業技能</h2>
                        <hr/>
                        <ul class="skills">
                            <li>
                                <h3>平面設計</h3>
                                <h5>Graphic design</h5>
                                <div class="cir">
                                    <div class="p90"></div>
                                    <div class="p180"></div>
                                    <div class="p270"></div>
                                    <div class="p360"></div>
                                </div>
                            </li>
                            <li>
                                <h3>行銷企劃</h3>
                                <h5>Marketing planning</h5>
                                <div class="cir"> 
                                    <div class="p90"></div>
                                    <div class="p180"></div>
                                    <div class="p270"></div>
                                </div>
                            </li>
                            <li>
                                <h3>影片剪輯</h3>
                                <h5>Movie clip</h5>
                                <div class="cir"> 
                                    <div class="p90"></div>
                                    <div class="p180"></div>
                                    <div class="p270"></div>
                                </div>
                            </li>
                            <li>
                                <h3>前端開發</h3>
                                <h5>Front-end</h5>
                                <div class="cir"> 
                                    <div class="p90"></div>
                                    <div class="p180"></div>
                                    <div class="p270"></div>
                                </div>
                            </li>
                            <li>
                                <h3>社群行銷</h3>
                                <h5>Social marketing</h5>
                                <div class="cir"> 
                                    <div class="p90"></div>
                                    <div class="p180"></div>
                                </div>
                            </li>
                            <li>
                                <h3>專案管理</h3>
                                <h5>Project management</h5>
                                <div class="cir"> 
                                    <div class="p90"></div>
                                    <div class="p180"></div>
                                    <div class="p270"></div>
                                </div>
                            </li>
                        </ul>
                        </div>
                        <div class="block"> 
                            <h4>Programming Skill</h4>
                            <h2>程式技能</h2>
                            <hr/>
                            <ul class="program">
                                <li>Html / Css / Sass / Scss
                                <div class="bar"> 
                                    <div class="value p80"></div>
                                </div>
                                </li>
                                <li>JavaScript
                                <div class="bar"> 
                                    <div class="value p60"></div>
                                </div>
                                </li>
                                <li>jQuery
                                <div class="bar"> 
                                    <div class="value p80"></div>
                                </div>
                                </li>
                                <li>React.js
                                <div class="bar"> 
                                    <div class="value p40"></div>
                                </div>
                                </li>
                                <li>Git
                                <div class="bar"> 
                                    <div class="value p50"></div>
                                </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="experience">
                        <div class="block blocktop"> 
                            <h4>Experience</h4>
                            <h2>工作經歷</h2>
                            <hr/>
                            <ul class="workExperience">
                                <li class="year">2015 
                                <ul>
                                    <li class="name">社群行銷</li>
                                    <li>Social marketing</li>
                                    <li>管理 Fackbook 粉絲專頁 / 活動提案設計</li>
                                </ul>
                                </li>
                                <li class="year">2015 <br/>|<br/>2019
                                <ul>
                                    <li class="name">行銷 / 平面設計師</li>
                                    <li>Marketing / Designer</li>
                                    <li>行銷活動提案 / POSM設計 / 網站維護 / 社群行銷 / 電商平台管理 / 影片剪輯</li>
                                </ul>
                                </li>
                                <li class="year">2020
                                <ul>
                                    <li class="name">前端工程師</li>
                                    <li>Front-end engineer</li>
                                    <li>獨立完成小型專案 / 與後端串接Api / 優化網站 UX / RWD 響應式網頁 / SPA</li>
                                </ul>
                                </li>
                            </ul>
                        </div>
                        <div class="block">
                            <h4>Education</h4>
                            <h2>學歷</h2>
                            <hr/>
                            <ul class="workExperience">
                                <li class="year">2009
                                <ul> 
                                    <li class="name">復興商工</li>
                                    <li class="enName">Fu-Hsin Trade & Arts School</li>
                                    <li>廣告設計科 Advertising Design</li>
                                </ul>
                                </li>
                                <li class="year">2011<br/>|<br/>2015
                                <ul> 
                                    <li class="name">致理科技大學</li>
                                    <li class="enName">Chihlee University of Technology</li>
                                    <li>多媒體設計系 <br/>Department of Multimedia Design</li>
                                </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>`

        this.$body.html(html);
    }
}

function workOnclick() {
    $('section#works').on('click', '.work', function() {
        modal.workIndex = $(this).data('index');
        modal.showSouce();
    })
}

function navbarClick() {
    const $navbar = $('header.navbar');
    const $menu = $navbar.find('.navbar_menu');
    const $langList = $navbar.find('.nav_language_list');
    
    $menu.click(function(){
        $(this).toggleClass('open');
        $navbar.toggleClass('open');
        $langList.removeClass('open');
    })
    
    $('.navbar_nav .nav_item').click(function(e){
        if($(this).find('.nav_link').data('link') === 'about') {
            $('.modal').addClass('show about');
            modal.showAbout()
        }
        //點選 language 選單不縮起
        if($(this).hasClass('nav_language')) return

        $langList.removeClass('open');
        $menu.removeClass('open');
        $navbar.removeClass('open');
    })
}

function toggleThemeEvent(lang='en') {
    const I18n = window.I18n[lang]
    const $theme = $('#toggle_theme');
    const $document = $(document.documentElement);
    $theme.off('click');
    $theme.on('click', function() {
        const $icon = $('.themeIcon .fas')
        if ($document.attr('theme')) {
            $document.removeAttr('theme');
            $icon.removeClass('fa-sun').addClass('fa-moon');
            $icon.attr('title', I18n['THEME_TITLE_DARK']);
        }
        else {
            $document.attr('theme', 'dark');
            $icon.removeClass('fa-moon').addClass('fa-sun');
            $icon.attr('title',I18n['THEME_TITLE_LIGHT']);
        }
    })
}


function worksLoadEvent(length) {
    let load = 0;
    $('section#works img').on('load',function() {
        load += 1
        if(load === length) {
            $('section#works').fadeIn()
            $('.outerLoading').hide()
        }
    })
}

function languageEvent() {
    $('.navbar .nav_language').click(function() {
        $(this).find('.nav_language_list').toggleClass('open')
    })
}

scrollEvent();
const modal = new Modal($('.modal'));
getWorkData();
workOnclick();
navbarClick();
changeLangEvent();
languageEvent();
toggleThemeEvent();