import React from "react";

import LabelAndValue, { LabelStyle, ValueType } from "../../components/LabelAndValue";
import { ClubProps } from "./memberClubPropTypes";

const GolfCourseView: React.FC<ClubProps> = (props) => {
  const { club } = props;
  const course = club.golfCourse;

  return (
    <>
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
    </>
  );
};

export default GolfCourseView;
