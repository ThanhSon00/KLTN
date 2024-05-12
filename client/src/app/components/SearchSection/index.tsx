import { useEffect, useState } from "react";
import { Question } from "../QuestionDetails/slice/types";
import { Article } from "../Article";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import { fullTextSearch } from "services/searching.service";
import { PanelSubmitButton } from "../PanelSubmitButton";

export default function SearchSection() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState<string>("");
  const dispatch = useAppDispatch();
  const loadSearchResults = async () => {
    const text = searchParams.get("text");
    if (!text) return;
    const result = await dispatch(fullTextSearch({ text, amount: 5, page: 1 }));

    if (result.meta.requestStatus == "fulfilled") {
      if (result.payload && typeof result.payload !== "string")
        setQuestions(result.payload.map(item => item.question));    
    }
  }

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(new URLSearchParams({ text: searchText }));
  }
  
  useEffect(() => {
    loadSearchResults();
  }, [searchParams])

  return (
    <>
      <div className="breadcrumbs d-flex align-items-center justify-content-between w-100 mb-4 breadcrumbs_1">
        <div className="breadcrumbs-wrap d-flex align-items-center justify-content-between w-100">
          
          <div className="breadcrumb-left">
            <span className="crumbs">
              
              <span
                className="breadcrumb-item"
                itemScope
                itemType="https://schema.org/BreadcrumbList"
              >
                
                <span
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                >
                  <meta itemProp="position" />
                  <a itemProp="item" href="../index.html" title="Home">
                    <span itemProp="name">
                      <i className="icon-home font-xl mr-2" />
                      Home
                    </span>
                  </a>
                </span>
                <span className="crumbs-span">/</span>
                <span className="current">Search</span>
              </span>
            </span>
          </div>
          <div className="breadcrumb-right d-flex align-items-center">
            <div className="clearfix" />
          </div>
        </div>
      </div>
      <div className="clearfix" />
      <div className="section-all-search">
        
        <div className="main-search block-section-div post-search search-not-get">
          
          <form
            role="search"
            method="get"
            className="searchform main-search-form"
            action="https://2code.info/demo/themes/Discy/Main/search/"
            onSubmit={handleSearch}
          >
            
            <div className="row row-warp row-boot">
              
              <div className="form-group col col6 col-boot-sm-6">
                
                <input
                  type="search"
                  className="form-control"
                  name="search"
                  placeholder="Nhập từ khóa tìm kiếm"
                  onChange={handleSearchTextChange}
                />
              </div>
              <div className="form-group col col6 col-boot-sm-6">
                
                <span className="styled-select">
                  
                  <select
                    name="search_type"
                    className="form-control search_type user_filter_active"
                  >
                    
                    <option value={-1}>Select kind of search</option>
                    <option value="questions">
                      Questions
                    </option>
                    <option value="answers">Answers</option>
                    <option value="question-category">
                      Question categories
                    </option>
                    <option value="question_tags">Question tags</option>
                    <option value="posts">Posts</option>
                    <option value="comments">Comments</option>
                    <option value="category">Post categories</option>
                    <option value="post_tag">Post tags</option>
                    <option value="users">Users</option>
                    <option value="groups">Groups</option>
                  </select>
                </span>
              </div>
              <div className="form-group col col6 col-boot-sm-6 user-filter-div">
                
                <span className="styled-select user-filter">
                  
                  <select className="form-control">
                    
                    <option value="user_registered">
                      Date Registered
                    </option>
                    <option value="display_name">Name</option>
                    <option value="ID">ID</option>
                    <option value="question_count">Questions</option>
                    <option value="answers">Answers</option>
                    <option value="the_best_answer">Best Answers</option>
                    <option value="points">Points</option>
                    <option value="post_count">Posts</option>
                    <option value="comments">Comments</option>
                  </select>
                </span>
              </div>
            </div>
            <div className="wpqa_form">
              <PanelSubmitButton name="Search" />
            </div>
          </form>
        </div>
        <section className="loop-section">
          <h2 className="screen-reader-text">Search results</h2>
          <div className="post-articles question-articles articles-no-pagination">
            {questions.map((question) => <Article question={question} key={question.id} />)}
          </div>
          <div className="clearfix"></div>
          <div className="pagination-wrap pagination-question no-pagination-wrap"></div>
        </section>
      </div>
    </>
  );
}

