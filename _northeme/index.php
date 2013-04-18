<script type="text/javascript">
	(function($){
		$(function() {
			
			$('#menu-item-360 a').live('click',function() { 
				$.post('<?php echo get_template_directory_uri()?>/_northeme/settings.php',{thumbnail:'small'},function(data) { 
					window.location.reload(true);
				})
				return false;
			});
			$('#menu-item-361 a').live('click',function() { 
				$.post('<?php echo get_template_directory_uri()?>/_northeme/settings.php',{thumbnail:'medium'},function(data) { 
					window.location.reload(true);
				})
				return false;
			});
			$('#menu-item-362 a').live('click',function() { 
				$.post('<?php echo get_template_directory_uri()?>/_northeme/settings.php',{thumbnail:'large'},function(data) { 
					window.location.reload(true);
				})
				return false;
			});
			$('#menu-item-363 a').live('click',function() { 
				$.post('<?php echo get_template_directory_uri()?>/_northeme/settings.php',{thumbnail:'portrait'},function(data) { 
					window.location.reload(true);
				})
				return false;
			});
			
		})
	})(jQuery);

</script> 