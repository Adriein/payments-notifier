export interface SpoonacularApiSearchResponse {
  data: {
    results: { id: number; name: string; image: string }[];
    offset: number;
    number: number;
    totalResults: number;
  };
  headers: {
    'x-api-quota-used': number;
  };
}
