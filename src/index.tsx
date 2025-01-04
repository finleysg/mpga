import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"

import { store } from "./app-store"
import { LayoutProvider } from "./layout/LayoutContext"
import { AppRoutes } from "./routes/AppRoutes"
import * as serviceWorker from "./serviceWorker"

const rootElement = document.getElementById("root")
if (!rootElement) {
	throw new Error("Boom! You need a root element.")
}
const root = createRoot(rootElement)

root.render(
		<Provider store={store}>
			<LayoutProvider>
				<Router>
					<AppRoutes />
				</Router>
			</LayoutProvider>
		</Provider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
