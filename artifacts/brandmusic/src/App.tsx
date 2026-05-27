import { Switch, Route, Router as WouterRouter } from "wouter";
import { AuthProvider } from "@/contexts/AuthContext";
import "@/app/globals.css";

import HomePage from "@/app/page";
import FeaturesPage from "@/app/features/page";
import PricingPage from "@/app/pricing/page";
import ServicesPage from "@/app/services/page";
import EnterprisePage from "@/app/enterprise/page";
import ProductPage from "@/app/product/page";
import LoginPage from "@/app/login/page";
import SignupPage from "@/app/signup/page";
import ProfilePage from "@/app/profile/page";
import LibraryPage from "@/app/library/page";
import TestSupabasePage from "@/app/test-supabase/page";

import AppLayout from "@/app/app/layout";
import AppHome from "@/app/app/page";
import AppDashboard from "@/app/app/dashboard/page";
import AppSearch from "@/app/app/search/page";
import AppProjects from "@/app/app/projects/page";
import AppBrandPortal from "@/app/app/brand-portal/page";
import AppStemStudio from "@/app/app/stem-studio/page";
import AppVideoSync from "@/app/app/video-sync/page";

import NotFound from "@/pages/not-found";

function AppRoutes() {
  return (
    <Switch>
      <Route path="/app/dashboard">{() => <AppLayout><AppDashboard /></AppLayout>}</Route>
      <Route path="/app/search">{() => <AppLayout><AppSearch /></AppLayout>}</Route>
      <Route path="/app/projects">{() => <AppLayout><AppProjects /></AppLayout>}</Route>
      <Route path="/app/brand-portal">{() => <AppLayout><AppBrandPortal /></AppLayout>}</Route>
      <Route path="/app/stem-studio">{() => <AppLayout><AppStemStudio /></AppLayout>}</Route>
      <Route path="/app/video-sync">{() => <AppLayout><AppVideoSync /></AppLayout>}</Route>
      <Route path="/app">{() => <AppLayout><AppHome /></AppLayout>}</Route>

      <Route path="/features" component={FeaturesPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/services" component={ServicesPage} />
      <Route path="/enterprise" component={EnterprisePage} />
      <Route path="/product" component={ProductPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/library" component={LibraryPage} />
      <Route path="/test-supabase" component={TestSupabasePage} />
      <Route path="/" component={HomePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <AuthProvider>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <AppRoutes />
      </WouterRouter>
    </AuthProvider>
  );
}

export default App;
