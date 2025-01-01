import { ShareIcon } from "../icons/ShareIcon";

interface CardProps{
    title: string,
    link: string,
    type:"twitter" | "youtube"
}

export function Card({title, link, type}: CardProps) {
    return (
        <div>
            <div className="bg-white rounded-lg p-8 max-w-72 border border-gray-200">
                <div className="flex justify-between items-center  ">
                    <div className="flex items-center gap-2 text-md">
                        <div className=" text-gray-500">
                            <ShareIcon />
                        </div>
                       {title}
                    </div> 
                    <div className="text-gray-500">
                        <ShareIcon/>
                        
                    </div>
                    <div className="text-gray-500">
                        <ShareIcon/>
                    </div>
                </div>
                <iframe className="w-full pt-4" src="https://www.youtube.com/embed/EutUCHFqt04?si=xTxYqZWciJNboWs4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
        </div>
    )
}

