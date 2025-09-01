import Image from "next/image";
import image_not_found from "@/assets/image_not_found.jpg";

export const ImageNotFoundComponent = () => {
    return <Image width={400} className="h-full" priority={true} src={image_not_found} alt={"image not found"}/>
};