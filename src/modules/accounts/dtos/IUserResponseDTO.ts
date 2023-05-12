import { Achievements } from "../../../utils/getAchivements";

interface IUserResponseDTO {
    uuid: string;
    name: string;
    email: string;
    photo: string;
    is_admin: boolean;
    dark_theme: boolean;
    achievments?: Achievements
}

export { IUserResponseDTO };