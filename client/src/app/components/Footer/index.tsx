import React from 'react';

function Footer() {
  return (
    <footer
      className="footer no-widget-icons"
      itemScope
      itemType="https://schema.org/WPFooter"
    >
      <div id="inner-footer" className="wrap clearfix">
        <div className="top-footer">
          <div className="the-main-container">
            <aside>
              <h3 className="screen-reader-text">Footer</h3>
              <div className="col4">
                <section id="about-widget-2" className="widget about-widget">
                  <div className="widget-wrap">
                    <div
                      className="about-image about-image-text"
                      style={{ marginTop: '50px' }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + `/images/logo-footer.png`}
                        alt="Discy"
                      />
                    </div>
                    <div className="about-text">
                      <div className="empty-title">
                        <h2 className="widget-title">
                          <i className="icon-folder" />
                        </h2>
                      </div>
                      Discy is a social questions &amp; Answers Engine which
                      will help you will help you establis your community and
                      connect with other people.
                    </div>
                  </div>
                </section>
              </div>
              <div className="col2">
                <section id="nav_menu-2" className="widget widget_nav_menu">
                  <h2 className="widget-title">
                    <i className="icon-folder" />
                    About Us
                  </h2>
                  <div className="menu-company-container">
                    <ul id="menu-company" className="menu">
                      <li
                        id="menu-item-71"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-71"
                      >
                        <a href="users/index.html">Meet The Team</a>
                      </li>
                      <li
                        id="menu-item-72"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-72"
                      >
                        <a href="blog/index.html">Blog</a>
                      </li>
                      <li
                        id="menu-item-73"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-73"
                      >
                        <a href="about-us/index.html">About Us</a>
                      </li>
                      <li
                        id="menu-item-74"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-74"
                      >
                        <a href="contact-us/index.html">Contact Us</a>
                      </li>
                    </ul>
                  </div>
                </section>
              </div>
              <div className="col2">
                <section id="nav_menu-3" className="widget widget_nav_menu">
                  <h2 className="widget-title">
                    <i className="icon-folder" />
                    Legal Stuff
                  </h2>
                  <div className="menu-legal-stuff-container">
                    <ul id="menu-legal-stuff" className="menu">
                      <li
                        id="menu-item-87"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-87"
                      >
                        <a href="faqs/index.html">Terms of Use</a>
                      </li>
                      <li
                        id="menu-item-88"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-88"
                      >
                        <a href="faqs/index.html">Privacy Policy</a>
                      </li>
                      <li
                        id="menu-item-89"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-89"
                      >
                        <a href="faqs/index.html">Cookie Policy</a>
                      </li>
                    </ul>
                  </div>
                </section>
              </div>
              <div className="col2">
                <section id="nav_menu-4" className="widget widget_nav_menu">
                  <h2 className="widget-title">
                    <i className="icon-folder" />
                    Help
                  </h2>
                  <div className="menu-help-container">
                    <ul id="menu-help" className="menu">
                      <li
                        id="menu-item-86"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-86"
                      >
                        <a href="faqs/index.html">Knowledge Base</a>
                      </li>
                      <li
                        id="menu-item-85"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-85"
                      >
                        <a href="contact-us/index.html">Support</a>
                      </li>
                    </ul>
                  </div>
                </section>
              </div>
              <div className="col2">
                <section id="social-widget-2" className="widget social-widget">
                  <h2 className="widget-title">
                    <i className="icon-folder" />
                    Follow
                  </h2>
                  <div className="widget-wrap">
                    <ul className="social-ul">
                      <li className="social-facebook">
                        <a
                          title="Facebook"
                          href="https://www.facebook.com/2code.info/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="icon-facebook" />
                        </a>
                      </li>
                      <li className="social-twitter">
                        <a
                          title="Twitter"
                          href="https://twitter.com/2codeThemes"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="icon-twitter" />
                        </a>
                      </li>
                      <li className="social-linkedin">
                        <a title="Linkedin" href="#" target="_blank">
                          <i className="icon-linkedin" />
                        </a>
                      </li>
                      <li className="social-rss">
                        <a title="Feed" href="feed/index.html" target="_blank">
                          <i className="icon-rss" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </section>
              </div>
            </aside>
            <div className="clearfix" />
          </div>
        </div>
        <div className="bottom-footer">
          <div className="the-main-container">
            <p className="credits">
              © 2024 Discy. All Rights Reserved
              <br />
              With Love by{' '}
              <a href="https://2code.info/" target="_blank" rel="noreferrer">
                2code
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

// <Wrapper>
// <section>
//   <FormattedMessage {...messages.licenseMessage} />
// </section>
// <section>
//   <LocaleToggle />
// </section>
// <section>
//   <FormattedMessage
//     {...messages.authorMessage}
//     values={{
//       author: <A href="https://twitter.com/mxstbr">Max Stoiber</A>,
//     }}
//   />
// </section>
// </Wrapper>
