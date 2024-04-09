import { createGlobalStyle } from 'styled-components';
/* istanbul ignore next */
export const GlobalStyle = createGlobalStyle`
img.wp-smiley,
img.emoji {
    display: inline !important;
    border: none !important;
    box-shadow: none !important;
    height: 1em !important;
    width: 1em !important;
    margin: 0 0.07em !important;
    vertical-align: -0.1em !important;
    background: none !important;
    padding: 0 !important
}

.wp-block-button__link {
  color: #fff;
  background-color: #32373c;
  border-radius: 9999px;
  box-shadow: none;
  text-decoration: none;
  padding: calc(.667em + 2px) calc(1.333em + 2px);
  font-size: 1.125em
}

.wp-block-file__button {
    background: #32373c;
    color: #fff;
    text-decoration: none
}

body {
  --wp--preset--color--black: #000000;
  --wp--preset--color--cyan-bluish-gray: #abb8c3;
  --wp--preset--color--white: #ffffff;
  --wp--preset--color--pale-pink: #f78da7;
  --wp--preset--color--vivid-red: #cf2e2e;
  --wp--preset--color--luminous-vivid-orange: #ff6900;
  --wp--preset--color--luminous-vivid-amber: #fcb900;
  --wp--preset--color--light-green-cyan: #7bdcb5;
  --wp--preset--color--vivid-green-cyan: #00d084;
  --wp--preset--color--pale-cyan-blue: #8ed1fc;
  --wp--preset--color--vivid-cyan-blue: #0693e3;
  --wp--preset--color--vivid-purple: #9b51e0;
  --wp--preset--gradient--vivid-cyan-blue-to-vivid-purple: linear-gradient(135deg, rgba(6, 147, 227, 1) 0%, rgb(155, 81, 224) 100%);
  --wp--preset--gradient--light-green-cyan-to-vivid-green-cyan: linear-gradient(135deg, rgb(122, 220, 180) 0%, rgb(0, 208, 130) 100%);
  --wp--preset--gradient--luminous-vivid-amber-to-luminous-vivid-orange: linear-gradient(135deg, rgba(252, 185, 0, 1) 0%, rgba(255, 105, 0, 1) 100%);
  --wp--preset--gradient--luminous-vivid-orange-to-vivid-red: linear-gradient(135deg, rgba(255, 105, 0, 1) 0%, rgb(207, 46, 46) 100%);
  --wp--preset--gradient--very-light-gray-to-cyan-bluish-gray: linear-gradient(135deg, rgb(238, 238, 238) 0%, rgb(169, 184, 195) 100%);
  --wp--preset--gradient--cool-to-warm-spectrum: linear-gradient(135deg, rgb(74, 234, 220) 0%, rgb(151, 120, 209) 20%, rgb(207, 42, 186) 40%, rgb(238, 44, 130) 60%, rgb(251, 105, 98) 80%, rgb(254, 248, 76) 100%);
  --wp--preset--gradient--blush-light-purple: linear-gradient(135deg, rgb(255, 206, 236) 0%, rgb(152, 150, 240) 100%);
  --wp--preset--gradient--blush-bordeaux: linear-gradient(135deg, rgb(254, 205, 165) 0%, rgb(254, 45, 45) 50%, rgb(107, 0, 62) 100%);
  --wp--preset--gradient--luminous-dusk: linear-gradient(135deg, rgb(255, 203, 112) 0%, rgb(199, 81, 192) 50%, rgb(65, 88, 208) 100%);
  --wp--preset--gradient--pale-ocean: linear-gradient(135deg, rgb(255, 245, 203) 0%, rgb(182, 227, 212) 50%, rgb(51, 167, 181) 100%);
  --wp--preset--gradient--electric-grass: linear-gradient(135deg, rgb(202, 248, 128) 0%, rgb(113, 206, 126) 100%);
  --wp--preset--gradient--midnight: linear-gradient(135deg, rgb(2, 3, 129) 0%, rgb(40, 116, 252) 100%);
  --wp--preset--font-size--small: 13px;
  --wp--preset--font-size--medium: 20px;
  --wp--preset--font-size--large: 36px;
  --wp--preset--font-size--x-large: 42px;
  --wp--preset--spacing--20: 0.44rem;
  --wp--preset--spacing--30: 0.67rem;
  --wp--preset--spacing--40: 1rem;
  --wp--preset--spacing--50: 1.5rem;
  --wp--preset--spacing--60: 2.25rem;
  --wp--preset--spacing--70: 3.38rem;
  --wp--preset--spacing--80: 5.06rem;
  --wp--preset--shadow--natural: 6px 6px 9px rgba(0, 0, 0, 0.2);
  --wp--preset--shadow--deep: 12px 12px 50px rgba(0, 0, 0, 0.4);
  --wp--preset--shadow--sharp: 6px 6px 0px rgba(0, 0, 0, 0.2);
  --wp--preset--shadow--outlined: 6px 6px 0px -3px rgba(255, 255, 255, 1), 6px 6px rgba(0, 0, 0, 1);
  --wp--preset--shadow--crisp: 6px 6px 0px rgba(0, 0, 0, 1)
}

:where(.is-layout-flex) {
    gap: .5em
}

:where(.is-layout-grid) {
    gap: .5em
}

body .is-layout-flow>.alignleft {
    float: left;
    margin-inline-start: 0;
    margin-inline-end: 2em
}

body .is-layout-flow>.alignright {
    float: right;
    margin-inline-start: 2em;
    margin-inline-end: 0
}

body .is-layout-flow>.aligncenter {
    margin-left: auto !important;
    margin-right: auto !important
}

body .is-layout-constrained>.alignleft {
    float: left;
    margin-inline-start: 0;
    margin-inline-end: 2em
}

body .is-layout-constrained>.alignright {
    float: right;
    margin-inline-start: 2em;
    margin-inline-end: 0
}

body .is-layout-constrained>.aligncenter {
    margin-left: auto !important;
    margin-right: auto !important
}

body .is-layout-constrained>:where(:not(.alignleft):not(.alignright):not(.alignfull)) {
    max-width: var(--wp--style--global--content-size);
    margin-left: auto !important;
    margin-right: auto !important
}

body .is-layout-constrained>.alignwide {
    max-width: var(--wp--style--global--wide-size)
}

body .is-layout-flex {
    display: flex
}

body .is-layout-flex {
    flex-wrap: wrap;
    align-items: center
}

body .is-layout-flex>* {
    margin: 0
}

body .is-layout-grid {
    display: grid
}

body .is-layout-grid>* {
    margin: 0
}

:where(.wp-block-columns.is-layout-flex) {
    gap: 2em
}

:where(.wp-block-columns.is-layout-grid) {
    gap: 2em
}

:where(.wp-block-post-template.is-layout-flex) {
    gap: 1.25em
}

:where(.wp-block-post-template.is-layout-grid) {
    gap: 1.25em
}

.has-black-color {
    color: var(--wp--preset--color--black) !important
}

.has-cyan-bluish-gray-color {
    color: var(--wp--preset--color--cyan-bluish-gray) !important
}

.has-white-color {
    color: var(--wp--preset--color--white) !important
}

.has-pale-pink-color {
    color: var(--wp--preset--color--pale-pink) !important
}

.has-vivid-red-color {
    color: var(--wp--preset--color--vivid-red) !important
}

.has-luminous-vivid-orange-color {
    color: var(--wp--preset--color--luminous-vivid-orange) !important
}

.has-luminous-vivid-amber-color {
    color: var(--wp--preset--color--luminous-vivid-amber) !important
}

.has-light-green-cyan-color {
    color: var(--wp--preset--color--light-green-cyan) !important
}

.has-vivid-green-cyan-color {
    color: var(--wp--preset--color--vivid-green-cyan) !important
}

.has-pale-cyan-blue-color {
    color: var(--wp--preset--color--pale-cyan-blue) !important
}

.has-vivid-cyan-blue-color {
    color: var(--wp--preset--color--vivid-cyan-blue) !important
}

.has-vivid-purple-color {
    color: var(--wp--preset--color--vivid-purple) !important
}

.has-black-background-color {
    background-color: var(--wp--preset--color--black) !important
}

.has-cyan-bluish-gray-background-color {
    background-color: var(--wp--preset--color--cyan-bluish-gray) !important
}

.has-white-background-color {
    background-color: var(--wp--preset--color--white) !important
}

.has-pale-pink-background-color {
    background-color: var(--wp--preset--color--pale-pink) !important
}

.has-vivid-red-background-color {
    background-color: var(--wp--preset--color--vivid-red) !important
}

.has-luminous-vivid-orange-background-color {
    background-color: var(--wp--preset--color--luminous-vivid-orange) !important
}

.has-luminous-vivid-amber-background-color {
    background-color: var(--wp--preset--color--luminous-vivid-amber) !important
}

.has-light-green-cyan-background-color {
    background-color: var(--wp--preset--color--light-green-cyan) !important
}

.has-vivid-green-cyan-background-color {
    background-color: var(--wp--preset--color--vivid-green-cyan) !important
}

.has-pale-cyan-blue-background-color {
    background-color: var(--wp--preset--color--pale-cyan-blue) !important
}

.has-vivid-cyan-blue-background-color {
    background-color: var(--wp--preset--color--vivid-cyan-blue) !important
}

.has-vivid-purple-background-color {
    background-color: var(--wp--preset--color--vivid-purple) !important
}

.has-black-border-color {
    border-color: var(--wp--preset--color--black) !important
}

.has-cyan-bluish-gray-border-color {
    border-color: var(--wp--preset--color--cyan-bluish-gray) !important
}

.has-white-border-color {
    border-color: var(--wp--preset--color--white) !important
}

.has-pale-pink-border-color {
    border-color: var(--wp--preset--color--pale-pink) !important
}

.has-vivid-red-border-color {
    border-color: var(--wp--preset--color--vivid-red) !important
}

.has-luminous-vivid-orange-border-color {
    border-color: var(--wp--preset--color--luminous-vivid-orange) !important
}

.has-luminous-vivid-amber-border-color {
    border-color: var(--wp--preset--color--luminous-vivid-amber) !important
}

.has-light-green-cyan-border-color {
    border-color: var(--wp--preset--color--light-green-cyan) !important
}

.has-vivid-green-cyan-border-color {
    border-color: var(--wp--preset--color--vivid-green-cyan) !important
}

.has-pale-cyan-blue-border-color {
    border-color: var(--wp--preset--color--pale-cyan-blue) !important
}

.has-vivid-cyan-blue-border-color {
    border-color: var(--wp--preset--color--vivid-cyan-blue) !important
}

.has-vivid-purple-border-color {
    border-color: var(--wp--preset--color--vivid-purple) !important
}

.has-vivid-cyan-blue-to-vivid-purple-gradient-background {
    background: var(--wp--preset--gradient--vivid-cyan-blue-to-vivid-purple) !important
}

.has-light-green-cyan-to-vivid-green-cyan-gradient-background {
    background: var(--wp--preset--gradient--light-green-cyan-to-vivid-green-cyan) !important
}

.has-luminous-vivid-amber-to-luminous-vivid-orange-gradient-background {
    background: var(--wp--preset--gradient--luminous-vivid-amber-to-luminous-vivid-orange) !important
}

.has-luminous-vivid-orange-to-vivid-red-gradient-background {
    background: var(--wp--preset--gradient--luminous-vivid-orange-to-vivid-red) !important
}

.has-very-light-gray-to-cyan-bluish-gray-gradient-background {
    background: var(--wp--preset--gradient--very-light-gray-to-cyan-bluish-gray) !important
}

.has-cool-to-warm-spectrum-gradient-background {
    background: var(--wp--preset--gradient--cool-to-warm-spectrum) !important
}

.has-blush-light-purple-gradient-background {
    background: var(--wp--preset--gradient--blush-light-purple) !important
}

.has-blush-bordeaux-gradient-background {
    background: var(--wp--preset--gradient--blush-bordeaux) !important
}

.has-luminous-dusk-gradient-background {
    background: var(--wp--preset--gradient--luminous-dusk) !important
}

.has-pale-ocean-gradient-background {
    background: var(--wp--preset--gradient--pale-ocean) !important
}

.has-electric-grass-gradient-background {
    background: var(--wp--preset--gradient--electric-grass) !important
}

.has-midnight-gradient-background {
    background: var(--wp--preset--gradient--midnight) !important
}

.has-small-font-size {
    font-size: var(--wp--preset--font-size--small) !important
}

.has-medium-font-size {
    font-size: var(--wp--preset--font-size--medium) !important
}

.has-large-font-size {
    font-size: var(--wp--preset--font-size--large) !important
}

.has-x-large-font-size {
    font-size: var(--wp--preset--font-size--x-large) !important
}

.wp-block-navigation a:where(:not(.wp-element-button)) {
    color: inherit
}

:where(.wp-block-post-template.is-layout-flex) {
    gap: 1.25em
}

:where(.wp-block-post-template.is-layout-grid) {
    gap: 1.25em
}

:where(.wp-block-columns.is-layout-flex) {
    gap: 2em
}

:where(.wp-block-columns.is-layout-grid) {
    gap: 2em
}

.wp-block-pullquote {
    font-size: 1.5em;
    line-height: 1.6
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

:root {
  --hcb--tsh: 1px 1px 0px #f0f0f0;
  }

:root {
  --hcb--fz: var(--hcb--fz--base,14px);
  --hcb--ff: "Menlo","Consolas","Hiragino Kaku Gothic ProN","Hiragino Sans","Meiryo",sans-serif;
  --hcb--pY: 1.75em;
  --hcb--pX: 1.5em;
  --hcb--radius: 3px;
  --hcb--linenumW: 3.5ch;
  --hcb--data-label: attr(data-lang);
  --hcb--btn-offset: 20px;
  --hcb--c: #1f1e1e;
  --hcb--tsh: unset;
  --hcb--bgc: #f8f6f6;
  --hcb--data-label--c: #1f1e1e;
  --hcb--data-label--bgc: #e8e8e8;
  --hcb--line-numbers--c: #999;
  --hcb--highlight-color: #9678641a;
  --hcb--file-icon: url(https://cdn.2code.info/demo/themes/Discy/Main/wp-content/plugins/highlighting-code-block/assets/img/file-icon-light.svg);
  --hcb--scbar-track--bgc: #9696961a;
  --hcb--scbar-thumb--bgc: #96969640;
}

.call-action-unlogged,
.dark-skin .call-action-unlogged {
  background-image: url(${process.env.PUBLIC_URL}/images/action.png);
  filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="f/action.png", sizingMethod="scale");
  -ms-filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='${process.env.PUBLIC_URL}/images/action.png',sizingMethod='scale')";
  background-size: cover
}

#login-panel .panel-image-content,
.dark-skin #login-panel .panel-image-content {
    background-image: url(https://cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2019/01/signin.png)
}

#signup-panel .panel-image-content,
.dark-skin #signup-panel .panel-image-content {
    background-image: url(https://cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2019/01/signup.png)
}

#lost-password .panel-image-content,
.dark-skin #lost-password .panel-image-content {
    background-image: url(https://cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2019/01/signup.png)
}

@media only screen and (max-width:600px) {

    .hide-mobile-top-footer .top-footer,
    .hide-mobile-bottom-footer .bottom-footer,
    .hide-mobile-sidebar .warp-sidebar,
    .hide-mobile-sidebar .sidebar,
    .hide-mobile-sidebar .hide-sidebar {
        display: none
    }
}

@font-face {
    font-family: "entypo";
    font-display: swap;
    src: url(https://cdn.2code.info/demo/themes/Discy/Main/wp-content/themes/discy/css/entypo/entypo.woff2) format("woff2");
    font-weight: 400;
    font-style: normal
}

  body {    
      font-family: "Open Sans",Arial,sans-serif; 
  }

  body, .main-content {
      background-color: #f2f2f2;
  }

  body {
      margin: 0;
      color: #707885;
      line-height: 22px;
      font-size: 13px;
      font-weight: 400;
  }

  * {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  }

  :host, :root {
      --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
  }

  :host, :root {
      --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
  }

  :host, :root {
      --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
  }

  :root {
      --wp--preset--font-size--normal: 16px;
      --wp--preset--font-size--huge: 42px;
  }

  html {
      -webkit-text-size-adjust: 100%;
  }

  ::selection {
      background: #2d6ff7;
  }

  ::selection {
      color: #FFF;
  }
`;
