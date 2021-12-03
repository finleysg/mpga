import React from 'react';

import Badge from 'react-bootstrap/Badge';
import { useLocation, useNavigate } from 'react-router-dom';

import constants from '../../constants';

export interface IGalleryMenuProps {
    currentYear: string;
}

const GalleryMenu: React.FC<IGalleryMenuProps> = (props) => {
    const { currentYear } = props;
    const location = useLocation();
    const navigate = useNavigate();

    const renderBadges = () => {
        const years = [];
        for (let year = 2000; year <= constants.EventCalendarYear; year++) {
            years.push(year);
        }
        return years.map((year) => {
            return (
                <Badge
                    key={year}
                    variant="secondary"
                    className="clickable mr-2 mb-2"
                    onClick={() => reload(year)}>
                    {year}
                </Badge>
            );
        });
    };

    const reload = (year: number) => {
        const newUrl = location.pathname.replace(currentYear, year.toString());
        navigate(newUrl);
    };

    return <div>{renderBadges()}</div>;
};

export default GalleryMenu;
