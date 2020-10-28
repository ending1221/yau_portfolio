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
            <img src=${work.img} alt=${work.text} />
            <a class="text" href=${work.url} target="_blank">${work.text}</a>
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
    constructor() {
        this.datas = null;
        this.workIndex = null;
        console.log(this.getHtml())
    }
    getHtml() {
        const html = this.datas ? `
            <div class="modal_main">
                <div class="modal_main_header">
                    <button class="close" aria-hidden="true">x</button>
                    <div class="modal_main_title"></div>
                </div>
                <div class="modal_main_body">
                    ${this.workIndex ? this.getBodyContent(this.data[this.workIndex]) : ''}
                </div>
                <div class="modal_main_footer"></div>
            </div>` 
        : ''
        return html
    }
    getBodyContent(data) {
        return `
        <div class="modal_main_body_imgs">
            ${this.getImgsHtml(data)}
        </div>
        <div class="modal_main_body_texts">
            <div class="modal_main_body_text"></div>
            <a href=${data.url} target="_blank" class="modal_btn">
                <span class="modal_btn_content">Go to demo</span>
            </a>
        </div>`
    }
    getImgsHtml(data) {
        let html = '';
        data.map(img => {
            html += `<img class="modal_main_body_img" src=${img} alt="work" />`
        })
        return html
    }
}

function workOnclick() {
    $('section#works').on('click', '.work', function() {
        console.log($(this).data('index'))
        modal.workIndex = $(this).data('index');
        $('.modal').append(modal.getHtml());
    })
    
}

const modal = new Modal;
getWorkData();
workOnclick();
