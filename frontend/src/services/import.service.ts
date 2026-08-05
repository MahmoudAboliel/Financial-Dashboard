
import { api } from "@/lib/api";

export async function uploadFinancialFile(
    file: File
) {
    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post(
        "/import",
        formData
    );

    // console.log(response.status)

    return response.data;
}