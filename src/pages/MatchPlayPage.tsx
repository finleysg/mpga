import React, { useEffect } from "react"

import Button from "react-bootstrap/Button"

import constants, { PageCodes } from "../app-constants"
import SmallLeftLargeRight from "../components/layouts/SmallLeftLargeRight"
import PageContentDetail from "../features/content/PageContentDetail"

const MatchPlayPage = () => {
	useEffect(() => {
		const widgetScriptSrc = "https://tally.so/widgets/embed.js"

		if (document.querySelector(`script[src="${widgetScriptSrc}"]`) === null) {
			const script = document.createElement("script")
			script.src = widgetScriptSrc
			document.body.appendChild(script)
			return
		}
	}, [])

	return (
		<SmallLeftLargeRight
			LeftColumn={<PageContentDetail pageCode={PageCodes.MatchPlay} />}
			RightColumn={
				<React.Fragment>
					{/* <h3 className="text-primary">{constants.MatchPlayYear} Match Play Teams</h3> */}
					<h3 className="text-primary">{constants.MatchPlayYear} Match Play Sign Up</h3>
					<h6 className="text-success">
						Click the button below to request a team for the 2025 season. You should repeat this for
						each team your club wants to enter.
					</h6>
					<div>
						<Button
							variant="success"
							size="lg"
							data-tally-open="mJXq9K"
							data-tally-width="432"
							data-tally-layout="modal"
							data-tally-overlay="1"
							data-tally-auto-close="0"
						>
							Sign Up a Team
						</Button>
					</div>
					{/* <TeamList /> */}
				</React.Fragment>
			}
		/>
	)
}

export default MatchPlayPage
