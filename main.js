console.log("JS Works!");

jQuery(function() {
    console.log("jQuery Works!");

    var body = $('body');
    body.css({
        backgroundColor: 'black'
    });

    var makeLandingPage = function() {
        var landing_page = $('<div>');
        body.append(landing_page);
        landing_page.css({
            width: '100%',
            height: '100%'
        })

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
        	var btn_id = (i+1).toString();
        	$(btn).attr('id', btn_id);
        	(landing_page).append(btn);
        }

        $('.btn').css( {
        	display: 'inline block',
        	display: 'table',
        	margin: '0 auto',
        	width: '300px',
        	height: '50px',
        	marginTop: '20px',
        	marginBottom: '10px',
        	backgroundColor: 'gray',
        	color: 'white',
        	fontSize: '24px'
        })
        $('#1').text('Single Player');
        $('#2').text('Multi Player');
        $('#3').text('Control Settings');
        $('#4').text('Hide Menu');
    }

    makeLandingPage();





});
