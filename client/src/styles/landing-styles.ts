import { createGlobalStyle } from 'styled-components';

export const LandingStyle = createGlobalStyle`
@media (min-width: 1330px) {
    .the-main-container,.discy-custom-width .main_center .the-main-inner,.discy-custom-width .main_center .hide-main-inner,.discy-custom-width .main_center main.all-main-wrap,.discy-custom-width .main_right main.all-main-wrap,.discy-custom-width .main_full main.all-main-wrap,.discy-custom-width .main_full .the-main-inner,.discy-custom-width .main_full .hide-main-inner,.discy-custom-width .main_left main.all-main-wrap {
        width:1300px
    }

    .discy-custom-width main.all-main-wrap,.discy-custom-width .menu_left .the-main-inner,.discy-custom-width .menu_left .hide-main-inner {
        width: 1100px
    }

    .discy-custom-width .the-main-inner,.discy-custom-width .hide-main-inner {
        width: 821px
    }

    .discy-custom-width .left-header {
        width: 1020px
    }

    .discy-custom-width .mid-header {
        width: 815px
    }

    .discy-custom-width .main_sidebar .hide-main-inner,.discy-custom-width .main_right .hide-main-inner,.discy-custom-width .main_right .the-main-inner,.discy-custom-width .main_left .the-main-inner,.discy-custom-width .main_left .hide-main-inner,.discy-custom-width .main_left .hide-main-inner {
        width: 1021px
    }

    .discy-custom-width.discy-left-sidebar .menu_sidebar main.all-main-wrap,.discy-custom-width.discy-left-sidebar .menu_left .the-main-inner,.discy-custom-width.discy-left-sidebar .menu_left .hide-main-inner,.discy-custom-width.discy-left-sidebar .menu_left main.all-main-wrap {
        width: 1070px
    }

    .discy-custom-width.discy-left-sidebar .menu_sidebar .the-main-inner,.discy-custom-width.discy-left-sidebar .menu_sidebar .hide-main-inner,.discy-custom-width.discy-left-sidebar .menu_left .hide-main-inner {
        width: 791px
    }

    .discy-custom-width.discy-left-sidebar .menu_sidebar .mid-header,.discy-custom-width.discy-left-sidebar .menu_left .mid-header {
        width: 785px
    }
}
.login-page-cover,.dark-skin .login-page-cover {
    background-color: #272930;
    background-image: url(https://cdn.2code.info/demo/themes/Discy/Try/wp-content/uploads/2018/05/register.png);
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="https://cdn.2code.info/demo/themes/Discy/Try/wp-content/uploads/2018/05/register.png",sizingMethod="scale");
    -ms-filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='https://cdn.2code.info/demo/themes/Discy/Try/wp-content/uploads/2018/05/register.png',sizingMethod='scale')"
}

.login-opacity,.dark-skin .login-opacity,.bg-overlay:before {
    background-color: #272930;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=esc_attr($register_opacity))";
    filter: alpha(opacity=esc_attr($register_opacity));
    -moz-opacity: .3;
    -khtml-opacity: .3;
    opacity: .3
}

@media only screen and (max-width: 600px) {
    .hide-mobile-top-footer .top-footer,.hide-mobile-bottom-footer .bottom-footer,.hide-mobile-sidebar .warp-sidebar,.hide-mobile-sidebar .sidebar,.hide-mobile-sidebar .hide-sidebar {
        display:none
    }
}

@font-face {
    font-family: "entypo";
    font-display: swap;
    src: url(https://cdn.2code.info/demo/themes/Discy/Try/wp-content/themes/discy/css/entypo/entypo.woff2) format("woff2");
    font-weight: 400;
    font-style: normal
}

:root {
    --hcb--fz--base: 14px
}

:root {
    --hcb--fz--mobile: 13px
}

:root {
    --hcb--ff: Menlo, Consolas, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif
}
`;
