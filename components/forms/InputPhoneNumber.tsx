import { TextInputProps } from "./Input";

export default function InputPhoneNumber({ telProps }: { telProps: TextInputProps }) {

  const formatPhoneNumber = (value: string) => {
    // 1. Remove all non-digit characters
    const phoneNumber = value.replace(/\D/g, "");
    const phoneNumberLength = phoneNumber.length;

    // 2. Apply the US format mask
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Format the raw input
    const formattedValue = formatPhoneNumber(e.target.value);

    // Create a "fake" event to pass back to your original onChange
    // This keeps your external state (in the parent) updated with the formatted string
    const event = {
      ...e,
      target: {
        ...e.target,
        value: formattedValue,
        //name: telProps.name || ""
      }
    } as React.ChangeEvent<HTMLInputElement>;

    if (telProps.onChange) {
      telProps.onChange(event);
    }
  };

  return (
    <div className="input-wrap-final">
      <input
        {...telProps}
        type="tel" // Force telephone keyboard on mobile
        onChange={handlePhoneChange}
        maxLength={14} // (XXX) XXX-XXXX is 14 characters
      />
    </div>
  );
}