$(function () {
    let firstTouch = true;

    $('#bgm').on('click', (e) => e.target !== e.currentTarget);

    $('#bgm_pp_btn').on('click', function () {
        const bgm = $('#mcard_bgm').get(0);
        const bgmPanel = $('#bgm');
        const isPaused = bgm.paused;

        if (parseInt(bgmPanel.css('left')) < 0) {
            if (!isPaused) {
                stopMusic(this, bgm);
            } else {
                playMusic(this, bgmPanel, bgm);
            }
        } else {
            stopMusic(this, bgm);
            bgmPanel.animate({ 'left': '-202px' });
        }
    });

    $('#bgm_close_btn').on('click', () => $('#bgm').animate({ 'left': '-202px' }));

    $('#mcard_bgm').on('ended', nextSong);

    setInterval(bgm_prog_update, 100);

    $('body').on('click touchstart', function () {
        if (firstTouch && !$('#bgm_pp_btn').hasClass('bgm_pp_btn_play')) {
            $('#bgm_pp_btn').click();
            firstTouch = false;
        }
    });
});

function playMusic(button, bgmPanel, bgm) {
    $(button).addClass('bgm_pp_btn_play');
    bgm.play();
    bgmPanel.delay(500).animate({ 'left': '12px' }, 120);
    setTimeout(() => bgmPanel.animate({ 'left': '-202px' }), 3000);
}

function stopMusic(button, bgm) {
    $(button).removeClass('bgm_pp_btn_play');
    bgm.pause();
}

function nextSong() {
    let sseq = 0, sseq_max = 0;
    $('song').each(function () {
        const songSrc = $(this).attr('src');
        sseq_max = $(this).data('sseq');
        if ($('#mcard_bgm').get(0).currentSrc === encodeURI(songSrc)) {
            sseq = $(this).data('sseq');
        }
    });

    const sseq_next = sseq + 1 > sseq_max ? 1 : sseq + 1;
    const bgm_next = $('song[data-sseq=' + sseq_next + ']');

    $('#bgm_now_song').text(bgm_next.data('song'));
    $('#bgm_now_arti').text(bgm_next.data('arti'));

    const bgm = $('#mcard_bgm').get(0);
    $('#mcard_bgm > source').attr('src', bgm_next.attr('src'));
    bgm.load();
    bgm.play();
}

function bgm_prog_update() {
    const bgm = $('#mcard_bgm').get(0);
    if (!bgm.paused) {
        const cur = bgm.currentTime, dur = bgm.duration;
        const percent = Math.floor(cur / dur * 100);
        const width = 85 / 100 * percent;
        $('#bgm_now_prog_played').css('width', width + 'px');
    }
}
