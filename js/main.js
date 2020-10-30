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
            <a class="text" href=${work.url} target="_blank">${work.name}</a>
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
                    <div class="modal_main_body_imgs"></div>
                    <div class="modal_main_body_texts"></div>
                </div>
                <div class="modal_main_footer"></div>
            </div>` 
        this.$outer.html(html)
        this.$title = $('.modal_main .modal_main_title');
        this.$imgs = $('.modal_main .modal_main_body_imgs');
        this.$texts = $('.modal_main .modal_main_body_texts');
    }
    showSouce() {
        if (this.workIndex === null) return
        this.$outer.addClass('show');
        const data = this.datas[this.workIndex]
        const text = `<div class="modal_main_body_text">${data.name}</div>`
        this.$title.text(data.name);
        this.$imgs.html(this.getImgsHtml())
        this.$texts.html(text)
        if (data.url) {
            // 有連結才顯示按紐
            const btn = `
            <a href=${data.url} target="_blank" class="modal_btn">
                <span class="modal_btn_content">Go to demo</span>
            </a>`
            this.$texts.append(btn)
        }
    }
    emptySouce() {
        this.$outer.removeClass('show')
        this.workIndex = null;
        // this.$title.empty()
        // this.$imgs.empty()
        // this.$texts.empty()
    }
    closeOnclick() {
        $('.modal_main button.close').click(() => {
            this.emptySouce()
        })
    }
    getImgsHtml(data) {
        let html = '';
        // data.map(img => {
        //     html += `<img class="modal_main_body_img" src=${img} alt="work" />`
        // })
        return html
    }
}

function workOnclick() {
    $('section#works').on('click', '.work', function() {
        console.log($(this).data('index'))
        modal.workIndex = $(this).data('index');
        modal.showSouce();
    })
    
}

const modal = new Modal($('.modal'));
getWorkData();
workOnclick();

$('.navbar-menu').click(function(){
	$(this).toggleClass('open');
	$(".navbar").toggleClass('open');
	// $(".navbar-nav").toggleClass('open');
})
