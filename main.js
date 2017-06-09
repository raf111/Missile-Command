console.log("JS Works!");

jQuery(function() {
    console.log("jQuery Works!");

    // Global Variables
    var land_page_removed = 0;
    var score = 0;
    var high_score = 0;
    var level = 1;
    var cities_intact = 6;


    /* Variable References */
    // Body
    var body = $('body');


    // Landing Page
    var landing_page = $('<div>');
    landing_page.addClass('landing_page');

    var intro_tag = $('<div>');
    intro_tag.addClass('intro_tag');


    // High Score
    var high_score_page = $('<div>');
    high_score_page.addClass('high_score_page');

    var high_score_box = $('<div>');
    high_score_box.text('NEW HIGH SCORE!!!');


    // Score Page
    var score_page = $('<div>');
    score_page.addClass('score_page');

    var score_box = $('<div>');
    score_box.addClass('score_box');

    var score_title = $('<h1>');
    score_title.addClass('score_title');

    var game_info = $('<p>');
    game_info.addClass('game_info');


    // Game Page 
    var game_page = $('<div>');
    game_page.addClass('game_page');

    var nav_bar = $('<nav>');
    nav_bar.addClass('nav_bar');

    var gun_btn_1 = $('<div>');
    gun_btn_1.addClass('gun_btn');
    var gun_btn_2 = $('<div>');
    gun_btn_2.addClass('gun_btn');
    var gun_btn_3 = $('<div>');
    gun_btn_3.addClass('gun_btn');
    var gun_btn = $('.gun_btn');

    var game_menu_btn = $('<button>');
    game_menu_btn.addClass('game_menu_btn');
    game_menu_btn.text("STOP");

    var ground = $('<div>');
    ground.addClass('ground');

    var menu_box = $('<div>');
    menu_box.addClass('menu_box');


    /* Function Implementations */
    var appender = function() {
    	landing_page.append(intro_tag);
    	high_score_page.append(high_score_box);
    	score_page.append(score_box);
    	score_box.append(score_title);
        score_box.append(game_info);
        game_page.append(nav_bar);
        nav_bar.append(game_menu_btn);
        nav_bar.append(gun_btn_1);
        game_page.append(ground);
    } 
    var getLandingPage = function() {
        body.append(landing_page);

        intro_tag.text('MISSILE COMMAND');
        for (var i = 0; i < 4; i++) {
            var btn = $('<button>');
            $(btn).addClass('btn');
            var btn_id = (i + 1).toString();
            $(btn).attr('id', btn_id);
            (landing_page).append(btn);
        }

        $('#1').text('Play Game');
        $('#3').text('Control Settings');
        $('#2').text('Rules');
        $('#4').text('Hide Menu');
    }

    var removeLandingPage = function() {
        landing_page.detach();
        landing_page_removed = 1;
    }

    var getHighScore = function() {
        if (score > high_score) {
            high_score = score;
            body.append(high_score_page);
            setTimeout(function() {
                high_score_page.detach();
            }, 2000);
        }
    }

    var getScorePage = function() {
        getHighScore();
        body.append(score_page);
        score_title.text('Your score: ' + score + '!');
        game_info.text('Level: ' + level + '\n \n Cities Intact: ' 
        	+ cities_intact + '\n \n Your High Score: ' + high_score);
    }

    var removeScorePage = function() {
        score_page.detach();
    }

    var bringMenu = function() {
    	$(game_menu_btn).click(function() {
    		game_page.append(menu_box);
    		console.log('Menu');
    	})

    	for (var i = 0; i < 3; i++) {
            var ingame_box_menu_btn = $('<button>');
            $(ingame_box_menu_btn).addClass('ingame_box_menu_btn');
            var box_menu_btn_id = (i + 1).toString() + "_box_menu_btn";
            $(ingame_box_menu_btn).attr('id', box_menu_btn_id);
            (menu_box).append(ingame_box_menu_btn);
        }
        console.log($('#1_box_menu_btn'))
        $('#1_box_menu_btn').text('RESUME');
        $('#2_box_menu_btn').text('RESTART');
        $('#3_box_menu_btn').text('MAIN Menu');
    }

    var createGame = function() {
        body.append(game_page);
    }


    /* Function Calls */
    appender();
    getLandingPage();
    $('#1').click(function() {
        removeLandingPage();
        getScorePage();
        setTimeout(function() {
            removeScorePage();
            createGame();
        }, 1000)
        bringMenu();
    });


});
