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

    // Go back Button
    var back_btn = $('<div>');
    back_btn.addClass('back_btn');

    // Landing Page
    var landing_page = $('<div>');
    landing_page.addClass('landing_page');

    var intro_tag = $('<div>');
    intro_tag.addClass('intro_tag');

    // Rule Page
    var rule_page = $('<div>');
    rule_page.addClass('rule_page');

    var rules = $('<p>');
    rules.text("Your goal is to protect your 6 cities from enemy missiles. You will have 3 missile launchers that will have 10 missiles that you must use to target enemy missiles. The launchers are subject to attack as well and must be protected. If all 3 launchers run out of missiles, you will remain helpless until the end of the level. Use the side bar to the right to chose the launcher you want to use. You can only lose 3 cities per level and your launchers will be rebuilt and refreshed as you continue through the game. Try to attain as high a score as possible. Good Luck!");
    rules.addClass('rules')
    rule_page.append(rules);

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

    var game_menu_btn = $('<button>');
    game_menu_btn.addClass('game_menu_btn');
    game_menu_btn.text("STOP");
    nav_bar.append(game_menu_btn);

    var gun_btn_one = $('<div>');
    gun_btn_one.addClass('gun_btn');
    gun_btn_one.addClass('gun_btn_one');
    gun_btn_one.text(1);
    nav_bar.append(gun_btn_one);

    var gun_btn_two = $('<div>');
    gun_btn_two.addClass('gun_btn');
    gun_btn_two.addClass('gun_btn_two');
    gun_btn_two.text(2);
    nav_bar.append(gun_btn_two);

    var gun_btn_three = $('<div>');
    gun_btn_three.addClass('gun_btn');
    gun_btn_three.addClass('gun_btn_three');
    gun_btn_three.text(3);
    nav_bar.append(gun_btn_three);

    var ground = $('<div>');
    ground.addClass('ground');
    for (var i = 0; i < 6; i++) {
        var city = $('<div>');
        city.addClass('city');
        var city_id = "city_" + (i + 1).toString();
        city.attr('id', city_id);
        ground.append(city);
    }
    var silo_1 = $('<div>');
    silo_1.addClass('silo_1');
    ground.append(silo_1);

    var silo_2 = $('<div>');
    silo_2.addClass('silo_2');
    ground.append(silo_2);

    var silo_3 = $('<div>');
    silo_3.addClass('silo_3');
    ground.append(silo_3);

    var missile = $('<div>');
    missile.addClass('missile');
    silo_1.append(missile);

    var menu_box = $('<div>');
    menu_box.addClass('menu_box');

    for (var i = 0; i < 3; i++) {
        var ingame_box_menu_btn = $('<button>');
        $(ingame_box_menu_btn).addClass('ingame_box_menu_btn');
        var box_menu_btn_id = (i + 5).toString(); // + "_box_menu_btn";
        $(ingame_box_menu_btn).attr('id', box_menu_btn_id);
        (menu_box).append(ingame_box_menu_btn);
    }


    /* Function Implementations */
    var appender = function() {
        landing_page.append(intro_tag);
        high_score_page.append(high_score_box);
        score_page.append(score_box);
        score_box.append(score_title);
        score_box.append(game_info);
        game_page.append(nav_bar);
        game_page.append(ground);
    }

    var goBack = function() {
        body.append(back_btn);
        $(back_btn).click(function() {
            rule_page.detach();
            body.append(landing_page);
            back_btn.detach();
        })
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
        $('#2').text('Rules');
        $('#3').text('Control Settings');
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
        body.append(score_page);
        score_title.text('Your score: ' + score + '!');
        game_info.text('Level: ' + level + '\n \n Cities Intact: ' + cities_intact + '\n \n Your High Score: ' + high_score);
        setTimeout(function() {
            removeScorePage();
            createGame();
        }, 1000)
    }



    var removeScorePage = function() {
        score_page.detach();
    }

    var resumeGame = function() {
        $('#5').click(function() {
            menu_box.detach();
        })
    }

    var restartGame = function() {
        $('#6').click(function() {
            alert('works');
        })
    }

    var backToMainMenu = function() {
        $('#7').click(function() {
            menu_box.detach();
            game_page.detach();
            body.append(landing_page);
        })
    }

    var bringInGameMenu = function() {
        $(game_menu_btn).click(function() {
            game_page.append(menu_box);
            console.log('Menu');
            $('#5').text('RESUME');
            $('#6').text('RESTART');
            $('#7').text('MAIN MENU');
            resumeGame();
            restartGame();
            backToMainMenu();
        })
    }

    var createGame = function() {
        body.append(game_page);
    }

    var getToGame = function() {
        $('#1').click(function() {
            removeLandingPage();
            if (score > high_score) {
                getHighScore();
                setTimeout(function() {
                    getScorePage();
                }, 2000);
            } else {
                getScorePage();
            }
        });

        $('#2').click(function() {
            landing_page.detach();
            goBack();
            body.append(rule_page);
        })

        $('#3').click(function() {
            alert('works');
        })

        $('#4').click(function() {
            landing_page.detach();
            goBack();
        })
    }

    var gun_one_glow = function() {
        $(gun_btn_one).on("click", function() {
            console.log('gun works');
            $(gun_btn_one).css("background", "yellow");
            $(silo_1).css( {
            	backgroundImage: 'url(images/yellow_launcher.png)'
            })
            $(silo_2).css( {
            	backgroundImage: 'url(images/red_launcher.png)'
            })
            $(silo_3).css( {
            	backgroundImage: 'url(images/red_launcher.png)'
            })
            $(gun_btn_one).css("color", "black");
            $(gun_btn_two).css("background", "#006400");
            $(gun_btn_two).css("color", "white");
            (gun_btn_three).css("background", "#006400");
            $(gun_btn_three).css("color", "white");
        })
    }

    var gun_two_glow = function() {
        (gun_btn_two).on("click", function() {
            console.log('gun works');
            $(gun_btn_two).css("background", "yellow");
            $(silo_1).css( {
            	backgroundImage: 'url(images/red_launcher.png)'
            })
            $(silo_2).css( {
            	backgroundImage: 'url(images/yellow_launcher.png)'
            })
            $(silo_3).css( {
            	backgroundImage: 'url(images/red_launcher.png)'
            })
            $(gun_btn_two).css("color", "black");
            $(gun_btn_one).css("background", "#006400");
            $(gun_btn_one).css("color", "white");
            (gun_btn_three).css("background", "#006400");
            $(gun_btn_three).css("color", "white");
        })
    }
    var gun_three_glow = function() {
        (gun_btn_three).on("click", function() {
            console.log('gun works');
            $(gun_btn_three).css("background", "yellow");
            $(silo_1).css( {
            	backgroundImage: 'url(images/red_launcher.png)'
            })
            $(silo_2).css( {
            	backgroundImage: 'url(images/red_launcher.png)'
            })
            $(silo_3).css( {
            	backgroundImage: 'url(images/yellow_launcher.png)'
            })
            $(gun_btn_three).css("color", "black");
            $(gun_btn_one).css("background", "#006400");
            $(gun_btn_one).css("color", "white");
            (gun_btn_two).css("background", "#006400");
            $(gun_btn_two).css("color", "white");
        })
    }

    var glowGun = function() {
        gun_one_glow();
        gun_two_glow();
        gun_three_glow();
    }

    /* Function Calls */
    appender();
    getLandingPage();
    getToGame();
    glowGun();
    bringInGameMenu();

    /*
    $(body).click(function() {
    	$(body).toggle('explode');
    })
    */



});
