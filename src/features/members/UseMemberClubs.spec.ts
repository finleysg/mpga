import { renderHook } from "@testing-library/react-hooks";
import useMemberClubs from "./UseMemberClubs";
import { useSelector, useDispatch } from "react-redux";

jest.mock("react-redux", () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

const mockUseSelector = useSelector as jest.Mock;
const mockUseDispatch = useDispatch as jest.Mock;
const mockDispatch = jest.fn();

describe("useMemberClubs hook", () => {
    it("calls dispatch and retrieves clubs", () => {
        mockUseDispatch.mockImplementation(() => mockDispatch);
        mockUseSelector.mockImplementation(
            (callback) => callback({ memberClubs: { clubs: [{ id: 1 }, { id: 2 }] }})
        );

        const { result } = renderHook(() => useMemberClubs());

        expect(result.current).toStrictEqual([{ id: 1 }, { id: 2 }]);
        // expect(mockDispatch).toHaveBeenCalledWith(MemberClubActions.LoadMemberClubs);
        expect(mockDispatch).toHaveBeenCalled();
    });
});
