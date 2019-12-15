import React from "react";
import Container from "react-bootstrap/Container";
import ThreeEvenColumns from "../components/layouts/ThreeEvenColumns";
import AnnouncementList from "../components/AnnouncementList";

const HomePage: React.FC = () => {
    return (
        <Container fluid={true}>
            <ThreeEvenColumns
                Column1={<AnnouncementList />}
                Column2={"Tournaments"}
                Column3={"Page test"}
            />
        </Container>
    );
}

export default HomePage
