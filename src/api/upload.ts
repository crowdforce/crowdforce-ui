import { NewAssetDto } from "@/common/types"

// async function sha() {
// var filesize = fileInput.files[0].size;
// var reader = new FileReader();
// reader.onload = function (ev) {
//     console.log("File", filename, ":");
//     //
//     crypto.subtle.digest('SHA-256', ev.target.result).then(hashBuffer => {
//         // Convert hex to hash, see https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#converting_a_digest_to_a_hex_string
//         const hashArray = Array.from(new Uint8Array(hashBuffer));
//         const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
//         console.log(hashHex);
//     }).catch(ex => console.error(ex));
// };
// reader.onerror = function (err) {
//     console.error("Failed to read file", err);
// }
// reader.readAsArrayBuffer(fileInput.files[0]);
// }

export async function upload(file: File): Promise<NewAssetDto> {
    const query = new URLSearchParams({
        filename: file.name,
        size: `${file.size}`,
        mime: file.type,
        hash: "_",
    })
    const url = `/api/assets/upload-url?${query}`
    const res = await fetch(url, {
        method: "POST",
    })
    const asset = await res.json() as NewAssetDto

    await fetch(asset.uploadUrl, {
        method: "PUT",
        body: file,
        headers: {
            "Content-type": file.type,
            "x-amz-acl": "public-read",
        },
    })

    return asset
}
