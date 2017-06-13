console.log("JS Works!");

jQuery(function() {
    console.log("jQuery Works!");

    // Global Variables
    var land_page_removed = 0;
    var score = 0;
    var high_score = 0;
    var level = 1;
    var line_speed = 10000 / (level * 0.5) + 5000;
    var cities = 6;
    var nextLine = 1000 / level;
    var counter = 0
    var need_new_level = false;
    var gameOver = false;
    var end_of_game;
    var checkCounter;
    var menu_box_interval;


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
    score_page.append(back_btn);

    var score_box = $('<div>');
    score_box.addClass('score_box');

    var score_title = $('<h1>');
    score_title.addClass('score_title');

    var game_info = $('<p>');
    game_info.addClass('game_info');


    // Game Page 
    var game_page = $('<div>');
    game_page.addClass('game_page');

    var game_box = $('<div>');
    game_box.addClass('game_box');
    game_page.append(game_box);

    var nav_bar = $('<nav>');
    nav_bar.addClass('nav_bar');

    var level_page = $('<div>');
    level_page.addClass('level_page');

    var game_menu_btn = $('<button>');
    game_menu_btn.addClass('game_menu_btn');
    game_menu_btn.text("STOP");
    nav_bar.append(game_menu_btn);

    var score_keeper = $('<div>');
    score_keeper.addClass('score_keeper');
    nav_bar.append(score_keeper)

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

    for (var i = 1; i < 11; i++) {
        var missile_1 = $('<div>');
        missile_1.addClass('missile_1');
        var missile_id_1 = 'A' + i.toString();
        missile_1.attr('id', missile_id_1);
        silo_1.append(missile_1);

        var missile_2 = $('<div>');
        missile_2.addClass('missile_2');
        var missile_id_2 = 'B' + i.toString();
        missile_2.attr('id', missile_id_2);
        silo_2.append(missile_2);

        var missile_3 = $('<div>');
        missile_3.addClass('missile_3');
        var missile_id_3 = 'C' + i.toString();
        missile_3.attr('id', missile_id_3);
        silo_3.append(missile_3);
    }

    for (var i = 1; i < 10; i++) {
        var line = $('<div>');
        line.addClass('line');
        var line_id = 'line' + i.toString();
        line.attr('id', line_id);
        var position = (i * 100) - 60;
        var right_move = 'translateX(' + position.toString() + 'px)';
        line.css({
            transform: right_move
        })
        game_box.append(line);
    }


    var menu_box = $('<div>');
    menu_box.addClass('menu_box');

    for (var i = 0; i < 3; i++) {
        var ingame_box_menu_btn = $('<button>');
        $(ingame_box_menu_btn).addClass('ingame_box_menu_btn');
        var box_menu_btn_id = (i + 5).toString(); // + "_box_menu_btn";
        $(ingame_box_menu_btn).attr('id', box_menu_btn_id);
        (menu_box).append(ingame_box_menu_btn);
    }

    var game_over_page = $('<div>');
    game_over_page.addClass('game_over_page');
    game_over_page.text('GAME OVER!!!');


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

    var checkForClearance = function() {
        checkCounter = setInterval(function() {
            if (cities == 0) {
                gameOver = true;
                console.log('Game Over');
                console.log(gameOver);
                clearInterval(checkCounter);
            } else if (counter == 3) {
                need_new_level = true;
                console.log(counter);
                console.log('Meed New Level');
            }
        })
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
            window.clearInterval(end_of_game);
        }
    }

    var getScorePage = function() {
        body.append(score_page);
        score_title.text('Your score: ' + score + '!');
        game_info.text('Level: ' + level + '\n \n Cities Intact: ' + cities + '\n \n Your High Score: ' + high_score);
        setTimeout(function() {
            removeScorePage();
            createGame();
        }, 1000)
        score_page.append(back_btn);
        back_btn.css({ transform: 'translateY(-600px)' });
        $(back_btn).click(function() {
            score_page.detach();
            body.append(landing_page);
            back_btn.detach();
        })
    }

    var sayGameOver = function() {
        end_of_game = setInterval(function() {
            if (gameOver == true) {
                game_page.detach();
                body.append(game_over_page);
                setTimeout(function() {
                    game_over_page.detach();
                    getHighScore();
                    setTimeout(function() {
                        body.append(score_page);
                        score_title.text('Your score: ' + score + '!');
                        game_info.text('Level: ' + level + '\n \n Cities Intact: ' + cities + '\n \n Your High Score: ' + high_score);
                    }, 3000)
                }, 3000)

                // cities = 6;
                gameOver = false;


            }
        })
    }

    var removeScorePage = function() {
        score_page.detach();
    }

    var bringInGameMenu = function() {
        $(game_menu_btn).click(function() {
            menu_box_interval = setInterval(function() {
                $(game_box).stop();
                $('#line1').stop();
                $('#line2').stop();
                $('#line3').stop();
                $('#line4').stop();
                $('#line5').stop();
                $('#line6').stop();
                $('#line7').stop();
                $('#line8').stop();
                $('#line9').stop();
            }, 100)

            game_box.append(menu_box);
            console.log('Menu');
            $('#5').text('RESUME');
            $('#6').text('RESTART');
            $('#7').text('MAIN MENU');

            $('#5').click(function() {
                menu_box.detach();
                clearInterval(menu_box_interval);
            })
            $('#6').click(function() {
                menu_box.detach();
                clearInterval(menu_box_interval);
                game_page.detach();
                body.append(landing_page);
            })
            $('#7').click(function() {
                menu_box.detach();
                clearInterval(menu_box_interval);
                game_page.detach();
                body.append(landing_page);
            })
        })
    }

    var createGame = function() {
        body.append(game_page);
    }

    var getToGame = function() {
        $('#1').click(function() {
            removeLandingPage();
            if (score > high_score) {
                // getHighScore();
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
            $(silo_1).css({
                backgroundImage: 'url(images/yellow_launcher.png)'
            })
            $(silo_2).css({
                backgroundImage: 'url(images/red_launcher.png)'
            })
            $(silo_3).css({
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
            $(silo_1).css({
                backgroundImage: 'url(images/red_launcher.png)'
            })
            $(silo_2).css({
                backgroundImage: 'url(images/yellow_launcher.png)'
            })
            $(silo_3).css({
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
            $(silo_1).css({
                backgroundImage: 'url(images/red_launcher.png)'
            })
            $(silo_2).css({
                backgroundImage: 'url(images/red_launcher.png)'
            })
            $(silo_3).css({
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

    var removeMissiles_1 = function() {
        for (var i = 1; i < 11; i++) {
            console.log('missile A', i);
            var missile_id_1 = 'A' + i.toString();
            var missile_test = $('#' + missile_id_1);
            console.log(missile_test);
            missile_test.remove();
        }
    }

    var removeMissiles_2 = function() {
        for (var i = 1; i < 11; i++) {
            var missile_id_2 = 'B' + i.toString();
            $('#' + missile_id_2).remove();
        }
    }

    var removeMissiles_3 = function() {
        for (var i = 1; i < 11; i++) {
            var missile_id_3 = 'C' + i.toString();
            $('#' + missile_id_3).remove();
        }
    }

    var burnCity = function() {
        var attack_one = setInterval(function() {
            var line_1_height = $('#line1').height();
            //console.log(line_1_height);
            if (line_1_height > 515) {
                silo_1.css({
                    backgroundImage: 'url(images/Fire-PNG-image-1.png)'
                })
                removeMissiles_1();
                clearInterval(attack_one);
            }
        })

        var attack_two = setInterval(function() {
            var line_2_height = $('#line2').height();
            //console.log(line_2_height);
            if (line_2_height > 515) {
                $('#city_1').css({
                    backgroundImage: 'url(images/Fire-PNG-image-1.png)'
                })
                clearInterval(attack_two);
                cities--;
                counter++;
            }
        })

        var attack_three = setInterval(function() {
            var line_3_height = $('#line3').height();
            //console.log(line_3_height);
            if (line_3_height > 515) {
                $('#city_2').css({
                    backgroundImage: 'url(images/Fire-PNG-image-1.png)'
                })
                clearInterval(attack_three);
                cities--;
                counter++;
            }
        })


        var attack_four = setInterval(function() {
            var line_4_height = $('#line4').height();
            //console.log(line_4_height);
            if (line_4_height > 515) {
                $('#city_3').css({
                    backgroundImage: 'url(images/Fire-PNG-image-1.png)'
                })
                clearInterval(attack_four);
                cities--;
                counter++;
            }
        })

        var attack_five = setInterval(function() {
            var line_5_height = $('#line5').height();
            //console.log(line_5_height);
            if (line_5_height > 515) {
                silo_2.css({
                    backgroundImage: 'url(images/Fire-PNG-image-1.png)'
                })
                removeMissiles_2();
                clearInterval(attack_five);
            }
        })

        var attack_six = setInterval(function() {
            var line_6_height = $('#line6').height();
            //console.log(line_6_height);
            if (line_6_height > 515) {
                $('#city_4').css({
                    backgroundImage: 'url(images/Fire-PNG-image-1.png)'
                })
                clearInterval(attack_six);
                cities--;
                counter++;
            }
        })

        var attack_seven = setInterval(function() {
            var line_7_height = $('#line7').height();
            //console.log(line_7_height);
            if (line_7_height > 515) {
                $('#city_5').css({
                    backgroundImage: 'url(images/Fire-PNG-image-1.png)'
                })
                clearInterval(attack_seven);
                cities--;
                counter++;
            }
        })

        var attack_eight = setInterval(function() {
            var line_8_height = $('#line8').height();
            //console.log(line_8_height);
            if (line_8_height > 515) {
                $('#city_6').css({
                    backgroundImage: 'url(images/Fire-PNG-image-1.png)'
                })
                clearInterval(attack_eight);
                cities--;
                counter++;
            }
        })

        var attack_nine = setInterval(function() {
            var line_9_height = $('#line9').height();
            //console.log(line_9_height);
            if (line_9_height > 515) {
                silo_3.css({
                    backgroundImage: 'url(images/Fire-PNG-image-1.png)'
                })
                removeMissiles_3();
                clearInterval(attack_nine);
            }
        })
    }

    var clearLaunchers = function() {
        var clearence_checker = setInterval(function() {
            if (need_new_level == true) {
                console.log('clearGame Works');
                $(silo_1).css({ backgroundImage: 'url(images/red_launcher.png)' });
                $(silo_2).css({ backgroundImage: 'url(images/red_launcher.png)' });
                $(silo_3).css({ backgroundImage: 'url(images/red_launcher.png)' });
                for (var i = 1; i < 10; i++) {
                    var line_id = 'line' + i.toString();
                    $('#' + line_id).remove();
                    var line = $('<div>');
                    line.addClass('line');
                    line.attr('id', line_id);
                    var position = (i * 100) - 60;
                    var right_move = 'translateX(' + position.toString() + 'px)';
                    line.css({
                        transform: right_move
                    })
                    game_box.append(line);
                }

                var nextTimeOut = false;
                level++;
                var detacher = setTimeout(function() {
                    game_page.detach();
                    nextTimeOut = true;
                    level_page.text('LEVEL ' + level);
                    body.append(level_page);
                    var appenderr = setTimeout(function() {
                        game_page.detach();
                        level_page.detach();
                        body.append(game_page);
                    }, 3000)
                }, 1000)

                counter = 0;
                need_new_level = false;
            }
        })
    }

    var enemyFire = function() {
        $(game_box).click(function() {
            var line_wait = nextLine * 8;
            setTimeout(function() {
                $('#line1').animate({
                    height: "1030px"
                }, line_speed)
            }, line_wait)

            var line_wait = nextLine * 6;
            setTimeout(function() {
                $('#line2').animate({
                    height: "1030px"
                }, line_speed)
            }, line_wait)

            var line_wait = nextLine * 7;
            setTimeout(function() {
                $('#line3').animate({
                    height: "1030px"
                }, line_speed)
            }, line_wait)

            setTimeout(function() {
                $('#line4').animate({
                    height: "1030px"
                }, line_speed)
            }, nextLine)

            var line_wait = nextLine * 4;
            setTimeout(function() {
                $('#line5').animate({
                    height: "1030px"
                }, line_speed)
            }, line_wait)

            setTimeout(function() {
                $('#line6').animate({
                    height: "1030px"
                }, line_speed)
            }, 0)

            var line_wait = nextLine * 9;
            setTimeout(function() {
                $('#line7').animate({
                    height: "1030px"
                }, line_speed)
            }, line_wait)

            var line_wait = nextLine * 2;
            setTimeout(function() {
                $('#line8').animate({
                    height: "1030px"
                }, line_speed)
            }, line_wait)

            var line_wait = nextLine * 3;
            setTimeout(function() {
                $('#line9').animate({
                    height: "1030px"
                }, line_speed)
            }, line_wait)
        });
    }

    var explosion = $('<div>');
    explosion.addClass('explosion');
    score_keeper.text('Score: ' + score);

    $(game_box).on('click', function(event) {
        console.log("pageX: " + event.pageX + ", pageY: " + event.pageY);
        $(explosion).css('top', event.pageY);
        $(explosion).css('left', event.pageX);
        explosion.fadeIn(500, function() {
            opacity: '1'
            game_page.append(explosion);
        });
        setTimeout(function() {
            explosion.fadeOut(500);
        }, 500)

        var position_1 = $('#line1').position();
        var position_2 = $('#line2').position();
        var position_3 = $('#line3').position();
        var position_4 = $('#line4').position();
        var position_5 = $('#line5').position();
        var position_6 = $('#line6').position();
        var position_7 = $('#line7').position();
        var position_8 = $('#line8').position();
        var position_9 = $('#line9').position();

        if (event.pageX > position_1.left - 50 && event.pageX < position_1.left + 50) {
            score = score + level;
            score_keeper.text('Score: ' + score);
            console.log(position_1.left)
            $('#line1').detach();
        }
        if (event.pageX > position_2.left - 50 && event.pageX < position_2.left + 50) {
            score = score + level;
            score_keeper.text('Score: ' + score);
            console.log(position_2.left)
            $('#line2').detach();
        }
        if (event.pageX > position_3.left - 50 && event.pageX < position_3.left + 50) {
            score = score + level;
            score_keeper.text('Score: ' + score);
            console.log(position_3.left)
            $('#line3').detach();
        }
        if (event.pageX > position_4.left - 50 && event.pageX < position_4.left + 50) {
            score = score + level;
            score_keeper.text('Score: ' + score);
            console.log(position_4.left)
            $('#line4').detach();
        }
        if (event.pageX > position_5.left - 50 && event.pageX < position_5.left + 50) {
            score = score + level;
            score_keeper.text('Score: ' + score);
            console.log(position_5.left)
            $('#line5').detach();
        }
        if (event.pageX > position_6.left - 50 && event.pageX < position_6.left + 50) {
            score = score + level;
            score_keeper.text('Score: ' + score);
            console.log(position_6.left)
            $('#line6').detach();
        }
        if (event.pageX > position_7.left - 50 && event.pageX < position_7.left + 50) {
            score = score + level;
            score_keeper.text('Score: ' + score);
            console.log(position_7.left)
            $('#line7').detach();
        }
        if (event.pageX > position_8.left - 50 && event.pageX < position_8.left + 50) {
            score = score + level;
            score_keeper.text('Score: ' + score);
            console.log(position_8.left)
            $('#line8').detach();
        }
        if (event.pageX > position_9.left - 50 && event.pageX < position_9.left + 50) {
            score = score + level;
            score_keeper.text('Score: ' + score);
            console.log(position_9.left)
            $('#line9').detach();
        }
    })




    /* Function Calls */
    appender();
    getLandingPage();
    checkForClearance();
    getToGame();
    glowGun();
    bringInGameMenu();
    enemyFire();
    burnCity();
    clearLaunchers();
    sayGameOver();
});
