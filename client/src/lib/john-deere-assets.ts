export const JOHN_DEERE_LOGO = "/john-deere/logo.jpg";

export const JOHN_DEERE_PHOTOS = {
  homeHero: "/john-deere/home-hero.jpeg",
  expo: "/john-deere/expo-logo.jpg",
  dealership: "/john-deere/dealership.jpg",
  tractorService: "/john-deere/tractor-service.jpg",
  showroom: "/john-deere/showroom.jpg",
  tractorExpo: "/john-deere/tractor-expo.jpg",
  dealerTeam: "/john-deere/dealer-team.jpg",
  teamMachinery: "/john-deere/team-machinery.jpg",
  fieldTeam: "/john-deere/field-team.jpg",
  emblem: "/john-deere/deere-emblem.jpg",
} as const;

export const JOHN_DEERE_PRODUCT_IMAGES = [
  "/john-deere/products/4066r-tractor.webp",
  "/john-deere/products/harvesting-equipment.webp",
  "/john-deere/products/camp-mowers.webp",
  "/john-deere/products/fm40-mower.webp",
  "/john-deere/products/gm20-mower.webp",
  "/john-deere/products/fm41-mower.webp",
  "/john-deere/products/r4d-tractor.webp",
  "/john-deere/products/precision-seeder.webp",
  "/john-deere/products/utility-tractor.webp",
  "/john-deere/products/x350-mower.webp",
] as const;

export function getJohnDeereProductImage(imageUrl: string | null | undefined, index: number) {
  if (imageUrl?.startsWith("/john-deere/products/")) return imageUrl;
  const safeIndex = ((index % JOHN_DEERE_PRODUCT_IMAGES.length) + JOHN_DEERE_PRODUCT_IMAGES.length)
    % JOHN_DEERE_PRODUCT_IMAGES.length;
  return JOHN_DEERE_PRODUCT_IMAGES[safeIndex] ?? JOHN_DEERE_PRODUCT_IMAGES[0];
}