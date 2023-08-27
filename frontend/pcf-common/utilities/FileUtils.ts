export const fileBase64SrcToBlob = async (src: string, mimeType: string) => {
    const base64Response = await fetch(`data:${mimeType};base64,${src}`);
    const blob = await base64Response.blob();
    return blob;
};
