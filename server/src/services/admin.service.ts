import { adminRepository } from "../repositories"

export const getAdminByName = async (name: string) => {
    const admins = await adminRepository.getList({ name });
    return admins.length > 0? admins[0] : null;
}