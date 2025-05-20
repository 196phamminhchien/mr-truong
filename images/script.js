(function($) {

	"use strict"; 
    /*------------------------------------------
        = DONATE MODAL
    -------------------------------------------*/
    if ($("#donate-modal").length && $(".buttonDonate").length  && $(".donate-modal-close").length) {
		$(document).on('click','.buttonDonate',function(){
			$("#donate-modal").show();
			if ($('body').hasClass('offcanvas')) {
                $('body').removeClass('offcanvas');
                $('.js-oliven-nav-toggle').removeClass('active');
            }
		});
		$(document).on('click','.donate-modal-close',function(){
			$("#donate-modal").hide();
		});
		$(document).on('click','body',function(e){
			if(e.target.id == $("#donate-modal").attr('id')) { $("#donate-modal").hide(); }
		});
	}
	
	$(document).on('click', '.crypto-item', function(){
		let parent = $(this).parents('.donate-card');
		parent.find('.cryptos-box-view').show();
		parent.find('.cryptos-box-view .coin-img').html('<img src="'+$(this).data('img')+'" />');
		parent.find('.cryptos-box-view .coin-id').html($(this).data('id'));
		parent.find('.cryptos-box-view .coin-address').html($(this).data('address'));
		parent.find('.cryptos-box-view .coin-qr-code').html('').qrcode({width: 150,height: 150,text: $(this).data('address')});
	});
	
	$(document).on('click', '.cryptos-box-view-close', function(){
		let parent = $(this).parents('.donate-card');
		parent.find('.cryptos-box-view').hide();
	});
	/*------------------------------------------
        = WISH FORM SUBMISSION
    -------------------------------------------*/
    if ($("#wish-form").length) {
        $("#wish-form").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 5
                },
                content: {
                    required: true,
                    minlength: 10
                },
                confirm: {
                    required: true
                },
            },

            messages: {
                name: {
                    required: '<span style="color:red;">Vui lòng nhập tên của bạn.</span>',
                    minlength: '<span style="color:red;">Tên phải lớn hơn 5 ký tự.</span>',
                },
                content: {
                    required: '<span style="color:red;">Vui lòng nhập lời chúc.</span>',
                    minlength: '<span style="color:red;">Lời chúc phải lớn hơn 10 ký tự.</span>',
                },
                confirm: {
                    email: '<span style="color:red;">Xác nhận tham dự không hợp lệ.</span>'
                }
            },

            submitHandler: function (form) {
                $("#loader").css("display", "inline-block");
                $.ajax({
                    type: "POST",
                    url: "act_guiloichuc.php",
                    data: $(form).serialize(),
                    success: function (res) {
                        $( "#loader").hide();
                        if(!res.error){
                            $('#show-comments').scrollTop(0);
                            $('#show-comments').prepend('<div class="box-comment p-3 mb-3"><h4 id="user-name-comment">'+$(form).find("input[name='name']").val().replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;")+'</h4><p id="comment-detail" class="m-0">'+$(form).find("textarea[name='content']").val().replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;")+'</p>'+'<p class="comment-confirm mt-1 mb-0">'+$(form).find("select[name='confirm']").val().replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;")+'</p>'+'</div>');
                            $( "#success").html(res.message).slideDown( "slow" );
                            setTimeout(function() {
                            $( "#success").slideUp( "slow" );
                            }, 5000);
                        }else{
                            $( "#error").html(res.message).slideDown( "slow" );
                            setTimeout(function() {
                            $( "#error").slideUp( "slow" );
                            }, 5000);
                        }

                        form.reset();
                    },
                    error: function() {
                        $( "#loader").hide();
                        $( "#error").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#error").slideUp( "slow" );
                        }, 5000);
                    }
                });
                return false;
            }

        });
    }

    /*------------------------------------------
        = TOGGLE MUSUC BIX
    -------------------------------------------*/
    if($(".music-box").length) {
        var musicBtn = $(".music-box-toggle-btn"),
            musicBox = $(".music-holder");

        musicBtn.on("click", function() {
            musicBox.toggleClass("toggle-music-box");
            return false;
        })
    }


    /*------------------------------------------
        = BACK TO TOP
    -------------------------------------------*/
    if($(".back-to-top-btn").length) {
        $(".back-to-top-btn").on("click", function() {
            $("html,body").animate({
                scrollTop: 0
            }, 2000, "easeInOutExpo");
            return false;
        })
    }
    
    $(document).on('click', '.calendar-button-custom-click', function(e){
        e.preventDefault();
    	$(this).parent().find('.calendar-button .atcb-click').click();
    });

})(window.jQuery);

$(document).ready(function() {
	const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
	const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
});