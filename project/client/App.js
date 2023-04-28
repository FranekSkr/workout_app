import 'react-native-gesture-handler'
import { AuthProvider } from "./context/AuthContex";
import AppNav from "./navigation/AppNav";

function App() {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}

export default App;
