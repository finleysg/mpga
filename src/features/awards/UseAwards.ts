import { useGetAwardsQuery } from "../../services/MpgaApi";

const useAwards = () => {
  const awards = useGetAwardsQuery();
  const awardMap = {};
  awards.data?.forEach((award) => {
    awardMap[award.name] = award.id;
  });
  return { awards, awardMap };
};

export default useAwards;
