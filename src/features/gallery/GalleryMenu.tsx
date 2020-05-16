import React from "react";
import Badge from "react-bootstrap/Badge";
import { useHistory, useRouteMatch } from "react-router-dom";

import constants from "../../constants";

export interface IGalleryMenuProps {
    currentYear: string;
}

const GalleryMenu: React.FC<IGalleryMenuProps> = (props) => {
    const { currentYear } = props;
    const { url } = useRouteMatch();
    const history = useHistory();

    const renderBadges = () => {
        const years = [];
        for (let year = 2000; year <= constants.EventCalendarYear; year++) {
            years.push(year);
        }
        return years.map((year) => {
            return (
                <Badge key={year} variant="secondary" className="clickable mr-2 mb-2" onClick={() => reload(year)}>
                    {year}
                </Badge>
            );
        });
    };

    const reload = (year: number) => {
        const newUrl = url.replace(currentYear, year.toString());
        history.push(newUrl);
    };

    return <div>{renderBadges()}</div>;
};

export default GalleryMenu;
