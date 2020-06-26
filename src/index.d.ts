declare module "*.jpg";
declare module "*.svg";
declare module "utils";
declare module "*.geojson";
declare module "*.scss" {
  const noTypes: any;
  export default noTypes;
}
declare var process: {
  env: {
    DATA: string;
  },
};
