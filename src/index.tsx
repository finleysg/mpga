import "react-app-polyfill/ie11"
import "react-app-polyfill/stable"

import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

import ReactDOM from "react-dom"

import { AxiosResponse } from "axios"
import { LayoutProvider } from "layout/LayoutContext"
import { Provider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"

import constants from "./app-constants"
import { store } from "./app-store"
import { Api } from "./http"
import { AppRoutes } from "./routes/AppRoutes"
import * as serviceWorker from "./serviceWorker"
import { UserActionTypes } from "./store/UserActions"

Api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      sessionStorage.removeItem(constants.BearerTokenName)
      localStorage.removeItem(constants.BearerTokenName)
      store.dispatch({ type: UserActionTypes.RESET_USER })
    } else {
      throw error
    }
  },
)

const stripePromise = loadStripe(constants.StripePublicKey)

function renderApp() {
  ReactDOM.render(
    <Elements stripe={stripePromise}>
      <Provider store={store}>
        <LayoutProvider>
          <Router>
            <AppRoutes />
          </Router>
        </LayoutProvider>
      </Provider>
    </Elements>,
    document.getElementById("root"),
  )
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
renderApp()
serviceWorker.unregister()
