/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 *
 * MobileMenu
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function MobileMenu() {
  return (
    <aside
      className="mobile-aside mobile-menu-main mobile-menu-wrap gray-mobile-menu" // mobile-aside-open
      data-menu="mobile-menu-main"
    >
      <h3 className="screen-reader-text">Mobile menu</h3>
      <div className="mobile-aside-inner">
        <div className="mobile-aside-inner-inner">
          {' '}
          <a href="#" className="mobile-aside-close">
            <i className="icon-cancel" />
            <span className="screen-reader-text">Close</span>
          </a>
          <div className="mobile-menu-top mobile--top">
            <div className="widget widget_ask">
              {' '}
              <a
                href="add-question/index.html"
                className="button-default wpqa-question"
              >
                Ask a Question
              </a>{' '}
            </div>
          </div>
          <ul id="nav_menu" className="menu">
            <li
              id="menu-item-128"
              className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-64 current_page_item menu-item-128"
            >
              <a href="index.html">
                <i className="icon-home" />
                Home
              </a>
            </li>
            <li
              id="menu-item-129"
              className="menu-item menu-item-type-post_type menu-item-object-page menu-item-129"
            >
              <a href="communities/index.html">
                <i className="icon-folder" />
                Communities
              </a>
            </li>
            <li
              id="menu-item-130"
              className="nav_menu_open menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-130"
            >
              <a href="questions/index.html">
                <i className="icon-book-open" />
                Questions
              </a>
              <ul className="sub-menu">
                <li
                  id="menu-item-131"
                  className="menu-item menu-item-type-custom menu-item-object-custom menu-item-131"
                >
                  <a href="index5cfe.html?show=recent-questions">
                    New Questions
                  </a>
                </li>
                <li
                  id="menu-item-132"
                  className="menu-item menu-item-type-custom menu-item-object-custom menu-item-132"
                >
                  <a href="indexdaa9.html?show=most-voted">
                    Trending Questions
                  </a>
                </li>
                <li
                  id="menu-item-133"
                  className="menu-item menu-item-type-custom menu-item-object-custom menu-item-133"
                >
                  <a href="indexe6b0.html?show=most-visited">
                    Must read Questions
                  </a>
                </li>
                <li
                  id="menu-item-134"
                  className="menu-item menu-item-type-custom menu-item-object-custom menu-item-134"
                >
                  <a href="index11ec.html?show=most-answered">
                    Hot Questions
                  </a>
                </li>
              </ul>
              <span className="mobile-arrows">
                <i className="icon-down-open" />
              </span>
            </li>
            <li
              id="menu-item-135"
              className="wpqa-menu wpqa-poll-nav menu-item menu-item-type-custom menu-item-object-custom menu-item-135 li-poll"
            >
              <a href="questions/index7bc2.html?type=poll">
                <i className="icon-megaphone" />
                Polls
              </a>
            </li>
            <li
              id="menu-item-180"
              className="menu-item menu-item-type-post_type menu-item-object-page menu-item-180"
            >
              <a href="groups-page/index.html">
                <i className="icon-globe" />
                Groups
              </a>
            </li>
            <li
              id="menu-item-179"
              className="wpqa-menu wpqa-add-group-nav menu-item menu-item-type-custom menu-item-object-custom menu-item-179 li-add-group"
            >
              <a href="add-group/index.html">
                <i className="icon-network" />
                Add group
              </a>
            </li>
            <li
              id="menu-item-136"
              className="menu-item menu-item-type-post_type menu-item-object-page menu-item-136"
            >
              <a href="tags/index.html">
                <i className="icon-tag" />
                Tags
              </a>
            </li>
            <li
              id="menu-item-138"
              className="menu-item menu-item-type-post_type menu-item-object-page menu-item-138"
            >
              <a href="badges/index.html">
                <i className="icon-trophy" />
                Badges
              </a>
            </li>
            <li
              id="menu-item-137"
              className="menu-item menu-item-type-post_type menu-item-object-page menu-item-137"
            >
              <a href="users/index.html">
                <i className="icon-users" />
                Users
              </a>
            </li>
            <li
              id="menu-item-139"
              className="menu-item menu-item-type-post_type menu-item-object-page menu-item-139"
            >
              <a href="faqs/index.html">
                <i className="icon-lifebuoy" />
                Help
              </a>
            </li>
            <li
              id="menu-item-171"
              className="menu-item menu-item-type-custom menu-item-object-custom menu-item-171"
            >
              <a
                target="_blank"
                href="https://1.envato.market/drV57"
                rel="noreferrer"
              >
                <i className="icon-basket" />
                Buy Theme
              </a>
            </li>
          </ul>
          <div className="mobile--top post-search">
            <form
              role="search"
              method="get"
              className="searchform main-search-form"
              action="https://2code.info/demo/themes/Discy/Main/search/"
            >
              <div className="row row-warp">
                <div className="col col10">
                  {' '}
                  <input
                    type="search"
                    className="live-search"
                    autoComplete="off"
                    name="search"
                    defaultValue="Hit enter to search"
                  />
                  <div
                    className="loader_2 search_loader"
                    style={{ display: 'none' }}
                  />
                  <div
                    className="search-results results-empty"
                    style={{ display: 'none' }}
                  />{' '}
                  <input
                    type="hidden"
                    name="search_type"
                    className="search_type"
                    defaultValue="questions"
                  />
                </div>
                <div className="wpqa_form col col2">
                  {' '}
                  <input
                    type="submit"
                    className="button-default"
                    defaultValue="Search"
                  />{' '}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </aside>
  );
}

MobileMenu.propTypes = {};

export default memo(MobileMenu);
