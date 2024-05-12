export default function BreadCrumb() {
    return (
        <div className="breadcrumbs d-flex align-items-center justify-content-between w-100 mb-4 breadcrumbs_1">
        <div className="breadcrumbs-comcwrap d-flex align-items-center justify-content-between w-100">
          <div className="breadcrumb-left">
            <span className="crumbs">
              <span
                className="breadcrumb-item"
                itemType="https://schema.org/BreadcrumbList"
              >
                <span
                  itemProp="itemListElement"
                  itemType="https://schema.org/ListItem"
                >
                  <meta itemProp="position" />
                  <a
                    itemProp="item"
                    href="/home"
                    title="Home"
                  >
                    <span itemProp="name">
                      <i className="icon-home font-xl mr-2" />
                      Home
                    </span>
                  </a>
                </span>
                <span className="crumbs-span">/</span>
                <span
                  className="current"
                  itemProp="itemListElement"
                  itemType="https://schema.org/ListItem"
                >
                  <meta itemProp="position" />
                  <a
                    itemProp="item"
                    href="/home/questions"
                    title="Questions"
                  >
                    <span itemProp="name">Questions</span>
                  </a>
                </span>
                <span className="crumbs-span">/</span>
                <span className="current">Q ???</span>
              </span>
            </span>
          </div>
          <div className="breadcrumb-right d-flex align-items-center">
            <div className="question-navigation breadcrumb-navs d-flex">
              <a
                className="nav-previous breadcrumb-navs__item"
                href='/home/questions/previous'
              >
                <i className="icon-left-open" />
              </a>
            </div>
            <div className="clearfix" />
          </div>
        </div>
      </div>
    )
}