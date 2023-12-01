import React from "react";
import { useDrag, useDrop } from "react-dnd";
import styles from "./DraggableItem.module.scss";
import menuIcon from "../../../public/icons/menu.svg";

type DraggableProps = {
  id: Number;
  text: String;
  index: Number;
  moveItem: Function;
};
const ItemType = "ITEM";
const DraggableItem = ({ id, text, index, moveItem }: DraggableProps) => {
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

  return (
    <div ref={(node) => drag(drop(node))} className={styles.trackComposition}>
      <img src={menuIcon} />
      {text}
    </div>
  );
};

export default DraggableItem;
