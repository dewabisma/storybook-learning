import store from "./lib/store";

import { Provider } from "react-redux";
import Inbox from "./pages/Inbox/Inbox";

function App() {
  return (
    <Provider store={store}>
      <Inbox />
    </Provider>
  );
}

export default App;
