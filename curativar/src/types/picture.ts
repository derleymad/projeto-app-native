interface IPictureFormat {
  "width": number,
  "height": number,
  "size": number,
  "url": string
};

type TFormatKeys = "thumbnail" | "medium" | "small";

type TFormats = Record<TFormatKeys, IPictureFormat>;

export interface IPicture extends IPictureFormat{
  "id": number,
  "formats": TFormats,
}

