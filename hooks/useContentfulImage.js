export default function useContentfulImage(image){
    const fields = image?.fields  
    if ( !image || !fields ) return false

    // Extract the image file and title 
    const { file, title } = fields

    const { contentType, details: { image: innerImage, size }, url } = file

    // If the object passed isn't an image return false
    if (!contentType.includes('image') || !innerImage || !url) return false

    const assembledImage = {
        title,
        ...innerImage,
        url,
        size
    }

    return assembledImage
}