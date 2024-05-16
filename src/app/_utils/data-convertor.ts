import { SolplaceFetchData } from "../_stores/solplaceStore";


export const dataConvertor = (data: SolplaceFetchData) => {
    return {
                id: data.id,
                userId: data.userId,
                introduction: data.introduction,
                solplaceName: data.solplaceName,
                images: JSON.parse(data.images),
                createdAt: new Date(data.createdAt),
                updatedAt: new Date(data.updatedAt),
                deletedAt: data.deletedAt ? new Date(data.deletedAt) : undefined,
                si: data?.si ? data.si : undefined,
                gu: data?.gu ? data.gu : undefined,
            }
    
}