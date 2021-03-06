import React from "react";
import { useSelector } from "react-redux";

import LabelAndValue, { LabelStyle, ValueType } from "../../components/LabelAndValue";
import LoadingContainer from "../../components/LoadingContainer";
import { IApplicationState } from "../../store";

const GolfCourseView: React.FC = () => {
    const state = useSelector((state: IApplicationState) => state.memberClubs);
    const course = state.selectedClub.golfCourse;

    return (
        <LoadingContainer hasData={state.selectedClub !== undefined}>
            {!course?.name && <h3 className="text-primary mb-3">No Home Course</h3>}
            {course?.name && (
                <div>
                    <h3 className="text-primary mb-3">{course?.name}</h3>
                    <LabelAndValue
                        label={"Address"}
                        value={course}
                        labelStyle={LabelStyle.Stacked}
                        valueType={ValueType.Address}
                    />
                    <LabelAndValue
                        label={"Course website"}
                        value={course?.website}
                        labelStyle={LabelStyle.Stacked}
                        valueType={ValueType.ExternalLink}
                    />
                    <LabelAndValue
                        label={"Phone"}
                        value={course?.phone}
                        labelStyle={LabelStyle.Stacked}
                        valueType={ValueType.Text}
                    />
                    <LabelAndValue
                        label={"Email"}
                        value={course?.email}
                        labelStyle={LabelStyle.Stacked}
                        valueType={ValueType.Markdown}
                    />
                </div>
            )}
        </LoadingContainer>
    );
};

export default GolfCourseView;
