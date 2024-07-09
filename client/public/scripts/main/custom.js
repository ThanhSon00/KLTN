
/* Sticky content */

jQuery.noConflict()(function discy_sidebar() {
	StickySidebarContent();
});

StickySidebarContent = () => {
	var main_wrap_h    = jQuery(".all-main-wrap").outerHeight();
	var main_sidebar_h = jQuery(".inner-sidebar").outerHeight();
	if (jQuery(".nav_menu_sidebar").length) {
		var nav_menu_h = jQuery(".nav_menu_sidebar").outerHeight();
	}else {
		var nav_menu_h = jQuery(".nav_menu").outerHeight();
	}
	if (jQuery('.menu_left').length && nav_menu_h > main_wrap_h) {
		//
	}else if ((main_wrap_h > nav_menu_h && jQuery(".fixed_nav_menu").length) || (main_wrap_h > main_sidebar_h && jQuery(".fixed-sidebar").length)) {
		var hidden_header = (jQuery("#wrap.fixed-enabled").length?jQuery(".hidden-header").outerHeight():0);
		var wpadminbar = (jQuery(".admin-bar #wpadminbar").length?jQuery(".admin-bar #wpadminbar").outerHeight():0);
		var marginTopHeight = hidden_header + wpadminbar + 10;
		var updateSidebarHeight = (jQuery(".widget-footer").length?false:true);
		var stickyClasses = (jQuery(".fixed_nav_menu").length?'.all-main-wrap,.fixed-sidebar,.fixed_nav_menu':'.all-main-wrap,.fixed-sidebar');
		jQuery(stickyClasses).theiaStickySidebar({updateSidebarHeight: updateSidebarHeight, additionalMarginTop: marginTopHeight});
	}
}

jQuery(window).on("sticky_recalc",StickySidebarContent);