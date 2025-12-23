import { Col, Row } from "react-bootstrap";
import TextInput from "../Input";
import Image from "next/image";

import iconDelete from './../../../assets/images/icon-delete-small.svg';
import { useEffect, useState } from "react";
import ZButtonDeleteSmall from "../ZButtonDeleteSmall";
import { IUserSocialLink } from "@/ContextProvider/AuthProviderWrap";

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
export const all_social_platforms = [
  "facebook",
  "instagram",
  "youtube",
  "x", // Formerly Twitter
  "linkedin",
  "tiktok",
  "pinterest",
  "snapchat",
  "reddit",
  "github", // For code/professional profiles
  "twitch", // For streaming/gaming
  "discord",
  // "" // Represents 'None' or 'Not Applicable'
]

export interface IListSocialItemsEditorItem extends IUserSocialLink {
  /*socialType: SocialPlatform,
  link: string,
  id: string,*/
  onRemove?: (item: IListSocialItemsEditorItem) => void,
  onChange?: (typeOfPlatform: SocialPlatform, link: string) => void
}

export default function ListSocialItemsEditorItem(data: IListSocialItemsEditorItem) {

  const [typeOfPlatform, setTypeOfPlatform] = useState<SocialPlatform>(data.socialType);
  const [link, setLink] = useState<string>(data.link);

  useEffect(() => {
    // setTypeOfPlatform(data.socialType);
    // setLink(data.link);
    data.onChange?.(typeOfPlatform, link);
  }, [
    typeOfPlatform,
    link
  ]);

  return <div className="list-social-item-editor-item-wrap">
    <Row>
      <Col md={4}>
        <TextInput
          id={'social-item-select-' + data.id}
          label=""
          value={typeOfPlatform}
          onChange={(e) => {
            setTypeOfPlatform(e.target.value)
          }}
          options={[
            {
              value: "",
              label: "Select Social Platform"
            },
            ...all_social_platforms.map((platform) => ({
              value: platform,
              label: platform.charAt(0).toUpperCase() + platform.slice(1)
            }))
          ]}
          type="select" />
      </Col>
      <Col md={8}>
        <TextInput id={'social-item-text-' + data.id} label="" onChange={(e) => {
          setLink(e.target.value)
        }} type="text" value={link} placeholder={`https://www.${data.socialType}.com`} />
      </Col>
    </Row>

    {/*<button type="button" className="btn-delete-small" onClick={() => {
      data.onRemove?.(data)
    }}>
      <Image src={iconDelete} alt="Delete" />
    </button>*/}

    <ZButtonDeleteSmall onClick={() => {
      data.onRemove?.(data)
    }} />

  </div>
}