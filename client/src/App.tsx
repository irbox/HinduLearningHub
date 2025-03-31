import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import VideoPage from "@/pages/VideoPage";
import BookPage from "@/pages/BookPage";
import SearchPage from "@/pages/SearchPage";
import CoursesPage from "@/pages/CoursesPage";
import MaterialsPage from "@/pages/MaterialsPage";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNavigation from "@/components/layout/MobileNavigation";

import { Redirect } from "wouter";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/videos/:id?" component={VideoPage} />
      <Route path="/books/:id?" component={BookPage} />
      <Route path="/search" component={SearchPage} />
      {/* Redirect removed pages to the new locations */}
      <Route path="/courses">{() => <Redirect to="/videos" />}</Route>
      <Route path="/materials">{() => <Redirect to="/books" />}</Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow md:pb-0 pb-16">
        <Router />
      </main>
      <Footer className="md:block hidden" />
      <MobileNavigation />
      <Toaster />
    </div>
  );
}

export default App;
