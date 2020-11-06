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
        this.$imgs = $('.modal_main .modal_main_body_img');
        this.$texts = $('.modal_main .modal_main_body_texts');
    }
    showSouce() {
        if (this.workIndex === null) return
        this.$outer.addClass('show');
        const data = this.datas[this.workIndex]
        const text = `<h2>${data.name}</h2><hr /><p>language / tool : <br>${data.language}</p><p>${data.text}</p>`
        const img = `<img src="${data.img.slice(0,data.img.length-4)+'_1.jpg'}" alt=${data.name} />`
        this.$title.text(data.name);
        this.$imgs.html(img)
        this.$texts.html(text)
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
