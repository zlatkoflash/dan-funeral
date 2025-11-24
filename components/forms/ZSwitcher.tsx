export type IZSwitcherTypeCheck = 'check-1' | 'check-2';
export interface IZSwitcher {
  id: string,
  checked: IZSwitcherTypeCheck,
  onChange: (v: IZSwitcherTypeCheck) => void
}

export default function ZSwitcher(data: IZSwitcher) {
  return <div className="z-switcher">

    <div className="z-switcher-rail">
      <input type="radio" id={`radio-${data.id}-1`} name="selector" className="z-switcher-input radio-1" checked={data.checked === "check-1"} onChange={(e) => {
        data.onChange("check-1");
      }} />
      <input type="radio" id={`radio-${data.id}-2`} name="selector" className="z-switcher-input radio-2" checked={data.checked === "check-2"} onChange={(e) => {
        data.onChange("check-2");
      }} />

      <div className="z-switcher-slider">
      </div>

      <label htmlFor={`radio-${data.id}-1`} className="z-switcher-label radio-label-1">
        Button 1
      </label>

      <label htmlFor={`radio-${data.id}-2`} className="z-switcher-label radio-label-2">
        Button 2
      </label>
    </div>

  </div>
}