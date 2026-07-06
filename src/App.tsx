import { Switch, Route, Router as WouterRouter } from "wouter";
import "@/styles/globals.css";

import HomePage from "@/routes/HomePage";
import LibraryPage from "@/routes/LibraryPage";
import PricingPage from "@/routes/PricingPage";
import ProfilePage from "@/routes/ProfilePage";
import NotFoundPage from "@/routes/NotFoundPage";

function AppRoutes() {
  return (
    <Switch>
      <Route path="/library" component={LibraryPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/" component={HomePage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

function App() {
  return (
    <>
      <div className="bg-fx" aria-hidden="true" />
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <AppRoutes />
      </WouterRouter>
    </>
  );
}

export default App;
