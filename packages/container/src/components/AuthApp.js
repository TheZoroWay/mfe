import { mount } from "auth/AuthApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default ({ onSignedIn }) => {
  const ref = useRef(null);
  const history = useHistory(); //copy of browser history

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
      onSignIn: (isSignedIn) => {
        // if (isSignedIn) {
        //   history.push("/");
        // }
        onSignedIn(isSignedIn);
      },
    });

    history.listen(onParentNavigate);
  }, [history]);

  return <div ref={ref}></div>;
};
