export type Entity = {
  id: string;
  slug: string;
  acf: {
    order: number;
    image: string;
    title: string;
    subtitle: string;
    short_description: string;
    description: string;
    banner_image: string;
    little_image1: string;
    little_image2: string;
    little_image3: string;
    little_image4: string;
    instagram: string;
    instagram_2: string;
    youtube: string;
    mail: string;

    carrousel_Image1?: string;
    carrousel_Image2?: string;
    carrousel_Image3?: string;
    carrousel_Image4?: string;
    carrousel_Image5?: string;
    carrousel_Image6?: string;
    carrousel_Image7?: string;
    carrousel_Image8?: string;
    video?: string;
    podcast?: string;

    galleryImage_1?: string;
    galleryImage_2?: string;
    galleryImage_3?: string;
    galleryImage_4?: string;
    galleryImage_5?: string;
    galleryImage_6?: string;
    galleryImage_7?: string;
    galleryImage_8?: string;
    galleryImage_9?: string;
    galleryImage_10?: string;
    galleryImage_11?: string;
    galleryImage_12?: string;
    galleryImage_13?: string;
    galleryImage_14?: string;
    galleryImage_15?: string;
    galleryImage_16?: string;
    galleryImage_17?: string;
    galleryImage_18?: string;
    galleryImage_19?: string;
    galleryImage_20?: string;
    galleryImage_21?: string;
    galleryImage_22?: string;
    galleryImage_23?: string;
    galleryImage_24?: string;
    galleryImage_25?: string;
    galleryImage_26?: string;
    galleryImage_27?: string;
    galleryImage_28?: string;
    galleryImage_29?: string;
    galleryImage_30?: string;
  };
};

export type Member = {
  id: string;
  acf: {
    image: string;
    name: string;
    description: string;
    order: number;
  };
};

export type Publication = {
  id: string;
  acf: {
    order: number;
    title: string;
    year: string;
    image: string;
    document: string;
  };
};
