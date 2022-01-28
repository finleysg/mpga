import React from "react";

import LabelAndValue, { LabelStyle, ValueType } from "../../components/LabelAndValue";
import { Club, Membership } from "../../models/Clubs";

type MemberClubDetailProps = {
  club: Club;
  membership?: Membership;
};

const MemberClubView: React.FC<MemberClubDetailProps> = (props) => {
  const { club, membership } = props;

  return (
    <div>
      <h3 className="text-primary mb-3">{club.name}</h3>
      <LabelAndValue
        label={"Last joined"}
        value={membership?.year}
        labelStyle={LabelStyle.Stacked}
        valueType={ValueType.Text}
      />
      <LabelAndValue
        label={"Date joined"}
        value={membership?.paymentDate}
        labelStyle={LabelStyle.Stacked}
        valueType={ValueType.Text}
      />
      <LabelAndValue
        label={"Club website"}
        value={club.website}
        labelStyle={LabelStyle.Stacked}
        valueType={ValueType.ExternalLink}
      />
      <LabelAndValue
        label={"Number of members"}
        value={club.size}
        labelStyle={LabelStyle.Stacked}
        valueType={ValueType.Text}
      />
      <LabelAndValue
        label={"About " + club.name}
        value={club.notes}
        labelStyle={LabelStyle.Stacked}
        valueType={ValueType.Markdown}
      />
    </div>
  );
};

export default MemberClubView;
