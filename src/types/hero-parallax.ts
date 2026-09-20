export interface Product {
  title: string;
  link: string;
  thumbnail: string;
}

export interface ProductCardProps {
  product: Product;
  rowPosition?: "top" | "middle" | "bottom";
}

export interface HeroParallaxProps {
  products: Product[];
}
