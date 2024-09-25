import Link from "next/link";
import { getZipCodes } from "@/lib/api";

export default async function Locations() {

    const zipCodes = await getZipCodes()

    return (
        <ul>
            {zipCodes.map((zip) => (
                <li key={zip.nr}>
                    <Link href={`/lokation/${zip.nr}`}>{zip.nr} {zip.navn}</Link>
                </li>
            ))}
        </ul>
    );
}