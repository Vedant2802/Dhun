import React, { useEffect, useState } from "react";
import DraggableItem from "../DraggableItem/DraggableItem";

type DraggableWrapperProps = {
    urls: string[],
    id: number
}



const DraggableWrapper = (props: DraggableWrapperProps) => {
    const {urls,id} = props;
    const [updateUrls,setUpdatedUrls] = useState(urls);
    const moveItem = (fromIndex: number, toIndex: number) => {
        var temp = urls[fromIndex];
        urls[fromIndex] = urls[toIndex];
        urls[toIndex] = temp;
        setUpdatedUrls(urls);
      };

    useEffect(()=> {
        setUpdatedUrls(urls);
    },[urls])
    if(!updateUrls){
        return null;
    }

    return (<>
    {updateUrls.map((url, index) => {
      return (
        <DraggableItem
          key={url}
          id={index}
          timeFrameId={id}
          text={"Track" + (index + 1)}
          index={index}
          moveItem={moveItem}
        />
      );
    })}
    </>)

}

export default DraggableWrapper;