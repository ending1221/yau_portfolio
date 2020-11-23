$(document).ready(function () {
    scrollEvent();
});

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

function getWorkData() {
    $.ajax({
        url: 'data/works.json',
        dataType: 'json',
        success: function(r) {
            console.log(r);
            getWork(r)
            modal.datas = r
        }
    })
}

function getWork(data) {
    let html = '';
    data.map((work, i) => {
        html += `
        <div class="work" data-index=${i}>
            <a class="workbox" target="_blank"></a>
            <img src=${work.img} alt=${work.name} />
            <span class="text">${work.name}</span>
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
        const html = `
            <div class="modal_main_body_texts">
                <h2>${data.name}</h2><hr /><p>language / tool : <br>${data.language}</p><p>${data.text}</p>
            </div>
            <div class="modal_main_body_img">
                <div class="modal_main_body_loading">
                    <div class="loading"></div>
                </div>
                <img src="${data.img.slice(0,data.img.length-4)+'_1.jpg'}" alt=${data.name} />
            </div>`;
        this.$title.text(data.name);
        this.$body.html(html)
        this.$texts = $('.modal_main .modal_main_body_texts');
        if (data.url) {
            // 有連結才顯示按紐
            const btn = `
                <a href=${data.url} target="_blank" class="modal_btn">
                    <span>Go to demo</span>
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
        const $img = $('.modal_main_body_img img');
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
                            <li>平面設計
                            <div class="cir">
                                <div class="p90"></div>
                                <div class="p180"></div>
                                <div class="p270"></div>
                                <div class="p360"></div>
                            </div>
                            </li>
                            <li>行銷企劃
                            <div class="cir"> 
                                <div class="p90"></div>
                                <div class="p180"></div>
                                <div class="p270"></div>
                            </div>
                            </li>
                            <li>影片剪輯
                            <div class="cir"> 
                                <div class="p90"></div>
                                <div class="p180"></div>
                                <div class="p270"></div>
                            </div>
                            </li>
                            <li>網站開發
                            <div class="cir"> 
                                <div class="p90"></div>
                                <div class="p180"></div>
                                <div class="p270"></div>
                            </div>
                            </li>
                            <li>社群行銷
                            <div class="cir"> 
                                <div class="p90"></div>
                                <div class="p180"></div>
                            </div>
                            </li>
                            <li>專案管理
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
                                    <li>廣告設計科 Advertising Design</li>
                                </ul>
                                </li>
                                <li class="year">2011<br/>|<br/>2015
                                <ul> 
                                    <li class="name">致理科技大學</li>
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

const modal = new Modal($('.modal'));
getWorkData();
workOnclick();

$('.navbar-menu').click(function(){
	$(this).toggleClass('open');
	$('.navbar').toggleClass('open');
})

$('.navbar-nav .nav-item').click(function(e){
    if($(this).find('.nav-link').data('link') === 'about') {
        $('.modal').addClass('show about');
        modal.showAbout()
    }
    $('.navbar-menu').removeClass('open');
    $('.navbar').removeClass('open');
})

$('#toggle-theme').click(function() {
    const $icon = $('.themeIcon .fas')
    if ($(document.documentElement).attr('theme')) {
        $(document.documentElement).removeAttr('theme');
        $icon.removeClass('fa-sun').addClass('fa-moon');
        $icon.attr('title','切換為夜間模式');
    }
    else {
        $(document.documentElement).attr('theme', 'dark');
        $icon.removeClass('fa-moon').addClass('fa-sun');
        $icon.attr('title','切換為普通模式');
    }
})

