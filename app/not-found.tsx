import ZError from "./errors/ZError";

export default function PageNotFound() {
    return <ZError status={404} />;
}