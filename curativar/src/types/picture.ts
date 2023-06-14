interface IPictureFormat {
  "width": number,
  "height": number,
  "size": number,
  "url": string
};

export type TFormatKeys = "thumbnail" | "medium" | "small";

export type TFormats = Record<TFormatKeys, IPictureFormat>;

export interface IPicture extends IPictureFormat{
  "id": number,
  "formats": TFormats,
}

