import Link from "next/link";

const Footer = () => {
  return (
    <div className="text-white text-sm absolute bottom-10">
      Built by{" "}
      <Link
        href={"https://twitter.com/devyoma"}
        className="text-blue-400 font-semibold cursor-pointer"
      >
        Yoma
      </Link>
      , Designed by{" "}
      <Link
        href={"https://twitter.com/bakarook"}
        className="text-blue-400 font-semibold cursor-pointer"
      >
        Faruq
      </Link>
    </div>
  );
}

export default Footer