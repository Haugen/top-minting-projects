export type Project = {
  name: string;
  contract_address: string;
  standard: "ERC-1155" | "ERC-721";
  external_url: string;
  image_url: string;
  opensea_url: string;
  mint_count: number;
};
