import { Route, Switch } from "wouter";
import Index from "./pages/index";
import Restaurants from "./pages/restaurants";
import Plans from "./pages/plans";
import About from "./pages/about";
import Contact from "./pages/contact";
import Faq from "./pages/faq";
import Terms from "./pages/terms";
import Privacy from "./pages/privacy";
import { Provider } from "./components/provider";

function App() {
        return (
                <Provider>
                        <Switch>
                                <Route path="/" component={Index} />
                                <Route path="/restaurants" component={Restaurants} />
                                <Route path="/plans" component={Plans} />
                                <Route path="/about" component={About} />
                                <Route path="/contact" component={Contact} />
                                <Route path="/faq" component={Faq} />
                                <Route path="/terms" component={Terms} />
                                <Route path="/privacy" component={Privacy} />
                        </Switch>
                </Provider>
        );
}

export default App;
