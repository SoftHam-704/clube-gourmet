import { Route, Switch } from "wouter";
import Index from "./pages/index";
import Restaurants from "./pages/restaurants";
import Plans from "./pages/plans";
import About from "./pages/about";
import Contact from "./pages/contact";
import Faq from "./pages/faq";
import Terms from "./pages/terms";
import Privacy from "./pages/privacy";
import Experiences from "./pages/experiences";
import Partnerships from "./pages/partnerships";
import Business from "./pages/business";
import Referral from "./pages/referral";
import ClassicVision from "./pages/classic-vision";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import Checkout from "./pages/checkout";

// Admin Pages
import AdminLogin from "./pages/admin/login";
import AdminDashboard from "./pages/admin/dashboard";
import AdminPlans from "./pages/admin/plans";
import AdminCities from "./pages/admin/cities";
import AdminRestaurants from "./pages/admin/restaurants";

// Auth Pages
import SignIn from "./pages/auth/sign-in";
import SignUp from "./pages/auth/sign-up";

import { Provider } from "./components/provider";
import { ScrollToTop } from "./components/layout/ScrollToTop";

function App() {
        return (
                <Provider>
                        <ScrollToTop />
                        <Switch>
                                <Route path="/" component={Index} />
                                <Route path="/restaurants" component={Restaurants} />
                                <Route path="/plans" component={Plans} />
                                <Route path="/about" component={About} />
                                <Route path="/contact" component={Contact} />
                                <Route path="/faq" component={Faq} />
                                <Route path="/terms" component={Terms} />
                                <Route path="/privacy" component={Privacy} />
                                <Route path="/experiences" component={Experiences} />
                                <Route path="/partnerships" component={Partnerships} />
                                <Route path="/business" component={Business} />
                                <Route path="/referral" component={Referral} />
                                <Route path="/classic-vision" component={ClassicVision} />
                                <Route path="/dashboard" component={Dashboard} />
                                <Route path="/profile" component={Profile} />

                                {/* Auth Routes */}
                                <Route path="/sign-in" component={SignIn} />
                                <Route path="/sign-up" component={SignUp} />
                                <Route path="/checkout" component={Checkout} />

                                {/* Admin Routes */}
                                <Route path="/admin/login" component={AdminLogin} />
                                <Route path="/admin" component={AdminDashboard} />
                                <Route path="/admin/plans" component={AdminPlans} />
                                <Route path="/admin/cities" component={AdminCities} />
                                <Route path="/admin/restaurants" component={AdminRestaurants} />
                        </Switch>

                </Provider>
        );
}

export default App;
