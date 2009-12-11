// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

function sleep(ms)
{
	var dt = new Date();
	dt.setTime(dt.getTime() + ms);
	while (new Date().getTime() < dt.getTime());
}

function increment(number)
{
	return parseInt(number) + 1;
}

jQuery(document).ready(function() {
	
	// [$("#logo-citp"), $("#logo-princeton"), $("#logo-open"), $("#logo-check")]).each(function(el) {
	//     $(this).bind("mouseover", function() {
	//       var str = $(this).attr("src");
	//       $(this).attr('src', str.replace(".jpg", "-down.jpg"));
	//     });
	//     $(this).bind("mouseout", function() {
	//       var str = $(this).attr("src");
	//       $(this).attr('src', str.replace("-down.jpg", ".jpg"));
	//     });
	//   });
  $(".votebox tr.prompt td.idea").each(function(el) {
    $(this).bind("click", function() {
      $([$(this).children(".round-filledfg"), $(this).children(".round-filled").children()]).each(function(el) {
        $(this).css("background", "#0B0");
        $(this).css("border-left", "1px solid #0B0");
        $(this).css("border-right", "1px solid #0B0");

				//setTimeout("alert ('called from setTimeout()');",4000)
//				sleep(1000);

        // $(this).css("background", "#3198c1");
        // $(this).css("border-left", "1px solid #3198c1");
        // $(this).css("border-right", "1px solid #3198c1");
      });
      // $(this).unbind("mouseover")
      // $(this).unbind("mouseout")
    });
    $(this).bind("mouseover", function() {
      $([$(this).children(".round-filledfg"), $(this).children(".round-filled").children()]).each(function(el) {
        $(this).css("background", "#2b88ad");
        $(this).css("border-left", "1px solid #2b88ad");
        $(this).css("border-right", "1px solid #2b88ad");
      });
    });
    $(this).bind("mouseout", function() {
      $([$(this).children(".round-filledfg"), $(this).children(".round-filled").children()]).each(function(el) {
        $(this).css("background", "#3198c1");
        $(this).css("border-left", "1px solid #3198c1");
        $(this).css("border-right", "1px solid #3198c1");
      });
    });})
  

	 // $("#item").bind("click", function() {
	 //    if ($(this).attr("value") == $("#default_text").attr("value"))
	 //      $(this).attr("value", "");
	 //  });
	 //  $("#item").bind("keyup", function() {
	 //    var value = $(this).attr("value");
	 //    var len = $(this).attr("maxlength");
	 //    if (value.length > len) {
	 //      $(this).attr("value", value.substr(0, len));
	 //      $("#length_error").show();
	 //      setTimeout(function() { $("#length_error").fadeOut(1000); }, 3000);
	 //    }
	 //  });
	  $("#submit_btn").bind("mouseover", function() {
	    var str = $(this).attr("src");
	    $(this).attr('src', str.replace(".jpg", "-over.jpg"));
	  });
	  $("#submit_btn").bind("mouseout", function() {
	    var str = $(this).attr("src");
	    $(this).attr('src', str.replace("-over.jpg", ".jpg"));
	  });

	  $("#submit_btn").bind("mousedown", function() {
	    var str = $(this).attr("src");
	    if (str.indexOf("-over") == -1)
	      $(this).attr('src', str.replace(".jpg", "-down.jpg"));
	    else if(str.indexOf("-down") == -1)
	      $(this).attr('src', str.replace("-over.jpg", "-down.jpg"));
	  });


	$('a[rel*=facebox]').facebox();
	
	humanMsg.setup();
	$("#tabs").tabs();
	
	
	$('.new_idea_submit').bind('click',function(event){
		$.setFragment({ "page" : $.queryString(this.href).page });
		$('.indicator').show();
		var question_id = $(this).attr("rel");
		var new_idea = $('#new_idea_field').val();
		$('#new_idea_field').empty().val('').hint();
		$.post('/questions/' + question_id + '/add_idea.js',
		'authenticity_token='+encodeURIComponent(AUTH_TOKEN)+'&new_idea='+new_idea,
		function(data){
			$('.tellmearea').html(data["message"]);
			$('.leftside').html(data["newleft"]);
			$('.rightside').html(data["newright"]);
			//humanMsg.displayMsg(data["message"]);
			$('.prompter').effect("highlight", {}, 1500);
			current_item_count = $('#item_count').html();
			$('#item_count').html(increment(current_item_count)).effect("highlight", {}, 1500);
			$('.indicator').hide();
			
			var str = $("#submit_btn").attr("src");
			$("#submit_btn").attr('src', str.replace("-down.jpg", ".jpg"));
			
			
		},
		"json"
		);
		return false;
	});
	
	$('.skiplink').bind('click',function(event){
		$.setFragment({ "page" : $.queryString(this.href).page });
		$('.indicator').show();
		var question_id = $(this).attr("rel");
		$.post('/questions/' + question_id + '/skip.js',
		'authenticity_token='+encodeURIComponent(AUTH_TOKEN),
		function(data){
			$('.indicator').hide();
			$('.leftside').html(data["newleft"]);
			$('.rightside').html(data["newright"]);
			//humanMsg.displayMsg('<strong>Skipped.</strong> <span class="indent">You just skipped the last prompt.</span>');
			//$('.prompter').effect("highlight", {}, 1500);
			
		},
		"json"
		);
		return false;
	});
	
	$('input[title!=""]').hint();
	$('textarea[title!=""]').hint();
	
	
	$('.vote_left').bind('click',function(event){
		//$.setFragment({ "prompt" : $.queryString($('a#leftside').attr("choice_id")) });
		
		
		var question_id = $(this).attr("rel");
		var question_slug = $(this).attr("question_slug");
		
		var loser = "<a href='/questions/" + $('a#rightside').attr("question_slug") + "/choices/" + $('a#rightside').attr("choice_id") + "'>" + $('a#rightside').html() + "</a>";
		var winner = "<a href='/questions/" + $('a#leftside').attr("question_slug") + "/choices/" + $('a#leftside').attr("choice_id") + "'>" + $('a#leftside').html() + "</a>";
		
		$.ajax({
		 type: "post",
		 url: '/questions/' + question_id + '/vote_left.js',
		 dataType: "json",
		 data: {
			'authenticity_token' : encodeURIComponent(AUTH_TOKEN)
		 },
		 beforeSend: function() {
		  $('.tellmearea').html('');
			$('.indicator').show();
		 },
		 timeout: 5000,
		 error: function(request,error) {
			$('.indicator').hide();
		  if (error == "timeout") {
			$('.tellmearea').html('Sorry, voting is taking too long ... too much traffic!').effect("highlight", {color: '#ff0000'}, 1500);
		  }
		  else {
				$('.tellmearea').html("Sorry, your vote wasn't counted ... there was an error").effect("highlight", {color: '#ff0000'}, 1500);
		  }
		  },
		  success: function(data){
				$('.indicator').hide();
				$('.leftside').html(data["newleft"]);
				$('.rightside').html(data["newright"]);

				$('.tellmearea').html("You chose " + winner + " over " + loser).effect("highlight", {}, 1500);
				current_vote_count = $('#votes_count').html();
				$('#votes_count').html(increment(current_vote_count)).effect("highlight", {}, 1500);

			  $(".votebox tr.prompt td.idea").each(function(el) {
			      $([$(this).children(".round-filledfg"), $(this).children(".round-filled").children()]).each(function(el) {

			        $(this).css("background", "#3198c1");
			        $(this).css("border-left", "1px solid #3198c1");
			        $(this).css("border-right", "1px solid #3198c1");

					    $(this).bind("mouseover", function() {
					      $([$(this).children(".round-filledfg"), $(this).children(".round-filled").children()]).each(function(el) {
					        $(this).css("background", "#2b88ad");
					        $(this).css("border-left", "1px solid #2b88ad");
					        $(this).css("border-right", "1px solid #2b88ad");
					      });
					    });
					    $(this).bind("mouseout", function() {
					      $([$(this).children(".round-filledfg"), $(this).children(".round-filled").children()]).each(function(el) {
					        $(this).css("background", "#3198c1");
					        $(this).css("border-left", "1px solid #3198c1");
					        $(this).css("border-right", "1px solid #3198c1");
					      });
					    });
				    });
				});
					} // End success
		}); // End ajax method
		
		return false;
	});







	$('.vote_right').bind('click',function(event){
		//$.setFragment({ "prompt" : $.queryString($('a#leftside').attr("choice_id")) });

		var question_id = $(this).attr("rel");
		var question_slug = $(this).attr("question_slug");
		var loser = "<a href='/questions/" + $('a#leftside').attr("question_slug") + "/choices/" + $('a#leftside').attr("choice_id") + "'>" + $('a#leftside').html() + "</a>";
		var winner = "<a href='/questions/" + $('a#rightside').attr("question_slug") + "/choices/" + $('a#rightside').attr("choice_id") + "'>" + $('a#rightside').html() + "</a>";	
		
		$.ajax({
		 type: "post",
		 url: '/questions/' + question_id + '/vote_right.js',
		 dataType: "json",
		 data: {
			'authenticity_token' : encodeURIComponent(AUTH_TOKEN)
		 },
		 beforeSend: function() {
		  $('.tellmearea').html('');
			$('.indicator').show();
		 },
		 timeout: 5000,
		 error: function(request,error) {
			$('.indicator').hide();
		  if (error == "timeout") {
			$('.tellmearea').html('Sorry, voting is taking too long ... too much traffic!').effect("highlight", {color: '#ff0000'}, 1500);
		  }
		  else {
				$('.tellmearea').html("Sorry, your vote wasn't counted ... there was an error").effect("highlight", {color: '#ff0000'}, 1500);
		  }
		  },
		  success:  function(data){
				$('.indicator').hide();
				$('.leftside').html(data["newleft"]);
				$('.rightside').html(data["newright"]);
				$('.tellmearea').html("You chose " + winner + " over " + loser).effect("highlight", {}, 1500);
				current_vote_count = $('#votes_count').html();
				$('#votes_count').html(increment(current_vote_count)).effect("highlight", {}, 1500);
				$(".votebox tr.prompt td.idea").each(function(el) {
			      $([$(this).children(".round-filledfg"), $(this).children(".round-filled").children()]).each(function(el) {
			        $(this).css("background", "#3198c1");
			        $(this).css("border-left", "1px solid #3198c1");
			        $(this).css("border-right", "1px solid #3198c1");
					    $(this).bind("mouseover", function() {
					      $([$(this).children(".round-filledfg"), $(this).children(".round-filled").children()]).each(function(el) {
					        $(this).css("background", "#2b88ad");
					        $(this).css("border-left", "1px solid #2b88ad");
					        $(this).css("border-right", "1px solid #2b88ad");
					      });
					    });
					    $(this).bind("mouseout", function() {
					      $([$(this).children(".round-filledfg"), $(this).children(".round-filled").children()]).each(function(el) {
					        $(this).css("background", "#3198c1");
					        $(this).css("border-left", "1px solid #3198c1");
					        $(this).css("border-right", "1px solid #3198c1");
					      });
					    });
				    });
				});
			}// End success
		}); // End ajax method
		return false;
	});
});