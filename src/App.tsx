import Login from "./Auth/Login";
import NotFound from "./NotFound";

function App() {
  return (
    <>
      <div className="hidden lg:block">
        <Login />
      </div>
      <div className="lg:hidden">
        <NotFound />
      </div>
    </>
  );
}

export default App;
