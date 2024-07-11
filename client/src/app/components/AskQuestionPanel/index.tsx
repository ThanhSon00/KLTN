/**
 *
 * AskQuestionPanel
 *
 */
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector, useDebouncedSearch } from 'store/hooks';
import { selectPanelState } from '../SignUpPanel/slice/selectors';
import { panelName } from '../SignUpPanel/slice/types';
import { panelActions } from '../SignUpPanel/slice';
import { TextEditor } from '../TextEditor';
import { useRef } from 'react';
import { Editor as TinyMCEEditor } from 'tinymce';
import { createQuestion } from 'services/question.service';
import { getAuth } from '../SignInPanel/slice/selectors';
import { PanelSubmitButton } from '../PanelSubmitButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthMessage } from '../AuthMessage';
import { AlertActions } from '../AuthMessage/slice';
import AutoSuggest from '../AutoSuggest';
import { getSuggestedQuestions } from 'services/searching.service';

interface Props {}

export function AskQuestionPanel(props: Props) {
  const { inputText: title, setInputText: setTitle, searchResults } = useDebouncedSearch(getSuggestedQuestions);
  const { popUp } = useAppSelector(selectPanelState);
  const dispatch = useAppDispatch();
  const editorRef = useRef<TinyMCEEditor>();
  const { user } = useAppSelector(getAuth);
  const navigate = useNavigate();
  const location = useLocation();
  const handleCancelClick = e => {
    e.preventDefault();
    dispatch(panelActions.closePanel());
  };

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!editorRef.current || !user) return;

    const details = editorRef.current.getContent();

    if (!details) {
      dispatch(
        AlertActions.setAuthMessage({
          error: 'Phần nội dung câu hỏi không được để trống',
        }),
      );
    }

    const result = await dispatch(
      createQuestion({ title, details, author: user.id }),
    );

    if (result.type.includes('rejected')) console.log('rejected');

    if (result.type.includes('fulfilled')) {
      if (result.payload && typeof result.payload !== 'string') {
        dispatch(panelActions.closePanel());
        const questionId = result.payload.id;
        navigate(`/home/questions/${questionId}`);
      }
    }
  };

  const resetState = () => {
    setTitle('');
    if (!editorRef.current) return;
    editorRef.current.setContent('');
  };

  useEffect(() => {
    if (popUp !== panelName.ASK_QUESTION) {
      resetState();
    } 
  }, [popUp])

  return (
    <div
      className="panel-pop panel-pop-login"
      id="wpqa-question"
      data-width={690}
      style={{
        position: 'sticky',
        top: '100px',
        width: '690px',
        left: '30%',
        display: popUp === panelName.ASK_QUESTION ? 'block' : 'none',
      }}
    >
      <i className="icon-cancel" onClick={handleCancelClick} />
      <div className="panel-pop-content">
        <form
          className="form-post wpqa_form"
          action="https://2code.info/demo/themes/Discy/Main/add-question/"
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <AuthMessage />
          <div className="form-inputs clearfix">
            <p>
              <label htmlFor="question-title-931">
                Tiêu đề<span className="required">*</span>
              </label>
              <input
                name="title"
                id="question-title-931"
                className="form-control the-title"
                type="text"
                onChange={handleTitleChange}
                value={title}
                required
              />
              <i className="icon-chat" />
              <span className="form-description">
                Nên chọn tiêu đề phù hợp nhất với câu hỏi để có thể dễ dàng được trả lời
              </span>
            </p>
            {searchResults.loading && 
              <>
                <p className="searching-title">Đang đề xuất câu hỏi ...</p>
                <span className='load_span' style={{ display: 'block' }}>
                  <span className="loader_2" />
                </span>
              </>
            }
            {searchResults.result?.length > 0 && 
              <AutoSuggest searches={searchResults.result} />
            }
            <div className="wpqa_textarea wpqa_ask_question_textarea">
              <label htmlFor="question-details-add-931">
                Chi tiết<span className="required">*</span>
              </label>
              <TextEditor editorRef={editorRef} />
              <span className="form-description">
                Mô tả chi tiết câu hỏi 
              </span>
            </div>
          </div>
          {user?.isBanned ? 
            <PanelSubmitButton name="Tài khoản của bạn đã không còn quyền đặt câu hỏi" disabled={true} style={{ background: 'gray' }} /> :
            <PanelSubmitButton name="Đăng câu hỏi" />}
        </form>
      </div>
    </div>
  );
}
