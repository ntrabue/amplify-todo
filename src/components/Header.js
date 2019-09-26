import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { Container } from "@material-ui/core";

import { Button } from "@material-ui/core";

const Header = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUser().then(user => {
      setUser(user);
    });
  }, []);

  async function fetchUser() {
    const currentUser = await Auth.currentUserInfo();
    return currentUser;
  }

  if (!user.attributes) return null;

  function logout() {
    return Auth.signOut();
  }

  return (
    <Container>
      <Button variant='contained' color='secondary' onClick={logout}>
        Logout of {user.attributes.email}
      </Button>
    </Container>
  );
};

export default Header;
