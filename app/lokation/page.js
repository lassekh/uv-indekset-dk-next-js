import Link from "next/link";
import { getZipCodes } from "@/lib/api";
import { metadata } from "../layout";

export default async function Locations() {

    const zipCodes = await getZipCodes()

    metadata.title = "Vælg lokation og se UV-indeks"
    metadata.description = "Vælg blandt alle danske postnumre og se UV-indekset i din by"

    return (
        <>
            <h1>Se UV-indeks i din by</h1>
            <p>
                Vælg din by i listen herunder, der er sorteret efter postnummer.
                Du vil derefter komme direkte videre til en side der viser UV-indekset i den by lige nu og 48 timer frem.
            </p>
            <ul className="location-list">
                {zipCodes.map((zip) => (
                    <li key={zip.nr}>
                        <Link href={`/lokation/${zip.nr}`}>{zip.nr} {zip.navn}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
}