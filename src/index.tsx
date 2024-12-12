import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

import { AxiosResponse } from "axios"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"

import constants from "./app-constants"
import { store } from "./app-store"
import { Api } from "./http"
import { LayoutProvider } from "./layout/LayoutContext"
import { AppRoutes } from "./routes/AppRoutes"
import * as serviceWorker from "./serviceWorker"
import { resetUser } from "./store/UserStore"

Api.interceptors.response.use(
	(response: AxiosResponse) => {
		return response
	},
	(error) => {
		if (error.response.status === 401) {
			sessionStorage.removeItem(constants.BearerTokenName)
			localStorage.removeItem(constants.BearerTokenName)
			store.dispatch(resetUser())
		} else {
			throw error
		}
	},
)

const stripePromise = loadStripe(constants.StripePublicKey)

const rootElement = document.getElementById("root")
if (!rootElement) {
	throw new Error("Boom! You need a root element.")
}
const root = createRoot(rootElement)

root.render(
	<Elements stripe={stripePromise}>
		<Provider store={store}>
			<LayoutProvider>
				<Router>
					<AppRoutes />
				</Router>
			</LayoutProvider>
		</Provider>
	</Elements>,
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
