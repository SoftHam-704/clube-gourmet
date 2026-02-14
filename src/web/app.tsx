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
                        </Switch>
                </Provider>
        );
}

export default App;
