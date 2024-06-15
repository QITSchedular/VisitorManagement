import { useRecoilState } from "recoil";
import registerUser from "./createUserAtom";

export const useRegisterState = () => useRecoilState(registerUser);
