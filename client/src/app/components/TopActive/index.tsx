import { useEffect, useState } from "react"
import { User } from "../SignInPanel/slice/types"
import { Avatar } from "../ReportLine";
import { Link } from "react-router-dom";
import { getUsers } from "services/user.service";

export default function TopActive() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const loadUsers = async () => {
            const users = await getUsers({ page: 1, limit: 3, sortDesc: 'points'}) as User[];
            setUsers(users.map(user => { return {
                ...user,
                avatar: user.avatar ? `${process.env.REACT_APP_SERVER_ORIGIN}${user.avatar}` : "",
                cover: user.cover ? `${process.env.REACT_APP_SERVER_ORIGIN}${user.cover}` : "",
            }}));
        }
        loadUsers();
    }, []);

    return (
        <section
        id="users-widget-2"
        className="widget users-widget"
        >
            <h2 className="widget-title">
                <i className="icon-folder" />
                Hoạt động tích cực
            </h2>
            <div className="widget-wrap">
                <div className="user-section user-section-small row row-warp row-boot user-not-normal">
                    {users.map((user) => 
                        <div className="col col12 col-boot-12" key={user.id}>
                            <div className="post-section user-area user-area-small community-card community-card-layout3 d-flex flex-wrap justify-content-between him-user widget-not-icon-user">
                            <div className="post-inner member__info community__info">
                                <div className="author-image author__avatar author-image-42">
                                <Link to={"/home/profile/" + user.id}>
                                    <span className="author-image-span">
                                    <img
                                        className="avatar avatar-42 rounded-circle photo"
                                        title={user.name}
                                        width={42}
                                        height={42}
                                        style={{ maxBlockSize: "42px" }}
                                        src={user.avatar || Avatar.anonymous}
                                    />
                                    </span>
                                </Link>
                                </div>
                                <div className="user-content">
                                <div className="user-inner">
                                    <h4 className="member__name mb-1">
                                    <Link to={"/home/profile/" + user.id}>
                                        {user.name}
                                    </Link>
                                    </h4>
                                    <div className="user-data">
                                    <ul className="member__stats list-unstyled mb-0 d-flex">
                                        <li className="user-questions stats__item community__count">
                                            <span className="stats__count">
                                                {user.questions}{' '}
                                            </span>
                                            <span className="stats__text">
                                                Câu hỏi
                                            </span>
                                        </li>
                                        <li className="user-points stats__item community__count">
                                            <span className="stats__count">
                                                {user.answers}{' '}
                                            </span>
                                            <span className="stats__text">
                                                Trả lời 
                                            </span>
                                        </li>
                                    </ul>
                                    </div>
                                </div>
                                </div>
                                <div className="clearfix" />
                            </div>
                            </div>
                        </div>
                    )}                    
                </div>
            </div>
            </section>        
    )
}