import Image from "next/image";

export default function Logo() {
  return (
    <span>
        <Image src="/horizons-logo.svg" alt="logo" width={30} height={30} />
    </span>
  );
}