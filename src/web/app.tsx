import { Route, Switch } from "wouter";
import Index from "./pages/index";
import Restaurants from "./pages/restaurants";
import Plans from "./pages/plans";
import { Provider } from "./components/provider";

function App() {
        return (
                <Provider>
                        <Switch>
                                <Route path="/" component={Index} />
                                <Route path="/restaurants" component={Restaurants} />
                                <Route path="/plans" component={Plans} />
                        </Switch>
                </Provider>
        );
}

export default App;
