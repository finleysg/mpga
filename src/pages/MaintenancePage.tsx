import React from 'react';

import Container from 'react-bootstrap/Container';

import OneCenteredColumn from '../components/layouts/OneCenteredColumn';

const MaintenancePage: React.FC = () => {
  return (
    <Container fluid={true}>
      <OneCenteredColumn>
        <h2 className="text-primary mb-2">System Maintenance</h2>
        <blockquote>
          The MPGA website is undergoing system maintenance and is currently
          unavailable. Please come back in an hour or two.
        </blockquote>
      </OneCenteredColumn>
    </Container>
  );
};

export default MaintenancePage;
