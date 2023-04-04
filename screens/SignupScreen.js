import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../components/utils/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth_context';


function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert('Authentication failed!', 'Please check your credentials! and try again later', ['OK']);
    }
    setIsAuthenticating(false);
  }

  if(isAuthenticating) {
    return <LoadingOverlay  message="Creating User..."/>
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;