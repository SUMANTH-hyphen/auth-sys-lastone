import { Button } from "antd";
import React from "react";

const GoogleButton = () => {

  function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  }
  function onFailure(error) {
    console.log(error);
  }
  function renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': onSuccess,
      'onfailure': onFailure
    });
  }

  return (
    <div>
      <div id="my-signin2">
        <Button ></Button>
        <script src="https://apis.google.com/js/platform.js?onload=renderButton" async defer> google</script>
      </div>
    </div>
  )
}

export default GoogleButton;