import React from "react"

import Container from "react-bootstrap/Container"

import OneCenteredColumn from "../components/layouts/OneCenteredColumn"

const MaintenancePage: React.FC = () => {
  return (
    <Container fluid={true}>
      <OneCenteredColumn>
        <div style={{ textAlign: "center", marginTop: "80px" }}>
          <h2 className="text-primary mb-2">System Maintenance</h2>
          <p
            style={{ maxWidth: "50%", marginLeft: "auto", marginRight: "auto", marginTop: "20px" }}
          >
            The MPGA website is undergoing system maintenance and is currently unavailable. Please
            come back later Monday evening.
          </p>
        </div>
      </OneCenteredColumn>
    </Container>
  )
}

export default MaintenancePage
