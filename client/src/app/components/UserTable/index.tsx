import { ChangeEvent, useEffect, useState } from "react"
import { User } from "../SignInPanel/slice/types";
import { getUsers, searchUsers } from "services/user.service";
import UserLine from "../UserLine";
import { Statics } from "app/pages/AdminDashBoard";
import { useDebouncedSearch } from "store/hooks";

interface Props {
    statics: Statics
}
export default function UserTable(props: Props) {
    const [users, setUsers] = useState<User[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState('');
    const [amount, setAmount] = useState(5);
    const [page, setPage] = useState(1);
    const { inputText: search, setInputText: setSearch, searchResults, setPage: setPageSearch } = useDebouncedSearch((text) => searchUsers({ limit: amount, page, info: text }));
    const [hasMore, setHasMore] = useState(false);
    const [usersCount, setUsersCount] = useState(props.statics.usersCount);
    const loadUsers = async () => {
        if (!search) {
            const result = await getUsers({ limit: amount, page, paginate: true });
            const { hasMore } = result.pop() as { hasMore: boolean };
            setHasMore(hasMore);
            setUsers(result as User[]);
            setUsersCount(props.statics.usersCount);
        } else {
            const result = await searchUsers({ limit: amount, page, info: search });
            const { hasMore } = result.users.pop() as { hasMore: boolean };
            setHasMore(hasMore);
            setUsers(result.users as User[]);
            setUsersCount(result.usersCount);
        }
    }

    const changeAmount = (e: ChangeEvent<HTMLSelectElement>) => {
        setPageSearch(1);
        setPage(1);
        setHasMore(false);
        setAmount(parseInt(e.target.value));
    }

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPage(1);
        setPageSearch(1);
        setHasMore(false);
        setSearch(e.target.value);
    }

    const handlePageClick = (e, pageNumber) => {
        e.preventDefault();
        setPageSearch(pageNumber);
        setPage(pageNumber);
    }

    const loadsearchUsers = () => {
        const result = searchResults.result as { users: (User | { hasMore: boolean })[], usersCount: number } | undefined;
        if (result?.users && result.users.length > 0) {
            const { hasMore } = result.users.pop() as { hasMore: boolean };
            setHasMore(hasMore);
            setUsers(result.users as User[]);
            setUsersCount(result.usersCount);
        }
    }

    useEffect(() => {
        if (search && page === 1) {
            loadsearchUsers();
        } else {
            loadUsers();
        }
    }, [amount, page, search, searchResults.result]);

    return (
        <div className="card-body no-padding height-9">
            <div className="row" style={{ marginBottom: '10px' }}>
                <div className="col-sm-12 col-md-6">
                    <div className="dataTables_length" id="example4_length">
                    <label style={{ whiteSpace: "nowrap" }}>Hiển thị <select onChange={changeAmount} style={{ display: "inline-block" }} name="example4_length" aria-controls="example4" className="form-select form-select-sm">
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option></select>  
                    </label>
                    </div>
                </div>
                <div className="col-sm-12 col-md-6">
                    <div id="example4_filter" className="dataTables_filter" style={{ textAlign: "right" }}>
                    <label htmlFor="search" style={{ whiteSpace: 'nowrap' }}>Tìm kiếm:              <input onChange={handleSearchChange} id="search" type="search" className="form-control form-control-sm" aria-controls="example4" style={{ display: 'inline-block', width: "auto" }} placeholder="Nhập tên tìm kiếm"/>
                    </label>                              
                </div>
            </div>
            </div>
            <div className="table-responsive">
                <table
                    className="table table-striped table-bordered table-hover table-checkable order-column"
                    id="example4"
                >
                    <thead>
                    <tr>
                        <th>
                        <label className="rt-chkbox rt-chkbox-single rt-chkbox-outline">
                            <input
                            type="checkbox"
                            className="group-checkable"
                            data-set="#sample_1 .checkboxes"
                            />
                            <span />
                        </label>
                        </th>
                        <th className="center">Tên tài khoản</th>
                        <th className="center">E-mail</th>
                        <th className="center">Số điện thoại</th>
                        <th className="center">Ngày tạo tài khoản</th>
                        <th className="center">Trạng thái </th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => <UserLine user={user} key={user.id} dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} />)}
                    </tbody>
                </table>
            </div>
            <div className="row">
                <div className="col-sm-12 col-md-5">
                    <div className="dataTables_info" id="example4_info" role="status" aria-live="polite">
                    Hiển thị từ {(page - 1) * amount + 1} đến {users.length + (page - 1) * amount} trong số {usersCount} tài khoản
                    </div>
                </div>
                <div className="col-sm-12 col-md-7">
                    <div className="dataTables_paginate paging_simple_numbers" id="example4_paginate">
                    <ul className="pagination" style={{ justifyContent: 'right' }}>
                        <li className={"paginate_button page-item previous" + (page > 1 ? "" : " disabled")} id="example4_previous">
                            <a href="#" className="page-link" onClick={(e) => {handlePageClick(e, page - 1)}}>
                                Trước
                            </a>
                        </li>
                        {page > 1 &&
                            <li className="paginate_button page-item">
                                <a href="#" className="page-link" onClick={(e) => {handlePageClick(e, page - 1)}}>{page - 1}</a>
                            </li>
                        }
                        <li className="paginate_button page-item active">
                            <a href="#" className="page-link" onClick={(e) => {handlePageClick(e, page)}}>{page}</a>
                        </li>
                        {hasMore &&
                            <li className="paginate_button page-item ">
                                <a href="#" className="page-link" onClick={(e) => {handlePageClick(e, page + 1)}}>{page + 1}</a>
                            </li>
                        }
                        <li className={"paginate_button page-item next" + (hasMore ? "" : " disabled")} id="example4_next">
                            <a href="#" className="page-link" onClick={(e) => {handlePageClick(e, page + 1)}}>
                                Sau
                            </a>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}