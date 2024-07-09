import { useEffect, useRef, useState } from "react"
import { getStatics } from "services/question.service";
import UserTable from "app/components/UserTable";
import { Link } from "react-router-dom";

export interface Statics {
  answeredPercentage: number;
  usersCount: number;
  questionsCount: number;
  answersCount: number;
}

export default function AdminDashBoard() {
  const [statics, setStatics] = useState<Statics>({
    answeredPercentage: 0,
    usersCount: 0,
    questionsCount: 0,
    answersCount: 0,
  });
  const firstUpdate = useRef(true);
  const loadStatics = async () => {
    const currentStatics = await getStatics();
    setStatics(currentStatics);
  }

  useEffect(() => {
    if (firstUpdate.current && process.env.NODE_ENV === 'development') {
      firstUpdate.current = false;
      return;
    }

    loadStatics();
  }, [])
    return (  
      <>
        <div className="page-content" style={{ minHeight: 1095 }}>
          <div className="page-bar">
            <div className="page-title-breadcrumb">
              <div className=" pull-left">
                <div className="page-title">Bảng thống kê</div>
              </div>
              <ol className="breadcrumb page-breadcrumb pull-right">
                <li>
                  <i className="fa fa-home" />
                  <Link to="/admin/dashboard" className="parent-item">Trang chủ</Link>
                  <i className="fa fa-angle-right" />
                </li>
                <li className="active">Thống kê</li>
              </ol>
            </div>
          </div>
          {/* start widget */}
          <div className="row">
            <div className="col-xl-5" style={{ width: '100%' }}>
              <div className="w-100">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="col mt-0">
                            <h4 className="info-box-title">Tỷ lệ trả lời</h4>
                          </div>
                          <div className="col-auto">
                            <div className="l-bg-green info-icon">
                              <i className="fa fa-users pull-left col-orange font-30" />
                            </div>
                          </div>
                        </div>
                        <h1 className="mt-1 mb-3 info-box-title">{statics.answeredPercentage}%</h1>
                        <div className="mb-0">
                          <span className="text-success m-r-10">
                            <i className="material-icons col-green align-middle">
                              trending_up
                            </i>
                            10.32%
                          </span>
                          <span className="text-muted"> So với tuần trước</span>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="col mt-0">
                            <h4 className="info-box-title">Câu hỏi</h4>
                          </div>
                          <div className="col-auto">
                            <div className="col-indigo info-icon">
                              <i className="fa fa-book pull-left card-icon font-30" />
                            </div>
                          </div>
                        </div>
                        <h1 className="mt-1 mb-3 info-box-title">{statics.questionsCount}</h1>
                        <div className="mb-0">
                          <span className="text-danger m-r-10">
                            <i className="material-icons col-red align-middle">
                              trending_down
                            </i>
                            -10.64%
                          </span>
                          <span className="text-muted"> So với tuần trước</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="col mt-0">
                            <h4 className="info-box-title">Tài khoản</h4>
                          </div>
                          <div className="col-auto">
                            <div className="col-teal info-icon">
                              <i className="fa fa-user pull-left card-icon font-30" />
                            </div>
                          </div>
                        </div>
                        <h1 className="mt-1 mb-3 info-box-title">{statics.usersCount}</h1>
                        <div className="mb-0">
                          <span className="text-success m-r-10">
                            <i className="material-icons col-green align-middle">
                              trending_up
                            </i>
                            21..19%
                          </span>
                          <span className="text-muted"> So với tuần trước</span>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="col mt-0">
                            <h4 className="info-box-title">Câu trả lời</h4>
                          </div>
                          <div className="col-auto">
                            <div className="col-pink info-icon">
                              <i className="fa fa-coffee pull-left card-icon font-30" />
                            </div>
                          </div>
                        </div>
                        <h1 className="mt-1 mb-3 info-box-title">{statics.answersCount}</h1>
                        <div className="mb-0">
                          <span className="text-danger m-r-10">
                            <i className="material-icons col-red align-middle">
                              trending_down
                            </i>
                            -4.27%
                          </span>
                          <span className="text-muted"> So với tuần trước</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end widget */}
          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12 col-12" style={{ width: '100%' }}>
              <div className="card card-box">
                <div className="card-head">
                  <header>Quản lý tài khoản người dùng</header>
                </div>
                <UserTable statics={statics} />
              </div>
            </div>
          </div>
        </div>
      </>      
    )
}