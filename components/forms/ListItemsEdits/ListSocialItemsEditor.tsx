import { Button, Col, Container, Row } from "react-bootstrap";
import TextInput from "../Input";
import Image from "next/image";

import plusIcon from './../../../assets/images/icon-plus.svg';
import ListSocialItemsEditorItem, { IListSocialItemsEditorItem, SocialPlatform } from "./ListSocialItemsEditorItem";
import { useEffect, useState } from "react";



export interface IListSocialItemsEditor {
  itemsJSON: string,
  // items: IListSocialItemsEditorItem[],
  // onAddItem: (item: IListSocialItemsEditorItem) => void,
  // onRemoveItem: (item: IListSocialItemsEditorItem) => void
  onChangeItemsList: (items: IListSocialItemsEditorItem[], itemsJSON: string) => void
}

export default function ListSocialItemsEditor(data: IListSocialItemsEditor) {

  // const items = [];

  // const [itemsJSON, setItemsJSON] = useState<string>(data.itemsJSON);
  const [items, setItems] = useState<IListSocialItemsEditorItem[]>([]);

  const __AddAnotherItem = () => {
    console.log("it is working");
    const newItem = { id: `item-${items.length + 1}`, link: "", socialType: "" } as IListSocialItemsEditorItem;
    setItems([...items, newItem])
    // data.onAddItem(newItem);
    data.onChangeItemsList([...items, newItem], JSON.stringify([...items, newItem]));
  }

  // init the items from json string
  useEffect(() => {
    // setItemsJSON(JSON.stringify(items));
    try {
      // setItemsJSON(JSON.stringify(items));
      const jsonItems = JSON.parse(data.itemsJSON);
      setItems(jsonItems);
    }
    catch (error) {
      console.log("error", error);
    }
  }, []);


  return <div className="list-social-items">
    <div className="list-social-items-editor-wrap">

      {
        items.map((itemSocial, key: number) => {
          return <ListSocialItemsEditorItem {...itemSocial} key={`item-social-${itemSocial.id}-${key}`}
            onRemove={(item: IListSocialItemsEditorItem) => {
              // return;

              const newItems = items.filter((item2) => item2.id !== item.id);
              console.log("newItems:", item, newItems);

              // data.onRemoveItem(item);
              setItems(newItems);
              data.onChangeItemsList(newItems, JSON.stringify(newItems));
            }}
            onChange={(typeOfPlatform: SocialPlatform, link: string) => {
              const newItems = items.map((item2) => {
                if (item2.id === itemSocial.id) {
                  return { ...item2, socialType: typeOfPlatform, link: link };
                }
                return item2;
              });
              setItems(newItems);
              data.onChangeItemsList(newItems, JSON.stringify(newItems));
              // data.onAddItem({ id: itemSocial.id, link: link, socialType: typeOfPlatform });
            }} />
        })
      }

    </div>
    <Row className="x2-margin">
      <Col>
        <Button type="button" variant="success" onClick={() => {
          console.log("it is working");
          __AddAnotherItem()
        }}>
          <Image src={plusIcon} alt="Social Media" className="icon" />  Add Social Media
        </Button>
      </Col>
    </Row>
  </div>
}