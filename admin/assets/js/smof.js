/**
 * SMOF js
 *
 * contains the core functionalities to be used
 * inside SMOF
 */




	jQuery(document).ready(function ($) {

			function mediaUploader(bid) {

				var tgm_media_frame;

				if (tgm_media_frame) {
					tgm_media_frame.open();
					return;
				}

				tgm_media_frame = wp.media.frames.tgm_media_frame = wp.media({
					multiple: true,
					library: {
						type: 'image'
					},
				});

				tgm_media_frame.on('select', function () {
					var selection = tgm_media_frame.state().get('selection');
					selection.map(function (attachment) {
						attachment = attachment.toJSON();

						$('[data-action="' + bid + '-image"]').removeClass('nor-dontshow');
						$('[data-action="' + bid + '-remove"]').removeClass('nor-dontshow');

						if ($('[data-action="' + bid + '-container"] img').length > 0) {
							$('[data-action="' + bid + '-container"] img').attr('src', attachment.url);
						} else {
							gurl = attachment.url.split('/');
							$('[data-action="' + bid + '-container"] .nor-image-upload-margin').html(gurl[gurl.length - 1]);
						}

						$('[data-action="' + bid + '-container"] input').val(attachment.url);


					});
				});

				tgm_media_frame.open();

			}

		$('body').on('click', '.nor-upload-button', function (e) {

			mediaUploader($(this).data('id'));
			e.preventDefault();

		});
	});


jQuery.noConflict();

var googf = false;
function loadGooglef() {
	// FOR GOOGLE FONTS REALTIME VIEWING
	if(!googf) {
	jQuery('.gfontscomehead').fontselect().change(function(){

          // replace + signs with spaces for css
          var font = jQuery(this).val().replace(/\+/g, ' ');
          // split font into family and weight
          font = font.split(':');
          // set family on heading
          jQuery('h1.gfontsviewhead').css('font-family', font[0]);
        });;

	jQuery('.gfontscome').fontselect().change(function(){

          // replace + signs with spaces for css
          var font = jQuery(this).val().replace(/\+/g, ' ');
          // split font into family and weight
          font = font.split(':');
          // set family on paragraphs
          jQuery('p.gfontsview').css('font-family', font[0]);
    });
	googf = true;
	}
}

function checkAllFields() {
		if(jQuery('#of-radio-img-md_css_presets1').is(':checked')) {
			jQuery('select[name=md_css_bgpattern]').val('_Plain_White.png');
		}
		if(jQuery('#of-radio-img-md_css_presets2').is(':checked')) {
			jQuery('select[name=md_css_bgpattern]').val('bedge_grunge.jpg');
		}
		if(jQuery('#of-radio-img-md_css_presets3').is(':checked')) {
			jQuery('select[name=md_css_bgpattern]').val('dark_navy_blue.png');
		}

		if(jQuery('#of-radio-img-md_css_presets4').is(':checked')) {
			jQuery('.presethidden').fadeIn();
		}else{
			jQuery('.presethidden').fadeOut();
		}
}
/** Fire up jQuery - let's dance!
 */
jQuery(document).ready(function($){

	///
	$('[name=md_css_bgpattern]').change(function() {
		if($(this).val()=='--No Pattern--') {
		$('div.bgpatterndiv').css('background','#fff');
		}else{
		$('div.bgpatterndiv').css('background','url('+wpurl.siteurl+'/images/bgpatterns/'+$(this).val()+')');
		}
	})

	/// PRESETS
	if(jQuery('#of-radio-img-md_css_presets4').is(':checked')) {
		jQuery('.presethidden').show();
	}else{
		jQuery('.presethidden').hide();
	}

	//(un)fold options in a checkbox-group
  	jQuery('.fld').click(function() {
    	var $fold='.f_'+this.id;
    	$($fold).slideToggle('normal', "swing");
  	});

	//delays until AjaxUpload is finished loading
	//fixes bug in Safari and Mac Chrome
	if (typeof AjaxUpload != 'function') {
			return ++counter < 6 && window.setTimeout(init, counter * 500);
	}

	//hides warning if js is enabled
	$('#js-warning').hide();

	//Tabify Options
	$('.group').hide();

	// Display last current tab
	if ($.cookie("of_current_opt") === null) {

		$('.group:first').fadeIn('fast');
		$('#of-nav li:first').addClass('current');
	} else {

		var hooks = $('#hooks').html();
		hooks = jQuery.parseJSON(hooks);

		$.each(hooks, function(key, value) {

			if ($.cookie("of_current_opt") == '#of-option-'+ value) {
				$('.group#of-option-' + value).fadeIn();
				$('#of-nav li.' + value).addClass('current');

					if(value=='fonts') {
						loadGooglef();
					}

			}

		});

	}

	//Current Menu Class
	$('#of-nav li a').click(function(evt){
		if($(this).parent().attr('class')=='fonts') {
			loadGooglef();
		}
	// event.preventDefault();

		$('#of-nav li').removeClass('current');
		$(this).parent().addClass('current');

		var clicked_group = $(this).attr('href');

		$.cookie('of_current_opt', clicked_group, { expires: 7, path: '/' });

		$('.group').hide();

		$(clicked_group).fadeIn('fast');
		return false;

	});

	//Expand Options
	var flip = 0;

	$('#expand_options').click(function(){
		if(flip == 0){
			flip = 1;
			$('#of_container #of-nav').hide();
			$('#of_container #content').width(755);
			$('#of_container .group').add('#of_container .group h2').show();

			$(this).removeClass('expand');
			$(this).addClass('close');
			$(this).text('Close');

		} else {
			flip = 0;
			$('#of_container #of-nav').show();
			$('#of_container #content').width(595);
			$('#of_container .group').add('#of_container .group h2').hide();
			$('#of_container .group:first').show();
			$('#of_container #of-nav li').removeClass('current');
			$('#of_container #of-nav li:first').addClass('current');

			$(this).removeClass('close');
			$(this).addClass('expand');
			$(this).text('Expand');

		}

	});

	//Update Message popup
	$.fn.center = function () {
		this.animate({"top":( $(window).height() - this.height() - 200 ) / 2+$(window).scrollTop() + "px"},100);
		this.css("left", 250 );
		return this;
	}


	$('#of-popup-save').center();
	$('#of-popup-reset').center();
	$('#of-popup-fail').center();

	$(window).scroll(function() {
		$('#of-popup-save').center();
		$('#of-popup-reset').center();
		$('#of-popup-fail').center();
	});


	//Masked Inputs (images as radio buttons)
	$('.of-radio-img-img').click(function(){
		$(this).parent().parent().find('.of-radio-img-img').removeClass('of-radio-img-selected');
		$(this).addClass('of-radio-img-selected');
	});
	$('.of-radio-img-label').hide();
	$('.of-radio-img-img').show();
	$('.of-radio-img-radio').hide();

	//Masked Inputs (background images as radio buttons)
	$('.of-radio-tile-img').click(function(){
		$(this).parent().parent().find('.of-radio-tile-img').removeClass('of-radio-tile-selected');
		$(this).addClass('of-radio-tile-selected');
	});
	$('.of-radio-tile-label').hide();
	$('.of-radio-tile-img').show();
	$('.of-radio-tile-radio').hide();

	//AJAX Upload
	function of_image_upload() {
	$('.image_upload_button').each(function(){

	var clickedObject = $(this);
	var clickedID = $(this).attr('id');

	var nonce = $('#security').val();

	new AjaxUpload(clickedID, {
		action: ajaxurl,
		name: clickedID, // File upload name
		data: { // Additional data to send
			action: 'of_ajax_post_action',
			type: 'upload',
			security: nonce,
			data: clickedID },
		autoSubmit: true, // Submit file after selection
		responseType: false,
		onChange: function(file, extension){},
		onSubmit: function(file, extension){
			clickedObject.text('Uploading'); // change button text, when user selects file
			this.disable(); // If you want to allow uploading only 1 file at time, you can disable upload button
			interval = window.setInterval(function(){
				var text = clickedObject.text();
				if (text.length < 13){	clickedObject.text(text + '.'); }
				else { clickedObject.text('Uploading'); }
				}, 200);
		},
		onComplete: function(file, response) {
			window.clearInterval(interval);
			clickedObject.text('Upload Image');
			this.enable(); // enable upload button


			// If nonce fails
			if(response==-1){
				var fail_popup = $('#of-popup-fail');
				fail_popup.fadeIn();
				window.setTimeout(function(){
				fail_popup.fadeOut();
				}, 2000);
			}

			// If there was an error
			else if(response.search('Upload Error') > -1){
				var buildReturn = '<span class="upload-error">' + response + '</span>';
				$(".upload-error").remove();
				clickedObject.parent().after(buildReturn);

				}
			else{
				var buildReturn = '<img class="hide of-option-image" id="image_'+clickedID+'" src="'+response+'" alt="" />';

				$(".upload-error").remove();
				$("#image_" + clickedID).remove();
				clickedObject.parent().after(buildReturn);
				$('img#image_'+clickedID).fadeIn();
				clickedObject.next('span').fadeIn();
				clickedObject.parent().prev('input').val(response);
			}
		}
	});

	});

	}

	of_image_upload();

	//AJAX Remove Image (clear option value)
	$('body').on('click', '.image_reset_button', function(){

		var clickedObject = $(this);
		var clickedID = $(this).attr('id');
		var theID = $(this).attr('title');

		var nonce = $('#security').val();

		var data = {
			action: 'of_ajax_post_action',
			type: 'image_reset',
			security: nonce,
			data: theID
		};

		$.post(ajaxurl, data, function(response) {

			//check nonce
			if(response==-1){ //failed

				var fail_popup = $('#of-popup-fail');
				fail_popup.fadeIn();
				window.setTimeout(function(){
					fail_popup.fadeOut();
				}, 2000);
			}

			else {

				var image_to_remove = $('#image_' + theID);
				var button_to_hide = $('#reset_' + theID);
				image_to_remove.fadeOut(500,function(){ $(this).remove(); });
				button_to_hide.fadeOut();
				clickedObject.parent().prev('input').val('');
			}


		});

	});

	// Style Select
	(function ($) {
	styleSelect = {
		init: function () {
		$('.select_wrapper').each(function () {
			$(this).prepend('<span>' + $(this).find('.select option:selected').text() + '</span>');
		});
		$('body').on('change', '.select', function () {
			$(this).prev('span').replaceWith('<span>' + $(this).find('option:selected').text() + '</span>');
		});
		$('.select').bind('change', function(event) {
			$(this).prev('span').replaceWith('<span>' + $(this).find('option:selected').text() + '</span>');
		});
		}
	};
	$(document).ready(function () {
		styleSelect.init()
	})
	})(jQuery);


	/** Aquagraphite Slider MOD */

	//Hide (Collapse) the toggle containers on load
	$(".slide_body").hide();

	//Switch the "Open" and "Close" state per click then slide up/down (depending on open/close state)
	$('body').on( 'click', ".slide_edit_button",  function(){
		$(this).parent().toggleClass("active").next().slideToggle("fast");
		return false; //Prevent the browser jump to the link anchor
	});

	// Update slide title upon typing
	function update_slider_title(e) {
		var element = e;
		if ( this.timer ) {
			clearTimeout( element.timer );
		}
		this.timer = setTimeout( function() {
			$(element).parent().prev().find('strong').text( element.value );
		}, 100);
		return true;
	}

	$('body').on('keyup', '.of-slider-title', function(){
		update_slider_title(this);
	});


	//Remove individual slide
	$('body').on('click', '.slide_delete_button', function(){
	// event.preventDefault();
	var agree = confirm("Are you sure you wish to delete this slide?");
		if (agree) {
			var $trash = $(this).parents('li');
			//$trash.slideUp('slow', function(){ $trash.remove(); }); //chrome + confirm bug made slideUp not working...
			$trash.animate({
					opacity: 0.25,
					height: 0,
				}, 500, function() {
					$(this).remove();
			});
			return false; //Prevent the browser jump to the link anchor
		} else {
		return false;
		}
	});

	//Add new slide
	$('body').on('click', ".slide_add_button", function(){
		var slidesContainer = $(this).prev();
		var sliderId = slidesContainer.attr('id');
		var sliderInt = $('#'+sliderId).attr('rel');

		var numArr = $('#'+sliderId +' li').find('.order').map(function() {
			var str = this.id;
			str = str.replace(/\D/g,'');
			str = parseFloat(str);
			return str;
		}).get();

		var maxNum = Math.max.apply(Math, numArr);
		if (maxNum < 1 ) { maxNum = 0};
		var newNum = maxNum + 1;

		var newSlide = '<li class="temphide"><div class="slide_header"><strong>Slide ' + newNum + '</strong><input type="hidden" class="slide of-input order" name="' + sliderId + '[' + newNum + '][order]" id="' + sliderId + '_slide_order-' + newNum + '" value="' + newNum + '"><a class="slide_edit_button" href="#">Edit</a></div><div class="slide_body" style="display: none; "><label>Title</label><input class="slide of-input of-slider-title" name="' + sliderId + '[' + newNum + '][title]" id="' + sliderId + '_' + newNum + '_slide_title" value=""><label>Image URL</label><input class="slide of-input" name="' + sliderId + '[' + newNum + '][url]" id="' + sliderId + '_' + newNum + '_slide_url" value=""><div class="upload_button_div"><span class="button media_upload_button" id="' + sliderId + '_' + newNum + '" rel="'+sliderInt+'">Upload</span><span class="button mlu_remove_button hide" id="reset_' + sliderId + '_' + newNum + '" title="' + sliderId + '_' + newNum + '">Remove</span></div><div class="screenshot"></div><label>Video Embed Code <br><small>(if you add video code, Image URL will be ignored)</small></label><textarea class="slide of-input" name="' + sliderId + '[' + newNum + '][video]" id="' + sliderId + '_' + newNum + '_slide_video" cols="8" rows="8"></textarea><label>Link URL (optional)</label><input class="slide of-input" name="' + sliderId + '[' + newNum + '][link]" id="' + sliderId + '_' + newNum + '_slide_link" value=""><label>Link Target (optional)</label><select class="select of-input" name="' + sliderId + '[' + newNum + '][target]" style="width:320px" id="' + sliderId + '_' + newNum +'_slide_target"><option value="_self">_self</option><option value="_blank">_blank</option></select><label>Caption (optional)</label><textarea class="slide of-input" name="' + sliderId + '[' + newNum + '][description]" id="' + sliderId + '_' + newNum + '_slide_description" cols="8" rows="8"></textarea><a class="slide_delete_button" href="#">Delete</a><div class="clear"></div></div></li>';

		slidesContainer.append(newSlide);
		$('.temphide').fadeIn('fast', function() {
			$(this).removeClass('temphide');
		});

		of_image_upload(); // re-initialise upload image..

		return false; //prevent jumps, as always..
	});

	//Sort slides
	jQuery('.slider').find('ul').each( function() {
		var id = jQuery(this).attr('id');
		$('#'+ id).sortable({
			placeholder: "placeholder",
			opacity: 0.6
		});
	});


	/**	Sorter (Layout Manager) */
	jQuery('.sorter').each( function() {
		var id = jQuery(this).attr('id');
		$('#'+ id).find('ul').sortable({
			items: 'li',
			placeholder: "placeholder",
			connectWith: '.sortlist_' + id,
			opacity: 0.6,
			update: function() {
				$(this).find('.position').each( function() {

					var listID = $(this).parent().attr('id');
					var parentID = $(this).parent().parent().attr('id');
					parentID = parentID.replace(id + '_', '')
					var optionID = $(this).parent().parent().parent().attr('id');
					$(this).prop("name", optionID + '[' + parentID + '][' + listID + ']');

				});
			}
		});
	});


	/**	Ajax Backup & Restore MOD */
	//backup button
	$('body').on('click', '#of_backup_button', function(){

		var answer = confirm("Click OK to backup your current saved options.")

		if (answer){

			var clickedObject = $(this);
			var clickedID = $(this).attr('id');

			var nonce = $('#security').val();

			var data = {
				action: 'of_ajax_post_action',
				type: 'backup_options',
				security: nonce
			};

			$.post(ajaxurl, data, function(response) {

				//check nonce
				if(response==-1){ //failed

					var fail_popup = $('#of-popup-fail');
					fail_popup.fadeIn();
					window.setTimeout(function(){
						fail_popup.fadeOut();
					}, 2000);
				}

				else {

					var success_popup = $('#of-popup-save');
					success_popup.fadeIn();
					window.setTimeout(function(){
						location.reload();
					}, 1000);
				}

			});

		}

	return false;

	});

	//restore button
	$('body').on('click', '#of_restore_button', function(){

		var answer = confirm("'Warning: All of your current options will be replaced with the data from your last backup! Proceed?")

		if (answer){

			var clickedObject = $(this);
			var clickedID = $(this).attr('id');

			var nonce = $('#security').val();

			var data = {
				action: 'of_ajax_post_action',
				type: 'restore_options',
				security: nonce
			};

			$.post(ajaxurl, data, function(response) {

				//check nonce
				if(response==-1){ //failed

					var fail_popup = $('#of-popup-fail');
					fail_popup.fadeIn();
					window.setTimeout(function(){
						fail_popup.fadeOut();
					}, 2000);
				}

				else {

					var success_popup = $('#of-popup-save');
					success_popup.fadeIn();
					window.setTimeout(function(){
						location.reload();
					}, 1000);
				}

			});

		}

	return false;

	});

	/**	Ajax Transfer (Import/Export) Option */
	$('body').on('click', '#of_import_button', function(){

		var answer = confirm("Click OK to import options.")

		if (answer){

			var clickedObject = $(this);
			var clickedID = $(this).attr('id');

			var nonce = $('#security').val();

			var import_data = $('#export_data').val();

			var data = {
				action: 'of_ajax_post_action',
				type: 'import_options',
				security: nonce,
				data: import_data
			};

			$.post(ajaxurl, data, function(response) {
				var fail_popup = $('#of-popup-fail');
				var success_popup = $('#of-popup-save');

				//check nonce
				if(response==-1){ //failed
					fail_popup.fadeIn();
					window.setTimeout(function(){
						fail_popup.fadeOut();
					}, 2000);
				}
				else
				{
					success_popup.fadeIn();
					window.setTimeout(function(){
						location.reload();
					}, 1000);
				}

			});

		}

	return false;

	});


	/**	Ajax Transfer (Import/Export) Option */
	$('body').on('click', '#of_migrate_button', function(){

		var answer = confirm("Click OK to replace URLs")

		if (answer){

			var clickedObject = $(this);
			var clickedID = $(this).attr('id');

			var nonce = $('#security').val();

			var import_data = $('input[name=md_migrate_old]').val();
			var import_data2 = $('input[name=md_migrate_new]').val();

			var data = {
				action: 'of_ajax_post_action',
				type: 'migrate_works',
				security: nonce,
				oldlink: import_data,
				newlink: import_data2
			};

			$.post(ajaxurl, data, function(response) {
				var fail_popup = $('#of-popup-fail');
				var success_popup = $('#of-popup-save');
				//check nonce
				if(response==-1){ //failed
					fail_popup.fadeIn();
					window.setTimeout(function(){
						fail_popup.fadeOut();
					}, 2000);
				}
				else
				{
					success_popup.fadeIn();
					window.setTimeout(function(){
						location.reload();
					}, 1000);
				}

			});

		}

	return false;

	});




	/** AJAX Save Options */
	$('body').on('click', '#of_save', function() {

		var nonce = $('#security').val();

		$('.ajax-loading-img').fadeIn();

		//get serialized data from all our option fields
		var serializedReturn = $('#of_form :input[name][name!="security"][name!="of_reset"]').serialize();

		var data = {
			type: 'save',
			action: 'of_ajax_post_action',
			security: nonce,
			data: serializedReturn
		};

		$.post(ajaxurl, data, function(response) {
			var success = $('#of-popup-save');
			var fail = $('#of-popup-fail');
			var loading = $('.ajax-loading-img');
			loading.fadeOut();

			if (response==1) {
				success.fadeIn();
			} else {
				fail.fadeIn();
			}

			window.setTimeout(function(){
				success.fadeOut();
				fail.fadeOut();
			}, 2000);
		});

	return false;

	});


	/* AJAX Options Reset */
	$('#of_reset').click(function() {

		//confirm reset
		var answer = confirm("Click OK to reset. All settings will be lost and replaced with default settings!");

		//ajax reset
		if (answer){

			var nonce = $('#security').val();

			$('.ajax-reset-loading-img').fadeIn();

			var data = {

				type: 'reset',
				action: 'of_ajax_post_action',
				security: nonce,
			};

			$.post(ajaxurl, data, function(response) {
				var success = $('#of-popup-reset');
				var fail = $('#of-popup-fail');
				var loading = $('.ajax-reset-loading-img');
				loading.fadeOut();

				if (response==1)
				{
					success.fadeIn();
					window.setTimeout(function(){
						location.reload();
					}, 1000);
				}
				else
				{
					fail.fadeIn();
					window.setTimeout(function(){
						fail.fadeOut();
					}, 2000);
				}


			});

		}

	return false;

	});


	/**	Tipsy @since v1.3 */
	if (jQuery().tipsy) {
		$('.typography-size, .typography-height, .typography-face, .typography-style, .of-typography-color').tipsy({
			fade: true,
			gravity: 's',
			opacity: 0.7,
		});
	}

}); //end doc ready
