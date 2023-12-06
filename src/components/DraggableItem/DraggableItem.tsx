import React from "react";
import { useDrag, useDrop } from "react-dnd";
import styles from "./DraggableItem.module.scss";
import menuIcon from "../../../public/icons/menu.svg";
import { useGenerateStore } from "../../stores/generateStore";

type DraggableProps = {
  id: Number;
  text: String;
  index: Number;
  moveItem: Function;
  timeFrameId: number;
};
const ItemType = "ITEM";
const DraggableItem = ({
  id,
  text,
  index,
  moveItem,
  timeFrameId,
}: DraggableProps) => {
  const currentTimeFrameId = useGenerateStore(
    (state) => state.currentTimeFrameId
  );
  const currentCompositionIndex = useGenerateStore(
    (state) => state.compositionIndex
  );
  const isMusicPlaying = useGenerateStore((state) => state.isMusicPlaying);
  const [, drag] = useDrag({
    type: ItemType,
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem: any) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const trackClass =
    isMusicPlaying &&
    currentTimeFrameId === timeFrameId &&
    index === currentCompositionIndex
      ? styles.activeTrackComposition
      : styles.trackComposition;

  return (
    <div ref={(node) => drag(drop(node))} className={trackClass}>
      <img src={menuIcon} />
      {text}
    </div>
  );
};

export default DraggableItem;
