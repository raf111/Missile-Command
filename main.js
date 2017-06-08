console.log("JS Works!");

jQuery(function() {
    console.log("jQuery Works!");

    // Global Variables
    var land_page_removed = 0;
    var score = 1;
    var high_score = 0;
    var level = 1;
    var cities_intact = 6;

    var body = $('body');
    body.css({
        backgroundColor: 'black'
    });

    var landing_page = $('<div>');
    landing_page.css({
        width: '100%',
        height: '100%'
    });

    var score_page = $('<div>');
    score_page.css({
        width: '100%',
        height: '100%'
            //backgroundColor: 'white'
    })

    var high_score_page = $('<div>');
    high_score_page.css({
        width: '100%',
        height: '100%'
    })

    var getLandingPage = function() {
        body.append(landing_page);
        var intro_tag = $('<div>');
        landing_page.append(intro_tag);
        intro_tag.css({
            color: 'yellow',
            width: '600px',
            height: '165px',
            fontSize: '72px',
            textAlign: 'center',
            display: 'inline block',
            margin: '0 auto',
            marginTop: '20px',
            marginBottom: '50px',
            padding: '20px'
        })
        intro_tag.text("MISSILE COMMAND");

        for (var i = 0; i < 4; i++) {
            var btn = $('<button>');
            $(btn).addClass('btn');
            var btn_id = (i + 1).toString();
            $(btn).attr('id', btn_id);
            (landing_page).append(btn);
        }

        $('.btn').css({
            display: 'inline block',
            display: 'table',
            margin: '0 auto',
            width: '300px',
            height: '50px',
            marginTop: '20px',
            marginBottom: '10px',
            backgroundColor: 'yellow',
            border: '5px',
            borderStyle: 'solid',
            borderColor: 'red',
            color: 'blue',
            fontSize: '24px'
        })
        $('#1').text('Play Game');
        $('#3').text('Control Settings');
        $('#2').text('Rules');
        $('#4').text('Hide Menu');
    }

    var removeLandingPage = function() {
        landing_page.fadeOut();
        landing_page.detach();
        landing_page_removed = 1;
    }

    var getScorePage = function() {
        body.append(score_page);
        var score_box = $('<div>');
        score_page.append(score_box);
        score_box.css({
            width: '600px',
            height: '500px',
            display: 'inline block',
            margin: '0 auto',
            textAlign: 'center',
            color: 'yellow'
        })

        var h1 = $('<h1>');
        score_box.append(h1);
        h1.text('Your score: ' + score + '!');
        h1.css({
            fontSize: '108px',
            padding: '0px',
            transform: 'translateY(-70px)'
        })

        var game_info = $('<p>');
        score_box.append(game_info);
        game_info.css({
            fontSize: '48px',
            whiteSpace: 'pre-wrap',
            textAlign: 'left',
            marginLeft: '100px',
            transform: 'translateY(-150px)'
        })

        game_info.text('Level: ' + level + '\n \n Cities Intact: ' + cities_intact + '\n \n Your High Score: ' + high_score);
    }

    var getHighScore = function() {
        if (score > high_score) {
            high_score = score;
            var high_score_box = $('<div>');
            high_score_box.css({
                width: '600px',
                height: '500px',
                backgroundColor: 'white',
                whiteSpace: 'pre-wrap',
                color: 'yellow',
                fontSize: '108px'
            })
            high_score_box.text('NEW HIGH SCORE!!!');
            score_page.detach();
            high_score_page.append(high_score_box);
            setInterval(function() {
                high_score_page.remove();
            }, 3000);
        }
    }

    getLandingPage();
    $('#1').click(function() {
        removeLandingPage();
        console.log(landing_page_removed);
        getScorePage();
        getHighScore();
    });
    /*
    if (land_page_removed === 1) {
    	getScorePage();
    } */
});
