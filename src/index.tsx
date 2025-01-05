import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"
import { toast } from "react-toastify"

import { store } from "./app-store"
import { LayoutProvider } from "./layout/LayoutContext"
import { AppRoutes } from "./routes/AppRoutes"
import * as serviceWorker from "./serviceWorker"

const rootElement = document.getElementById("root")
if (!rootElement) {
	throw new Error("Boom! You need a root element.")
}
const root = createRoot(rootElement)

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Infinity,
			retry(failureCount, error) {
				if (error.message === '{"detail":"Authentication credentials were not provided."}')
					return false
				else if (error.name === "NotFound") return false
				else if (failureCount < 2) return true
				else return false
			},
		},
	},
	queryCache: new QueryCache({
		onError: (error) => {
			if (error.name === "ZodError") {
				console.error(`API parsing error: ${error.message}`, { autoClose: false })
			} else if (error.name === "ServerError") {
				toast.warn(`Server error (hopefully temporary): ${error.message}`)
			} else {
				console.error(error.message)
			}
		},
	}),
})

root.render(
	<Provider store={store}>
		<QueryClientProvider client={queryClient}>
			<LayoutProvider>
				<Router>
					<AppRoutes />
				</Router>
			</LayoutProvider>
		</QueryClientProvider>
	</Provider>,
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
