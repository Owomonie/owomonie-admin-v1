import NotFound from "./NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import AppRoutes from "./AppRoutes";
import store from "./redux/store";

if (process.env.NODE_ENV === "production") {
  console.log = function () {};
}

function App() {
  return (
    <>
      <div className="hidden lg:block">
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/*"
                element={<AppRoutes />}
              />
            </Routes>
          </BrowserRouter>
        </Provider>
      </div>
      <div className="lg:hidden">
        <NotFound />
      </div>
    </>
  );
}

export default App;
