import ThreeEvenColumns from "../components/layouts/ThreeEvenColumns"
import ClubContactList from "../features/member-clubs/ClubContactList"
import GolfCourseDetail from "../features/member-clubs/GolfCourseDetails"
import MemberClubDetail from "../features/member-clubs/MemberClubDetail"
import { useCurrentClub } from "./MemberClubLayoutPage"

const MemberClubPage = () => {
	const { selectedClub } = useCurrentClub()

	return (
		<ThreeEvenColumns
      Column1={<MemberClubDetail club={selectedClub} />}
      Column2={<ClubContactList club={selectedClub} />}
      Column3={<GolfCourseDetail club={selectedClub} />}
    />
	)
}

export default MemberClubPage
