import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap";


export interface IZDropdown {
  variant: "dropdown-for-sort",
  data: { value: string, text: string }[],
  value: string,
  onChange: (v: string) => void
}

export default function ZDropdown(
  data: IZDropdown
) {



  return <Dropdown className={`${data.variant}`}>
    <DropdownToggle>
      {data.value}
    </DropdownToggle>

    <DropdownMenu>
      {/*<DropdownItem href="#/action-1">Action</DropdownItem>
      <DropdownItem href="#/action-2">Another action</DropdownItem>
      <DropdownItem href="#/action-3">Something else</DropdownItem>*/}
      {
        data.data.map((item, key: number) => {
          return <DropdownItem onClick={(event) => {
            event.preventDefault();
            data.onChange(item.value)
          }} href={item.value} key={`dropdown-item-${key}`}>{item.text}</DropdownItem>
        })
      }
    </DropdownMenu>
  </Dropdown>;
}