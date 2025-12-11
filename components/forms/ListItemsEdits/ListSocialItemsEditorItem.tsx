import { Col, Row } from "react-bootstrap";
import TextInput from "../Input";
import Image from "next/image";

import iconDelete from './../../../assets/images/icon-delete-small.svg';

export type SocialPlatform =
  | "facebook"
  | "instagram"
  | "youtube"
  | "x" // Formerly Twitter
  | "linkedin"
  | "tiktok"
  | "pinterest"
  | "snapchat"
  | "reddit"
  | "github" // For code/professional profiles
  | "twitch" // For streaming/gaming
  | "discord"
  | ""; // Represents 'None' or 'Not Applicable'

export interface IListSocialItemsEditorItem {
  socialType: SocialPlatform,
  link: string
}

export default function ListSocialItemsEditorItem(data: IListSocialItemsEditorItem) {

  return <div className="list-social-item-editor-item-wrap">
    <Row>
      <Col md={4}>
        <TextInput id="" label="" onChange={(e) => { }} type="select" value="" />
      </Col>
      <Col md={8}>
        <TextInput id="" label="" onChange={(e) => { }} type="text" value={data.link} placeholder={`https://www.${data.socialType}.com`} />
      </Col>
    </Row>

    <button type="button" className="btn-delete-small">
      <Image src={iconDelete} alt="Delete" />
    </button>

  </div>
}