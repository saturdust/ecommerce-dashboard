import { IconType } from "react-icons";
import { FcPackage, FcPaid } from "react-icons/fc";

interface LinkItemProps {
  name: string;
  to: string;
  icon: IconType;
}

export const LinkItems: Array<LinkItemProps> = [
  { name: "Products", icon: FcPackage, to: "/products" },
  { name: "Carts", icon: FcPaid, to: "/carts" },
];
