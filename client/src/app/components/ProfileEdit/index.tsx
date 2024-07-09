import { Editor as TinyMCEEditor } from 'tinymce';
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getAuth } from "../SignInPanel/slice/selectors";
import { ChangeEvent, ReactElement, useRef, useState } from "react";
import { PanelSubmitButton } from "../PanelSubmitButton";
import { AuthMessage } from "../AuthMessage";
import { updateUser } from "services/user.service";
import { authActions } from "../SignInPanel/slice";
import { Gender, User } from "../SignInPanel/slice/types";
import { Link } from "react-router-dom";
import { TextEditor } from "../TextEditor";
import { Avatar } from '../ReportLine';

enum ImageState {
    none = 'none',
    changed = 'changed',
    deleted = 'deleted',
}

export default function ProfileEdit() {
  const { user } = useAppSelector(getAuth);
  const editorRef = useRef<TinyMCEEditor>();
  const [modified, setModified] = useState<Record<string, boolean>>({});
  const [cover, setCover] = useState<string>(user?.cover || "");
  const [avatar, setAvatar] = useState<string>(user?.avatar || "");
  const [avatarFile, setAvatarFile] = useState<File>();
  const [coverFile, setCoverFile] = useState<File>();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.gender);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
  const [city, setCity] = useState(user?.city);
  const dispatch = useAppDispatch();

  const handleChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      modified.avatar = true;
      setAvatarFile(e.target.files[0]);
    } else {
      setAvatarFile(undefined);
    }
  };

  const handleChangeConver = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      modified.cover = true;
      setCoverFile(e.target.files[0]);
    } else {
      setCoverFile(undefined);
    }
  };

  const handleGenderChange = (e: ChangeEvent<HTMLInputElement>, gender: Gender) => {
    if (e.target.checked) setGender(gender);
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value);
  }

  const handleAgeChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setAge(parseInt(e.target.value));
  }

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPhoneNumber(e.target.value);
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !editorRef.current) return; 

    const updateData = { }
    const description = editorRef.current.getContent();
    const array = [
      { name }, 
      { email }, 
      { age }, 
      { phoneNumber }, 
      { gender }, 
      { description },
      { city }
    ];

    for (const item of array) {
        const varName = Object.keys(item)[0];
        if (item[varName] !== user[varName]) {
          Object.assign(updateData, { [varName]: item[varName] })
      }
    }

    if (modified.cover) Object.assign(updateData, { cover: coverFile || "" });
    if (modified.avatar) Object.assign(updateData, { avatar: avatarFile  || "" });

    await dispatch(updateUser({ id: user.id, userBody: updateData }));
    window.scrollTo(0, 0);
  }


  const handleDeleteAvatar = (e) => {
    if (!user) return;
    e.preventDefault();
    modified.avatar = true;
    setAvatarFile(undefined);
    setAvatar(Avatar.anonymous);
  }

  const handleDeleteCover = (e) => {
    if (!user) return;
    e.preventDefault();
    modified.cover = true;
    setCoverFile(undefined);
    setCover("");
  }

  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCity(e.target.value);
  }

  return (
    <form
      className="edit-profile-form block-section-div wpqa_form wpqa-readonly"
      method="post"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <AuthMessage />
      <div className="form-inputs clearfix">
        
        <div className="page-sections" id="edit-profile">
          <div className="page-section page-section-basic">
            
            <div className="page-wrap-content">
              
              <h2 className="post-title-2">
                <i className="icon-vcard" />
                Thông tin cơ bản
              </h2>
              <p className="nickname_field">
                
                <label htmlFor="nickname_515">
                  Tên tài khoản<span className="required">*</span>
                </label>
                <input
                  className="form-control"
                  name="nickname"
                  id="nickname_515"
                  type="text"
                  value={name}
                  placeholder="Tên tài khoản"
                  onChange={handleNameChange}
                />
                <i className="icon-vcard" />
              </p>
              <p className="city_field">
                
                <label htmlFor="city_515">Thành phố</label>
                <input
                  className="form-control"
                  type="text"
                  name="city"
                  id="city_515"
                  placeholder="Thành phố"
                  value={city}
                  onChange={handleCityChange}
                />
                <i className="icon-address" />
              </p>
              <p className="phone_field">
                
                <label htmlFor="phone_515">Điện thoại</label>
                <input
                  className="form-control"
                  type="text"
                  name="phone"
                  id="phone_515"
                  placeholder="Số điện thoại"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                />
                <i className="icon-phone" />
              </p>
              <p className="gender_field wpqa_radio_p">
                <label>Giới tính</label>
              </p>
              <div className="wpqa_radio_div custom-radio-container d-flex">
                
                <p className="wpqa_radio custom-control custom-radio">
                  
                  <input
                    className="custom-control-input"
                    id="gender_male_515"
                    name="gender"
                    type="radio"
                    checked={gender === Gender.male}
                    onChange={(e) => { handleGenderChange(e, Gender.male) }}
                  />
                  <label
                    className="male_radio_label"
                    htmlFor="gender_male_515"
                  >
                    Nam
                  </label>
                </p>
                <p className="wpqa_radio custom-control custom-radio">
                  
                  <input
                    className="custom-control-input"
                    id="gender_female_515"
                    name="gender"
                    type="radio"
                    checked={gender === Gender.female}
                    onChange={(e) => { handleGenderChange(e, Gender.female) }}
                  />
                  <label
                    className="female_radio_label"
                    htmlFor="gender_female_515"
                  >
                    Nữ
                  </label>
                </p>
                <div className="clearfix" />
              </div>
              <p className="age_field">
                
                <label htmlFor="age_515">Tuổi</label>
                <input
                  type="text"
                  className="form-control age-datepicker hasDatepicker"
                  name="age"
                  id="age_515"
                  value={age}
                  placeholder="Tuổi"
                  onChange={handleAgeChange}
                />
                <i className="icon-globe" />
              </p>
              <p className="email_field">
                
                <label htmlFor="email_515">
                  E-Mail<span className="required">*</span>
                </label>
                <input
                  className="form-control"
                  autoComplete="email"
                  type="text"
                  name="email"
                  id="email_515"
                  placeholder="E-mail"
                  value={email}
                  onChange={handleEmailChange}
                />
                <i className="icon-mail" />
              </p>
              <div className="clearfix" />
              <div className="author-image profile-image d-flex align-items-center mb-4">
                <span className="author-image-span wpqa-delete-image-span uploded-img mr-4">
                  <img
                    className="avatar avatar-100 photo"
                    alt={name}
                    title={name}
                    style={{ width: 100, height: 100, maxBlockSize: '100px' }}
                    src={avatar}
                    srcSet={avatarFile && URL.createObjectURL(avatarFile)}
                  />
                </span>
                {avatar && 
                  <>
                    <div className="clearfix" />
                    <div className="button-default wpqa-remove-image btn btn__danger btn__small__width" onClick={handleDeleteAvatar}>Xóa</div>
                  </>
                }
                
              </div>
              <label htmlFor="your_avatar_515">Ảnh đại diện</label>
              <div className="fileinputs">
                
                <input
                  type="file"
                  name="you_avatar"
                  id="your_avatar_515"
                  onChange={handleChangeAvatar}
                />
                <div className="fakefile">
                  
                  <button type="button">{avatarFile ? avatarFile.name : 'Chọn tệp tin'}</button>
                  <span>Chọn ...</span>
                </div>
                <i className="icon-camera" />
              </div>
              <div className="clearfix" />
              {(cover || coverFile) && 
              <>
                <img 
                      className="cover-100 photo" 
                      alt="phanson69" 
                      title="phanson69" 
                      src={cover}
                      srcSet={coverFile && URL.createObjectURL(coverFile)}
                />
                <div className="author-image profile-image d-flex align-items-center mb-4">
                  <div className="clearfix"></div>
                  <div className="button-default wpqa-remove-image btn btn__danger btn__small__width" onClick={handleDeleteCover}>Xóa</div>
                  <div className="loader_2 loader_4"></div>
                </div>  
              </>
                
              }  
              
              <label htmlFor="your_cover_515">Ảnh nền</label>
              <div className="fileinputs">
                
                <input
                  type="file"
                  name="your_cover"
                  id="your_cover_515"
                  onChange={handleChangeConver}
                />
                <div className="fakefile">
                  
                  <button type="button">{coverFile ? coverFile.name : 'Chọn tệp tin'}</button>
                  <span>Chọn ...</span>
                </div>
                <i className="icon-camera" />
              </div>
              <div className="clearfix" />
            </div>
            <div className="clearfix" />
          </div>

              <div className="page-section page-section-about">
                
                <div className="page-wrap-content">
                  
                  <h2 className="post-title-2">
                    <i className="icon-graduation-cap" />
                    Về bản thân
                  </h2>
                  <div className="the-description wpqa_textarea the-textarea">
                    <div
                      id="wp-description_515-wrap"
                      className="wp-core-ui wp-editor-wrap tmce-active"
                    >
                      <TextEditor editorRef={editorRef} value={user?.description}/>
                    </div>
                  </div>
                </div>
                <div className="clearfix" />
              </div>
        </div>
      </div>
      <PanelSubmitButton name="Cập nhật thông tin"/>
    </form>
    );
}