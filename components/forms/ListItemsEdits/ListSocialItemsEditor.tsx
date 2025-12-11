import { Button, Col, Container, Row } from "react-bootstrap";
import TextInput from "../Input";
import Image from "next/image";

import plusIcon from './../../../assets/images/icon-plus.svg';
import ListSocialItemsEditorItem, { IListSocialItemsEditorItem } from "./ListSocialItemsEditorItem";



export interface IListSocialItemsEditor {
  items: IListSocialItemsEditorItem[]
}

export default function ListSocialItemsEditor(data: IListSocialItemsEditor) {

  // const items = [];

  return <>
    <div className="list-social-items-editor-wrap">

      {
        data.items.map((itemSocial, key: number) => {
          return <ListSocialItemsEditorItem {...itemSocial} key={`item-social-${key}`} />
        })
      }

    </div>
    <Row className="x2-margin">
      <Col>
        <Button type="button" variant="success">
          <Image src={plusIcon} alt="Social Media" className="icon" />  Add Social Media
        </Button>
      </Col>
    </Row>
  </>
}