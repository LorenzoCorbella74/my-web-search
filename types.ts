export type Results = {
    videos: {
      results: {
        title: string;
        url: string;
        description: string;
        meta_url?: {
          favicon: string;
        };
      }[];
    },
    web: {
      results: {
        title: string;
        url: string;
        description: string;
        meta_url?: {
          favicon: string;
        };
      }[];
    }
  };