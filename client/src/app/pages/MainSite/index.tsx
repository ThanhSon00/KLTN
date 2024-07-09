import { authActions } from "app/components/SignInPanel/slice";
import { getAuth } from "app/components/SignInPanel/slice/selectors";
import { User } from "app/components/SignInPanel/slice/types";
import load from "load-script"
import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";


export default function MainSite() {
    // const location = useLocation();
    // const scripts = [
    //     // 'jquery.min.js', 
    //     // 'jquery-migrate.min.js', 
    //     // 'select.min.js', 
    //     // 'scripts.js', 
    //     // 'core.min.js', 
    //     // 'datepicker.min.js',
    //     // 'mouse.min.js',
    //     // 'sortable.min.js', 
    //     // 'flexMenu.js', 
    //     // 'custom.js',
    //     // // 'unlogged.js', 
    //     // 'index.js', 'index2.js',
    //     // 'html.js', 
    //     // 'modernizr.js', 
    //     // 'scrollbar.js',
    //     // 'theia.js', 
    //     // 'owl.js', 
    //     // 'matchHeight.js',
    //     // 'prettyPhoto.js', 
    //     // 'tabs.js', 
    //     // 'tipsy.js', 
    //     // 'isotope.js', 
    //     // 'api.js', 
    //     // 'imagesloaded.min.js',  
    //     // 'custom2.js', 
    //     // 'prism.js',
    //     // 'clipboard.min.js',
    //     // 'hcb_script.js',
    //     // 'wp-emoji-release.min.js',
    //   ]
    // const emptyFunction = () => {};
    const firstUpdate = useRef(true);
    const { user } = useAppSelector(getAuth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (firstUpdate.current && process.env.NODE_ENV === 'development') {
          firstUpdate.current = false;
          return;
        }
            
        if (user) return;
        
        verifyUser()
          .then(user => {
            dispatch(authActions.setUser(user));
          })
          .catch(() => {
            console.log('user not found');
          });
    
        // for (const script of scripts) {
        //   load(`/scripts/main/${script}`, { async: false } , emptyFunction);
        // }
        // console.log("script loaded")
    }, [user]);
    
    return <Outlet />
}


async function verifyUser(): Promise<User> {
  const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/auth/who-am-i`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    mode: 'cors', // to allow cross-origin requests
  });
  const jsonObj = await response.json();
  const myPromise: Promise<User> = new Promise((resolve, reject) => {
    if (response.ok && response.status !== 204) {
      resolve(jsonObj);
    } /*if (response.status === 204) */ else {
      reject();
    }
  });
  return myPromise;
}
