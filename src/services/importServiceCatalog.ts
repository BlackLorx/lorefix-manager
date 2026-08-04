import { SERVICES } from "../data/services";
import { importDefaultServices } from "./serviceCatalogService";

export async function importServiceCatalog() {
  await importDefaultServices(SERVICES);
}