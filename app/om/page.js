import Link from "next/link";

export default function About() {
    return (
        <>
            <h1>Lidt om siden: uv-indekset.dk</h1>
            <p>
                I starten af 2023 startede jeg på Datamatiker uddannelsen.
                Jeg ville gerne i gang med at skabe et fysisk produkt ret hurtigt,
                hvilket også var grunden til at jeg valgte Datamatiker der er en praktisk orienteret uddannelse.
                En af de første projekter jeg fik skippet afsted var denne hjemmeside, så du kan holde dig opdateret på <Link href="/">UV-indekset</Link>.
            </p>
            <p>
                Det er blot et af mange små projekter jeg har sat i søen, som består af små hjemmesider,
                der er meget simple og bygger på en eller anden form for data.
                Udover dette har jeg også lavet en Krydsordbog og en side i WordPress hvor jeg udgiver små spil lavet i PS5.js.
            </p>
            <p>
                Hvis du er programmeringsinteresseret, så kan jeg fortælle at denne side er bygger med Next.js.
                I første omgang lavede jeg den med en kombination af Java og React,
                ret hurtigt skar jeg Java delen fra og lavede det hele i React, men fandt ret hurtigt ud af
                at Next.js var mere ideelt til formålet, da jeg gerne vil have et primært Server Side Renderet (SSR) website.
            </p>
            <p>
                Du skal være velkommen til at kontakte mig på min mail hej(a)lassekh.dk hvis du har spørgsmål angående siden.
            </p>
        </>
    );
}
