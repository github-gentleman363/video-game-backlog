import React from 'react';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import {Dropdown, Image, Loader} from "semantic-ui-react";
import {FIREBASE_AUTH, FIREBASE_UI_CONFIG} from "../service/firebase";
import {LogInContext} from "../App";

const LogIn = () => (
    <LogInContext.Consumer>
        {(isLoggedIn) => {
            const style = {width: "38px", height: "38px", margin: "0 8px"};

            if (isLoggedIn == null) {
                return <div style={style}><Loader inline active /></div>
            }

            if (!isLoggedIn) {
                return <StyledFirebaseAuth uiConfig={FIREBASE_UI_CONFIG} firebaseAuth={FIREBASE_AUTH}/>;
            }

            const {photoURL} = FIREBASE_AUTH.currentUser;
            return (
                <Dropdown
                    trigger={
                        <div style={style}>
                            <Image src={photoURL} circular fluid verticalAlign='middle' />
                        </div>
                    }
                    options={[{ key: 'sign-out', text: 'Sign Out', icon: 'sign out', onClick: () => FIREBASE_AUTH.signOut() }]}
                    pointing='top right'
                    icon={null}
                />
            );
        }}
    </LogInContext.Consumer>
);

export default LogIn;