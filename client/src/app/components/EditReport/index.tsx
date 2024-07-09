export default function EditReport() {
    return (
    <div className="page-content" style={{ minHeight: 567 }}>
      <div className="page-bar">
        <div className="page-title-breadcrumb">
          <div className=" pull-left">
            <div className="page-title">Add Fees</div>
          </div>
          <ol className="breadcrumb page-breadcrumb pull-right">
            <li>
              <i className="fa fa-home" />
              &nbsp;
              <a className="parent-item" href="index.html">
                Home
              </a>
              &nbsp;
              <i className="fa fa-angle-right" />
            </li>
            <li>
              <a className="parent-item" href="">
                Fees
              </a>
              &nbsp;
              <i className="fa fa-angle-right" />
            </li>
            <li className="active">Add Fees</li>
          </ol>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="card-box">
            <div className="card-head">
              <header>Add Fees</header>
              <button
                id="panel-button"
                className="mdl-button mdl-js-button mdl-button--icon pull-right"
                data-upgraded=",MaterialButton"
              >
                <i className="material-icons">more_vert</i>
              </button>
              <div className="mdl-menu__container is-upgraded">
                <div className="mdl-menu__outline mdl-menu--bottom-right" />
                <ul
                  className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events"
                  data-mdl-for="panel-button"
                  data-upgraded=",MaterialMenu,MaterialRipple"
                >
                  <li
                    className="mdl-menu__item mdl-js-ripple-effect"
                    tabIndex={-1}
                    data-upgraded=",MaterialRipple"
                  >
                    <i className="material-icons">assistant_photo</i>Action
                    <span className="mdl-menu__item-ripple-container">
                      <span className="mdl-ripple" />
                    </span>
                  </li>
                  <li
                    className="mdl-menu__item mdl-js-ripple-effect"
                    tabIndex={-1}
                    data-upgraded=",MaterialRipple"
                  >
                    <i className="material-icons">print</i>Another action
                    <span className="mdl-menu__item-ripple-container">
                      <span className="mdl-ripple" />
                    </span>
                  </li>
                  <li
                    className="mdl-menu__item mdl-js-ripple-effect"
                    tabIndex={-1}
                    data-upgraded=",MaterialRipple"
                  >
                    <i className="material-icons">favorite</i>Something else here
                    <span className="mdl-menu__item-ripple-container">
                      <span className="mdl-ripple" />
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="card-body row">
              <div className="col-lg-6 p-t-20">
                <div
                  className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width is-upgraded"
                  data-upgraded=",MaterialTextfield"
                >
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="txtroll"
                  />
                  <label className="mdl-textfield__label">Roll No</label>
                </div>
              </div>
              <div className="col-lg-6 p-t-20">
                <div
                  className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width is-upgraded"
                  data-upgraded=",MaterialTextfield"
                >
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="txtname"
                  />
                  <label className="mdl-textfield__label">Student Name</label>
                </div>
              </div>
              <div className="col-lg-6 p-t-20">
                <div
                  className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height txt-full-width is-upgraded"
                  data-upgraded=",MaterialTextfield"
                  style={{ width: 787 }}
                >
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="list2"
                    defaultValue=""
                    readOnly={true}
                    tabIndex={-1}
                  />
                  <label htmlFor="list2" className="pull-right margin-0">
                    <i className="mdl-icon-toggle__label material-icons">
                      keyboard_arrow_down
                    </i>
                  </label>
                  <label htmlFor="list2" className="mdl-textfield__label">
                    Department/Class
                  </label>
                  <div className="mdl-menu__container is-upgraded">
                    <div className="mdl-menu__outline mdl-menu--bottom-left" />
                    <ul
                      data-mdl-for="list2"
                      className="mdl-menu mdl-menu--bottom-left mdl-js-menu"
                      data-upgraded=",MaterialMenu"
                    >
                      <li className="mdl-menu__item" data-val="DE" tabIndex={-1}>
                        Mathematics
                      </li>
                      <li className="mdl-menu__item" data-val="BY" tabIndex={-1}>
                        Science
                      </li>
                      <li className="mdl-menu__item" data-val="BY" tabIndex={-1}>
                        Engineering
                      </li>
                      <li className="mdl-menu__item" data-val="BY" tabIndex={-1}>
                        M.B.A.
                      </li>
                      <li className="mdl-menu__item" data-val="OT" tabIndex={-1}>
                        Other
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 p-t-20">
                <div
                  className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height txt-full-width is-upgraded"
                  data-upgraded=",MaterialTextfield"
                  style={{ width: 787 }}
                >
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="list5"
                    defaultValue=""
                    readOnly={true}
                    tabIndex={-1}
                  />
                  <label className="pull-right margin-0">
                    <i className="mdl-icon-toggle__label material-icons">
                      keyboard_arrow_down
                    </i>
                  </label>
                  <label className="mdl-textfield__label">Fees Type</label>
                  <div className="mdl-menu__container is-upgraded">
                    <div className="mdl-menu__outline mdl-menu--bottom-left" />
                    <ul
                      data-mdl-for="list5"
                      className="mdl-menu mdl-menu--bottom-left mdl-js-menu"
                      data-upgraded=",MaterialMenu"
                    >
                      <li className="mdl-menu__item" data-val="DE" tabIndex={-1}>
                        Annual
                      </li>
                      <li className="mdl-menu__item" data-val="BY" tabIndex={-1}>
                        Tuition
                      </li>
                      <li className="mdl-menu__item" data-val="BY" tabIndex={-1}>
                        Transport
                      </li>
                      <li className="mdl-menu__item" data-val="BY" tabIndex={-1}>
                        Exam
                      </li>
                      <li className="mdl-menu__item" data-val="LB" tabIndex={-1}>
                        Library
                      </li>
                      <li className="mdl-menu__item" data-val="OT" tabIndex={-1}>
                        Other
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 p-t-20">
                <label
                  className="mdl-radio mdl-js-radio mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events is-upgraded"
                  htmlFor="option-2"
                  data-upgraded=",MaterialRadio,MaterialRipple"
                >
                  <input
                    type="radio"
                    id="option-2"
                    className="mdl-radio__button"
                    name="options"
                    defaultValue={2}
                  />
                  <span className="mdl-radio__label">Monthly</span>
                  <span className="mdl-radio__outer-circle" />
                  <span className="mdl-radio__inner-circle" />
                  <span
                    className="mdl-radio__ripple-container mdl-js-ripple-effect mdl-ripple--center"
                    data-upgraded=",MaterialRipple"
                  >
                    <span className="mdl-ripple" />
                  </span>
                </label>
              </div>
              <div className="col-lg-2 p-t-20">
                <label
                  className="mdl-radio mdl-js-radio mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events is-checked is-upgraded"
                  htmlFor="option-3"
                  data-upgraded=",MaterialRadio,MaterialRipple"
                >
                  <input
                    type="radio"
                    id="option-3"
                    className="mdl-radio__button"
                    name="options"
                    defaultValue={3}
                  />
                  <span className="mdl-radio__label">Yearly</span>
                  <span className="mdl-radio__outer-circle" />
                  <span className="mdl-radio__inner-circle" />
                  <span
                    className="mdl-radio__ripple-container mdl-js-ripple-effect mdl-ripple--center"
                    data-upgraded=",MaterialRipple"
                  >
                    <span className="mdl-ripple" />
                  </span>
                </label>
              </div>
              <div className="col-lg-2 p-t-20">
                <label
                  className="mdl-radio mdl-js-radio mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events is-upgraded"
                  htmlFor="option-1"
                  data-upgraded=",MaterialRadio,MaterialRipple"
                >
                  <input
                    type="radio"
                    id="option-1"
                    className="mdl-radio__button"
                    name="options"
                    defaultValue={1}
                  />
                  <span className="mdl-radio__label">Session</span>
                  <span className="mdl-radio__outer-circle" />
                  <span className="mdl-radio__inner-circle" />
                  <span
                    className="mdl-radio__ripple-container mdl-js-ripple-effect mdl-ripple--center"
                    data-upgraded=",MaterialRipple"
                  >
                    <span className="mdl-ripple" />
                  </span>
                </label>
              </div>
              <div className="col-lg-12 p-t-20">
                <div
                  className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width is-upgraded"
                  data-upgraded=",MaterialTextfield"
                >
                  <input className="mdl-textfield__input" type="text" id="amount" />
                  <label className="mdl-textfield__label">Ammount</label>
                </div>
              </div>
              <div className="col-lg-6 p-t-20">
                <div
                  className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width is-upgraded"
                  data-upgraded=",MaterialTextfield"
                >
                  <input
                    className="mdl-textfield__input flatpickr-input"
                    type="text"
                    id="date"
                  />
                  <label className="mdl-textfield__label">Collection Date</label>
                </div>
              </div>
              <div className="col-lg-6 p-t-20">
                <div
                  className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height txt-full-width is-upgraded"
                  data-upgraded=",MaterialTextfield"
                  style={{ width: 787 }}
                >
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="list9"
                    defaultValue=""
                    readOnly={true}
                    tabIndex={-1}
                  />
                  <label htmlFor="list9" className="pull-right margin-0">
                    <i className="mdl-icon-toggle__label material-icons">
                      keyboard_arrow_down
                    </i>
                  </label>
                  <label htmlFor="list9" className="mdl-textfield__label">
                    Payment Type
                  </label>
                  <div className="mdl-menu__container is-upgraded">
                    <div className="mdl-menu__outline mdl-menu--bottom-left" />
                    <ul
                      data-mdl-for="list9"
                      className="mdl-menu mdl-menu--bottom-left mdl-js-menu"
                      data-upgraded=",MaterialMenu"
                    >
                      <li className="mdl-menu__item" data-val="DE" tabIndex={-1}>
                        Cash
                      </li>
                      <li className="mdl-menu__item" data-val="BY" tabIndex={-1}>
                        Cheque
                      </li>
                      <li className="mdl-menu__item" data-val="BY" tabIndex={-1}>
                        Online Transfer
                      </li>
                      <li className="mdl-menu__item" data-val="BY" tabIndex={-1}>
                        Draft
                      </li>
                      <li className="mdl-menu__item" data-val="OT" tabIndex={-1}>
                        Other
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 p-t-20">
                <div
                  className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width is-upgraded"
                  data-upgraded=",MaterialTextfield"
                >
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="paymentReference"
                  />
                  <label className="mdl-textfield__label">
                    Payment Reference Number
                  </label>
                </div>
              </div>
              <div className="col-lg-6 p-t-20">
                <div
                  className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height txt-full-width is-upgraded"
                  data-upgraded=",MaterialTextfield"
                  style={{ width: 787 }}
                >
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="list8"
                    defaultValue=""
                    readOnly={true}
                    tabIndex={-1}
                  />
                  <label htmlFor="list2" className="pull-right margin-0">
                    <i className="mdl-icon-toggle__label material-icons">
                      keyboard_arrow_down
                    </i>
                  </label>
                  <label htmlFor="list2" className="mdl-textfield__label">
                    Status
                  </label>
                  <div
                    className="mdl-menu__container is-upgraded"
                    style={{ left: 0, top: 51, width: "787.333px", height: 160 }}
                  >
                    <div
                      className="mdl-menu__outline mdl-menu--bottom-left"
                      style={{ width: "787.333px", height: 160 }}
                    />
                    <ul
                      data-mdl-for="list8"
                      className="mdl-menu mdl-menu--bottom-left mdl-js-menu"
                      data-upgraded=",MaterialMenu"
                      style={{}}
                    >
                      <li
                        className="mdl-menu__item"
                        data-val="DE"
                        tabIndex={-1}
                        style={{}}
                      >
                        Paid
                      </li>
                      <li
                        className="mdl-menu__item"
                        data-val="BY"
                        tabIndex={-1}
                        style={{}}
                      >
                        Unpaid
                      </li>
                      <li
                        className="mdl-menu__item"
                        data-val="BY"
                        tabIndex={-1}
                        style={{}}
                      >
                        Pending
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 p-t-20">
                <div
                  className="mdl-textfield mdl-js-textfield txt-full-width is-upgraded"
                  data-upgraded=",MaterialTextfield"
                >
                  <textarea
                    className="mdl-textfield__input"
                    rows={4}
                    id="text7"
                    defaultValue={""}
                  />
                  <label className="mdl-textfield__label" htmlFor="text7">
                    Payment Details
                  </label>
                </div>
              </div>
              <div className="col-lg-12 p-t-20 text-center">
                <button
                  type="button"
                  className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect m-b-10 m-r-20 btn-circle btn-primary"
                  data-upgraded=",MaterialButton,MaterialRipple"
                >
                  Submit
                  <span className="mdl-button__ripple-container">
                    <span className="mdl-ripple" />
                  </span>
                </button>
                <button
                  type="button"
                  className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect m-b-10 btn-circle btn-danger"
                  data-upgraded=",MaterialButton,MaterialRipple"
                >
                  Cancel
                  <span className="mdl-button__ripple-container">
                    <span className="mdl-ripple" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}