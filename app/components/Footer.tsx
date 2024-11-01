import Image from "next/image";
export default function Footer() {
  return (
    <footer className="row-start-3 flex gap-6  min-h-[1300px] py-12 flex-wrap items-center justify-center">
      <Image
        className={"border border-red-500 p-12 inline-block"}
        src={"/img/logopks--outline.svg"}
        alt="logo"
        width={450}
        height={222}
      />
    </footer>
  );
}
