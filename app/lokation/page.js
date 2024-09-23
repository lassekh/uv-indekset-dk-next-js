import Link from "next/link";

export default function Locations() {

    const zipCodes = ["2800", "2900", "3000", "3100", "3200"]

    return (
        <ul>
            {zipCodes.map((zip) => (
                <li key={zip}>
                    <Link href={`/lokation/${zip}`}>{zip}</Link>
                </li>
            ))}
        </ul>
    );
}